export class GameHighScore extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").GameHighScore} data - Data about the represents one row of the high scores table for a game
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").GameHighScore);
    /** Position in high score table for the game */
    position: number;
    /** Score */
    score: number;
    /** User */
    user: User;
}
import { Base } from "../Base";
import { User } from "../misc/User";
//# sourceMappingURL=GameHighScore.d.ts.map