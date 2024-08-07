"use strict";
class LinkPreviewOptions {
    /**
     * @param {import("@telegram.ts/types").LinkPreviewOptions} data - Data about the options used for link preview generation
     */
    constructor(data) {
        if ("is_disabled" in data) {
            /** True, if the link preview is disabled */
            this.disabled = data.is_disabled;
        }
        if ("url" in data) {
            /** URL to use for the link preview. If empty, then the first URL found in the message text will be used */
            this.url = data.url;
        }
        if ("prefer_small_media" in data) {
            /** True, if the media in the link preview is suppposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
            this.smallMedia = data.prefer_small_media;
        }
        if ("prefer_large_media" in data) {
            /** True, if the media in the link preview is suppposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
            this.largeMedia = data.prefer_large_media;
        }
        if ("show_above_text" in data) {
            /** True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
            this.aboveText = data.show_above_text;
        }
    }
}
module.exports = { LinkPreviewOptions };
//# sourceMappingURL=LinkPreviewOptions.js.map