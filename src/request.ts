import axios from "axios";
import querystring from "querystring";
import { EventEmitter } from "events";
import { Context } from "./context";
import { TelegramApiError, EventError } from "./error";
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
} from "@telegram.ts/types";

type TelegramApiResponse = {
  ok?: boolean;
  error_code?: number;
  description?: string;
  result?: any;
  parameters?: ResponseParameters;
};

type AllowedUpdates = ReadonlyArray<Exclude<keyof Update, "update_id">>;

type EventDataMap<F> = {
  update: Update;
  ready: UserFromGetMe;
  message: Message & Context<F>;
  "message:text": Message.TextMessage & Context<F>;
  edited_message: Message & Context<F>;
  edited_message_text: Message.TextMessage & Context<F>;
  edited_message_caption: Message.CaptionableMessage & Context<F>;
  channel_post: Message & Update.Channel & Context<F>;
  edited_channel_post: Message & Update.Edited & Update.Channel & Context<F>;
  edited_channel_post_text: Message.TextMessage &
    Update.Edited &
    Update.Channel &
    Context<F>;
  edited_channel_post_caption: Message.CaptionableMessage &
    Update.Edited &
    Update.Channel &
    Context<F>;
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
};

function reformObjectToString(reformText: any) {
  const paramsType = typeof reformText;
  if (paramsType !== "object") return reformText;
  for (const key in reformText) {
    if (typeof reformText[key] === "object") {
      reformText[key] = JSON.stringify(reformText[key]);
    }
  }
  return reformText;
}

function hasProperties(obj: object): boolean {
  if (typeof obj !== "object") return false;
  return Object.keys(obj).length > 0;
}

/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
class Request<F> extends EventEmitter {
  token: string;
  baseUrl: string;
  startTime: number = Date.now();
  update_id?: number;
  last_object?: Update;
  /** getUpdates **/
  offset: number;
  allowed_updates: AllowedUpdates;
  limit: number;
  timeout: number;

  /**
   * Constructs a new Request object.
   * @param {string} token - The API token for the bot.
   * @param {number} [options.limit=100] - Limits the number of updates to be retrieved. Values between 1-100 are accepted.
   * @param {number} [options.timeout=0] - Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only.
   * @param {AllowedUpdates} [options.allowed_updates=AllowedUpdates] - The types of updates the bot is interested in.
   */
  constructor(
    token: string,
    options: {
      limit?: number;
      timeout?: number;
      allowed_updates?: AllowedUpdates;
    },
  ) {
    super();
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.offset = 0;
    /** Options **/
    this.limit = options.limit ?? 100;
    this.timeout = options.timeout ?? 0;
    this.allowed_updates = options.allowed_updates ?? [];
  }

  on<T extends keyof EventDataMap<F>>(
    event: T,
    listener: (data: EventDataMap<F>[T]) => void,
  ): this;

  on(
    event: string | string[] | symbol,
    listener: (...args: any[]) => void,
  ): this {
    if (typeof event === "string") {
      super.on(event, listener);
      return this;
    } else if (Array.isArray(event)) {
      for (const name of event) {
        super.on(name, listener);
      }
      return this;
    } else if (typeof event === "symbol") {
      super.on(event, listener);
      return this;
    }
    throw new EventError(
      `Available types for the event parameter are: 'string', 'string[]', and 'symbol', but the provided type is: ${typeof event}`,
      event,
    );
  }

  /**
   * Gets the updates from the Telegram Bot API.
   * @async
   * @returns {Promise.<Array.<Update>>} An array of updates.
   * @throws {TelegramTokenError} When the token is invalid.
   * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
   */
  async getUpdates(): Promise<Update[]> {
    this.startTime = Date.now();
    const params = {
      offset: this.offset,
      limit: this.limit,
      timeout: this.timeout,
      allowed_updates: this.allowed_updates,
    };

    const response = await this.request("getUpdates", params);
    const updates = response.result;

    if (Array.isArray(updates) && updates.length > 0) {
      this.update_id = updates[0].update_id + 1;
      this.last_object = updates[0];
      this.offset = updates[updates.length - 1].update_id + 1;
    }

    if (updates.length > 0) {
      const res = updates[0];
      this.emit("update", res);
    }

    return Array.isArray(updates) ? updates : [];
  }

  /**
   * Makes a request to the Telegram Bot API.
   * @async
   * @param {string} method - The API method to call.
   * @param {object} params - The parameters to include in the API call.
   * @returns {Promise.<TelegramApiResponse>} The response from the API call.
   */
  async request(method: string, params = {}): Promise<TelegramApiResponse> {
    const url = `${this.baseUrl}/${method}`;

    let paramsType: string | undefined;
    if (hasProperties(params)) {
      const reforms = reformObjectToString(params);
      const formattedParams: Record<string, string> = reforms as Record<
        string,
        string
      >;
      paramsType = querystring.stringify(formattedParams);
    }

    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const response = await axios.post(url, paramsType, options);
      return response.data;
    } catch (error) {
      let telegramError = error as {
        response: {
          data: {
            error_code: number;
            description: string;
            ok: boolean;
            parameters?: ResponseParameters;
          };
        };
      };

      const dataRes = telegramError.response?.data;
      const codeError = dataRes?.error_code;
      if (codeError === 404) {
        dataRes.description = "Invalid token for Telegram bot";
      }

      throw new TelegramApiError(dataRes, method, params);
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
    const response = await this.request("getMe");
    const endTime = Date.now();
    const latency = endTime - startTime;
    return latency;
  }

  /**
   * Gets the last update ID received.
   * @returns {number|null} The last update ID, or null if not available.
   */
  get updateId(): number | null {
    return this.update_id ?? null;
  }

  /**
   * Gets the last object received.
   * @returns {Update} The last received object.
   */
  get lastObject(): Update | undefined {
    return this.last_object;
  }
}

export { AllowedUpdates, Request };
