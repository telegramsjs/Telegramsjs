import { Media } from "./media";
import { Agent } from "node:https";
import { ManagerEvents } from "./events";
import fetch, { type RequestInit } from "node-fetch";
import { HTTPResponseError } from "./util/HTTPResponseError";
import type { IRequestFailt, IRequestSuccess } from "./types";

interface IRateLimit {
  method: string;
  date: Date;
  datestamp: number;
  parameters: Record<string, any>;
  error_code: number;
  description: string;
  retry_after: number;
  migrate_to_chat_id?: number;
}

class ApiRequest extends ManagerEvents {
  media: Media = new Media();

  constructor(
    public readonly authToken: string,
    public readonly requestOptions: RequestInit = {
      agent: new Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
      }),
    },
  ) {
    super();
  }

  async transferDataToServer(options: Record<string, unknown>) {
    if (this.media.hasMedia(options)) {
      return await this.media.buildFormDataConfig(options, this.requestOptions);
    } else return this.media.buildJSONConfig(options, this.requestOptions);
  }

  async request<T>(
    method: string,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    const apiUrl = `https://api.telegram.org/bot${this.authToken}/${method}`;
    const config = await this.transferDataToServer(options);
    const request = await fetch(apiUrl, config);
    const response: IRequestSuccess<T> | IRequestFailt = await request.json();

    if (!response.ok) {
      if (response.parameters?.retry_after) {
        this.emit("rate_limit", {
          method,
          date: new Date(),
          datestamp: Date.now(),
          parameters: options,
          error_code: response.error_code,
          description: response.description,
          retry_after: response.parameters.retry_after,
          migrate_to_chat_id: response.parameters?.migrate_to_chat_id,
        });
      }
      throw new HTTPResponseError(response, request);
    }

    return response.result;
  }
}

export { ApiRequest, IRateLimit };
