const ms = require('ms');
const https = require('https');
const querystring = require('querystring');
const { TelegramApiError, TelegramTokenError, IntentsError } = require("./errorcollection.js");
const { EventEmitter } = require('events');
const { decodeIntents, IntentsBitField } = require("./IntentsBitField.js");
const { LocalSession } = require("./LocalSession");
const lastTimeMap = new LocalSession();
/**
 * Represents a request to the Telegram Bot API.
 * @class
 * @param {string} token - The API token for the bot.
 * @param {Array.<string>} intents - The types of updates the bot is interested in.
 */
class Request extends EventEmitter {
  constructor(token, intents, queryString, offSetType) {
    super();
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.offset = 0;
    this.queryString = queryString ?? 'application/x-www-form-urlencoded';
    this.offSetType = offSetType ?? 'default';
    if (this.offSetType == 'default')
    this.lastTimeMap = lastTimeMap;
    else if (this.offSetType instanceof Map)
    this.lastTimeMap = this.offSetType;
    else if (this.offSetType === false) {
      lastTimeMap.set('lastTime', true);
      this.lastTimeMap = lastTimeMap;
    }
    else
    throw new Error('This class must inherit Map');
    
    setTimeout(function() {
      lastTimeMap.set('lastTime', true);
     }, 3000);
    if (typeof intents?.bits === 'number')
      this.intents = decodeIntents(intents);
     else if (typeof intents === 'object' && (typeof intents?.[0] === 'string' || typeof intents?.[0]?.[0] === 'string'))
     this.intents = intents;
     else if (typeof intents === 'object') {
       this.intents = decodeIntents(new IntentsBitField(intents?.[0]))
     } else if (typeof intents === 'number') {
       this.intents = decodeIntents(new IntentsBitField(intents))
     }
  }
  /**
   * Gets the updates from the Telegram Bot API.
   * @async
   * @returns {Promise.<Array.<Object>>} An array of updates.
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
      this.offset = updates[updates.length - 1].update_id + 1;
    }
    if (response?.error_code === 401) {
      throw new TelegramTokenError('Invalid token of telegrams bot')
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
   * @returns {Promise.<Object>} The response from the API call.
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
  
  get uptime() {
    const uptime = Date.now() - this.startTime
    return +uptime;
  }
  
  get ping() {
    return (async () => {
      const startTime = Date.now();
      const response = await this.request('getMe', {});
      const endTime = Date.now();
      const latency = endTime - startTime;
      return latency;
    })();
  }

}

module.exports = Request;