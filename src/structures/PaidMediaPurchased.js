// @ts-check
const { Base } = require("./Base");

/**
 * @typedef {import("../types").MethodParameters} MethodParameters
 */

class PaidMediaPurchased extends Base {
  /**
   * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").PaidMediaPurchased} data - information about a paid media purchase.
   */
  constructor(client, data) {
    super(client);

    /**
     * User who purchased the media
     * @type {import("./misc/User").User}
     */
    this.author = this.client.users._add(data.from);

    /** Bot-specified paid media payload */
    this.payload = data.paid_media_payload;
  }
}

module.exports = { PaidMediaPurchased };
