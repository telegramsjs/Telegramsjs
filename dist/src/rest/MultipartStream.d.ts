import { SandwichStream } from "sandwich-stream";
import { type Stream } from "node:stream";
/**
 * A class representing a multipart stream for composing HTTP multipart requests.
 * Extends SandwichStream.
 */
declare class MultipartStream extends SandwichStream {
    /**
     * Constructs a new MultipartStream instance with the specified boundary.
     * @param boundary - The boundary string used to separate parts in the multipart stream.
     */
    constructor(boundary: string);
    /**
     * Adds a part to the multipart stream with optional headers and body.
     * @param part - An object representing the part to add to the multipart stream.
     *                May include headers and body.
     */
    addPart(part?: {
        headers?: {
            [key: string]: string;
        };
        body?: any;
    }): void;
    /**
     * Checks if the provided object is a stream.
     * @param stream - The object to check.
     * @returns A boolean indicating whether the object is a stream.
     */
    static isStream(stream: any): stream is Stream;
}
export { MultipartStream };
//# sourceMappingURL=MultipartStream.d.ts.map