export class InputFile extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").File} data - Data about the file object from the Telegram API
     */
    constructor(client: import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient, data: import("@telegram.ts/types").File);
    /**
     * The unique identifier for this file
     * @type {string}
     */
    id: string;
    /**
     * The unique identifier for this file, which is supposed to be consistent across different bots
     * @type {string}
     */
    uniqueId: string;
    /**
     * The size of the file in bytes, if available
     * @type {number | null}
     */
    size: number | null;
    /**
     * The path to the file on the Telegram server, if available
     * @type {string | null}
     */
    path: string | null;
    /**
     * Gets the URL to access the file on the Telegram server.
     * @return {string | null}
     */
    get url(): string | null;
    /**
     * Downloads the file from the Telegram server.
     * @param {string} [filePath=this.path] - The path of the file on the Telegram server.
     * @returns {Promise<Buffer>} - A promise that resolves with the file data as a Buffer.
     */
    download(filePath?: string | undefined): Promise<Buffer>;
    /**
     * @typedef {Object} PromiseOptions
     * @property {string | null} [encoding] - The encoding to use.
     * @property {string} [flag] - File system flag.
     * @property {AbortSignal} [signal] - An AbortSignal to abort the operation.
     */
    /**
     * @typedef {Object} StreamOptions
     * @property {string} [encoding] - The encoding to use.
     * @property {boolean} [autoClose] - Automatically close the stream when the file is finished.
     * @property {boolean} [emitClose] - Emit a 'close' event when the stream is closed.
     * @property {number} [start] - The position to start reading data from the file.
     * @property {number} [highWaterMark] - The maximum number of bytes to store in the internal buffer.
     * @property {boolean} [flush] - Control whether the stream should flush data to disk.
     */
    /**
     * Writes the file to the specified path.
     * @param {string} path - The path where the file should be written.
     * @param {"promise"|"stream"} writeType - The type of write operation.
     * @param {PromiseOptions|StreamOptions} [options] - Additional options for writing the file.
     * @returns {Promise<void>} A promise that resolves when the file has been written.
     */
    write(path: string, writeType?: "promise" | "stream", options?: {
        /**
         * - The encoding to use.
         */
        encoding?: string | null;
        /**
         * - File system flag.
         */
        flag?: string;
        /**
         * - An AbortSignal to abort the operation.
         */
        signal?: AbortSignal;
    } | {
        /**
         * - The encoding to use.
         */
        encoding?: string;
        /**
         * - Automatically close the stream when the file is finished.
         */
        autoClose?: boolean;
        /**
         * - Emit a 'close' event when the stream is closed.
         */
        emitClose?: boolean;
        /**
         * - The position to start reading data from the file.
         */
        start?: number;
        /**
         * - The maximum number of bytes to store in the internal buffer.
         */
        highWaterMark?: number;
        /**
         * - Control whether the stream should flush data to disk.
         */
        flush?: boolean;
    } | undefined): Promise<void>;
}
import { Base } from "../Base";
//# sourceMappingURL=InputFile.d.ts.map