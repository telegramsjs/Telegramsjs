const https = require('https');
const querystring = require('querystring');
const { TelegramApiError, TelegramTokenError } = require("./errorcollection.js");

class Request {
  constructor(token, intents) {
    this.token = token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    this.offset = 0;
    this.intents = intents
  }
  
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