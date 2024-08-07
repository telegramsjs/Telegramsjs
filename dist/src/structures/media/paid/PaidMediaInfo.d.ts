export class PaidMediaInfo {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").PaidMediaInfo} data - Data about the describes the paid media added to a message
     */
    constructor(client: any | any, data: import("@telegram.ts/types").PaidMediaInfo);
    /** The number of Telegram Stars that must be paid to buy access to the media */
    starCount: number;
    /** Information about the paid media */
    media: PaidMedia[];
}
import { PaidMedia } from "./PaidMedia";
//# sourceMappingURL=PaidMediaInfo.d.ts.map