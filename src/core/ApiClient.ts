/* This class is based on telegraf.js!  */
import * as fs from "node:fs";
import * as path from "node:path";
import * as https from "node:https";
import * as crypto from "node:crypto";
import { EventEmitter } from "node:events";
import fetch, { Response } from "node-fetch";
import { MultipartStream } from "./MultipartStream.js";
import { TelegramApiError, EventError } from "../error.js";
import { Context } from "../context.js";
import {
  Update,
  ResponseParameters,
  UserFromGetMe,
  Message,
  CallbackQuery,
  InlineQuery,
  ShippingQuery,
  PreCheckoutQuery,
  Poll,
  PollAnswer,
  ChatMemberUpdated,
  ChatJoinRequest,
  MessageEntity,
} from "@telegram.ts/types";

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
  agent?: any;
}

const DEFAULT_EXTENSIONS: { [key: string]: string } = {
  audio: "mp3",
  photo: "jpg",
  sticker: "webp",
  video: "mp4",
  animation: "mp4",
  video_note: "mp4",
  voice: "ogg",
};

const DEFAULT_OPTIONS = {
  apiRoot: "https://api.telegram.org",
  webhookReply: false,
  agent: new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000,
  }),
};

/**
 * Safely parse a JSON string, handling potential parsing errors.
 * @param {string} text - The JSON string to be parsed.
 * @returns {any} - The parsed JSON object or undefined if parsing fails.
 */
function safeJSONParse(text: string): any {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("JSON parse failed", err);
  }
}

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
  return Promise.resolve({
    method: "POST",
    compress: true,
    headers: { "content-type": "application/json", connection: "keep-alive" },
    body: JSON.stringify(payload),
  });
}

const FORM_DATA_JSON_FIELDS = [
  "results",
  "reply_markup",
  "mask_position",
  "shipping_options",
  "errors",
  "commands",
];

/**
 * Build a configuration object for making a POST request with multipart/form-data content type.
 * @param {ApiPayload} payload - The payload containing data for the API call.
 * @param {https.Agent} agent - The HTTPS agent for making requests.
 * @returns {Promise<ApiConfig>} - A Promise that resolves with the configuration for the API request.
 */
function buildFormDataConfig(
  payload: ApiPayload,
  agent: https.Agent,
): Promise<ApiConfig> {
  for (const field of FORM_DATA_JSON_FIELDS) {
    if (field in payload && typeof payload[field] !== "string") {
      payload[field] = JSON.stringify(payload[field]);
    }
  }
  const boundary = crypto.randomBytes(32).toString("hex");
  const formData = new MultipartStream(boundary);
  const tasks = Object.keys(payload).map((key) =>
    attachFormValue(formData, key, payload[key], agent),
  );
  return Promise.all(tasks).then(() => {
    return {
      method: "POST",
      compress: true,
      headers: {
        "content-type": `multipart/form-data; boundary=${boundary}`,
        connection: "keep-alive",
      },
      body: formData,
    };
  });
}

/**
 * Attach a form value to a multipart form based on its type and structure.
 * @param {MultipartStream} form - The multipart form to which the value will be attached.
 * @param {string} id - The identifier for the form value.
 * @param {*} value - The value to be attached to the form.
 * @param {https.Agent} agent - The HTTPS agent for making requests.
 * @returns {Promise<void>} - A Promise that resolves once the value is attached to the form.
 */
function attachFormValue(
  form: MultipartStream,
  id: string,
  value: any,
  agent: https.Agent,
): Promise<void> {
  if (!value) {
    return Promise.resolve();
  }
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
    return Promise.resolve();
  }
  if (id === "thumb") {
    const attachmentId = crypto.randomBytes(16).toString("hex");
    return attachFormMedia(form, value, attachmentId, agent).then(() =>
      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: `attach://${attachmentId}`,
      }),
    );
  }
  if (Array.isArray(value)) {
    return Promise.all(
      value.map((item) => {
        if (typeof item.media !== "object") {
          return Promise.resolve(item);
        }
        const attachmentId = crypto.randomBytes(16).toString("hex");
        return attachFormMedia(form, item.media, attachmentId, agent).then(
          () => ({ ...item, media: `attach://${attachmentId}` }),
        );
      }),
    ).then((items) =>
      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: JSON.stringify(items),
      }),
    );
  }
  if (typeof value.media !== "undefined" && typeof value.type !== "undefined") {
    const attachmentId = crypto.randomBytes(16).toString("hex");
    return attachFormMedia(form, value.media, attachmentId, agent).then(() =>
      form.addPart({
        headers: { "content-disposition": `form-data; name="${id}"` },
        body: JSON.stringify({
          ...value,
          media: `attach://${attachmentId}`,
        }),
      }),
    );
  }
  return attachFormMedia(form, value, id, agent);
}

/**
 * Attaches media to a multipart form.
 * @param {MultipartStream} form - The multipart form to which media is attached.
 * @param {MediaPayload} media - The media payload containing information about the media.
 * @param {string} id - The identifier for the media attachment.
 * @param {https.Agent} agent - The HTTPS agent for making requests.
 * @returns {Promise<void>} - A Promise that resolves once the media is attached to the form.
 */
function attachFormMedia(
  form: MultipartStream,
  media: MediaPayload,
  id: string,
  agent: https.Agent,
): Promise<void> {
  let fileName = media.filename || `${id}.${DEFAULT_EXTENSIONS[id] || "dat"}`;
  if (media.url) {
    return fetch(media.url, { agent }).then((res) =>
      form.addPart({
        headers: {
          "content-disposition": `form-data; name="${id}"; filename="${fileName}"`,
        },
        body: res.body as fs.ReadStream,
      }),
    );
  }
  if (media.source) {
    if (fs.existsSync(media.source as string)) {
      fileName = media.filename || path.basename(media.source as string);
      media.source = fs.createReadStream(
        media.source as string,
      ) as fs.ReadStream;
    }
    if (isStream(media.source) || Buffer.isBuffer(media.source)) {
      form.addPart({
        headers: {
          "content-disposition": `form-data; name="${id}"; filename="${fileName}"`,
        },
        body: media.source,
      });
    }
  }
  return Promise.resolve();
}

interface CaptionableMessage {
  caption: string;
  caption_entities?: MessageEntity[];
}

interface EventDataMap<F> {
  update: Update;
  ready: UserFromGetMe;
  message: Message & Context<F>;
  "message:text": Message.TextMessage & Context<F>;
  "message:caption": Message & CaptionableMessage & Context<F>;
  edited_message: Message & Update.Edited & Context<F>;
  "edited_message:text": Message.TextMessage & Update.Edited & Context<F>;
  "edited_message:caption": Message &
    CaptionableMessage &
    Update.Edited &
    Context<F>;
  channel_post: Message & Update.Channel & Context<F>;
  "channel_post:text": Message.TextMessage & Update.Channel & Context<F>;
  "channel_post:caption": Message &
    CaptionableMessage &
    Update.Channel &
    Context<F>;
  edited_channel_post: Message & Update.Edited & Update.Channel;
  "edited_channel_post:text": Message.TextMessage &
    Update.Edited &
    Update.Channel;
  "edited_channel_post:caption": Message &
    CaptionableMessage &
    Update.Edited &
    Update.Channel;
  inline_query: InlineQuery & Context<F>;
  callback_query: CallbackQuery & Context<F>;
  "callback_query:data": CallbackQuery & { data: string } & Context<F>;
  "callback_query:game_short_name": CallbackQuery & {
    game_short_name: string;
  } & Context<F>;
  shipping_query: ShippingQuery & Context<F>;
  pre_checkout_query: PreCheckoutQuery & Context<F>;
  poll: Poll & Context<F>;
  poll_answer: PollAnswer & Context<F>;
  chat_member: ChatMemberUpdated & Context<F>;
  my_chat_member: ChatMemberUpdated & Context<F>;
  chat_join_request: ChatJoinRequest & Context<F>;
}

export type AllowedUpdates = ReadonlyArray<Exclude<keyof Update, "update_id">>;

class ApiClient<F> extends EventEmitter {
  readonly token: string;
  private readonly options: {
    apiRoot: string;
    webhookReply: boolean;
    agent: any;
  };
  startTime: number = Date.now();
  update_id?: number;

  constructor(token: string, options?: any) {
    super();
    this.token = token;
    this.options = DEFAULT_OPTIONS;
  }

  /**
   * Register event listeners for the bot.
   * ```ts
   * bot.on("ready", client => {
   *  console.log(`Starting ${client.username}`);
   * });
   *
   * bot.on("message", message => {
   *  message.reply(`Hello ${message.first_name}`);
   * });
   * ```
   * @param event The event or an array of events to listen for.
   * @param listener The callback function to be executed when the event(s) occur.
   * @returns This instance of the bot for method chaining.
   */
  on<T extends keyof EventDataMap<F>>(
    event: T,
    listener: (data: EventDataMap<F>[T]) => void,
  ): this;

  /**
   * Register event listeners for an array of events for the bot.
   * ```ts
   * bot.on(["message:text", "message:caption"], (ctx) => {
   *  ctx.send("This handler is broken, it fires on 'text" and 'caption'");
   * });
   * ```
   * @param event An array of events to listen for.
   * @param listener The callback function to be executed when the events occur.
   * @returns This instance of the bot for method chaining.
   */
  on<T extends keyof EventDataMap<F>>(
    event: T[],
    listener: (data: EventDataMap<F>[T]) => void,
  ): this;

  /**
   * Register event listeners for either a single event, an array of events, or a generic event.
   * @param {string | string[]} event The event(s) to listen for, either as a single event, an array of events, or a string.
   * @param {(...args: any[]) => void} listener The callback function to be executed when the event(s) occur.
   * @returns This instance of the bot for method chaining.
   */
  on(
    event: keyof EventDataMap<F> | (keyof EventDataMap<F>)[],
    listener: (...args: any[]) => void,
  ): this {
    if (typeof event === "string") {
      super.on(event, listener);
      return this;
    } else if (Array.isArray(event)) {
      for (const name of event) {
        if (typeof name !== "string") {
          throw new EventError(
            `In the array, you only need to specify the 'string' type and this type: ${typeof name}`,
            name,
          );
        }
        super.on(name, listener);
      }
      return this;
    } else {
      throw new EventError(
        `Available types for the event parameter are: 'string' and 'string[]', but the provided type is: ${typeof event}`,
        event,
      );
    }
  }

  /**
   * Gets the uptime of the bot.
   * @returns {number} The uptime in milliseconds.
   */
  get uptime(): number {
    const uptime = Date.now() - this.startTime;
    return uptime;
  }

  /**
   * Gets the ping latency of the bot.
   * @async
   * @returns {Promise.<number>} The ping latency in milliseconds.
   */
  async ping(): Promise<number> {
    const startTime = Date.now();
    const response = await this.callApi("getMe");
    const endTime = Date.now();
    const latency = endTime - startTime;
    return latency;
  }

  /**
   * Makes a request to the Telegram API.
   * @param {string} method - The API method to be called.
   * @param {ApiPayload} data - The payload containing data for the API call.
   * @returns {Promise<any>} - A Promise that resolves with the API response.
   * @throws {TelegramApiError} - Throws an error if the bot token is missing or the API response is not successful.
   */
  callApi(method: string, data: any = {}): Promise<any> {
    const options = this.options;
    const defaultOptions = DEFAULT_OPTIONS;
    const token = this.token;

    const payload = Object.keys(data)
      .filter((key) => typeof data[key] !== "undefined" && data[key] !== null)
      .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});

    if (!token) {
      throw new TelegramApiError(
        {
          error_code: 401,
          description: "Bot Token is required",
          ok: false,
        },
        "callApi",
      );
    }

    const buildConfig = hasMedia(payload)
      ? buildFormDataConfig({ method, ...payload }, options.agent)
      : buildJSONConfig(payload);
    return buildConfig
      .then((config) => {
        const apiUrl = `https://api.telegram.org/bot${token}/${method}`;
        config.agent = options.agent;
        return fetch(apiUrl, config);
      })
      .then((res) => res.text())
      .then((text) => {
        return (
          safeJSONParse(text) || {
            error_code: 500,
            description: "Unsupported http response from Telegram",
            response: text,
          }
        );
      })
      .then((data) => {
        if (!data.ok) {
          throw new TelegramApiError(data, method);
        }
        return data.result;
      });
  }
}

export default ApiClient;
