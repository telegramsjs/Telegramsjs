class RevenueWithdrawalState {
  constructor(data) {
    if ("date" in data) {
      this.createdTimestamp = data.date;
    }

    if ("url" in data) {
      this.url = data.url;
    }

    if (data.type === "failed") {
      this.failed = true;
    }

    if (data.type === "pending") {
      this.pending = true;
    }
  }

  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  isSucceeded() {
    return (
      "createdTimestamp" in this &&
      this.createdTimestamp &&
      "url" in this &&
      this.url
    );
  }
}

module.exports = { RevenueWithdrawalState };
