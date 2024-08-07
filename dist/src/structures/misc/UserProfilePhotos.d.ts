export class UserProfilePhotos extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").UserProfilePhotos} data - Data about the represent a user's profile pictures
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").UserProfilePhotos);
    /** Total number of profile pictures the target user has */
    count: number;
    /** Requested profile pictures (in up to 4 sizes each) */
    photos: Photo[][];
}
import { Base } from "../Base";
import { Photo } from "../media/Photo";
//# sourceMappingURL=UserProfilePhotos.d.ts.map