import { SandwichStream } from "sandwich-stream";
import { type Stream, PassThrough } from "node:stream";

/**
 * A class representing a multipart stream for composing HTTP multipart requests.
 * Extends SandwichStream.
 */
class MultipartStream extends SandwichStream {
  /**
   * Constructs a new MultipartStream instance with the specified boundary.
   * @param boundary - The boundary string used to separate parts in the multipart stream.
   */
  constructor(boundary: string) {
    super({
      head: `--${boundary}\r\n`,
      tail: `\r\n--${boundary}--`,
      separator: `\r\n--${boundary}\r\n`,
    });
  }

  /**
   * Adds a part to the multipart stream with optional headers and body.
   * @param part - An object representing the part to add to the multipart stream.
   *                May include headers and body.
   */
  addPart(part: { headers?: { [key: string]: string }; body?: any } = {}) {
    const partStream = new PassThrough();

    if (part.headers) {
      for (const key in part.headers) {
        const header = part.headers[key];
        partStream.write(`${key}:${header}\r\n`);
      }
    }

    partStream.write("\r\n");

    if (MultipartStream.isStream(part.body)) {
      part.body.pipe(partStream);
    } else {
      partStream.end(part.body);
    }

    this.add(partStream);
  }

  /**
   * Checks if the provided object is a stream.
   * @param stream - The object to check.
   * @returns A boolean indicating whether the object is a stream.
   */
  static isStream(stream: any): stream is Stream {
    return (
      stream && typeof stream === "object" && typeof stream?.pipe === "function"
    );
  }
}

export { MultipartStream };
