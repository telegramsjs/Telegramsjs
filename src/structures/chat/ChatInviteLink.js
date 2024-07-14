const { Base } = require("../Base");
const { User } = require("../misc/User");

class ChatInviteLink extends Base {
  constructor(client, data) {
    super(client, data);

    this.link = data.invite_link;

    this.creator = new User(client, data.creator);

    this.createsRequest = data.creates_join_request;

    this.primary = data.is_primary;

    this.revoked = data.is_revoked;

    if ("name" in data) {
      this.name = data.name;
    }

    if ("expire_date" in data) {
      this.expiredTimestamp = data.expire_date;
    }

    if ("member_limit" in data) {
      this.limit = data.member_limit;
    }

    if ("pending_join_request_count" in data) {
      this.requestsCount = data.pending_join_request_count;
    }
  }

  get expiredAt() {
    return new Date(this.expiredTimestamp);
  }
}

module.exports = { ChatInviteLink };
