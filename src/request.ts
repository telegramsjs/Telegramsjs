import axios from "axios";
import * as querystring from "querystring";
import { TelegramApiError, IntentsError } from "./errorcollection";
import { EventEmitter } from "events";
import { decodeIntents, IntentsBitField } from "./IntentsBitField";
import { Collection } from "./collection/Collection";
import type { Update, GetUpdates } from "@telegram.ts/types";

type TelegramApiResponse = {
  error_code?: number;
  description?: string;
  ok?: boolean;
  result?: any;
};

const lastTimeMap = new Collection();

/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
export class Request extends EventEmitter {
  token: string;
  baseUrl: string;
  offset: number;
  queryString?: string;
  offSetType?: any;
  parseMode?: string;
  chatId?: number | string;
  intents?: readonly string[] | number[] | null;
  startTime: number = Date.now();
  update_id?: number;
  last_object?: Update;
  lastTimeMap: Collection<any, any>;

  /**
   * Constructs a new Request object.
   * @param {string} [token] - The API token for the bot.
   * @param {string[] | number[] | null} [intents] - The types of updates the bot is interested in.
   * @param {string} [queryString] - The type of query string to use for requests.
   * @param {string | boolean | object} [offSetType] - The type of offset to use for updates.
   * @param {string} [options.parseMode] - The parse mode for message formatting.
   */
  constructor(
    token: string,
    intents?: readonly string[] | number[] | null,
    queryString?: string | undefined,
    offSetType?: any,
    parseMode?: string
  ) {
    super();
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.offset = 0;
    this.queryString = queryString ?? "application/x-www-form-urlencoded";
    this.offSetType = offSetType ?? "time";
    this.parseMode = parseMode;

    if (this.offSetType == "time") {
      this.lastTimeMap = lastTimeMap as Collection<
        string | number | boolean,
        string | number | boolean | any[]
      >;
    } else if (this.offSetType instanceof Collection) {
      this.lastTimeMap = this.offSetType as Collection<any, any>;
    } else if (this.offSetType === false) {
      lastTimeMap.set("lastTime", true);
      this.lastTimeMap = lastTimeMap as Collection<
        string | number | boolean,
        string | number | boolean | any[]
      >;
    } else if (this.offSetType === "auto") {
      lastTimeMap.set("lastTime", "auto");
      this.lastTimeMap = lastTimeMap as Collection<
        string | number | boolean,
        string | number | boolean | any[]
      >;
    }

    if (this.offSetType === false || this.offSetType === "time") {
      setTimeout(() => {
        lastTimeMap.set("lastTime", true);
      }, 3000);
    }

    if (typeof intents === "number") {
      this.intents = decodeIntents(new IntentsBitField(intents));
    } else if (Array.isArray(intents) && intents.length > 0) {
      this.intents = intents;
    } else if (intents && typeof intents === "object") {
      this.intents = decodeIntents(new IntentsBitField(intents[0] as number));
    } else {
      this.intents = null;
    }

    this.lastTimeMap = lastTimeMap as Collection<
      string | number | boolean,
      string | number | boolean | any[]
    >;
  }

  /**
   * Gets the updates from the Telegram Bot API.
   * @async
   * @returns {Promise.<Array.<object>>} An array of updates.
   * @throws {TelegramTokenError} When the token is invalid.
   * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
   */
  async getUpdates(): Promise<Update[]> {
    this.startTime = Date.now();
    const params: Record<
      string,
      | string
      | number
      | boolean
      | readonly string[]
      | readonly number[]
      | readonly boolean[]
      | null
    > = {
      offset: this.offset,
      allowed_updates: this.intents as
        | readonly string[]
        | readonly number[]
        | readonly boolean[]
        | null,
    };

    const response = await this.request("getUpdates", params);
    const updates = response.result;

    if (Array.isArray(updates) && updates.length > 0) {
      this.update_id = updates[0].update_id + 1;
      this.last_object = updates[0];
      this.offset = updates[updates.length - 1].update_id + 1;
    }

    return Array.isArray(updates) ? updates : [];
  }

  /**
   * Makes a request to the Telegram Bot API.
   * @async
   * @param {string} method - The API method to call.
   * @param {object} params - The parameters to include in the API call.
   * @returns {Promise.<Update>} The response from the API call.
   */
  async request(
    method: string,
    params?: Record<
      string,
      | string
      | number
      | boolean
      | readonly string[]
      | readonly number[]
      | readonly boolean[]
      | null
    >
  ): Promise<TelegramApiResponse> {
    const url = `${this.baseUrl}/${method}`;
    const data = querystring.stringify(params);

    const options = {
      headers: {
        "Content-Type": this.queryString,
        "Content-Length": data.length.toString(),
      },
    };

    try {
      const response = await axios.post(url, data, options);
      return response.data;
    } catch (error) {
      let telegramError = error as {
        response: {
          data: {
            error_code: number;
            description: string;
            ok: boolean;
          };
        };
      };
      telegramError.response.data.error_code === 404
        ? (telegramError.response.data.description =
            "invalid token of telegrams bot")
        : telegramError.response.data.description;
      throw new TelegramApiError(telegramError.response.data, method);
    }

    return {};
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
   * @returns {number | undefined} The ping latency in milliseconds.
   */
  async ping(): Promise<number> {
    const startTime = Date.now();
    const response = await this.request("getMe", {});
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

  /**
   * Set the token for the bot.
   * @param {string} token - The token to set.
   * @returns {boolean} - Returns true if the token was set successfully.
   */
  setToken(token: string): boolean {
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    return true;
  }

  /**
   * Set the intents for the bot.
   * @param {string[] | number[] | null} intents - The intents to set.
   * @returns {boolean} - Returns true if the intents were set successfully.
   */
  setIntents(intents: string[] | number[]): boolean {
    this.intents = intents;
    return true;
  }

  /**
   * Set the parse mode for the bot.
   * @param {string | undefined} parseMode - The parse mode to set.
   * @returns {boolean} - Returns true if the parse mode was set successfully.
   */
  setParseMode(parseMode: string): boolean {
    this.parseMode = parseMode;
    return true;
  }

  /**
   * Set the chat ID for the bot.
   * @param {string | number } chatId - The chat ID to set.
   * @returns {boolean} - Returns the chat ID that was set.
   */
  setChatId(chatId: string | number): boolean {
    this.chatId = chatId;
    return true;
  }

  /**
   * Set the query string for the bot.
   * @param {string} queryString - The query string to set.
   * @returns {boolean} - Returns true if the query string was set successfully.
   */
  setQueryString(queryString: string): boolean {
    this.queryString = queryString;
    return true;
  }

  /**
   * Set the offset type for the bot.
   * @param {any} offSetType - The offset type to set.
   * @returns {any} - Returns the offset type that was set.
   */
  setOffSetType(offSetType: any): any {
    this.offSetType = offSetType ?? "time";
    return this.offSetType;
  }
}
