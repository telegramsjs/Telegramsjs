"use strict";
class BackgroundFill {
    /**
     * @param {import("@telegram.ts/types").BackgroundFill} data - Data about the describes the way a background is filled based on the selected colors
     */
    constructor(data) {
        if (data.type === "solid") {
            /**
             * The color of the background fill in the RGB24 format
             * @type {number | undefined}
             */
            this.color = data.color;
        }
        if (data.type === "gradient") {
            /**
             * Top color of the gradient in the RGB24 format
             * @type {number | undefined}
             */
            this.topColor = data.top_color;
            /**
             * Bottom color of the gradient in the RGB24 format
             * @type {number | undefined}
             */
            this.bottomColor = data.bottom_color;
            /**
             * Clockwise rotation angle of the background fill in degrees; 0-359
             * @type {number | undefined}
             */
            this.rotationAngle = data.rotation_angle;
        }
        if (data.type === "freeform_gradient") {
            /**
             * A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format
             * @type {number[] | undefined}
             */
            this.colors = data.colors;
        }
    }
    /**
     * @return {this is this & { readonly color: number; }}
     */
    isSolid() {
        return Boolean("color" in this && this.color);
    }
    /**
     * @return {this is this & { readonly topColor: number; readonly bottomColor: number; readonly rotationAngle: number; }}
     */
    isGradient() {
        return Boolean("topColor" in this &&
            this.topColor &&
            "bottomColor" in this &&
            this.bottomColor &&
            "rotationAngle" in this &&
            this.rotationAngle);
    }
    /**
     * @return {this is this & { readonly colors: number[] }}
     */
    isFreeformGradient() {
        return Boolean("colors" in this && this.colors);
    }
}
module.exports = { BackgroundFill };
//# sourceMappingURL=BackgroundFill.js.map