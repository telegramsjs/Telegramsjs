const { EventEmitter } = require('events');

/**
 * Represents a message collector.
 * @extends EventEmitter
 */
class MessageCollector extends EventEmitter {
  /**
   * Creates a new MessageCollector.
   * @param {Object} options - The options for the collector.
   * @param {number} options.chatId - The ID of the chat to collect messages from.
   * @param {Function} [options.filter] - The filter function to determine which messages to collect (optional, default: () => true).
   * @param {number} [options.time] - The duration in milliseconds for the collector to run (optional, default: 60000).
   * @param {number} [options.max] - The maximum number of messages to collect (optional).
   */
  constructor(options) {
    super();
    const { chatId, filter, time, max } = options;
    this.chatId = chatId;
    this.filter = filter || (() => true);
    this.time = time || 60000;
    this.max = max;
    this.collectedMessages = [];
    
    /**
     * The interval ID for the collector.
     * @private
     * @type {NodeJS.Timeout}
     */
    this.interval = setInterval(() => {
      this.emit('interval');
    }, this.time);
  }

  /**
   * Handles a new message received by the collector.
   * @param {Object} message - The message object.
   */
  handleMessage(message) {
    if (!(message.chat.id === this.chatId && this.filter(message))) return;
    this.countCollector = (this.countCollector || 0) + 1;
    this.collectedMessages.push(message.text ?? message.caption);
    this.emit('collected', {
      count: this.countCollector,
      collectedMessages: this.collectedMessages,
      options: { chatId: this.chatId, filter: this.filter, time: this.time, max: this.max },
      message
    });
    
    if (this.max && this.countCollector >= this.max) {
      this.stop();
      return;
    }
  }

  /**
   * Returns the collected messages.
   * @returns {Array} The collected messages.
   */
  collected() {
    return this.collectedMessages;
  }

  /**
   * Stops the message collector.
   */
  stop() {
    this.emit('end');
    clearInterval(this.interval);
    this.removeAllListeners();
  }
}

module.exports = MessageCollector;