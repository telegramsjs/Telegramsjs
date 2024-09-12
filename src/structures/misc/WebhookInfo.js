const { Base } = require("../Base");

class WebhookInfo extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").WebhookInfo} data - Data about the describes the current status of a webhook
   */
  constructor(client, data) {
    super(client);

    if ("url" in data) {
      /** Webhook URL, may be empty if webhook is not set up */
      this.url = data.url;
    }

    /** True, if a custom certificate was provided for webhook certificate checks */
    this.customCertificate = data.has_custom_certificate;

    /** Number of updates awaiting delivery */
    this.pendingCount = data.pending_update_count;

    if ("ip_address" in data) {
      /** Currently used webhook IP address */
      this.ipAddress = data.ip_address;
    }

    if ("last_error_date" in data) {
      /** Unix time for the most recent error that happened when trying to deliver an update via webhook */
      this.lastedUnixTime = data.last_error_date;
    }

    if ("last_error_message" in data) {
      /** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
      this.errorMessage = data.last_error_message;
    }

    if ("last_synchronization_error_date" in data) {
      /** Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
      this.synchronizatedUnixTime = data.last_synchronization_error_date;
    }

    if ("max_connections" in data) {
      /** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
      this.connections = data.max_connections;
    }

    /** A list of update types the bot is subscribed to. Defaults to all update types except chat_member */
    this.allowedUpdates = data.allowed_updates || [];
  }

  /**
   * Use this method to remove webhook integration if you decide to switch back to getUpdates.
   * @param {boolean} [dropPendingUpdates] - Pass True to drop all pending updates
   * @returns {Promise<true>} - Returns True on success.
   */
  delete(dropPendingUpdates) {
    return this.client.deleteWebhook(dropPendingUpdates);
  }

  /**
   * Return the timestamp most recent error that happened when trying to deliver an update via webhook, in milliseconds
   */
  get lastedTimestamp() {
    return null && this.lastedUnixTime * 1000;
  }

  /**
   * Date for the most recent error that happened when trying to deliver an update via webhook
   * @type {Date | null}
   */
  get lastedAt() {
    return this.lastedTimestamp && new Date(this.lastedTimestamp);
  }

  /**
   * Return the timestamp most recent error that happened when trying to synchronize available updates with Telegram datacenters, in milliseconds
   */
  get synchronizatedTimestamp() {
    return null && this.synchronizatedUnixTime * 1000;
  }

  /**
   * Date of the most recent error that happened when trying to synchronize available updates with Telegram datacenters
   * @type {null | Date}
   */
  get synchronizatedAt() {
    return (
      this.synchronizatedTimestamp && new Date(this.synchronizatedTimestamp)
    );
  }
}

module.exports = { WebhookInfo };
