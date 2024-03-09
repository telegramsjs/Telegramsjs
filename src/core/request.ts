import fetch from "node-fetch";
import { Media } from "./media";
import { Agent } from "node:https";
import { ManagerEvents } from "./events";
import { HTTPResponseError } from "./util/HTTPResponseError";
import type { RequestFailt, RequestSuccess } from "./types";

interface RateLimit {
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
  defaultOptions = {
    apiRoot: "https://api.telegram.org",
    webhookReply: false,
    agent: new Agent({
      keepAlive: true,
      keepAliveMsecs: 10000,
    }),
  };

  constructor(public readonly authToken: string) {
    super();
  }

  async transferDataToServer(options: Record<string, unknown>) {
    if (this.media.hasMedia(options)) {
      return await this.media.buildFormDataConfig(
        options,
        this.defaultOptions.agent,
      );
    } else return this.media.buildJSONConfig(options);
  }

  async request<T>(
    method: string,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    try {
      const apiUrl = `https://api.telegram.org/bot${this.authToken}/${method}`;
      const config = await this.transferDataToServer(options);
      const request = await fetch(apiUrl, config);
      const response: RequestSuccess<T> | RequestFailt = await request.json();

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
          return {} as T;
        }
        throw new HTTPResponseError(response);
      }

      return response.result;
    } catch (err) {
      throw new HTTPResponseError(err as RequestFailt);
    }
  }
}

export { ApiRequest, RateLimit };
