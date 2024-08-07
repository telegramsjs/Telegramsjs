export class ChatBoostSource extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoostSource} data - Data about the boost source
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatBoostSource);
    _patch(data: any): any;
    /**
     * User that boosted the chat
     * @type {User}
     */
    user: User | undefined;
    /**
     * Identifier of a message in the chat with the giveaway; the message could have been deleted already
     * @type {number}
     */
    giveawayId: number | undefined;
    /**
     * True, if the giveaway was completed, but there was no user to win the prize
     * @type {true}
     */
    unclaimed: true | undefined;
    /**
     * @return {this is this & { giveawayId: number }}
     */
    isGiveaway(): this is this & {
        giveawayId: number;
    };
    /**
     * @return {this is this & { readonly user: User; readonly giveawayId: number } }
     */
    isPremiumAndGift(): this is this & {
        readonly user: User;
        readonly giveawayId: number;
    };
}
import { Base } from "../Base";
import { User } from "../misc/User";
//# sourceMappingURL=ChatBoostSource.d.ts.map