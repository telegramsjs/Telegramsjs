export class BackgroundFill {
    /**
     * @param {import("@telegram.ts/types").BackgroundFill} data - Data about the describes the way a background is filled based on the selected colors
     */
    constructor(data: import("@telegram.ts/types").BackgroundFill);
    /**
     * The color of the background fill in the RGB24 format
     * @type {number | undefined}
     */
    color: number | undefined;
    /**
     * Top color of the gradient in the RGB24 format
     * @type {number | undefined}
     */
    topColor: number | undefined;
    /**
     * Bottom color of the gradient in the RGB24 format
     * @type {number | undefined}
     */
    bottomColor: number | undefined;
    /**
     * Clockwise rotation angle of the background fill in degrees; 0-359
     * @type {number | undefined}
     */
    rotationAngle: number | undefined;
    /**
     * A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format
     * @type {number[] | undefined}
     */
    colors: number[] | undefined;
    /**
     * @return {this is this & { readonly color: number; }}
     */
    isSolid(): this is this & {
        readonly color: number;
    };
    /**
     * @return {this is this & { readonly topColor: number; readonly bottomColor: number; readonly rotationAngle: number; }}
     */
    isGradient(): this is this & {
        readonly topColor: number;
        readonly bottomColor: number;
        readonly rotationAngle: number;
    };
    /**
     * @return {this is this & { readonly colors: number[] }}
     */
    isFreeformGradient(): this is this & {
        readonly colors: number[];
    };
}
//# sourceMappingURL=BackgroundFill.d.ts.map