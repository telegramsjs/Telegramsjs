const https = require('https');
const querystring = require('querystring');
const { TelegramApiError, TelegramTokenError, IntentsError } = require("./errorcollection.js");
const { EventEmitter } = require('events');
const { decodeIntents, IntentsBitField } = require("./IntentsBitField.js");
const CashSession = require("./session/CashSession.js");
const lastTimeMap = new CashSession();

/**
 * Represents a request object for making requests to the Telegram Bot API.
 * @extends EventEmitter
 */
class Request extends EventEmitter {
  /**
   * Constructs a new Request object.
   * @param {string} [token] - The API token for the bot.
   * @param {string | array | number} [intents] - The types of updates the bot is interested in.
   * @param {string} [queryString] - The type of query string to use for requests.
   * @param {string | boolean | object} [offSetType] - The type of offset to use for updates.
   * @param {string} [options.parseMode] - The parse mode for message formatting.
   */
  constructor(token, intents, queryString, offSetType, parseMode) {
    super();
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.offset = 0;
    this.queryString = queryString ?? 'application/x-www-form-urlencoded';
    this.offSetType = offSetType ?? 'time';
    this.parseMode = parseMode;

    if (this.offSetType == 'time') {
      this.lastTimeMap = lastTimeMap;
    } else if (this.offSetType instanceof Map) {
      this.lastTimeMap = this.offSetType;
    } else if (this.offSetType === false) {
      lastTimeMap.set('lastTime', true);
      this.lastTimeMap = lastTimeMap;
    } else if (this.offSetType === 'auto') {
      lastTimeMap.set('lastTime', 'auto');
      this.lastTimeMap = lastTimeMap;
    }

    if (this.offSetType === false || this.offSetType === 'time') {
      setTimeout(function() {
        lastTimeMap.set('lastTime', true);
      }, 3000);
    }

    if (typeof intents?.bits === 'number') {
      this.intents = decodeIntents(intents);
    } else if (
      typeof intents === 'object' &&
      (typeof intents?.[0] === 'string' || typeof intents?.[0]?.[0] === 'string')
    ) {
      this.intents = intents;
    } else if (typeof intents === 'object') {
      this.intents = decodeIntents(new IntentsBitField(intents?.[0]));
    } else if (typeof intents === 'number') {
      this.intents = decodeIntents(new IntentsBitField(intents));
    }
  }

  /**
   * Gets the updates from the Telegram Bot API.
   * @async
   * @returns {Promise.<Array.<object>>} An array of updates.
   * @throws {TelegramTokenError} When the token is invalid.
   * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
   */
  async getUpdates() {
    this.startTime = await Date.now();
    const params = await {
      offset: this.offset,
      allowed_updates: this.intents
    };
    const response = await this.request('getUpdates', params);
    const updates = response.result;

    if (Array.isArray(updates) && updates.length > 0) {
      this.update_id = updates[0].update_id + 1;
      this.last_object = updates[0];
      this.offset = updates[updates.length - 1].update_id + 1;
    }

    if (response?.error_code === 401) {
      throw new TelegramTokenError('Invalid token of telegrams bot');
    } else if (response?.error_code !== undefined) {
      throw new TelegramApiError(response.description);
    }

    return updates ?? [];
  }

  /**
   * Makes a request to the Telegram Bot API.
   * @async
   * @param {string} method - The API method to call.
   * @param {Object} params - The parameters to include in the API call.
   * @returns {Promise.<object>} The response from the API call.
   */
  async request(method, params) {
    const url = `${this.baseUrl}/${method}`;
    const data = querystring.stringify(params);

    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': this.queryString,
          'Content-Length': data.length
        }
      };

      const req = https.request(url, options, res => {
        let response = '';

        res.on('data', chunk => {
          response += chunk;
        });

        res.on('end', () => {
          try {
            resolve(JSON.parse(response));
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', error => {
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
  get uptime() {
    const uptime = Date.now() - this.startTime;
    return +uptime;
  }

  /**
   * Gets the ping latency of the bot.
   * @async
   * @returns {Promise.<number>} The ping latency in milliseconds.
   */
  get ping() {
    return (async () => {
      const startTime = Date.now();
      const response = await this.request('getMe', {});
      const endTime = Date.now();
      const latency = endTime - startTime;
      return latency;
    })();
  }

  /**
   * Gets the last update ID received.
   * @returns {number|null} The last update ID, or null if not available.
   */
  get updateId() {
    return this.update_id ?? null;
  }

  /**
   * Gets the last object received.
   * @returns {object} The last received object.
   */
  get lastObject() {
    return this.last_object;
  }

  /**
   * Set the token for the bot.
   * @param {string} token - The token to set.
   * @returns {boolean} - Returns true if the token was set successfully.
   */
  setToken(token) {
    this.token = token;
    return true;
  }

  /**
   * Set the intents for the bot.
   * @param {string | array | number} intents - The intents to set.
   * @returns {boolean} - Returns true if the intents were set successfully.
   */
  setIntents(intents) {
    this.intents = intents;
    return true;
  }

  /**
   * Set the parse mode for the bot.
   * @param {string} parseMode - The parse mode to set.
   * @returns {boolean} - Returns true if the parse mode was set successfully.
   */
  setParseMode(parseMode) {
    this.parseMode = parseMode;
    return true;
  }

  /**
   * Set the chat ID for the bot.
   * @param {string | number } chatId - The chat ID to set.
   * @returns {string | number} - Returns the chat ID that was set.
   */
  setChatId(chatId) {
    this.chatId = chatId;
    return chatId;
  }

  /**
   * Set the query string for the bot.
   * @param {string} queryString - The query string to set.
   * @returns {boolean} - Returns true if the query string was set successfully.
   */
  setQueryString(queryString) {
    this.queryString = queryString;
    return true;
  }

  /**
   * Set the offset type for the bot.
   * @param {string} offSetType - The offset type to set.
   * @returns {string} - Returns the offset type that was set.
   */
  setOffSetType(offSetType) {
    this.offSetType = offSetType;
    return offSetType;
  }
}

module.exports = Request;
