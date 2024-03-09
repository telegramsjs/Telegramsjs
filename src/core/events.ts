import { EventEmitter } from "node:events";
import type { Context } from "./context";
import type { RateLimit } from "./request";
import type { Update, UserFromGetMe } from "@telegram.ts/types";

const eventAvaliableUpdates = {
  message: {
    event: "message",
    properties: [
      {
        name: "text",
        event: "message:text",
      },
      {
        name: "caption",
        event: "message:caption",
      },
    ],
  },
  edited_message: {
    event: "edited_message",
    properties: [
      {
        name: "text",
        event: "edited_message:text",
      },
      {
        name: "caption",
        event: "edited_message:caption",
      },
    ],
  },
  channel_post: {
    event: "channel_post",
    properties: [
      {
        name: "text",
        event: "channel_post:text",
      },
      {
        name: "caption",
        event: "channel_post:caption",
      },
    ],
  },
  message_reaction: {
    event: "message_reaction",
  },
  message_reaction_count: {
    event: "message_reaction_count",
  },
  edited_channel_post: {
    event: "edited_channel_post",
    properties: [
      {
        name: "text",
        event: "edited_channel_post:text",
      },
      {
        name: "caption",
        event: "edited_channel_post:caption",
      },
    ],
  },
  inline_query: {
    event: "inline_query",
  },
  chosen_inline_result: {
    event: "chosen_inline_result",
  },
  callback_query: {
    event: "callback_query",
    properties: [
      {
        name: "data",
        event: "callback_query:data",
      },
      {
        name: "game_short_name",
        event: "callback_query:game_short_name",
      },
    ],
  },
  shipping_query: {
    event: "shipping_query",
  },
  pre_checkout_query: {
    event: "pre_checkout_query",
  },
  poll: {
    event: "poll",
  },
  poll_answer: {
    event: "poll_answer",
  },
  chat_member: {
    event: "chat_member",
  },
  my_chat_member: {
    event: "my_chat_member",
  },
  chat_join_request: {
    event: "chat_join_request",
  },
  chat_boost: {
    event: "chat_boost",
  },
  removed_chat_boost: {
    event: "removed_chat_boost",
  },
};

interface EventFunctions {
  ready: (data: UserFromGetMe) => unknown;
  update: (data: Update) => unknown;
  rate_limit: (data: RateLimit) => unknown;
  disconnect: () => unknown;
  message: (data: Update["message"] & Context) => unknown;
  edited_message: (data: Update["edited_message"] & Context) => unknown;
  channel_post: (data: Update["channel_post"] & Context) => unknown;
  message_reaction: (data: Update["message_reaction"] & Context) => unknown;
  message_reaction_count: (
    data: Update["message_reaction_count"] & Context,
  ) => unknown;
  edited_channel_post: (
    data: Update["edited_channel_post"] & Context,
  ) => unknown;
  inline_query: (data: Update["inline_query"] & Context) => unknown;
  chosen_inline_result: (
    data: Update["chosen_inline_result"] & Context,
  ) => unknown;
  callback_query: (data: Update["callback_query"] & Context) => unknown;
  shipping_query: (data: Update["shipping_query"] & Context) => unknown;
  pre_checkout_query: (data: Update["pre_checkout_query"] & Context) => unknown;
  poll: (data: Update["poll"] & Context) => unknown;
  poll_answer: (data: Update["poll_answer"] & Context) => unknown;
  chat_member: (data: Update["chat_member"] & Context) => unknown;
  my_chat_member: (data: Update["my_chat_member"] & Context) => unknown;
  chat_join_request: (data: Update["chat_join_request"] & Context) => unknown;
  chat_boost: (data: Update["chat_boost"] & Context) => unknown;
  removed_chat_boost: (data: Update["removed_chat_boost"] & Context) => unknown;
}

type EventKeysFunctions = keyof EventFunctions;

class ManagerEvents extends EventEmitter {
  constructor() {
    super();
  }

  on<T extends keyof EventFunctions>(
    event: T,
    listener: EventFunctions[T],
  ): this;

  on(event: string, listener: (...data: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  once<T extends keyof EventFunctions>(
    event: T,
    listener: EventFunctions[T],
  ): this;

  once(event: string, listener: (...data: any[]) => void) {
    super.once(event, listener);
    return this;
  }

  emit<T extends keyof EventFunctions>(event: T, data?: unknown): boolean;

  emit(event: string, data?: unknown) {
    return super.emit(event, data);
  }

  off<T extends keyof EventFunctions>(
    event: T,
    listener: EventFunctions[T],
  ): this;

  off(event: string, listener: (...data: any[]) => void) {
    super.off(event, listener);
    return this;
  }
}

export {
  ManagerEvents,
  eventAvaliableUpdates,
  type EventFunctions,
  type EventKeysFunctions,
};
