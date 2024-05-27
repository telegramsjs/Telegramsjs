import type { TelegramBot } from "../../../client";
import { Collection } from "@telegram.ts/collection";
import type { ApiContext, Context } from "../../context";
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

type Msg = Omit<ApiContext["msg"], "callbackQuery">;

type MessageReactions = Msg & Context;

type ReactCollectorContext = MessageReactionUpdated & Context;

/**
 * Interface for reaction event collector.
 */
interface IReactionEventCollector
  extends ICollectorEvent<string, ReactCollectorContext> {
  /**
   * Event emitted when a user reacts.
   * @param data - The collection of user reactions.
   */
  user: (
    data: Collection<number, ReactCollectorContext[] | ReactCollectorContext>,
  ) => void;

  /**
   * Event emitted when a reaction is created.
   * @param data - The reaction context.
   */
  create: (data: ReactCollectorContext) => void;
}

/**
 * Collector class for handling message reactions in a specific chat.
 */
class ReactionCollector extends Collector<string, ReactCollectorContext> {
  /**
   * The chat in which reactions are being collected.
   */
  channel: Chat;

  /**
   * The number of received reactions.
   */
  received: number = 0;

  /**
   * Collection of users and their reactions.
   */
  users: Collection<number, ReactCollectorContext[] | ReactCollectorContext> =
    new Collection();

  /**
   * Creates an instance of ReactionCollector.
   * @param telegram - The TelegramBot instance.
   * @param reaction - The initial message context.
   * @param options - The options for the collector.
   */
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

  /**
   * Registers an event listener for reaction events.
   * @param event - The event name.
   * @param listener - The event listener.
   * @returns The current instance of ReactionCollector.
   */
  on<K extends keyof IReactionEventCollector>(
    event: K,
    listener: IReactionEventCollector[K],
  ): this {
    super.on(event, listener);
    return this;
  }

  /**
   * Registers a one-time event listener for reaction events.
   * @param event - The event name.
   * @param listener - The event listener.
   * @returns The current instance of ReactionCollector.
   */
  once<K extends keyof IReactionEventCollector>(
    event: K,
    listener: IReactionEventCollector[K],
  ): this {
    super.once(event, listener);
    return this;
  }

  /**
   * Collects a reaction.
   * @param reaction - The reaction context.
   * @returns The key of the reaction or null.
   */
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

  /**
   * Disposes of a reaction.
   * @param reaction - The reaction context.
   * @returns The key of the reaction or null.
   */
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

  /**
   * Handles users' reactions.
   * @param reaction - The reaction context.
   */
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

  /**
   * Gets the reason for ending the collector.
   * @returns The reason for ending the collector or null.
   */
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

  /**
   * Gets the key from a reaction.
   * @param reaction - The reaction types.
   * @returns The key of the reaction or null.
   */
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
