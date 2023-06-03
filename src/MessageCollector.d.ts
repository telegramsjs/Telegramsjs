export = MessageCollector;
/**
 * Represents a message collector.
 * @extends EventEmitter
 */
declare class MessageCollector {
    /**
     * Creates a new MessageCollector.
     * @param {Object} options - The options for the collector.
     * @param {number} options.chatId - The ID of the chat to collect messages from.
     * @param {Function} [options.filter] - The filter function to determine which messages to collect (optional, default: () => true).
     * @param {number} [options.time] - The duration in milliseconds for the collector to run (optional, default: 60000).
     * @param {number} [options.max] - The maximum number of messages to collect (optional).
     */
    constructor(options: {
        chatId: number;
        filter?: Function;
        time?: number;
        max?: number;
    });
    chatId: number;
    filter: Function;
    time: number;
    max: number;
    collectedMessages: any[];
    /**
     * The interval ID for the collector.
     * @private
     * @type {NodeJS.Timeout}
     */
    private interval;
    /**
     * Handles a new message received by the collector.
     * @param {Object} message - The message object.
     */
    handleMessage(message: any): void;
    countCollector: any;
    /**
     * Returns the collected messages.
     * @returns {Array} The collected messages.
     */
    collected(): any[];
    /**
     * Stops the message collector.
     */
    stop(): void;
}
