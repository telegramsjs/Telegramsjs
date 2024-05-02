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

interface IApiConfig {
  method: string;
  compress: boolean;
  headers: HeadersInit;
  body: MultipartStream | BodyInit;
  agent?: RequestInit["agent"];
}

async function fileExists(filePath: string) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

class Media {
  readonly extensions: Record<string, string> = {
    audio: "mp3",
    photo: "jpg",
    sticker: "webp",
    video: "mp4",
    animation: "mp4",
    video_note: "mp4",
    voice: "ogg",
  };

  readonly formDataJsonFields: string[] = [
    "results",
    "reply_markup",
    "mask_position",
    "shipping_options",
    "errors",
    "commands",
  ];

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
