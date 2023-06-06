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
   * Returns the count of collected messages.
   * @returns {number} The count of collected messages.
   */
  count() {
    return this.collectedMessages.length;
  }

  /**
   * Clears the collected messages.
   * @returns {boolean} `true` if the collected messages are cleared successfully, `false` otherwise.
   */
  clear() {
    this.collectedMessages = [];
    return true;
  }

  /**
   * Sets a new filter function for the collector.
   * @param {Function} filter - The new filter function.
   * @returns {boolean} `true` if the filter function is set successfully, `false` otherwise.
   */
  setFilter(filter) {
    if (typeof filter === 'function') {
      this.filter = filter;
      return true;
    }
    return false;
  }

  /**
   * Sets a new duration for the collector to run.
   * @param {number} time - The new duration in milliseconds.
   * @returns {boolean} `true` if the duration is set successfully, `false` otherwise.
   */
  setTime(time) {
    if (typeof time === 'number' && time >= 0) {
      this.time = time;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.emit('interval');
      }, this.time);
      return true;
    }
    return false;
  }

  /**
   * Sets a new maximum number of messages to collect.
   * @param {number} max - The new maximum number of messages.
   * @returns {boolean} `true` if the maximum number is set successfully, `false` otherwise.
   */
  setMax(max) {
    if (typeof max === 'number' && max >= 0) {
      this.max = max;
      return true;
    }
    return false;
  }

  /**
   * Returns whether the collector is currently running.
   * @returns {boolean} `true` if the collector is running, `false` otherwise.
   */
  isRunning() {
    return !!this.interval;
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