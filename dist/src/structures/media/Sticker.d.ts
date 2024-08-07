export class Sticker extends InputFile {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").Sticker} data - Data about the represents a sticker
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").Sticker);
    /** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
    type: "regular" | "custom_emoji" | "mask";
    /** Sticker width */
    width: number;
    /** Sticker height */
    height: number;
    /** True, if the sticker is animated */
    animated: boolean;
    /** True, if the sticker is a video sticker */
    video: boolean;
    /** Sticker thumbnail in the .WEBP or .JPG format */
    thumbnail: Photo | undefined;
    /** Emoji associated with the sticker */
    emoji: string | undefined;
    /** Name of the sticker set to which the sticker belongs */
    setName: string | undefined;
    /** For premium regular stickers, premium animation for the sticker */
    animation: InputFile | undefined;
    /** For mask stickers, the position where the mask should be placed */
    mask: import("@telegram.ts/types").MaskPosition | undefined;
    /** For custom emoji stickers, unique identifier of the custom emoji */
    emojiId: string | undefined;
}
import { InputFile } from "../misc/InputFile";
import { Photo } from "./Photo";
//# sourceMappingURL=Sticker.d.ts.map