const { EncryptedPassportElement } = require("./EncryptedPassportElement");

class PassportData {
  constructor(client, data) {
    this.data = data.data.map(
      (data) => new EncryptedPassportElement(client, data),
    );

    this.credentials = {
      data: data.credentials.data,
      hash: data.credentials.hash,
      secret: data.credentials.secret,
    };
  }
}

module.exports = { PassportData };
