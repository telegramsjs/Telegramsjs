export class VideoChatParticipantsInvited extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").VideoChatParticipantsInvited} data - Data about the represents a service message about new members invited to a video chat
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").VideoChatParticipantsInvited);
    /**
     * New members that were invited to the video chat
     * @type {User[]}
     */
    users: User[];
}
import { Base } from "../Base";
import { User } from "../misc/User";
//# sourceMappingURL=VideoChatParticipantsInvited.d.ts.map