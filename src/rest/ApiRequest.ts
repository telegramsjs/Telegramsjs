import { Agent } from "node:https";
import { MediaData } from "./MediaData";
import fetch, { type RequestInit } from "node-fetch";
import { HTTPResponseError } from "../errors/HTTPResponseError";
import type { IRequestFailt, IRequestSuccess } from "../types";

class ApiRequest {
  public media: MediaData = new MediaData();

  constructor(
    public readonly authToken: string,
    public readonly requestOptions: RequestInit = {
      agent: new Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
      }),
    },
  ) {}

  async transferDataToServer(options: Record<string, unknown>) {
    if (this.media.hasMedia(options)) {
      return await this.media.buildFormDataConfig(options, this.requestOptions);
    } else return this.media.buildJSONConfig(options, this.requestOptions);
  }

  async get<T>(
    method: string,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    const apiUrl = `https://api.telegram.org/bot${this.authToken}/${method}`;
    const config = await this.transferDataToServer(options);
    const request = await fetch(apiUrl, config);
    const response: IRequestSuccess<T> | IRequestFailt = await request.json();

    if (!response.ok) {
      throw new HTTPResponseError(response, request);
    }

    return response.result;
  }
}

export { ApiRequest };
