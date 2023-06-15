import * as https from "https";
import * as querystring from "querystring";
import {
	TelegramApiError,
	TelegramTokenError,
	IntentsError,
} from "./errorcollection";
import { EventEmitter } from "events";
import { decodeIntents, IntentsBitField } from "./IntentsBitField";
import { Collection } from "./collection/Collection";

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
	last_object?: object;
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
		parseMode?: string,
	) {
		super();
		this.token = token;
		this.baseUrl = `https://api.telegram.org/bot${this.token}`;
		this.offset = 0;
		this.queryString = queryString ?? "application/x-www-form-urlencoded";
		this.offSetType = offSetType ?? "time";
		this.parseMode = parseMode;

		if (this.offSetType == "time") {
			this.lastTimeMap = lastTimeMap as Collection<any, any>;
		} else if (this.offSetType instanceof Collection) {
			this.lastTimeMap = this.offSetType as Collection<any, any>;
		} else if (this.offSetType === false) {
			lastTimeMap.set("lastTime", true);
			this.lastTimeMap = lastTimeMap as Collection<any, any>;
		} else if (this.offSetType === "auto") {
			lastTimeMap.set("lastTime", "auto");
			this.lastTimeMap = lastTimeMap as Collection<any, any>;
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

		this.lastTimeMap = lastTimeMap as Collection<any, any>;
	}

	/**
	 * Gets the updates from the Telegram Bot API.
	 * @async
	 * @returns {Promise.<Array.<object>>} An array of updates.
	 * @throws {TelegramTokenError} When the token is invalid.
	 * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
	 */
	async getUpdates(): Promise<object[]> {
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
		const response: any = await this.request("getUpdates", params);
		const updates = response.result;

		if (Array.isArray(updates) && updates.length > 0) {
			this.update_id = updates[0].update_id + 1;
			this.last_object = updates[0];
			this.offset = updates[updates.length - 1].update_id + 1;
		}

		if (response?.error_code === 401) {
			throw new TelegramTokenError("invalid token of telegrams bot");
		} else if (response?.error_code !== undefined) {
			throw new TelegramApiError(response.description);
		}

		return updates ?? [];
	}

	/**
	 * Makes a request to the Telegram Bot API.
	 * @async
	 * @param {string} method - The API method to call.
	 * @param {object} params - The parameters to include in the API call.
	 * @returns {Promise.<object>} The response from the API call.
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
		>,
	): Promise<object> {
		const url = `${this.baseUrl}/${method}`;
		const data = querystring.stringify(params);

		return new Promise((resolve, reject) => {
			const options: https.RequestOptions = {
				method: "POST",
				headers: {
					"Content-Type": this.queryString,
					"Content-Length": data.length.toString(),
				},
			};

			const req = https.request(url, options, res => {
				let response = "";

				res.on("data", chunk => {
					response += chunk;
				});

				res.on("end", () => {
					try {
						resolve(JSON.parse(response));
					} catch (error) {
						reject(error);
					}
				});
			});

			req.on("error", error => {
				reject(error);
			});

			req.write(data);
			req.end();
		});
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
	async ping(): Promise<number | undefined> {
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
	 * @returns {object} The last received object.
	 */
	get lastObject(): object | undefined {
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
	setIntents(intents: string[] | number[] | null = null): boolean {
		this.intents = intents;
		return true;
	}

	/**
	 * Set the parse mode for the bot.
	 * @param {string | undefined} parseMode - The parse mode to set.
	 * @returns {boolean} - Returns true if the parse mode was set successfully.
	 */
	setParseMode(parseMode: string | undefined): boolean {
		this.parseMode = parseMode;
		return true;
	}

	/**
	 * Set the chat ID for the bot.
	 * @param {string | number } chatId - The chat ID to set.
	 * @returns {string | number} - Returns the chat ID that was set.
	 */
	setChatId(chatId: string | number): string | number {
		this.chatId = chatId;
		return chatId;
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
	 * @param {string | boolean | object | undefined} offSetType - The offset type to set.
	 * @returns {string} - Returns the offset type that was set.
	 */
	setOffSetType(offSetType: string | boolean | object | undefined): string {
		this.offSetType = offSetType ?? "time";
		return this.offSetType;
	}
}
