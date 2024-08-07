export class LinkPreviewOptions {
    /**
     * @param {import("@telegram.ts/types").LinkPreviewOptions} data - Data about the options used for link preview generation
     */
    constructor(data: import("@telegram.ts/types").LinkPreviewOptions);
    /** True, if the link preview is disabled */
    disabled: boolean | undefined;
    /** URL to use for the link preview. If empty, then the first URL found in the message text will be used */
    url: string | undefined;
    /** True, if the media in the link preview is suppposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
    smallMedia: boolean | undefined;
    /** True, if the media in the link preview is suppposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
    largeMedia: boolean | undefined;
    /** True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
    aboveText: boolean | undefined;
}
//# sourceMappingURL=LinkPreviewOptions.d.ts.map