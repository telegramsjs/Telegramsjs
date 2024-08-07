"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramClient = void 0;
const BaseClient_1 = require("./BaseClient");
const PollingClient_1 = require("./PollingClient");
const WebhookClient_1 = require("./WebhookClient");
const WorkerClient_1 = require("./WorkerClient");
const TelegramError_1 = require("../errors/TelegramError");
const Constants_1 = require("../util/Constants");
/**
 * Represents a Telegram client for interacting with the Telegram API.
 * @extends {BaseClient}
 */
class TelegramClient extends BaseClient_1.BaseClient {
    /**
     * Creates an instance of TelegramClient.
     * @param {string} authToken - The authentication token for the Telegram bot.
     * @param {ClientOptions} [options={}] - Optional client parameters.
     * @throws {TelegramError} If the authentication token is not specified.
     */
    constructor(authToken, options = {}) {
        super(authToken, { ...Constants_1.DefaultClientParameters, ...options });
        Object.defineProperty(this, "authToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: authToken
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        /**
         * The polling client for handling updates via long polling.
         */
        Object.defineProperty(this, "polling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The webhook client for handling updates via webhooks.
         */
        Object.defineProperty(this, "webhook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The worket client for handling updates.
         */
        Object.defineProperty(this, "worket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The timestamp when the client became ready.
         */
        Object.defineProperty(this, "readyTimestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        /**
         * The authenticated user associated with the client.
         */
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (!authToken) {
            throw new TelegramError_1.TelegramError("Specify a token to receive updates from Telegram");
        }
        this.polling = new PollingClient_1.PollingClient(this, options === null || options === void 0 ? void 0 : options.offset);
        this.webhook = new WebhookClient_1.WebhookClient(this);
        this.worket = new WorkerClient_1.WorketClient(this);
    }
    /**
     * Gets the client's uptime in milliseconds.
     * @returns The uptime in milliseconds, or null if the client is not ready.
     */
    get uptime() {
        return this.readyTimestamp && Date.now() - this.readyTimestamp;
    }
    /**
     * Logs in to the Telegram API using the specified options.
     * @param {ILoginOptions} [options={ polling: DefaultParameters }] - The login options.
     * @throws {TelegramError} If invalid options are provided.
     */
    async login(options = { polling: Constants_1.DefaultParameters }) {
        var _a, _b, _c;
        if ("polling" in options) {
            await this.polling.startPolling(options.polling);
            return;
        }
        if ("webhook" in options) {
            if (typeof ((_a = options.webhook) === null || _a === void 0 ? void 0 : _a.url) !== "string") {
                throw new TelegramError_1.TelegramError("You did not specify the 'url' parameter");
            }
            await this.setWebhook(options.webhook);
            await this.webhook.startWebhook((_b = options.webhook) === null || _b === void 0 ? void 0 : _b.path, (_c = options.webhook) === null || _c === void 0 ? void 0 : _c.secret_token, options.webhook);
            return;
        }
        throw new TelegramError_1.TelegramError("Invalid options");
    }
    /**
     * Destroys the client, closing all connections.
     */
    destroy() {
        this.polling.close();
        this.webhook.close();
        this.emit(Constants_1.Events.Disconnect, this);
    }
}
exports.TelegramClient = TelegramClient;
//# sourceMappingURL=TelegramClient.js.map