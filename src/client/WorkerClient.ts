import type { TelegramClient } from "./TelegramClient";
import { Message } from "../structures/Message";

class WorketClient {
  constructor(public readonly client: TelegramClient) {}

  processUpdate(data) {
    if ("message" in data || "channel_post" in data) {
      this.onMessage(data.message || data.channel_post);
    }
  }

  onMessage(data) {
    const message = new Message(this.client, data);
    this.client.emit("message", message);
  }
}

export { WorketClient };
