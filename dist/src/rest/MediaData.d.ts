import { Buffer } from "node:buffer";
import { type ReadStream } from "node:fs";
import { type RequestInit, type BodyInit, type HeadersInit } from "node-fetch";
import { MultipartStream } from "./MultipartStream";
/**
 * Interface representing the configuration for an API request.
 */
interface IApiConfig {
    method: string;
    compress: boolean;
    headers: HeadersInit;
    body: MultipartStream | BodyInit;
    agent?: RequestInit["agent"];
}
/**
 * A class for handling media data and preparing configuration for API requests.
 */
declare class MediaData {
    /**
     * Mapping of media type extensions.
     */
    readonly extensions: Record<string, string>;
    /**
     * Fields in the form data that should be JSON-encoded.
     */
    readonly formDataJsonFields: string[];
    /**
     * Parameters that can contain media data.
     */
    readonly sourceParametersMedia: string[];
    /**
     * Checks if the payload contains media data.
     * @param payload - The data to check.
     * @returns `true` if media is found, otherwise `false`.
     */
    hasMedia(payload: Record<string, any>): boolean;
    /**
     * Builds the configuration for a JSON request.
     * @param payload - The data to be sent in the request.
     * @param requestOptions - Additional options for the request.
     * @returns The configuration for the request.
     */
    buildJSONConfig(payload: Record<string, any>, requestOptions?: RequestInit): IApiConfig;
    /**
     * Builds the configuration for a form-data request.
     * @param apiPayload - The data to be sent in the request.
     * @param requestOptions - Additional options for the request.
     * @returns The configuration for the request.
     */
    buildFormDataConfig(apiPayload: Record<string, any>, requestOptions?: RequestInit): Promise<IApiConfig>;
    /**
     * Attaches a value to the form data.
     * @param form - The form to which the value should be attached.
     * @param id - The name of the form field.
     * @param value - The value to attach to the form.
     * @param agent - The agent to use for fetching external resources.
     */
    attachFormValue(form: MultipartStream, id: string, value: any, agent: RequestInit["agent"]): Promise<void>;
    /**
     * Attaches media to the form data.
     * @param form - The form to which the media should be attached.
     * @param media - The media to attach, can be a string path, buffer, or read stream.
     * @param id - The name of the form field.
     */
    attachFormMedia(form: MultipartStream, media: string | Buffer | ReadStream, id: string): Promise<void>;
}
export { MediaData, type IApiConfig };
//# sourceMappingURL=MediaData.d.ts.map