"use strict";
const { Base } = require("../Base");
const { User } = require("../misc/User");
const { Chat } = require("../chat/Chat");
class MessageOrigin extends Base {
    /**
     * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
     * @param {import("@telegram.ts/types").MessageOrigin} data - Data about the describes the origin of a message
     */
    constructor(client, data) {
        super(client);
        /** Date the message was sent originally in Unix time */
        this.createdTimestamp = data.date;
        this._patch(data);
    }
    _patch(data) {
        if ("message_id" in data) {
            /**
             * Unique message identifier inside the chat
             * @type {number | undefined}
             */
            this.id = data.message_id;
        }
        if ("sender_user" in data) {
            /**
             * User that sent the message originally
             * @type {User | undefined}
             */
            this.senderUser = new User(this.client, data.sender_user);
        }
        if ("sender_user_name" in data) {
            /**
             * Name of the user that sent the message originally
             * @type {string | undefined}
             */
            this.username = data.sender_user_name;
        }
        if ("sender_chat" in data) {
            /**
             * Chat that sent the message originally
             * @type {Chat | undefined}
             */
            this.senderChat = new Chat(this.client, data.sender_chat);
        }
        if ("chat" in data) {
            /**
             * Channel chat to which the message was originally sent
             * @type {Chat | undefined}
             */
            this.chat = new Chat(this.client, data.chat);
        }
        if ("author_signature" in data) {
            /**
             * Signature of the original post author
             * @type {string | undefined}
             */
            this.authorSignature = data.author_signature;
        }
        return data;
    }
    /**
     * @return {this is this & { senderUser: User }}
     */
    isUser() {
        return Boolean("senderUser" in this && this.senderUser);
    }
    /**
     * @return {this is this & { username: string }}
     */
    isHiddenUser() {
        return Boolean("username" in this && this.username);
    }
    /**
     * @return {this is this & { senderChat: Chat; authorSignature?: string }}
     */
    isChat() {
        return Boolean("senderChat" in this && this.senderChat);
    }
    /**
     * @return {this is this & { id: number; chat: Chat; authorSignature?: string }}
     */
    isChennel() {
        return Boolean("id" in this && this.id && "chat" in this && this.chat);
    }
    /**
     * Date the message was sent originally
     * @type {Date}
     */
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
}
module.exports = { MessageOrigin };
//# sourceMappingURL=MessageOrigin.js.map