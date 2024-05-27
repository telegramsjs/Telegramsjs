import fs from "node:fs";
import fetch from "node-fetch";
import type { Api } from "../../../api";
import type { File } from "@telegram.ts/types";
import { TelegramError, TelegramTypeError } from "../../util";

/**
 * Represents a file input for interacting with the Telegram API.
 */
class InputFile {
  /**
   * The unique identifier for this file.
   */
  file_id: string;

  /**
   * The unique identifier for this file, which is supposed to be consistent across different bots.
   */
  file_unique_id: string;

  /**
   * The size of the file in bytes, if available.
   */
  file_size: number | null;

  /**
   * The path to the file on the Telegram server, if available.
   */
  file_path: string | null;

  /**
   * Creates an instance of InputFile.
   * @param file - The file object from the Telegram API.
   * @param telegram - The Telegram API client instance.
   */
  constructor(
    private readonly file: File,
    public readonly telegram: Api,
  ) {
    const { file_id, file_unique_id, file_size, file_path } = file;
    this.file_id = file_id;
    this.file_unique_id = file_unique_id;
    this.file_size = file_size || null;
    this.file_path = file_path || null;
  }

  /**
   * Gets the URL to access the file on the Telegram server.
   * @returns The file URL.
   */
  get fileUrl() {
    return `https://api.telegram.org/file/bot${this.telegram.authToken}/${this.file_path}`;
  }

  /**
   * Downloads the file from the Telegram server.
   * @param filePath - The path of the file on the Telegram server.
   * @returns A promise that resolves with the file data as a Buffer.
   * @throws {TelegramError} If the file download fails.
   */
  async downloadFile(filePath: string): Promise<Buffer> {
    const fileUrl = `https://api.telegram.org/file/bot${this.telegram.authToken}/${filePath}`;

    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      throw new TelegramError(`Failed to download file: ${err}`);
    }
  }

  /**
   * Writes the file to the specified path.
   * @param path - The path where the file should be written.
   * @param writeType - The type of write operation ("promise" or "stream").
   * @param options - Additional options for writing the file.
   * @returns A promise that resolves when the file has been written.
   * @throws {TelegramTypeError} If the file path is not available or the write type is incorrect.
   */
  async writeFile(
    path: string,
    writeType: "promise",
    options?: {
      encoding?: string | null;
      flag?: string;
      signal?: AbortSignal;
    },
  ): Promise<void>;

  /**
   * Writes the file to the specified path using a stream.
   * @param path - The path where the file should be written.
   * @param writeType - The type of write operation ("stream").
   * @param options - Additional options for writing the file.
   * @returns A promise that resolves when the file has been written.
   * @throws {TelegramTypeError} If the file path is not available or the write type is incorrect.
   */
  async writeFile(
    path: string,
    writeType: "stream",
    options?: {
      encoding?: string;
      autoClose?: boolean;
      emitClose?: boolean;
      start?: number;
      highWaterMark?: number;
      flush?: boolean;
    },
  ): Promise<void>;

  async writeFile(
    path: string,
    writeType: "promise" | "stream" = "promise",
    options?: {},
  ) {
    if (!this.file_path) {
      throw new TelegramTypeError("getFile did not return file_path");
    }

    if (writeType === "promise") {
      const fileData = await this.downloadFile(this.file_path);
      await fs.promises.writeFile(path, fileData, options);
      return;
    }

    if (writeType === "stream") {
      const fileData = await this.downloadFile(this.file_path);
      const writeStream = fs.createWriteStream(path, options);
      writeStream.write(fileData);
      writeStream.end();
      return;
    }

    throw new TelegramTypeError(
      "The specified incorrect file write type is available: stream | promise",
    );
  }
}

export { InputFile };
