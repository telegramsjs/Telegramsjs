"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookClient = void 0;
const node_https_1 = require("node:https");
// @ts-ignore
const safe_compare_1 = require("safe-compare");
const Constants_1 = require("../util/Constants");
const TelegramError_1 = require("../errors/TelegramError");
const node_http_1 = require("node:http");
/**
 * Represents a client for handling Telegram updates using webhooks.
 */
class WebhookClient {
    /**
     * Creates an instance of WebhookClient.
     * @param client - The Telegram client instance.
     */
    constructor(client) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        /**
         * The offset used to keep track of the latest updates.
         */
        Object.defineProperty(this, "offset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The HTTP or HTTPS server for handling webhook requests.
         */
        Object.defineProperty(this, "webhookServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Filters incoming webhook requests to verify their authenticity.
         * @param request - The incoming request.
         * @param options - The options for filtering the request.
         * @returns Whether the request is valid.
         */
        Object.defineProperty(this, "webhookFilter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (request, options) => {
                if ((0, safe_compare_1.default)(options.path, request.url)) {
                    if (!options.secretToken) {
                        return true;
                    }
                    else {
                        const token = request.headers["x-telegram-bot-api-secret-token"];
                        if ((0, safe_compare_1.default)(options.secretToken, token)) {
                            return true;
                        }
                    }
                }
                return false;
            }
        });
        this.offset = 0;
    }
    /**
     * Starts the webhook server to receive updates from Telegram.
     * @param path - The path for the webhook endpoint.
     * @param secretToken - The secret token for verifying webhook requests.
     * @param options - The options for the webhook server.
     */
    async startWebhook(path = "/", secretToken = "", options = {}) {
        await this.client.getMe().then((me) => {
            this.client.user = me;
            this.client.readyTimestamp = Date.now();
            this.client.emit(Constants_1.Events.Ready, this.client);
        });
        const { tlsOptions, port, host, requestCallback } = options;
        const webhookCallback = await this.createWebhookCallback(requestCallback, {
            path,
            secretToken,
        });
        const serverOptions = tlsOptions != null ? tlsOptions : {};
        this.webhookServer =
            tlsOptions != null
                ? node_https_1.default.createServer(serverOptions, webhookCallback)
                : node_http_1.default.createServer(webhookCallback);
        if (!this.webhookServer) {
            throw new TelegramError_1.TelegramError("Failed to create webhook server");
        }
        this.webhookServer.listen(port, host);
    }
    /**
     * Creates a callback function for handling webhook requests.
     * @param requestCallback - The callback function to handle requests.
     * @param {{ path?: string; secretToken?: string }} [options={}] - The options for creating the webhook callback.
     * @returns The created callback function.
     */
    async createWebhookCallback(requestCallback, { path, secretToken } = {}) {
        const callback = async (request, response) => {
            if (!this.webhookFilter(request, {
                path: path || "/",
                secretToken: secretToken || "",
                token: this.client.authToken,
            })) {
                response.statusCode = 403;
                response.end();
                return;
            }
            let update;
            try {
                if (request.body != null) {
                    let body = request.body;
                    if (body instanceof Buffer)
                        body = String(request.body);
                    if (typeof body === "string")
                        body = JSON.parse(body);
                    update = body;
                }
                else {
                    let body = "";
                    for await (const chunk of request)
                        body += String(chunk);
                    update = JSON.parse(body);
                }
            }
            catch (err) {
                response.writeHead(415).end();
                return;
            }
            if (update) {
                this.offset = update.update_id + 1;
            }
            const res = await this.client.worket.processUpdate(update);
            if (res) {
                this.client.updates.set(this.offset, res);
            }
        };
        return requestCallback
            ? (request, response) => callback(request, response)
            : callback;
    }
    /**
     * Closes the webhook server.
     */
    close() {
        var _a;
        (_a = this.webhookServer) === null || _a === void 0 ? void 0 : _a.close();
    }
}
exports.WebhookClient = WebhookClient;
//# sourceMappingURL=WebhookClient.js.map