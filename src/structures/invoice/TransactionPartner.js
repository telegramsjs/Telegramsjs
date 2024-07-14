const { Base } = require("../Base");
const { User } = require("../misc/User");
const { RevenueWithdrawalState } = require("./RevenueWithdrawalState");

class TransactionPartner extends Base {
  constructor(client, data) {
    super(client, data);

    this._patch(data);
  }

  _patch(data) {
    if ("withdrawal_state" in data) {
      this.withdrawal = new RevenueWithdrawalState(data.withdrawal_state);
    }

    if ("user" in data) {
      this.user = new User(this.client, data.user);
    }
  }

  isUser() {
    return "user" in this && this.user;
  }

  isFragment() {
    return "withdrawal" in this && this.withdrawal;
  }

  isOther() {
    return !this.isUser() && !this.isFragment();
  }
}

module.exports = { TransactionPartner };
