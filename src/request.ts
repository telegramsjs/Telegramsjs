import axios from "axios";
import querystring from "querystring";
import { EventEmitter } from "events";
import { TelegramApiError } from "./errorcollection";
import { Context } from "./Context";
import { Update, ResponseParameters } from "@telegram.ts/types";

type TelegramApiResponse = {
  ok?: boolean;
  error_code?: number;
  description?: string;
  result?: any;
  parameters?: ResponseParameters;
};

type AllowedUpdates = ReadonlyArray<Exclude<keyof Update, "update_id">>;

function reform(reformText: any) {
  const paramsType = typeof reformText;
  if (paramsType !== "object") return reformText;
  for (const key in reformText) {
    if (typeof reformText[key] === "object") {
      reformText[key] = JSON.stringify(reformText[key]);
    }
  }
  return reformText;
}

function hasProperties(obj: object | undefined): boolean {
  if (!obj) return false;
  return Object.keys(obj).length > 0;
}

/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
class Request extends EventEmitter {
  token: string;
  baseUrl: string;
  offset: number;
  allowed_updates?: AllowedUpdates;
  startTime: number = Date.now();
  update_id?: number;
  last_object?: Update;

  /**
   * Constructs a new Request object.
   * @param {string} token - The API token for the bot.
   * @param {AllowedUpdates} [allowed_updates=AllowedUpdates] - The types of updates the bot is interested in.
   */
  constructor(token: string, allowed_updates?: AllowedUpdates) {
    super();
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.offset = 0;
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
    const params: {
      offset: number;
      allowed_updates?: AllowedUpdates;
    } = {
      offset: this.offset,
      allowed_updates: this.allowed_updates ?? [],
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
  async request(method: string, params?: object): Promise<TelegramApiResponse> {
    const url = `${this.baseUrl}/${method}`;

    let paramsType: string | undefined;
    if (hasProperties(params)) {
      const reforms = reform(params);
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
