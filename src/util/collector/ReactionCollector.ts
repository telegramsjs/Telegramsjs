import { Collection } from "@telegram.ts/collection";
import { Events, ReactionCollectorEvents } from "../Constants";
import { TelegramError } from "../../errors/TelegramError";
import { ErrorCodes } from "../../errors/ErrorCodes";
import type { TelegramClient } from "../../client/TelegramClient";
import type { MessageReactionUpdated } from "../../structures/MessageReactionUpdated";
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
    data: Collection<string, MessageReactionUpdated[] | MessageReactionUpdated>,
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
   * The number of received reactions.
   */
  public received: number = 0;

  /**
   * Collection of users and their reactions.
   */
  public users: Collection<
    string,
    MessageReactionUpdated[] | MessageReactionUpdated
  > = new Collection();

  /**
   * Creates an instance of ReactionCollector.
   * @param client - The TelegramClient instance.
   * @param chat - The chat in which reactions are being collected.
   * @param options - The options for the collector.
   */
  constructor(
    public readonly client: TelegramClient,
    public readonly chat: Chat,
    public override readonly options: ICollectorOptions<
      string,
      MessageReactionUpdated
    > = {},
  ) {
    super(options);

    if (!chat) {
      throw new TelegramError(ErrorCodes.ChatIdNotAvailable);
    }

    client.incrementMaxListeners();
    client.on(Events.MessageReaction, this.handleCollect);
    this.once(ReactionCollectorEvents.End, () => {
      client.off(Events.MessageReaction, this.handleCollect);
      client.decrementMaxListeners();
    });
  }

  /**
   * Registers an event listener for reaction events.
   * @param event - The event name.
   * @param listener - The event listener.
   * @returns The current instance of ReactionCollector.
   */
  override on<K extends keyof IReactionEventCollector>(
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
  override once<K extends keyof IReactionEventCollector>(
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
    const { chat, emojiSummary, customEmojiSummary, paidEmoji } = reaction;

    if (paidEmoji !== undefined) {
      return null;
    }

    const addedEmoji = emojiSummary?.added ?? customEmojiSummary?.added ?? [];
    const removedEmoji =
      emojiSummary?.removed ?? customEmojiSummary?.removed ?? [];

    const isReactionInCorrectChat = this.chat.id === chat.id;
    const hasNewOrOldReaction =
      addedEmoji?.length > 0 || removedEmoji?.length > 0;

    if (!isReactionInCorrectChat || !hasNewOrOldReaction) {
      return null;
    }

    this.received++;
    this.handleUsers(reaction);

    return addedEmoji.shift() || removedEmoji.shift() || null;
  }

  /**
   * Disposes of a reaction.
   * @param reaction - The reaction context.
   * @returns The key of the reaction or null.
   */
  dispose(reaction: MessageReactionUpdated): string | null {
    const { chat, emojiSummary, customEmojiSummary, paidEmoji } = reaction;

    if (paidEmoji !== undefined) {
      return null;
    }

    const addedEmoji = emojiSummary?.added ?? customEmojiSummary?.added ?? [];
    const removedEmoji =
      emojiSummary?.removed ?? customEmojiSummary?.removed ?? [];

    const isReactionInCorrectChat = this.chat.id === chat.id;
    const hasNewOrOldReaction =
      addedEmoji.length > 0 || removedEmoji.length > 0;

    if (isReactionInCorrectChat && hasNewOrOldReaction) {
      return addedEmoji.shift() || removedEmoji.shift() || null;
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
        this.emit(ReactionCollectorEvents.Create, reaction);
      }
      this.users.set(reaction.user.id, reaction);
      return;
    }
    const getUser = this.users.get(reaction.user.id) || {};
    const setUser = Array.isArray(getUser) ? [...getUser] : [getUser];
    this.emit(
      ReactionCollectorEvents.User,
      new Collection([[reaction.user.id, [...setUser, reaction]]]),
    );
    this.users.set(reaction.user.id, [...setUser, reaction]);
    return;
  }

  /**
   * Gets the reason for ending the collector.
   * @returns The reason for ending the collector or null.
   */
  override get endReason(): string | null {
    const { max, maxProcessed } = this.options;

    if (max && this.collected.size >= max) {
      return "limit";
    }

    if (maxProcessed && this.received === maxProcessed) {
      return "processedLimit";
    }

    return super.endReason;
  }
}

export { ReactionCollector, type IReactionEventCollector };
