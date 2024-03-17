import type { Context } from "../../context";
import type { TelegramBot } from "../../../client";
import { Collection } from "@telegram.ts/collection";
import {
  Collector,
  type ICollectorEvent,
  type ICollectorOptions,
} from "./Collector";
import type {
  Chat,
  Message,
  ReactionType,
  ReactionTypeEmoji,
  ReactionTypeCustomEmoji,
  MessageReactionUpdated,
} from "@telegram.ts/types";

type Msg = Omit<Context["msg"], "callbackQuery">;

type MessageReactions = Msg & Context;

type ReactCollectorContext = MessageReactionUpdated & Context;

interface IReactionEventCollector
  extends ICollectorEvent<string, ReactCollectorContext> {
  user: (
    data: Collection<number, ReactCollectorContext[] | ReactCollectorContext>,
  ) => void;
  create: (data: ReactCollectorContext) => void;
}

class ReactionCollector extends Collector<string, ReactCollectorContext> {
  channel: Chat;
  received: number = 0;
  users: Collection<number, ReactCollectorContext[] | ReactCollectorContext> =
    new Collection();

  constructor(
    public readonly telegram: TelegramBot,
    public readonly reaction: Msg,
    public readonly options: ICollectorOptions<
      string,
      ReactCollectorContext
    > = {},
  ) {
    super(options);
    this.channel = reaction.chat;

    telegram.incrementMaxListeners();
    telegram.on("message_reaction", this.handleCollect);
    this.once("end", () => {
      telegram.off("message_reaction", this.handleCollect);
      telegram.decrementMaxListeners();
    });
  }

  on<K extends keyof IReactionEventCollector>(
    event: K,
    listener: IReactionEventCollector[K],
  ): this {
    super.on(event, listener);
    return this;
  }

  once<K extends keyof IReactionEventCollector>(
    event: K,
    listener: IReactionEventCollector[K],
  ): this {
    super.once(event, listener);
    return this;
  }

  collect(reaction: ReactCollectorContext): string | null {
    const { chat, new_reaction, old_reaction } = reaction;

    const isReactionInCorrectChat = this.channel.id === chat.id;
    const hasNewOrOldReaction =
      new_reaction?.length > 0 || old_reaction?.length > 0;

    if (!isReactionInCorrectChat || !hasNewOrOldReaction) {
      return null;
    }

    this.received++;
    this.handleUsers(reaction);

    return ReactionCollector.getKeyFromReaction(new_reaction || old_reaction);
  }

  dispose(reaction: ReactCollectorContext): string | null {
    const { chat, new_reaction, old_reaction } = reaction;

    const isReactionInCorrectChat = this.channel.id === chat.id;
    const hasNewOrOldReaction =
      new_reaction?.length > 0 || old_reaction?.length > 0;

    if (isReactionInCorrectChat && hasNewOrOldReaction) {
      return ReactionCollector.getKeyFromReaction(new_reaction || old_reaction);
    } else {
      return null;
    }
  }

  handleUsers(reaction: ReactCollectorContext) {
    if (!reaction.user?.id) return;
    if (!this.users.has(reaction.user.id)) {
      if (this.users.size === 0) {
        this.emit("create", reaction);
      }
      this.users.set(reaction.user.id, reaction);
      return;
    }
    const getUser = this.users.get(reaction.user.id) || {};
    const setUser = Array.isArray(getUser) ? [...getUser] : [getUser];
    this.emit(
      "user",
      new Collection([[reaction.user.id, [...setUser, reaction]]]),
    );
    this.users.set(reaction.user.id, [...setUser, reaction]);
    return;
  }

  get endReason(): string | null {
    const { max, maxProcessed } = this.options;

    if (max && this.collected.size >= max) {
      return "limit";
    }

    if (maxProcessed && this.received === maxProcessed) {
      return "processedLimit";
    }

    return super.endReason;
  }

  static getKeyFromReaction(reaction: ReactionType[]): string | null {
    if (!Array.isArray(reaction) || reaction.length === 0) {
      return null;
    }

    const firstReaction = reaction[0];

    if (firstReaction.type === "emoji") {
      return firstReaction.emoji || null;
    } else if (firstReaction.type === "custom_emoji") {
      return firstReaction.custom_emoji || null;
    } else {
      return null;
    }
  }
}

export { ReactionCollector, ReactCollectorContext, IReactionEventCollector };
