import type { Api } from "../../api";
import type { Context } from "../context";
import type { UpdateReturn } from "../types";
import { Collection } from "@telegram.ts/collection";
import type {
  Update,
  ReactionType,
  ReactionTypeEmoji,
} from "@telegram.ts/types";

interface ReactionCollection {
  userId: number | undefined;
  react: {
    emoji: ReactionTypeEmoji["emoji"] | ReactionTypeEmoji["emoji"][];
    reactionType: "new" | "old" | "both";
  };
  onCallback: (
    data: Update["message_reaction"] & Context,
    collection: Collection<string, ReactionCollection>,
  ) => unknown;
  onError?: (data: Collection<string, ReactionCollection>) => unknown;
  timeout: number;
  filter?: (data: Update["message_reaction"] & Context) => unknown;
  data: Update["message_reaction"] & Context;
}

class Reaction {
  constructor(public readonly api: Api) {}

  reactions() {}

  async awaitReaction(options: {
    react: {
      emoji: ReactionTypeEmoji["emoji"] | ReactionTypeEmoji["emoji"][];
      reactionType?: "new" | "old" | "both";
    };
    onCallback: (
      data: Update["message_reaction"] & Context,
      collection: Collection<string, ReactionCollection>,
    ) => unknown;
    onError?: (data: Collection<string, ReactionCollection>) => unknown;
    count?: number;
    timeout?: number;
    filter?: (data: Update["message_reaction"] & Context) => boolean;
  }): Promise<unknown> {
    const collection: Collection<string, ReactionCollection> = new Collection();
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
        const allReactions = [...newReactions, ...oldReactions];

        if (allReactions.some((reaction) => reactions.includes(reaction))) {
          if (!filter || (filter && filter(data))) {
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

      const timeoutHandler = setTimeout(() => {
        const elapsedTime = Date.now() - startTime;
        this.api.off("message_reaction", handler);
        if (onError) {
          onError(collection);
        } else {
          reject(new Error(`Reaction not received within ${timeout} ms`));
        }
      }, timeout);
      this.api.on("message_reaction", handler);
    });
  }
}

export { Reaction };
