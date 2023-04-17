const https = require('https');
const querystring = require('querystring');
<<<<<<< HEAD
const { TelegramApiError, TelegramTokenError, IntentsError } = require("./errorcollection.js");
const { decodeIntents, IntentsBitField } = require("./IntentsBitField.js");
=======
const { TelegramApiError, TelegramTokenError } = require("./errorcollection.js");
>>>>>>> fef04d59807cc35e4e1420d8053e5a30dd45e1b5

/**
 * Represents a request to the Telegram Bot API.
 * @class
 * @param {string} token - The API token for the bot.
 * @param {Array.<string>} intents - The types of updates the bot is interested in.
 */
class Request {
  constructor(token, intents) {
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.offset = 0;
<<<<<<< HEAD
    if (typeof intents?.bits === 'number')
      this.intents = decodeIntents(intents);
     else if (typeof intents === 'object' && (typeof intents?.[0] === 'string' || typeof intents?.[0]?.[0] === 'string'))
     this.intents = intents;
     else if (typeof intents === 'object') {
       this.intents = decodeIntents(new IntentsBitField(intents?.[0]))
     } else if (typeof intents === 'number') {
       this.intents = decodeIntents(new IntentsBitField(intents))
     }
=======
    this.intents = intents
>>>>>>> fef04d59807cc35e4e1420d8053e5a30dd45e1b5
  }
  /**
   * Gets the updates from the Telegram Bot API.
   * @async
   * @returns {Promise.<Array.<Object>>} An array of updates.
   * @throws {TelegramTokenError} When the token is invalid.
   * @throws {TelegramApiError} When an error occurs with the Telegram Bot API.
   */
  
  async getUpdates() {
    const params = {
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
    return updates || [];
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
          'Content-Type': 'application/x-www-form-urlencoded',
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
}

module.exports = Request;