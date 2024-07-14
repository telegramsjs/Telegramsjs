const { Base } = require("../Base");

class User extends Base {
  constructor(client, data) {
    super(client, data);

    this.id = data.id;
    this.bot = Boolean(data.is_bot);
    this.firstName = data.first_name;
    this._patch(data);
  }

  _patch(data) {
    if ("last_name" in data) {
      this.lastName = data.last_name;
    }

    if ("username" in data) {
      this.username = data.username;
    }

    if ("language_code" in data) {
      this.language = data.language_code;
    }

    this.premium = Boolean(data.is_premium);
    this.inAttachmentMenu = Boolean(data.added_to_attachment_menu);
  }

  async getProfilePhotos(offset = 0, limit = 100) {
    return await this.client.getUserProfilePhotos({
      userId: this.id,
      limit,
      offset,
    });
  }
}

module.exports = { User };
