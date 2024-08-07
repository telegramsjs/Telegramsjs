"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaData = void 0;
const node_buffer_1 = require("node:buffer");
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_fetch_1 = require("node-fetch");
const MultipartStream_1 = require("./MultipartStream");
async function fileExists(filePath) {
    try {
        await node_fs_1.default.promises.access(filePath, node_fs_1.default.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * A class for handling media data and preparing configuration for API requests.
 */
class MediaData {
    constructor() {
        /**
         * Mapping of media type extensions.
         */
        Object.defineProperty(this, "extensions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                audio: "mp3",
                photo: "jpg",
                sticker: "webp",
                video: "mp4",
                animation: "mp4",
                video_note: "mp4",
                voice: "ogg",
            }
        });
        /**
         * Fields in the form data that should be JSON-encoded.
         */
        Object.defineProperty(this, "formDataJsonFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "results",
                "reply_markup",
                "mask_position",
                "shipping_options",
                "errors",
                "commands",
            ]
        });
        /**
         * Parameters that can contain media data.
         */
        Object.defineProperty(this, "sourceParametersMedia", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "sticker",
                "media",
                "photo",
                "audio",
                "document",
                "video",
                "animation",
                "voice",
                "video_note",
            ]
        });
    }
    /**
     * Checks if the payload contains media data.
     * @param payload - The data to check.
     * @returns `true` if media is found, otherwise `false`.
     */
    hasMedia(payload) {
        return Object.keys(payload).some((key) => {
            if (this.sourceParametersMedia.includes(key)) {
                return true;
            }
            if (Array.isArray(payload[key])) {
                return payload[key].some((item) => typeof item === "object" && this.hasMedia(item));
            }
            return false;
        });
    }
    /**
     * Builds the configuration for a JSON request.
     * @param payload - The data to be sent in the request.
     * @param requestOptions - Additional options for the request.
     * @returns The configuration for the request.
     */
    buildJSONConfig(payload, requestOptions = {}) {
        var _a, _b, _c;
        return {
            method: (_a = requestOptions.method) !== null && _a !== void 0 ? _a : "POST",
            compress: (_b = requestOptions.compress) !== null && _b !== void 0 ? _b : true,
            headers: (_c = requestOptions.headers) !== null && _c !== void 0 ? _c : {
                "content-type": "application/json",
                "connection": "keep-alive",
            },
            body: JSON.stringify(payload),
        };
    }
    /**
     * Builds the configuration for a form-data request.
     * @param apiPayload - The data to be sent in the request.
     * @param requestOptions - Additional options for the request.
     * @returns The configuration for the request.
     */
    async buildFormDataConfig(apiPayload, requestOptions = {}) {
        var _a, _b, _c;
        Object.keys(this.formDataJsonFields).map((fieldName) => {
            const fieldValue = apiPayload[fieldName];
            if (fieldValue && typeof fieldValue !== "string") {
                apiPayload[fieldName] = JSON.stringify(fieldValue);
            }
        });
        const boundary = (0, node_crypto_1.randomBytes)(32).toString("hex");
        const formData = new MultipartStream_1.MultipartStream(boundary);
        await Promise.all(Object.keys(apiPayload).map(async (fieldName) => await this.attachFormValue(formData, fieldName, apiPayload[fieldName], requestOptions.agent)));
        return {
            method: (_a = requestOptions.method) !== null && _a !== void 0 ? _a : "POST",
            compress: (_b = requestOptions.compress) !== null && _b !== void 0 ? _b : true,
            headers: (_c = requestOptions.headers) !== null && _c !== void 0 ? _c : {
                "content-type": `multipart/form-data; boundary=${boundary}`,
                "connection": "keep-alive",
            },
            body: formData,
        };
    }
    /**
     * Attaches a value to the form data.
     * @param form - The form to which the value should be attached.
     * @param id - The name of the form field.
     * @param value - The value to attach to the form.
     * @param agent - The agent to use for fetching external resources.
     */
    async attachFormValue(form, id, value, agent) {
        if (!value)
            return;
        if (typeof value === "string") {
            if (await fileExists(value)) {
                await this.attachFormMedia(form, value, id);
                return;
            }
            else if (id === "thumbnail" && value.startsWith("http")) {
                const attachmentId = (0, node_crypto_1.randomBytes)(16).toString("hex");
                const response = await (0, node_fetch_1.default)(value, { agent });
                value = node_buffer_1.Buffer.from(await response.arrayBuffer());
                await this.attachFormMedia(form, value, attachmentId);
                form.addPart({
                    headers: { "content-disposition": `form-data; name="${id}"` },
                    body: `attach://${attachmentId}`,
                });
                return;
            }
            else {
                form.addPart({
                    headers: { "content-disposition": `form-data; name="${id}"` },
                    body: `${value}`,
                });
                return;
            }
        }
        if (typeof value === "boolean" || typeof value === "number") {
            form.addPart({
                headers: { "content-disposition": `form-data; name="${id}"` },
                body: `${value}`,
            });
            return;
        }
        if (id === "thumbnail") {
            const attachmentId = (0, node_crypto_1.randomBytes)(16).toString("hex");
            await this.attachFormMedia(form, value, attachmentId);
            form.addPart({
                headers: { "content-disposition": `form-data; name="${id}"` },
                body: `attach://${attachmentId}`,
            });
            return;
        }
        if (Array.isArray(value)) {
            const attachments = await Promise.all(value.map(async (item) => {
                if (typeof item.media !== "object") {
                    return item;
                }
                const attachmentId = (0, node_crypto_1.randomBytes)(16).toString("hex");
                await this.attachFormMedia(form, item.media, attachmentId);
                return { ...item, media: `attach://${attachmentId}` };
            }));
            form.addPart({
                headers: { "content-disposition": `form-data; name="${id}"` },
                body: JSON.stringify(attachments),
            });
            return;
        }
        if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
            const buffer = ArrayBuffer.isView(value)
                ? node_buffer_1.Buffer.from(value.buffer, value.byteOffset, value.byteLength)
                : node_buffer_1.Buffer.from(value);
            await this.attachFormMedia(form, buffer, id);
            return;
        }
        if (value instanceof Blob) {
            const buffer = node_buffer_1.Buffer.from(await value.arrayBuffer());
            await this.attachFormMedia(form, buffer, id);
            return;
        }
        if (value instanceof FormData) {
            const formThis = form;
            for (const [formKey, formValue] of value.entries()) {
                await this.attachFormValue(formThis, formKey, formValue, agent);
            }
            return;
        }
        if (value instanceof Uint8Array || value instanceof DataView) {
            await this.attachFormMedia(form, node_buffer_1.Buffer.from(value.buffer), id);
            return;
        }
        await this.attachFormMedia(form, value, id);
    }
    /**
     * Attaches media to the form data.
     * @param form - The form to which the media should be attached.
     * @param media - The media to attach, can be a string path, buffer, or read stream.
     * @param id - The name of the form field.
     */
    async attachFormMedia(form, media, id) {
        const filename = `${id}.${this.extensions[id] || "txt"}`;
        if (typeof media === "string") {
            if (await fileExists(media)) {
                media = node_fs_1.default.createReadStream(media);
            }
        }
        if (MultipartStream_1.MultipartStream.isStream(media) || node_buffer_1.Buffer.isBuffer(media)) {
            await form.addPart({
                headers: {
                    "content-disposition": `form-data; name="${id}"; filename="${filename}"`,
                },
                body: media,
            });
        }
    }
}
exports.MediaData = MediaData;
//# sourceMappingURL=MediaData.js.map