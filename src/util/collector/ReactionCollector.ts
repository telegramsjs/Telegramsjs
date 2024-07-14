import type { TelegramClient } from "../../client/TelegramClient";
import { Collection } from "@telegram.ts/collection";
import type {
  Emoji,
  CustomEmoji,
  MessageReactionUpdated,
} from "../../structures/MessageReactionUpdated";
import type { Chat } from "../../structures/chat/Chat";
import {
  Collector,
  type ICollectorEvent,
  type ICollectorOptions,
} from "./Collector";

/**
 * Interface for reaction event collector.
 */
interface IReactionEventCollector
  extends ICollectorEvent<string, MessageReactionUpdated> {
  /**
   * Event emitted when a user reacts.
   * @param data - The collection of user reactions.
   */
  user: (
    data: Collection<number, MessageReactionUpdated[] | MessageReactionUpdated>,
  ) => void;

  /**
   * Event emitted when a reaction is created.
   * @param data - The reaction context.
   */
  create: (data: MessageReactionUpdated) => void;
}

/**
 * Collector class for handling message reactions in a specific chat.
 */
class ReactionCollector extends Collector<string, MessageReactionUpdated> {
  /**
   * The chat in which reactions are being collected.
   */
  public chat: Chat;

  /**
   * The number of received reactions.
   */
  public received: number = 0;

  /**
   * Collection of users and their reactions.
   */
  public users: Collection<
    number,
    MessageReactionUpdated[] | MessageReactionUpdated
  > = new Collection();

  /**
   * Creates an instance of ReactionCollector.
   * @param client - The TelegramClient instance.
   * @param reaction - The initial message context.
   * @param options - The options for the collector.
   */
  constructor(
    public readonly client: TelegramClient,
    public readonly reaction: MessageReactionUpdated,
    public readonly options: ICollectorOptions<
      string,
      MessageReactionUpdated
    > = {},
  ) {
    super(options);
    this.chat = reaction.chat;

    client.incrementMaxListeners();
    client.on("messageReaction", this.handleCollect);
    this.once("end", () => {
      client.off("messageReaction", this.handleCollect);
      client.decrementMaxListeners();
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
  collect(reaction: MessageReactionUpdated): string | null {
    const { chat, added, removed } = reaction;

    const isReactionInCorrectChat = this.chat.id === chat.id;
    const hasNewOrOldReaction = added?.length > 0 || removed?.length > 0;

    if (!isReactionInCorrectChat || !hasNewOrOldReaction) {
      return null;
    }

    this.received++;
    this.handleUsers(reaction);

    return ReactionCollector.getKeyFromReaction(
      added.shift() || removed.shift(),
    );
  }

  /**
   * Disposes of a reaction.
   * @param reaction - The reaction context.
   * @returns The key of the reaction or null.
   */
  dispose(reaction: MessageReactionUpdated): string | null {
    const { chat, added, removed } = reaction;

    const isReactionInCorrectChat = this.chat.id === chat.id;
    const hasNewOrOldReaction = added?.length > 0 || removed?.length > 0;

    if (isReactionInCorrectChat && hasNewOrOldReaction) {
      return ReactionCollector.getKeyFromReaction(
        added.shift() || removed.shift(),
      );
    } else {
      return null;
    }
  }

  /**
   * Handles users' reactions.
   * @param reaction - The reaction context.
   */
  handleUsers(reaction: MessageReactionUpdated) {
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
  static getKeyFromReaction(reaction: Emoji | CustomEmoji): string | null {
    if (!reaction) {
      return null;
    }

    if (reaction.isEmoji()) {
      return reaction.emoji || null;
    } else if (reaction.isCustomEmoji()) {
      return reaction.customEmoji || null;
    } else {
      return null;
    }
  }
}

export { ReactionCollector, IReactionEventCollector };
