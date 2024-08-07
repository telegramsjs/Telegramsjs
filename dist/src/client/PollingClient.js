"use strict";
var _PollingClient_isClosed;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollingClient = void 0;
const tslib_1 = require("tslib");
const Constants_1 = require("../util/Constants");
/**
 * Represents a client for handling Telegram updates using long polling.
 */
class PollingClient {
    /**
     * Creates an instance of PollingClient.
     * @param client - The Telegram client instance.
     * @param offset - The initial offset for polling.
     */
    constructor(client, offset) {
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
         * Indicates whether the polling client is closed.
         */
        _PollingClient_isClosed.set(this, false);
        this.offset = offset || 0;
    }
    /**
     * Starts the polling process to receive updates from Telegram.
     * @param options - The polling options.
     */
    async startPolling(options = {}) {
        await this.client.getMe().then((res) => {
            this.client.user = res;
            this.client.readyTimestamp = Date.now();
            this.client.emit(Constants_1.Events.Ready, this.client);
        });
        await this.poll(options);
    }
    /**
     * Polls for new updates from Telegram.
     * @param options - The polling options.
     */
    async poll(options) {
        try {
            const response = await this.client.getUpdates({
                ...options,
                offset: this.offset,
            });
            if (response.length > 0) {
                const lastItem = response[response.length - 1];
                if (lastItem) {
                    this.offset = lastItem.update_id + 1;
                }
            }
            for (const data of response) {
                const update = await this.client.worket.processUpdate(data);
                if (update) {
                    this.client.updates.set(this.offset, update);
                }
            }
        }
        catch (err) {
            throw err;
        }
        finally {
            if (!tslib_1.__classPrivateFieldGet(this, _PollingClient_isClosed, "f")) {
                setTimeout(async () => {
                    await this.poll(options);
                }, options === null || options === void 0 ? void 0 : options.timeout);
            }
        }
    }
    /**
     * Closes the polling client, stopping further updates.
     * @returns The closed state of the polling client.
     */
    close() {
        return (tslib_1.__classPrivateFieldSet(this, _PollingClient_isClosed, true, "f"));
    }
}
exports.PollingClient = PollingClient;
_PollingClient_isClosed = new WeakMap();
//# sourceMappingURL=PollingClient.js.map