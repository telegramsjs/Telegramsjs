import fs from "node:fs";
import fetch from "node-fetch";
import fsp from "node:fs/promises";
import { Api } from "../../../api";
import { File } from "@telegram.ts/types";
import { TelegramError, TelegramTypeError } from "../../util";

class InputFile {
  file_id: string;
  file_unique_id: string;
  file_size: number | null;
  file_path: string | null;

  constructor(
    file: File,
    public readonly telegram: Api,
  ) {
    const { file_id, file_unique_id, file_size, file_path } = file;
    this.file_id = file_id;
    this.file_unique_id = file_unique_id;
    this.file_size = file_size || null;
    this.file_path = file_path || null;
  }

  async downloadFile(filePath: string) {
    const fileUrl = `https://api.telegram.org/file/bot${this.telegram.authToken}/${filePath}`;

    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      throw new TelegramError(`Failed to download file: ${err}`);
    }
  }

  async writeFile(
    path: string,
    writeType: "promise",
    options?: {
      encoding?: string | null;
      flag?: string;
      signal?: AbortSignal;
    },
  ): Promise<void>;

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
      await fsp.writeFile(path, fileData, options);
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
