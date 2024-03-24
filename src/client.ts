import { Api } from "./api";
import { isRegExp } from "node:util";
import { Context } from "./core/context";
import type { ReadStream } from "node:fs";
import type { TlsOptions } from "node:tls";
import type { Buffer } from "node:buffer";
import type { RequestInit } from "node-fetch";
import { Webhook, Polling } from "./core/client/";
import type { MethodParameters } from "./core/types";
import type { ServerResponse, RequestListener } from "node:http";
import { TelegramTypeError, DefaultParameters } from "./core/util";
import type { Update, Message, ReactionTypeEmoji } from "@telegram.ts/types";
import { type EventKeysFunctions, EventAvaliableUpdates } from "./core/events";

interface ILoginOptions {
  polling?: {
    offset?: number;
    limit?: number;
    timeout?: number;
    allowed_updates?: MethodParameters["setWebhook"]["allowed_updates"];
    drop_pending_updates?: boolean;
  };
  webhook?: {
    url: string;
    port?: number;
    host?: string;
    path?: string;
    certificate?: Buffer | ReadStream | string;
    ip_address?: string;
    max_connections?: number;
    tlsOptions?: TlsOptions;
    requestCallback?: RequestListener;
    allowed_updates?: MethodParameters["setWebhook"]["allowed_updates"];
    drop_pending_updates?: boolean;
    secret_token?: string;
  };
}

class TelegramBot extends Api {
  webhook?: Webhook;
  polling?: Polling;

  constructor(authToken: string, requestOptions?: RequestInit) {
    if (!authToken) {
      throw new TelegramTypeError(
        "Specify a token to receive updates from Telegram",
      );
    }
    super(authToken, requestOptions);
  }

  command(
    name: string | string[] | RegExp,
    callback: (
      ctx: Update["message"] &
        Message.TextMessage &
        Context & {
          args: string[];
          command: string;
          payload: string;
        },
    ) => void,
  ) {
    this.on("message:text", (ctx) => {
      const cmdMessage = ctx.entities.botCommand;
      const cmdName =
        cmdMessage.hasEntities() &&
        cmdMessage.result[0].index === 0 &&
        cmdMessage.result[0].search;
      if (typeof cmdName !== "string" || cmdName === "") return;

      const callbackContext = Object.assign(ctx, {
        args: ctx.text.split(/\s+/).slice(1),
        command: cmdName,
        payload: ctx.text.split(/\s+/).join(" "),
      });

      if (typeof name === "string" && cmdName === `/${name}`) {
        callback(callbackContext);
      } else if (Array.isArray(name)) {
        if (name.some((commandName) => cmdName === `/${commandName}`)) {
          callback(callbackContext);
        }
      } else if (isRegExp(name)) {
        if (name.test(cmdName)) {
          callback(callbackContext);
        }
      }
    });
    return this;
  }

  action(
    name: string | string[] | RegExp,
    callback: (
      ctx: Update["callback_query"] & { data: string } & Context,
    ) => void,
  ) {
    this.on("callback_query:data", (ctx) => {
      if (typeof name === "string" && ctx.data === name) {
        callback(ctx);
      } else if (Array.isArray(name)) {
        if (name.some((actionData) => ctx.data === actionData)) {
          callback(ctx);
        }
      } else if (isRegExp(name)) {
        if (name.test(ctx.data)) {
          callback(ctx);
        }
      }
    });
    return this;
  }

  reaction(
    reactions: ReactionTypeEmoji["emoji"] | ReactionTypeEmoji["emoji"][],
    callback: (reaction: Update["message_reaction"] & Context) => void,
    reactionType: "all" | "newReaction" | "oldReaction" = "all",
  ) {
    this.on("message_reaction", async (reaction) => {
      const newReactionIndex = reaction.reactions.emojiAdded.findIndex(
        (added) => {
          if (typeof reactions === "string") {
            return added.includes(reactions);
          } else if (Array.isArray(reactions)) {
            return reactions.some((emoji) => added.includes(emoji));
          }
        },
      );
      const oldReactionIndex = reaction.reactions.emojiRemoved.findIndex(
        (remove) => {
          if (typeof reactions === "string") {
            return remove.includes(reactions);
          } else if (Array.isArray(reactions)) {
            return reactions.some((emoji) => remove.includes(emoji));
          }
        },
      );

      if (reactionType === "newReaction" && newReactionIndex !== -1) {
        await callback(reaction);
      } else if (reactionType === "oldReaction" && oldReactionIndex !== -1) {
        await callback(reaction);
      } else if (
        reactionType === "all" &&
        (newReactionIndex !== 1 || oldReactionIndex !== -1)
      ) {
        await callback(reaction);
      }
    });
    return this;
  }

  hears(
    text: string | string[] | RegExp,
    callback: (
      message: Update["message"] & Message.TextMessage & Context,
      args: string[],
    ) => void,
  ) {
    this.on("message:text", async (ctx) => {
      const content = ctx.text;
      const args = content.split(/\s+/);

      if (typeof name === "string" && ctx.text.includes(name)) {
        callback(ctx, args);
      } else if (Array.isArray(name)) {
        if (name.some((search) => ctx.text.includes(search))) {
          callback(ctx, args);
        }
      } else if (isRegExp(name)) {
        if (name.test(ctx.text)) {
          callback(ctx, args);
        }
      }
    });
    return this;
  }

  gameQuery(
    game: string | string[] | RegExp,
    callback: (
      gameQuery: Update["callback_query"] & {
        game_short_name: string;
      } & Context,
    ) => void,
  ) {
    this.on("callback_query", async (ctx) => {
      if (!ctx.game_short_name) return;
      const gameShortName = ctx.game_short_name;
      const callbackQueryGame = Object.assign(ctx, {
        game_short_name: gameShortName,
      });

      if (typeof name === "string" && gameShortName.includes(name)) {
        callback(callbackQueryGame);
      } else if (Array.isArray(name)) {
        if (name.some((game) => gameShortName.includes(game))) {
          callback(callbackQueryGame);
        }
      } else if (isRegExp(name)) {
        if (name.test(gameShortName)) {
          callback(callbackQueryGame);
        }
      }
    });
    return this;
  }

  inlineQuery(
    text: string | string[] | RegExp,
    callback: (inlineQuery: Update["inline_query"] & Context) => void,
  ) {
    this.on("inline_query", async (ctx) => {
      if (typeof name === "string" && ctx.query.includes(name)) {
        callback(ctx);
      } else if (Array.isArray(name)) {
        if (name.some((search) => ctx.query.includes(search))) {
          callback(ctx);
        }
      } else if (isRegExp(name)) {
        if (name.test(ctx.query)) {
          callback(ctx);
        }
      }
    });
    return this;
  }

  mention() {}
  hashtag() {}
  cashtag() {}
  url() {}
  email() {}
  phoneNumber() {}
  bold() {}
  italic() {}
  underline() {}
  strikethrough() {}
  spoiler() {}
  blockquote() {}
  code() {}

  async login(options: ILoginOptions = { polling: DefaultParameters }) {
    this.getMe()
      .then((res) => {
        this.emit("ready", res);
      })
      .catch((err) => {
        throw err;
      });
    if (options.polling) {
      this.polling = new Polling(this, options.polling);
      await this.deleteWebhook(options.polling?.drop_pending_updates);
      await this.polling.startPolling();
      return;
    }
    if (options.webhook) {
      this.webhook = new Webhook(
        this,
        options.webhook.path,
        options.webhook.secret_token,
      );
      await this.setWebhook(options.webhook);
      await this.webhook.startWebhook({
        port: options.webhook.port,
        host: options.webhook.host,
        tlsOptions: options.webhook.tlsOptions,
        requestCallback: options.webhook.requestCallback,
      });
      return;
    }
  }
}

export { TelegramBot, ILoginOptions };
