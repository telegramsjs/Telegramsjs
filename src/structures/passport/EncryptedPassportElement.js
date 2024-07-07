const { Base } = require("../Base");
const { PassportFile } = require("./PassportFile");
const { InputFile } = require("../InputFile");

class EncryptedPassportElement extends Base {
  constructor(client, data) {
    super(client, data);

    this.type = data.type;

    this.hash = data.hash;

    this._patch(data);
  }

  _patch(data) {
    if ("data" in data) {
      this.data = data.data;
    }

    if ("phone_number" in data) {
      this.phoneNumber = data.phone_number;
    }

    if ("email" in data) {
      this.email = data.email;
    }

    if ("files" in data) {
      this.files = data.files.map((file) => new InputFile(this.client, file));
    }

    if ("front_side" in data) {
      this.frontSide = new PassportFile(this.client, data.front_side);
    }

    if ("reverse_side" in data) {
      this.reverseSide = new PassportFile(this.client, data.reverse_side);
    }

    if ("selfie" in data) {
      this.selfie = new PassportFile(this.client, data.selfie);
    }

    if ("translation" in data) {
      this.translation = data.translation.map(
        (translated) => new PassportFile(this.client, translated),
      );
    }
  }
}

module.exports = { EncryptedPassportElement };
