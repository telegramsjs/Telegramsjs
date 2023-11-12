/* This class is based on telegraf.js!  */
import * as fs from "node:fs";
import * as path from "node:path";
import * as https from "node:https";
import * as crypto from "node:crypto";
import { EventEmitter } from "node:events";
import fetch, { Response, RequestInit } from "node-fetch";
import { MultipartStream } from "./MultipartStream.js";
import { TelegramApiError, EventError } from "../error.js";
import {
  hasMedia,
  buildJSONConfig,
  buildFormDataConfig,
  MediaPayload,
} from "./ApiMedia.js";
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

export const defaultOptions = {
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

type AllowedUpdates = ReadonlyArray<Exclude<keyof Update, "update_id">>;

interface ApiOptions {
  apiRoot?: string;
  webhookReply?: boolean;
  agent?: https.Agent;
}

class ApiClient<F> extends EventEmitter {
  readonly token: string;
  private readonly options: ApiOptions;
  startTime: number = Date.now();
  update_id?: number;

  constructor(token: string, options: ApiOptions = defaultOptions) {
    super();
    this.token = token;
    this.options = options;
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
  async callApi(method: string, requestData: any = {}): Promise<any> {
    const defaultOptions = this.options;
    const authToken = this.token;

    const sanitizedData = Object.keys(requestData)
      .filter(
        (key) => requestData[key] !== undefined && requestData[key] !== null,
      )
      .reduce((acc, key) => ({ ...acc, [key]: requestData[key] }), {});

    if (!authToken) {
      throw new TelegramApiError(
        {
          error_code: 401,
          description: "Bot Token is required",
          ok: false,
        },
        "callApi",
      );
    }

    try {
      const config = hasMedia(sanitizedData)
        ? await buildFormDataConfig(
            { method, ...sanitizedData },
            defaultOptions.agent as https.Agent,
          )
        : await buildJSONConfig(sanitizedData);

      const apiUrl = `https://api.telegram.org/bot${authToken}/${method}`;
      config.agent = defaultOptions.agent;

      const response = await fetch(apiUrl, config as RequestInit);
      const text = await response.text();

      const responseData = safeJSONParse(text) || {
        error_code: 500,
        description: "Unsupported http response from Telegram",
        response: text,
      };

      if (!responseData.ok) {
        throw new TelegramApiError(responseData, method, requestData);
      }

      return responseData.result;
    } catch (error) {
      throw error;
    }
  }
}

export { ApiClient, ApiOptions, AllowedUpdates, MediaPayload };
