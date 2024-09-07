import type { Api } from "../../api";
import type { Context } from "../context";
import type { UpdateReturn, PossiblyAsync } from "../types";
import { Collection } from "@telegram.ts/collection";
import type {
  Update,
  ReactionType,
  ReactionTypeEmoji,
  ReactionTypeCustomEmoji,
  ReactionTypePaid,
  MessageReactionUpdated,
} from "@telegram.ts/types";

/**
 * Represents the configuration for awaiting reactions.
 */
interface IReactionCollection {
  /** The user ID associated with the reaction. */
  userId: number | undefined;
  /** The reaction details. */
  react: {
    /** The emoji or emojis to react to. */
    emoji: ReactionTypeEmoji["emoji"] | ReactionTypeEmoji["emoji"][];
    /** The type of reaction to listen for: "new", "old", or "both". */
    reactionType: "new" | "old" | "both";
  };
  /** The callback function when a reaction is received. */
  onCallback: (
    data: Update["message_reaction"] & Context,
    collection: Collection<string, IReactionCollection>,
  ) => PossiblyAsync<unknown>;
  /** The optional error callback function. */
  onError?: (
    data: Collection<string, IReactionCollection>,
  ) => PossiblyAsync<unknown>;
  /** The timeout duration in milliseconds. */
  timeout: number;
  /** The optional filter function to apply before invoking the callback. */
  filter?: (
    data: Update["message_reaction"] & Context,
  ) => PossiblyAsync<unknown>;
  /** The reaction data and context. */
  data: Update["message_reaction"] & Context;
}

/**
 * A class for handling message reactions.
 */
class Reaction {
  /**
   * Creates an instance of Reaction.
   * @param api - The Telegram API instance.
   */
  constructor(public readonly api: Api) {}

  /**
   * Retrieves information about reactions to a message.
   * @param messageReaction - The message reaction object.
   * @returns Information about the reactions.
   */
  static reactions(messageReaction?: MessageReactionUpdated): {
    emoji: string[];
    emojiAdded: string[];
    emojiKept: string[];
    emojiRemoved: string[];
    customEmoji: string[];
    customEmojiAdded: string[];
    customEmojiKept: string[];
    customEmojiRemoved: string[];
    paidEmojiAdded: boolean;
    paidEmojiRemoved: boolean;
  } {
    const { old_reaction, new_reaction } = messageReaction || {
      old_reaction: [],
      new_reaction: [],
    };

    const emoji = isEmoji(new_reaction);
    const customEmoji = isCustomEmoji(new_reaction);
    const emojiRemoved = isEmoji(old_reaction);
    const customEmojiRemoved = isCustomEmoji(old_reaction);
    const paidEmojiAdded = isPaidEmoji(new_reaction);
    const paidEmojiRemoved = isPaidEmoji(old_reaction);

    const emojiAdded = emoji.filter(
      (emojiItem) => !emojiRemoved.includes(emojiItem),
    );
    const customEmojiAdded = customEmoji.filter(
      (emojiItem) => !customEmojiRemoved.includes(emojiItem),
    );

    const emojiKept = emoji.filter((emojiItem) =>
      emojiRemoved.includes(emojiItem),
    );
    const customEmojiKept = customEmoji.filter((emojiItem) =>
      customEmojiRemoved.includes(emojiItem),
    );

    return {
      emoji,
      emojiAdded,
      emojiKept,
      emojiRemoved,
      customEmoji,
      customEmojiAdded,
      customEmojiKept,
      customEmojiRemoved,
      paidEmojiAdded,
      paidEmojiRemoved,
    };
  }

  /**
   * Waits for reactions to a message.
   * @param options - The options for waiting for reactions.
   * @returns A promise that resolves when the desired reactions are received.
   */
  async awaitReaction(options: {
    /** The reaction configuration. */
    react: {
      /** The emoji or emojis to wait for. */
      emoji: ReactionTypeEmoji["emoji"] | ReactionTypeEmoji["emoji"][];
      /** The type of reaction to wait for: "new", "old", or "both". */
      reactionType?: "new" | "old" | "both";
    };
    /** The callback function when reactions are received. */
    onCallback: (
      data: Update["message_reaction"] & Context,
      collection: Collection<string, IReactionCollection>,
    ) => PossiblyAsync<unknown>;
    /** The optional error callback function. */
    onError?: (
      data: Collection<string, IReactionCollection>,
    ) => PossiblyAsync<unknown>;
    /** The number of reactions to wait for. */
    count?: number;
    /** The timeout duration in milliseconds. */
    timeout?: number;
    /** The optional filter function to apply before invoking the callback. */
    filter?: (
      data: Update["message_reaction"] & Context,
    ) => PossiblyAsync<boolean>;
  }): Promise<unknown> {
    const collection: Collection<string, IReactionCollection> =
      new Collection();
    const {
      react,
      onCallback,
      onError,
      count = 1,
      timeout = 60000,
      filter,
    } = options;

    return new Promise((resolve, reject) => {
      const reactions = Array.isArray(react.emoji)
        ? react.emoji
        : [react.emoji];
      const reactionType = react.reactionType || "both";
      const startTime = Date.now();
      const handler = async (data: Update["message_reaction"] & Context) => {
        const newReactions =
          reactionType !== "old"
            ? data.new_reaction.map(
                (reaction) => (reaction as ReactionTypeEmoji).emoji,
              )
            : [];
        const oldReactions =
          reactionType !== "new"
            ? data.old_reaction.map(
                (reaction) => (reaction as ReactionTypeEmoji).emoji,
              )
            : [];
        const allReactions: ReactionTypeEmoji["emoji"][] = [
          ...newReactions,
          ...oldReactions,
        ];

        if (allReactions.some((reaction) => reactions.includes(reaction))) {
          if (!filter || (filter && (await filter(data)))) {
            collection.set(`${data.user?.id}_${Date.now()}`, {
              userId: data.user?.id,
              react: { ...react, reactionType },
              onCallback,
              onError,
              timeout,
              filter,
              data,
            });

            try {
              if (collection.size === count) {
                this.api.off("message_reaction", handler);
                clearTimeout(timeoutHandler);
                const result = await onCallback(data, collection);
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          }
        }
      };

      const timeoutHandler = setTimeout(async () => {
        const elapsedTime = Date.now() - startTime;
        this.api.off("message_reaction", handler);
        if (onError) {
          await onError(collection);
        } else {
          reject(new Error(`Reaction not received within ${timeout} ms`));
        }
      }, timeout);
      this.api.on("message_reaction", handler);
    });
  }
}

function isEmoji(reaction: ReactionType[]) {
  const reactionTypeEmojis = reaction.filter(
    (react) => react.type === "emoji",
  ) as ReactionTypeEmoji[];
  return reactionTypeEmojis.map((react) => react.emoji);
}

function isCustomEmoji(reaction: ReactionType[]) {
  const reactionTypeCustomEmojis = reaction.filter(
    (react) => react.type === "custom_emoji",
  ) as ReactionTypeCustomEmoji[];
  return reactionTypeCustomEmojis.map((react) => react.custom_emoji_id);
}

function isPaidEmoji(reaction: ReactionType[]) {
  const reactionTypePaidEmojis = reaction.filter(
    (react) => react.type === "paid",
  ) as ReactionTypePaid[];
  return reactionTypePaidEmojis.length > 0;
}

export { Reaction, IReactionCollection };
