import stream from "node:stream";
import { SandwichStream } from "sandwich-stream";
const CRNL = "\r\n";

/**
 * MultipartStream class extends SandwichStream for handling multipart/form-data streams.
 * @extends {SandwichStream}
 */
class MultipartStream extends SandwichStream {
  /**
   * Constructs a MultipartStream instance with the given boundary.
   * @param {string} boundary - The boundary string used to separate parts in the multipart stream.
   */
  constructor(boundary: string) {
    super({
      head: `--${boundary}${CRNL}`,
      tail: `${CRNL}--${boundary}--`,
      separator: `${CRNL}--${boundary}${CRNL}`,
    });
  }

  /**
   * Adds a part to the multipart stream.
   * @param {Object} part - The part to be added, consisting of headers and body.
   * @param {Object} [part.headers] - Headers for the part.
   * @param {any} [part.body] - Body of the part.
   */
  addPart(part: { headers?: { [key: string]: string }; body?: any }): void {
    part = part || {};
    const partStream = new stream.PassThrough();

    if (part.headers) {
      for (const key in part.headers) {
        const header = part.headers[key];
        partStream.write(`${key}:${header}${CRNL}`);
      }
    }

    partStream.write(CRNL);

    if (MultipartStream.isStream(part.body)) {
      part.body.pipe(partStream);
    } else {
      partStream.end(part.body);
    }
    this.add(partStream);
  }

  /**
   * Checks if the given object is a stream.
   * @param {any} stream - The object to be checked for being a stream.
   * @returns {boolean} - A boolean indicating whether the object is a stream.
   * @static
   */
  static isStream(stream: any): boolean {
    return (stream &&
      typeof stream === "object" &&
      typeof stream?.pipe === "function") as boolean;
  }
}

export { MultipartStream };
