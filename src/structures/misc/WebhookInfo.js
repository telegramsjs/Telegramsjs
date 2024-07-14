class WebhookInfo {
  constructor(data) {
    if ("url" in data) {
      this.url = data.url;
    }

    this.customCertificate = data.has_custom_certificate;

    this.ipAddress = data.ip_address;

    if ("last_error_date" in data) {
      this.lastedTimestamp = data.last_error_date;
    }

    if ("last_error_message" in data) {
      this.errorMessage = data.last_error_message;
    }

    if ("last_synchronization_error_date" in data) {
      this.synchronizatedTimestamp = data.last_synchronization_error_date;
    }

    if ("max_connections" in data) {
      this.connections = data.max_connections;
    }

    this.allowedUpdates = data.allowed_updates || [];
  }

  get lastedAt() {
    return new Date(this.lastedTimestamp);
  }

  get synchronizatedAt() {
    return new Date(this.synchronizatedTimestamp);
  }
}

module.exports = { WebhookInfo };
