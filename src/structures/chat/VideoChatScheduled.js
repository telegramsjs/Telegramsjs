class VideoChatScheduled {
  constructor(data) {
    this.startedTimestamp = data.start_date;
  }

  get startedAt() {
    return new Date(this.startedTimestamp);
  }
}

module.exports = { VideoChatScheduled };
