"use strict";
const { Base } = require("./Base");
const { Chat } = require("./chat/Chat");
const { User } = require("./misc/User");
const { ReactionType } = require("./misc/ReactionType");
class MessageReactionUpdated extends Base {
    /**
     * @param {import("../client/TelegramClient").TelegramClient | import("../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").MessageReactionUpdated} data - Data about the represents a change of a reaction on a message performed by a user
     */
    constructor(client, data) {
        super(client);
        /** Unique identifier of the message inside the chat */
        this.id = data.message_id;
        /** The chat containing the message the user reacted to */
        this.chat = new Chat(this.client, data.chat);
        if ("user" in data) {
            /** The user that changed the reaction, if the user isn't anonymous */
            this.user = new User(this.client, data.user);
        }
        if ("actor_chat" in data) {
            /** The chat on behalf of which the reaction was changed, if the user is anonymous */
            this.actorChat = new Chat(this.client, data.actor_chat);
        }
        /** Date of the change in Unix time */
        this.createdTimestamp = data.date;
        /** Previous list of reaction types that were set by the user */
        this.added = data.new_reaction.map((data) => new ReactionType(data));
        /** New list of reaction types that have been set by the user */
        this.removed = data.old_reaction.map((data) => new ReactionType(data));
    }
    /**
     * Date of the change
     * @type {Date}
     */
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    /**
     * Retrieves information about reactions to a message.
     * @param {MessageReactionUpdated} messageReaction - The message reaction object.
     * @returns Information about the reactions.
     */
    static reactions(messageReaction) {
        function isEmoji(reaction) {
            const reactionTypeEmojis = reaction.filter((react) => react.isEmoji());
            return reactionTypeEmojis.map((react) => react.moji);
        }
        function isCustomEmoji(reaction) {
            const reactionTypeCustomEmojis = reaction.filter((react) => react.isCustomEmoji());
            return reactionTypeCustomEmojis.map((react) => react.customEmoji);
        }
        const { added, removed } = messageReaction || {
            added: [],
            removed: [],
        };
        const emoji = isEmoji(added);
        const customEmoji = isCustomEmoji(added);
        const emojiRemoved = isEmoji(removed);
        const customEmojiRemoved = isCustomEmoji(removed);
        const emojiAdded = emoji.filter((emojiItem) => !emojiRemoved.includes(emojiItem));
        const customEmojiAdded = customEmoji.filter((emojiItem) => !customEmojiRemoved.includes(emojiItem));
        const emojiKept = emoji.filter((emojiItem) => emojiRemoved.includes(emojiItem));
        const customEmojiKept = customEmoji.filter((emojiItem) => customEmojiRemoved.includes(emojiItem));
        return {
            emoji,
            emojiAdded,
            emojiKept,
            emojiRemoved,
            customEmoji,
            customEmojiAdded,
            customEmojiKept,
            customEmojiRemoved,
        };
    }
}
module.exports = { MessageReactionUpdated };
//# sourceMappingURL=MessageReactionUpdated.js.map