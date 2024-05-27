import crypto from "node:crypto";
import type { URL } from "node:url";
import { Buffer } from "node:buffer";
import type { Agent } from "node:https";
import fs, { type ReadStream } from "node:fs";
import fetch, {
  type RequestInit,
  type BodyInit,
  type HeadersInit,
} from "node-fetch";
import { MultipartStream } from "./util/MultipartStream";

/**
 * Configuration object for API requests.
 */
interface IApiConfig {
  method: string;
  compress: boolean;
  headers: HeadersInit;
  body: MultipartStream | BodyInit;
  agent?: RequestInit["agent"];
}

/**
 * Checks if a file exists.
 * @param filePath - The path to the file.
 * @returns A Promise resolving to true if the file exists, otherwise false.
 */
async function fileExists(filePath: string) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Utility class for handling media-related operations.
 */
class Media {
  /**
   * File extensions for various media types.
   */
  readonly extensions: Record<string, string> = {
    audio: "mp3",
    photo: "jpg",
    sticker: "webp",
    video: "mp4",
    animation: "mp4",
    video_note: "mp4",
    voice: "ogg",
  };

  /**
   * Fields in JSON payload that require special treatment when sent as form data.
   */
  readonly formDataJsonFields: string[] = [
    "results",
    "reply_markup",
    "mask_position",
    "shipping_options",
    "errors",
    "commands",
  ];

  /**
   * Media parameters that can be sent as form data.
   */
  readonly sourceParametersMedia: string[] = [
    "sticker",
    "media",
    "photo",
    "audio",
    "document",
    "video",
    "animation",
    "voice",
    "video_note",
  ];

  /**
   * Checks if the payload contains any media.
   * @param payload - The payload to check.
   * @returns True if the payload contains media, otherwise false.
   */
  hasMedia(payload: Record<string, any>) {
    return Object.keys(payload).some((key) => {
      if (this.sourceParametersMedia.includes(key)) {
        return true;
      }
      if (Array.isArray(payload[key])) {
        return payload[key].some(
          (item: Record<string, any>) =>
            typeof item === "object" && this.hasMedia(item),
        );
      }
      return false;
    });
  }

  /**
   * Builds the JSON configuration for the API request.
   * @param payload - The payload to send.
   * @param requestOptions - Options for the request.
   * @returns The JSON configuration object.
   */
  buildJSONConfig(
    payload: Record<string, any>,
    requestOptions: RequestInit,
  ): IApiConfig {
    return {
      method: "POST",
      compress: true,
      headers: {
        "content-type": "application/json",
        connection: "keep-alive",
      },
      body: JSON.stringify(payload),
      ...requestOptions,
    };
  }

  /**
   * Builds the multipart/form-data configuration for the API request.
   * @param apiPayload - The payload to send.
   * @param requestOptions - Options for the request.
   * @returns A Promise resolving to the multipart/form-data configuration object.
   */
  async buildFormDataConfig(
    apiPayload: Record<string, any>,
    requestOptions: RequestInit,
  ): Promise<IApiConfig> {
    Object.keys(this.formDataJsonFields).map((fieldName) => {
      const fieldValue = apiPayload[fieldName];
      if (fieldValue && typeof fieldValue !== "string") {
        apiPayload[fieldName] = JSON.stringify(fieldValue);
      }
    });

    const boundary = crypto.randomBytes(32).toString("hex");
    const formData = new MultipartStream(boundary);

    const tasks = await Promise.all(
      Object.keys(apiPayload).map(
        async (fieldName) =>
          await this.attachFormValue(
            formData,
            fieldName,
            apiPayload[fieldName],
            requestOptions.agent,
          ),
      ),
    );

    return {
      method: "POST",
      compress: true,
      headers: {
        "content-type": `multipart/form-data; boundary=${boundary}`,
        connection: "keep-alive",
      },
      body: formData,
      ...requestOptions,
    };
  }

  /**
   * Attaches a form value to the multipart/form-data.
   * @param form - The multipart form.
   * @param id - The field ID.
   * @param value - The value to attach.
   * @param agent - The request agent.
   */
  async attachFormValue(
    form: MultipartStream,
    id: string,
    value: any,
    agent: RequestInit["agent"],
  ) {
    if (!value) return;

    if (
      (typeof value === "string" && value.startsWith("https://")) ||
      typeof value === "boolean" ||
      typeof value === "number"
    ) {
      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: `${value}`,
      });
      return;
    }

    if (id === "thumb") {
      const attachmentId = crypto.randomBytes(16).toString("hex");
      await this.attachFormMedia(form, value, attachmentId, agent);
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
          await this.attachFormMedia(form, item.media, attachmentId, agent);
          return { ...item, media: `attach://${attachmentId}` };
        }),
      );

      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: JSON.stringify(attachments),
      });
      return;
    }

    await this.attachFormMedia(form, value, id, agent);
  }

  /**
   * Attaches media to the multipart/form-data.
   * @param form - The multipart form.
   * @param media - The media to attach.
   * @param id - The ID of the media.
   * @param agent - The request agent.
   */
  async attachFormMedia(
    form: MultipartStream,
    media: string | Buffer | ReadStream,
    id: string,
    agent: RequestInit["agent"],
  ) {
    const filename = `${id}.${this.extensions[id] || "text"}`;

    if (typeof media === "string") {
      if (await fileExists(media)) {
        media = fs.createReadStream(media);
      }
    }

    if (MultipartStream.isStream(media) || Buffer.isBuffer(media)) {
      await form.addPart({
        headers: {
          "content-disposition": `form-data; name="${id}"; filename="${filename}"`,
        },
        body: media,
      });
    }
  }
}

export { Media, IApiConfig };
