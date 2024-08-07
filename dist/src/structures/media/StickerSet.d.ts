export class StickerSet extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").StickerSet} data - Data about the represents a sticker
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").StickerSet);
    /** Sticker set name */
    name: string;
    /** Sticker set title */
    title: string;
    /** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
    stickerType: "regular" | "custom_emoji" | "mask";
    /** List of all set stickers */
    stickers: Sticker[];
    /** Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
    thumbnail: Photo | undefined;
}
import { InputFile } from "../misc/InputFile";
import { Sticker } from "./Sticker";
import { Photo } from "./Photo";
//# sourceMappingURL=StickerSet.d.ts.map