import * as fs from "node:fs";
import * as https from "node:https";
import * as crypto from "node:crypto";
import fetch, { RequestInit } from "node-fetch";
import { MultipartStream } from "./MultipartStream.js";
const { isStream } = MultipartStream;

interface MediaPayload {
  filename?: string;
  source?: string | fs.ReadStream | Buffer;
  url?: string;
}

interface ItemPayload {
  media: MediaPayload;
}

interface ApiPayload {
  [key: string]:
    | string
    | number
    | boolean
    | MediaPayload
    | ItemPayload[]
    | ItemPayload;
}

interface ApiConfig {
  method: string;
  compress: boolean;
  headers: { [key: string]: string };
  body: string | MultipartStream;
  agent?: https.Agent;
}

const defaultExtensions: { [key: string]: string } = {
  audio: "mp3",
  photo: "jpg",
  sticker: "webp",
  video: "mp4",
  animation: "mp4",
  video_note: "mp4",
  voice: "ogg",
};

const formDataJsonFields = [
  "results",
  "reply_markup",
  "mask_position",
  "shipping_options",
  "errors",
  "commands",
];

/**
 * Check if the given payload contains media data.
 * @param {ApiPayload} payload - The payload to be checked for media data.
 * @returns {boolean} - A boolean indicating whether the payload contains media data.
 */
function hasMedia(payload: ApiPayload): boolean {
  return Object.keys(payload).some((key) => {
    const value: any = payload[key];
    if (Array.isArray(value)) {
      return value.some(
        ({ media }) =>
          media && typeof media === "object" && (media.source || media.url),
      );
    }
    return (
      typeof value === "object" &&
      (value.source ||
        value.url ||
        (typeof value.media === "object" &&
          ((value.media as MediaPayload).source ||
            (value.media as MediaPayload).url)))
    );
  });
}

/**
 * Build a configuration object for making a POST request with application/json content type.
 * @param {ApiPayload} payload - The payload containing data for the API call.
 * @returns {Promise<ApiConfig>} - A Promise that resolves with the configuration for the API request.
 */
function buildJSONConfig(payload: ApiPayload): Promise<ApiConfig> {
  const apiConfig = {
    method: "POST",
    compress: true,
    headers: {
      "content-type": "application/json",
      connection: "keep-alive",
    },
    body: JSON.stringify(payload),
  };

  return Promise.resolve(apiConfig);
}

/**
 * Build a configuration object for making a POST request with multipart/form-data content type.
 * @param {ApiPayload} payload - The payload containing data for the API call.
 * @param {https.Agent} agent - The HTTPS agent for making requests.
 * @returns {Promise<ApiConfig>} - A Promise that resolves with the configuration for the API request.
 */
async function buildFormDataConfig(
  apiPayload: ApiPayload,
  agent: https.Agent,
): Promise<ApiConfig> {
  for (const fieldName of formDataJsonFields) {
    const fieldValue = apiPayload[fieldName];
    if (fieldValue !== undefined && typeof fieldValue !== "string") {
      apiPayload[fieldName] = JSON.stringify(fieldValue);
    }
  }

  const boundary = crypto.randomBytes(32).toString("hex");
  const formData = new MultipartStream(boundary);

  const tasks = Object.keys(apiPayload).map(async (fieldName) => {
    const fieldValue = apiPayload[fieldName];
    await attachFormValue(formData, fieldName, fieldValue, agent);
  });

  await Promise.all(tasks);

  return {
    method: "POST",
    compress: true,
    headers: {
      "content-type": `multipart/form-data; boundary=${boundary}`,
      connection: "keep-alive",
    },
    body: formData,
  };
}

/**
 * Attach a form value to a multipart form based on its type and structure.
 * @param {MultipartStream} form - The multipart form to which the value will be attached.
 * @param {string} id - The identifier for the form value.
 * @param {*} value - The value to be attached to the form.
 * @param {https.Agent} agent - The HTTPS agent for making requests.
 * @returns {Promise<void>} - A Promise that resolves once the value is attached to the form.
 */
async function attachFormValue(
  form: MultipartStream,
  id: string,
  value: any,
  agent: https.Agent,
): Promise<void> {
  if (!value) return;

  const valueType = typeof value;

  if (
    valueType === "string" ||
    valueType === "boolean" ||
    valueType === "number"
  ) {
    form.addPart({
      headers: { "content-disposition": `form-data; name="${id}"` },
      body: `${value}`,
    });
    return;
  }

  if (id === "thumb") {
    const attachmentId = crypto.randomBytes(16).toString("hex");
    await attachFormMedia(form, value, attachmentId, agent);
    form.addPart({
      headers: { "content-disposition": `form-data; name="${id}"` },
      body: `attach://${attachmentId}`,
    });
    return;
  }

  if (Array.isArray(value)) {
    const attachments = await Promise.all(
      value.map(async (item) => {
        if (typeof item.media !== "object") {
          return item;
        }
        const attachmentId = crypto.randomBytes(16).toString("hex");
        await attachFormMedia(form, item.media, attachmentId, agent);
        return { ...item, media: `attach://${attachmentId}` };
      }),
    );

    form.addPart({
      headers: { "content-disposition": `form-data; name="${id}"` },
      body: JSON.stringify(attachments),
    });
    return;
  }

  if (typeof value.media !== "undefined" && typeof value.type !== "undefined") {
    const attachmentId = crypto.randomBytes(16).toString("hex");
    await attachFormMedia(form, value.media, attachmentId, agent);
    form.addPart({
      headers: { "content-disposition": `form-data; name="${id}"` },
      body: JSON.stringify({
        ...value,
        media: `attach://${attachmentId}`,
      }),
    });
    return;
  }

  await attachFormMedia(form, value, id, agent);
}

/**
 * Attaches media to a multipart form.
 * @param {MultipartStream} form - The multipart form to which media is attached.
 * @param {MediaPayload} media - The media payload containing information about the media.
 * @param {string} id - The identifier for the media attachment.
 * @param {https.Agent} agent - The HTTPS agent for making requests.
 * @returns {Promise<void>} - A Promise that resolves once the media is attached to the form.
 */
async function attachFormMedia(
  form: MultipartStream,
  media: MediaPayload,
  id: string,
  agent: https.Agent,
): Promise<void> {
  const defaultExtension = "dat";
  const filename =
    media.filename || `${id}.${defaultExtensions[id] || defaultExtension}`;

  if (media.url) {
    const response = await fetch(media.url, { agent });
    await form.addPart({
      headers: {
        "content-disposition": `form-data; name="${id}"; filename="${filename}"`,
      },
      body: response.body as fs.ReadStream,
    });
  } else if (media.source) {
    const sourcePath = media.source as string;

    if (fs.existsSync(sourcePath)) {
      media.source = fs.createReadStream(sourcePath) as fs.ReadStream;
    }

    if (isStream(media.source) || Buffer.isBuffer(media.source)) {
      await form.addPart({
        headers: {
          "content-disposition": `form-data; name="${id}"; filename="${filename}"`,
        },
        body: media.source,
      });
    }
  }
}

export { hasMedia, buildJSONConfig, buildFormDataConfig, MediaPayload };
