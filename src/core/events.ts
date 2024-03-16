import { EventEmitter } from "node:events";
import type { Context } from "./context";
import type { IRateLimit } from "./request";
import type { Update, UserFromGetMe } from "@telegram.ts/types";

const EventAvaliableUpdates = {
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

interface IEventFunctions {
  ready: (data: UserFromGetMe) => void;
  update: (data: Update) => void;
  rate_limit: (data: IRateLimit) => void;
  disconnect: () => void;
  message: (data: Update["message"] & Context) => void;
  edited_message: (data: Update["edited_message"] & Context) => void;
  channel_post: (data: Update["channel_post"] & Context) => void;
  message_reaction: (data: Update["message_reaction"] & Context) => void;
  message_reaction_count: (
    data: Update["message_reaction_count"] & Context,
  ) => void;
  edited_channel_post: (data: Update["edited_channel_post"] & Context) => void;
  inline_query: (data: Update["inline_query"] & Context) => void;
  chosen_inline_result: (
    data: Update["chosen_inline_result"] & Context,
  ) => void;
  callback_query: (data: Update["callback_query"] & Context) => void;
  shipping_query: (data: Update["shipping_query"] & Context) => void;
  pre_checkout_query: (data: Update["pre_checkout_query"] & Context) => void;
  poll: (data: Update["poll"] & Context) => void;
  poll_answer: (data: Update["poll_answer"] & Context) => void;
  chat_member: (data: Update["chat_member"] & Context) => void;
  my_chat_member: (data: Update["my_chat_member"] & Context) => void;
  chat_join_request: (data: Update["chat_join_request"] & Context) => void;
  chat_boost: (data: Update["chat_boost"] & Context) => void;
  removed_chat_boost: (data: Update["removed_chat_boost"] & Context) => void;
}

type EventKeysFunctions = keyof IEventFunctions;

class ManagerEvents extends EventEmitter {
  constructor() {
    super();
  }

  on<T extends keyof IEventFunctions>(
    event: T,
    listener: IEventFunctions[T],
  ): this;

  on(event: string, listener: (...data: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  once<T extends keyof IEventFunctions>(
    event: T,
    listener: IEventFunctions[T],
  ): this;

  once(event: string, listener: (...data: any[]) => void) {
    super.once(event, listener);
    return this;
  }

  emit<T extends keyof IEventFunctions>(event: T, data?: any): boolean;

  emit(event: string, data?: any) {
    return super.emit(event, data);
  }

  incrementMaxListeners() {
    const maxListeners = this.getMaxListeners();
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + 1);
    }
  }

  decrementMaxListeners() {
    const maxListeners = this.getMaxListeners();
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners - 1);
    }
  }

  off<T extends keyof IEventFunctions>(
    event: T,
    listener: IEventFunctions[T],
  ): this;

  off(event: string, listener: (...data: any[]) => void) {
    super.off(event, listener);
    return this;
  }
}

export {
  ManagerEvents,
  EventAvaliableUpdates,
  IEventFunctions,
  EventKeysFunctions,
};
