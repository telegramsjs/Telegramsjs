"use strict";
const { Base } = require("../Base");
const { User } = require("../misc/User");
class GameHighScore extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").GameHighScore} data - Data about the represents one row of the high scores table for a game
     */
    constructor(client, data) {
        super(client);
        /** Position in high score table for the game */
        this.position = data.position;
        /** Score */
        this.score = data.score;
        /** User */
        this.user = new User(client, data.user);
    }
}
module.exports = { GameHighScore };
//# sourceMappingURL=GameHighScore.js.map