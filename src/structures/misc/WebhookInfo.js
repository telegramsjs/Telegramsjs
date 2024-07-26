class WebhookInfo {
  /**
   * @param {import("@telegram.ts/types").WebhookInfo} data - Data about the describes the current status of a webhook
   */
  constructor(data) {
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
      this.lastedTimestamp = data.last_error_date;
    }

    if ("last_error_message" in data) {
      /** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
      this.errorMessage = data.last_error_message;
    }

    if ("last_synchronization_error_date" in data) {
      /** Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
      this.synchronizatedTimestamp = data.last_synchronization_error_date;
    }

    if ("max_connections" in data) {
      /** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
      this.connections = data.max_connections;
    }

    /** A list of update types the bot is subscribed to. Defaults to all update types except chat_member */
    this.allowedUpdates = data.allowed_updates || [];
  }

  /**
   * Date for the most recent error that happened when trying to deliver an update via webhook
   * @type {Date}
   */
  get lastedAt() {
    return new Date(this.lastedTimestamp);
  }

  /**
   * Date of the most recent error that happened when trying to synchronize available updates with Telegram datacenters
   * @type {Date}
   */
  get synchronizatedAt() {
    return new Date(this.synchronizatedTimestamp);
  }
}

module.exports = { WebhookInfo };
