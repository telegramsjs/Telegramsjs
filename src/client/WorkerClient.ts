import type { Update } from "@telegram.ts/types";
import { Message } from "../structures/Message";
import type { TelegramClient } from "./TelegramClient";

class WorketClient {
  constructor(public readonly client: TelegramClient) {}

  processUpdate(data: Update) {
    if ("message" in data || "channel_post" in data) {
      this.onMessage(data.message || data.channel_post);
    }
  }

  onMessage(data: Update["message"] | Update["channel_post"]) {
    const message = new Message(this.client, data);

    if ("chat" in message) {
      message.chat.messages._add(data);
    }

    this.client.emit("message", message);
  }
}

export { WorketClient };
