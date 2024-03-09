import { SandwichStream } from "sandwich-stream";
import { type Stream, PassThrough } from "node:stream";

class MultipartStream extends SandwichStream {
  constructor(boundary: string) {
    super({
      head: `--${boundary}\r\n`,
      tail: `\r\n--${boundary}--`,
      separator: `\r\n--${boundary}\r\n`,
    });
  }

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

  static isStream(stream: any): stream is Stream {
    return (
      stream && typeof stream === "object" && typeof stream?.pipe === "function"
    );
  }
}

export { MultipartStream };
