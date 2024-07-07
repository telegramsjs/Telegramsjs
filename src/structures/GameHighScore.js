const { Base } = require("./Base");
const { User } = require("./User");

class GameHighScore extends Base {
  constructor(client, data) {
    super(client, data);

    this.position = data.position;

    this.score = data.score;

    this.user = new User(client, data.user);
  }
}

module.exports = { GameHighScore };
