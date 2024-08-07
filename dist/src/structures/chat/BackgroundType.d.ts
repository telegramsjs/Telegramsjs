export class BackgroundType {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").ChatBoost} data - Data about the describes the type of a background
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").ChatBoost);
    /**
     * The background fill
     * @type {BackgroundFill | undefined}
      
     */
    fill: BackgroundFill | undefined;
    /**
     * Dimming of the background in dark themes, as a percentage; 0-100
     * @type {number | undefined}
      
     */
    darkDimming: number | undefined;
    /**
     * Document with the wallpaper
     * @type {Document | undefined}
      
     */
    document: Document | undefined;
    /**
     * True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12
     * @type {true | undefined}
      
     */
    blurred: true | undefined;
    /**
     * True, if the background moves slightly when the device is tilted
     * @type {true | undefined}
      
     */
    moving: true | undefined;
    /**
     * Intensity of the pattern when it is shown above the filled background; 0-100
     * @type {number}
      
     */
    intensity: number;
    /**
     * True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only
     * @type {true | undefined}
      
     */
    inverted: true | undefined;
    /**
     * Name of the chat theme, which is usually an emoji
     * @type {string | undefined}
      
     */
    themeName: string | undefined;
    /**
     * @return {this is this & { readonly fill: BackgroundFill; readonly darkDimming: number; }}
     */
    isFill(): this is this & {
        readonly fill: BackgroundFill;
        readonly darkDimming: number;
    };
    /**
     * @return {this is this & { readonly document: Document; readonly darkDimming: number; }}
     */
    isWallpaper(): this is this & {
        readonly document: Document;
        readonly darkDimming: number;
    };
    /**
     * @return {this is this & { readonly fill: BackgroundFill; readonly document: Document; readonly intensity: number }}
     */
    isPattern(): this is this & {
        readonly fill: BackgroundFill;
        readonly document: Document;
        readonly intensity: number;
    };
}
import { BackgroundFill } from "./BackgroundFill";
import { Document } from "../media/Document";
//# sourceMappingURL=BackgroundType.d.ts.map