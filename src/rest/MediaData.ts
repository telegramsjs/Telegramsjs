import path from "node:path";
import { Agent } from "node:https";
import { Buffer } from "node:buffer";
import { randomBytes } from "node:crypto";
import fs, { ReadStream } from "node:fs";
import fetch, {
  type RequestInit,
  type BodyInit,
  type HeadersInit,
} from "node-fetch";
import { MultipartStream } from "./MultipartStream";
import { ErrorCodes } from "../errors/ErrorCodes";
import { TelegramError } from "../errors/TelegramError";

/**
 * Interface representing the configuration for an API request.
 */
interface IApiConfig {
  method: string;
  compress: boolean;
  headers: HeadersInit;
  body: MultipartStream | BodyInit;
  agent?: RequestInit["agent"];
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * A class for handling media data and preparing configuration for API requests.
 */
class MediaData {
  /**
   * Mapping of media type extensions.
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
   * Fields in the form data that should be JSON-encoded.
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
   * Parameters that can contain media data.
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
    "certificate",
  ];

  /**
   * Checks if the given value is a media-related object.
   * This function determines if the provided value is an object associated with media data types such as Buffer, ArrayBuffer, Blob, FormData, Uint8Array, or DataView.
   *
   * @param value - The value to check.
   * @returns `true` if the value is a media-related object; otherwise, `false`.
   */
  isMediaType(value: any): boolean {
    return Boolean(
      typeof value === "object" &&
<<<<<<< HEAD
        value !== null &&
        value.constructor &&
        (value instanceof Buffer ||
          value instanceof ReadStream ||
          value instanceof ArrayBuffer ||
          ArrayBuffer.isView(value) ||
          value instanceof Blob ||
          value instanceof FormData ||
          value instanceof Uint8Array ||
          value instanceof DataView ||
          this.isMediaType(value.source)),
=======
      value !== null &&
      value.constructor &&
      (value instanceof Buffer ||
        value instanceof ReadStream ||
        value instanceof ArrayBuffer ||
        ArrayBuffer.isView(value) ||
        value instanceof Blob ||
        value instanceof FormData ||
        value instanceof Uint8Array ||
        value instanceof DataView ||
        this.isMediaType(value.source)),
>>>>>>> v4
    );
  }

  /**
   * Checks if the payload contains media data.
   * @param payload - The data to check.
   * @returns `true` if media is found, otherwise `false`.
   */
  hasMedia(payload: Record<string, any>): boolean {
    return Object.keys(payload).some((key): boolean => {
      if (this.sourceParametersMedia.includes(key)) {
        return true;
      }
      if (Array.isArray(payload[key])) {
        return payload[key].some(
          (item: Record<string, any>): boolean =>
            typeof item === "object" && this.hasMedia(item),
        );
      }
      return false;
    });
  }

  /**
   * Builds the configuration for a JSON request.
   * @param payload - The data to be sent in the request.
   * @param requestOptions - Additional options for the request.
   * @returns The configuration for the request.
   */
  buildJSONConfig(
    payload: Record<string, any>,
    requestOptions: RequestInit = {},
  ): IApiConfig {
    return {
      method: requestOptions.method ?? "POST",
      compress: requestOptions.compress ?? true,
      headers: requestOptions.headers ?? {
        "content-type": "application/json",
        "connection": "keep-alive",
      },
      body: JSON.stringify(payload) as BodyInit,
      agent:
        requestOptions.agent ??
        new Agent({
          keepAlive: true,
          keepAliveMsecs: 10000,
        }),
    };
  }

  /**
   * Builds the configuration for a form-data request.
   * @param apiPayload - The data to be sent in the request.
   * @param requestOptions - Additional options for the request.
   * @returns The configuration for the request.
   */
  async buildFormDataConfig(
    apiPayload: Record<string, any>,
    requestOptions: RequestInit = {},
  ): Promise<IApiConfig> {
    Object.values(this.formDataJsonFields).map((fieldName) => {
      const fieldValue = apiPayload[fieldName];
      if (fieldValue && typeof fieldValue !== "string") {
        apiPayload[fieldName] = JSON.stringify(fieldValue);
      }
    });

    const boundary = randomBytes(32).toString("hex");
    const formData = new MultipartStream(boundary);

    await Promise.all(
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
      method: requestOptions.method ?? "POST",
      compress: requestOptions.compress ?? true,
      headers: requestOptions.headers ?? {
        "content-type": `multipart/form-data; boundary=${boundary}`,
        "connection": "keep-alive",
      },
      body: formData as MultipartStream,
      agent:
        requestOptions.agent ??
        new Agent({
          keepAlive: true,
          keepAliveMsecs: 10000,
        }),
    };
  }

  /**
   * Attaches a value to the form data.
   * @param form - The form to which the value should be attached.
   * @param id - The name of the form field.
   * @param value - The value to attach to the form.
   * @param agent - The agent to use for fetching external resources.
   */
  async attachFormValue(
    form: MultipartStream,
    id: string,
    value: any,
    agent: RequestInit["agent"],
  ): Promise<void> {
    if (!value) return;

    if (typeof value === "string") {
      if (await fileExists(value)) {
        await this.attachFormMedia(form, value, { id });
        return;
      } else if (id === "thumbnail" && value.startsWith("http")) {
        const attachmentId = randomBytes(16).toString("hex");
        const response = await fetch(value, { agent });
        value = Buffer.from(await response.arrayBuffer());

        await this.attachFormMedia(form, value, { id: attachmentId });
        form.addPart({
          headers: { "content-disposition": `form-data; name="${id}"` },
          body: `attach://${attachmentId}`,
        });
        return;
      } else {
        form.addPart({
          headers: { "content-disposition": `form-data; name="${id}"` },
          body: String(value),
        });
        return;
      }
    }

    if (typeof value === "object" && value !== null && "source" in value) {
      await this.attachFormMedia(form, value.source.media, {
        id,
        ...("filename" in (value.source || {}) && {
          filename: value.source.filename,
        }),
      });
      return;
    }

    if (typeof value === "boolean" || typeof value === "number") {
      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: String(value),
      });
      return;
    }

    if (id === "thumbnail") {
      const attachmentId = randomBytes(16).toString("hex");

      await this.attachFormMedia(form, value, { id: attachmentId });
      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: `attach://${attachmentId}`,
      });
      return;
    }

    if (id === "cover") {
      const attachmentId = randomBytes(16).toString("hex");

      await this.attachFormMedia(form, value, { id: attachmentId });
      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: `attach://${attachmentId}`,
      });
      return;
    }

    if (Array.isArray(value)) {
      const attachments = await Promise.all(
        value.map(async (item) => {
          const media = item.media?.source ? item.media.source : item;
          if (!this.isMediaType(media.media)) {
            if (!(await fileExists(media.media))) {
              return media;
            }
          }
          const attachmentId = randomBytes(16).toString("hex");

          await this.attachFormMedia(form, media.media, {
            id: attachmentId,
            ...(typeof media.media === "object" &&
              "filename" in (media.media || {}) && {
                filename: media.media.filename,
              }),
          });

          if (item.media.source) {
            return { type: item.type, media: `attach://${attachmentId}` };
          }

          return { ...media, media: `attach://${attachmentId}` };
        }),
      );

      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: JSON.stringify(attachments),
      });
      return;
    }

    if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
      const buffer = ArrayBuffer.isView(value)
        ? Buffer.from(value.buffer, value.byteOffset, value.byteLength)
        : Buffer.from(value);
      await this.attachFormMedia(form, buffer, { id });
      return;
    }

    if (value instanceof Blob) {
      const buffer = Buffer.from(await value.arrayBuffer());
      await this.attachFormMedia(form, buffer, { id });
      return;
    }

    if (value instanceof FormData) {
      const formThis = form;
      for (const [formKey, formValue] of value.entries()) {
        await this.attachFormValue(formThis, formKey, formValue, agent);
      }
      return;
    }

    if (value instanceof Uint8Array || value instanceof DataView) {
      await this.attachFormMedia(form, Buffer.from(value.buffer), { id });
      return;
    }

    await this.attachFormMedia(form, value, { id });
  }

  /**
   * Attaches media to the form data.
   * @param form - The form to which the media should be attached.
   * @param media - The media to attach, can be a string path, buffer, or read stream.
   * @param id - The name of the form field.
   */
  async attachFormMedia(
    form: MultipartStream,
    media: string | Buffer | ReadStream,
    options: { id: string; filename?: string },
  ): Promise<void> {
    let filename = null;

    if (options.filename) {
      filename = options.filename;
    } else if (options.id) {
      if (typeof media === "string") {
        filename = media;
      } else {
        filename = `${options.id}.${this.extensions[options.id] || path.parse(`${media}`).ext || "txt"}`;
      }
    }

    if (!filename) {
      throw new TelegramError(ErrorCodes.InvalidFileName);
    }

    if (typeof media === "string") {
      if (await fileExists(media)) {
        media = fs.createReadStream(media);
      }
    }

    if (MultipartStream.isStream(media) || Buffer.isBuffer(media)) {
      await form.addPart({
        headers: {
          "content-disposition": `form-data; name="${options.id}"; filename="${filename}"`,
        },
        body: media,
      });
    }
  }
}

export { MediaData, type IApiConfig };
