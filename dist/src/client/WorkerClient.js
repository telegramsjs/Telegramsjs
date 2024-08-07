"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorketClient = void 0;
const Message_1 = require("../structures/message/Message");
const Poll_1 = require("../structures/media/Poll");
const PollAnswer_1 = require("../structures/PollAnswer");
const InlineQuery_1 = require("../structures/InlineQuery");
const ShippingQuery_1 = require("../structures/ShippingQuery");
const ChatJoinRequest_1 = require("../structures/ChatJoinRequest");
const ChatBoostUpdated_1 = require("../structures/ChatBoostUpdated");
const ChatBoostRemoved_1 = require("../structures/ChatBoostRemoved");
const PreCheckoutQuery_1 = require("../structures/PreCheckoutQuery");
const ChatMemberUpdated_1 = require("../structures/ChatMemberUpdated");
const ChosenInlineResult_1 = require("../structures/ChosenInlineResult");
const MessageReactionUpdated_1 = require("../structures/MessageReactionUpdated");
const MessageReactionCountUpdated_1 = require("../structures/MessageReactionCountUpdated");
const CallbackQuery_1 = require("../structures/CallbackQuery");
const BusinessConnection_1 = require("../structures/business/BusinessConnection");
const BusinessMessagesDeleted_1 = require("../structures/business/BusinessMessagesDeleted");
/**
 * Handles incoming updates from the Telegram API and routes them to the appropriate event handlers.
 */
class WorketClient {
    /**
     * Creates an instance of WorketClient.
     * @param client - The Telegram client instance.
     */
    constructor(client) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
    }
    /**
     * Processes an incoming update and emits the corresponding event.
     * @param data - The update data received from Telegram.
     */
    processUpdate(data) {
        if ("message" in data ||
            "channel_post" in data ||
            "business_message" in data) {
            if ("new_chat_members" in (data.message || {})) {
                return this.onChatMemberAdd(data.message);
            }
            if ("left_chat_member" in (data.message || {})) {
                return this.onChatMemberRemove(data.message);
            }
            return this.onMessage(data.message || data.channel_post || data.business_message);
        }
        if ("business_connection" in data) {
            return this.onBusinessConnection(data.business_connection);
        }
        if ("edited_message" in data ||
            "edited_channel_post" in data ||
            "edited_business_message" in data) {
            return this.onMessageEdit(data.edited_message ||
                data.edited_channel_post ||
                data.edited_business_message);
        }
        if ("deleted_business_messages" in data) {
            return this.onDeletedBusinessMessages(data.deleted_business_messages);
        }
        if ("message_reaction" in data) {
            return this.onMessageReaction(data.message_reaction);
        }
        if ("message_reaction_count" in data) {
            return this.onMessageReactionCount(data.message_reaction_count);
        }
        if ("inline_query" in data) {
            return this.onInlineQuery(data.inline_query);
        }
        if ("chosen_inline_result" in data) {
            return this.onChosenInlineResult(data.chosen_inline_result);
        }
        if ("callback_query" in data) {
            return this.onCallbackQuery(data.callback_query);
        }
        if ("shipping_query" in data) {
            return this.onShippingQuery(data.shipping_query);
        }
        if ("pre_checkout_query" in data) {
            return this.onPreCheckoutQuery(data.pre_checkout_query);
        }
        if ("poll" in data) {
            return this.onPoll(data.poll);
        }
        if ("poll_answer" in data) {
            return this.onPollAnswer(data.poll_answer);
        }
        if ("my_chat_member" in data) {
            return this.onMyChatMember(data.my_chat_member);
        }
        if ("chat_member" in data) {
            return this.onChatMember(data.chat_member);
        }
        if ("chat_join_request" in data) {
            return this.onChatJoinRequest(data.chat_join_request);
        }
        if ("chat_boost" in data) {
            return this.onChatBoost(data.chat_boost);
        }
        if ("removed_chat_boost" in data) {
            return this.onRemovedChatBoost(data.removed_chat_boost);
        }
        return;
    }
    /**
     * Handles new messages, channel posts, or business messages.
     * @param data - The message data.
     */
    onMessage(data) {
        var _a;
        if (!data)
            return;
        const message = new Message_1.Message(this.client, data);
        if ("chat" in message) {
            (_a = message.chat) === null || _a === void 0 ? void 0 : _a.messages._add(data);
        }
        this.client.emit("message", message);
        return message;
    }
    /**
     * Handles new business connections.
     * @param data - The business connection data.
     */
    onBusinessConnection(data) {
        if (!data)
            return;
        const business = new BusinessConnection_1.BusinessConnection(this.client, data);
        this.client.emit("businessConnection", business);
        return business;
    }
    /**
     * Handles edited messages, channel posts, or business messages.
     * @param data - The edited message data.
     */
    onMessageEdit(data) {
        var _a;
        if (!data)
            return;
        const newMessage = new Message_1.Message(this.client, data);
        const oldMessage = ((_a = newMessage.chat) === null || _a === void 0 ? void 0 : _a.messages.cache.get(newMessage.id)) || null;
        this.client.emit("messageUpdate", oldMessage, newMessage);
        return [oldMessage, newMessage];
    }
    /**
     * Handles deleted business messages.
     * @param data - The deleted business messages data.
     */
    onDeletedBusinessMessages(data) {
        if (!data)
            return;
        const businessMessage = new BusinessMessagesDeleted_1.BusinessMessagesDeleted(this.client, data);
        this.client.emit("deletedBusinessMessages", businessMessage);
        return businessMessage;
    }
    /**
     * Handles reactions to messages.
     * @param data - The message reaction data.
     */
    onMessageReaction(data) {
        if (!data)
            return;
        const messageReaction = new MessageReactionUpdated_1.MessageReactionUpdated(this.client, data);
        this.client.emit("messageReaction", messageReaction);
        return messageReaction;
    }
    /**
     * Handles updates to message reaction counts.
     * @param data - The message reaction count data.
     */
    onMessageReactionCount(data) {
        if (!data)
            return;
        const messageReaction = new MessageReactionCountUpdated_1.MessageReactionCountUpdated(this.client, data);
        this.client.emit("messageReactionCount", messageReaction);
        return messageReaction;
    }
    /**
     * Handles incoming inline queries.
     * @param data - The inline query data.
     */
    onInlineQuery(data) {
        if (!data)
            return;
        const inline = new InlineQuery_1.InlineQuery(this.client, data);
        this.client.emit("inlineQuery", inline);
        return inline;
    }
    /**
     * Handles chosen inline results.
     * @param data - The chosen inline result data.
     */
    onChosenInlineResult(data) {
        if (!data)
            return;
        const chosenInline = new ChosenInlineResult_1.ChosenInlineResult(this.client, data);
        this.client.emit("chosenInlineResult", chosenInline);
        return chosenInline;
    }
    /**
     * Handles incoming callback queries.
     * @param data - The callback query data.
     */
    onCallbackQuery(data) {
        if (!data)
            return;
        const callback = new CallbackQuery_1.CallbackQuery(this.client, data);
        this.client.emit("callbackQuery", callback);
        return callback;
    }
    /**
     * Handles incoming shipping queries.
     * @param data - The shipping query data.
     */
    onShippingQuery(data) {
        if (!data)
            return;
        const shipping = new ShippingQuery_1.ShippingQuery(this.client, data);
        this.client.emit("shippingQuery", shipping);
        return shipping;
    }
    /**
     * Handles pre-checkout queries.
     * @param data - The pre-checkout query data.
     */
    onPreCheckoutQuery(data) {
        if (!data)
            return;
        const preCheckout = new PreCheckoutQuery_1.PreCheckoutQuery(this.client, data);
        this.client.emit("preCheckoutQuery", preCheckout);
        return preCheckout;
    }
    /**
     * Handles new polls.
     * @param data - The poll data.
     */
    onPoll(data) {
        if (!data)
            return;
        const poll = new Poll_1.Poll(this.client, data);
        this.client.emit("poll", poll);
        return poll;
    }
    /**
     * Handles new poll answers.
     * @param data - The poll answer data.
     */
    onPollAnswer(data) {
        if (!data)
            return;
        const poll = new PollAnswer_1.PollAnswer(this.client, data);
        this.client.emit("pollAnswer", poll);
        return poll;
    }
    /**
     * Handles updates to the client's chat member status.
     * @param data - The chat member update data.
     */
    onMyChatMember(data) {
        if (!data)
            return;
        const myChat = new ChatMemberUpdated_1.ChatMemberUpdated(this.client, data);
        this.client.emit("myChatMember", myChat);
        return myChat;
    }
    /**
     * Handles updates to chat members.
     * @param data - The chat member update data.
     */
    onChatMember(data) {
        if (!data)
            return;
        const chatMember = new ChatMemberUpdated_1.ChatMemberUpdated(this.client, data);
        this.client.emit("chatMember", chatMember);
        return chatMember;
    }
    /**
     * Handles new chat members being added.
     * @param data - The message data containing new chat members.
     */
    onChatMemberAdd(data) {
        var _a, _b;
        if (!data)
            return;
        const message = new Message_1.Message(this.client, data);
        if ("chat" in message) {
            (_a = message.chat) === null || _a === void 0 ? void 0 : _a.messages._add(data);
        }
        if (((_b = message.newChatMembers) === null || _b === void 0 ? void 0 : _b.findIndex(({ id }) => id === this.client.user.id)) !== -1) {
            this.client.emit("chatCreate", message);
            return message;
        }
        else {
            this.client.emit("chatMemberAdd", message);
            return message;
        }
    }
    /**
     * Handles chat members being removed.
     * @param data - The message data containing removed chat members.
     */
    onChatMemberRemove(data) {
        var _a, _b;
        if (!data)
            return;
        const message = new Message_1.Message(this.client, data);
        if ("chat" in message) {
            (_a = message.chat) === null || _a === void 0 ? void 0 : _a.messages._add(data);
        }
        if (((_b = message.leftChatMember) === null || _b === void 0 ? void 0 : _b.id) === this.client.user.id) {
            this.client.emit("chatDelete", message);
            return message;
        }
        else {
            this.client.emit("chatMemberRemove", message);
            return message;
        }
    }
    /**
     * Handles chat join requests.
     * @param data - The chat join request data.
     */
    onChatJoinRequest(data) {
        if (!data)
            return;
        const chatJoin = new ChatJoinRequest_1.ChatJoinRequest(this.client, data);
        this.client.emit("chatJoinRequest", chatJoin);
        return chatJoin;
    }
    /**
     * Handles updates to chat boosts.
     * @param data - The chat boost update data.
     */
    onChatBoost(data) {
        if (!data)
            return;
        const chatBoost = new ChatBoostUpdated_1.ChatBoostUpdated(this.client, data);
        this.client.emit("chatBoost", chatBoost);
        return chatBoost;
    }
    /**
     * Handles removed chat boosts.
     * @param data - The removed chat boost data.
     */
    onRemovedChatBoost(data) {
        if (!data)
            return;
        const chatBoost = new ChatBoostRemoved_1.ChatBoostRemoved(this.client, data);
        this.client.emit("removedChatBoost", chatBoost);
        return chatBoost;
    }
}
exports.WorketClient = WorketClient;
//# sourceMappingURL=WorkerClient.js.map