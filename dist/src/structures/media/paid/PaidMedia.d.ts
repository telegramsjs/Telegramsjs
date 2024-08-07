export class PaidMedia extends Base {
    /**
     * @param {import("../../../client/TelegramClient").TelegramClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").PaidMedia} data - Data about the describes paid media
     */
    constructor(client: import("../../../client/TelegramClient").TelegramClient, data: import("@telegram.ts/types").PaidMedia);
    _patch(data: any): any;
    /**
     * Media width as defined by the sender
     * @type {number | undefined}
     */
    width: number | undefined;
    /**
     * Media height as defined by the sender
     * @type {number | undefined}
     */
    height: number | undefined;
    /**
     * Duration of the media in seconds as defined by the sender
     * @type {number | undefined}
     */
    duration: number | undefined;
    /**
     * The photo
     * @type {Photo[] | undefined}
     */
    photo: Photo[] | undefined;
    /**
     * The video
     * @type {Video | undefined}
     */
    video: Video | undefined;
    /**
     * @return {this & this & { video?: undefined; photo?: undefined }}
     */
    isPreview(): this & this & {
        video?: undefined;
        photo?: undefined;
    };
    /**
     * @return {this is this & { photo: Photo[] }}
     */
    isPhoto(): this is this & {
        photo: Photo[];
    };
    /**
     * @return {this is this & { video: Video }}
     */
    isVideo(): this is this & {
        video: Video;
    };
}
import { Base } from "../../Base";
import { Photo } from "../Photo";
import { Video } from "../Video";
//# sourceMappingURL=PaidMedia.d.ts.map