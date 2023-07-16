"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedClass = void 0;
const MessageCollector_1 = require("../collection/MessageCollector");
const messageTypeMap = {
    message: {
        event: "message",
        textEvent: "text",
    },
    edited_message: {
        event: "edited_message",
        textEvent: "edited_message_text",
        captionEvent: "edited_message_caption",
    },
    channel_post: {
        event: "channel_post",
    },
    edited_channel_post: {
        event: "edited_channel_post",
        textEvent: "edited_channel_post_text",
        captionEvent: "edited_channel_post_caption",
    },
    inline_query: {
        event: "inline_query",
    },
    chosen_inline_result: {
        event: "chosen_inline_result",
    },
    callback_query: {
        event: "callback_query",
    },
    shipping_query: {
        event: "shipping_query",
    },
    pre_checkout_query: {
        event: "pre_checkout_query",
    },
    poll: {
        event: "poll",
    },
    poll_answer: {
        event: "poll_answer",
    },
    chat_member: {
        event: "chat_member",
    },
    my_chat_member: {
        event: "my_chat_member",
    },
    chat_join_request: {
        event: "chat_join_request",
    },
};
class CombinedClass {
    constructor(bot, botInfo) {
        this.bot = bot;
        this.botInfo = botInfo;
    }
    get getThreadId() {
        var _a, _b;
        const msg = this.getMessageFromAnySource;
        return ((_a = this.updates) === null || _a === void 0 ? void 0 : _a.is_topic_message)
            ? (_b = this.updates) === null || _b === void 0 ? void 0 : _b.message_thread_id
            : undefined;
    }
    get getMessageFromAnySource() {
        var _a, _b, _c, _d, _e;
        return ((_e = (_d = (_c = (_a = this.editedMessage) !== null && _a !== void 0 ? _a : (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : this.channelPost) !== null && _d !== void 0 ? _d : this.editedChannelPost) !== null && _e !== void 0 ? _e : this.updates);
    }
    get me() {
        var _a;
        const me = (_a = this.botInfo) === null || _a === void 0 ? void 0 : _a.username;
        return me;
    }
    get messageId() {
        const messageId = this.updates.message_id;
        return messageId;
    }
    get editedMessage() {
        var _a;
        const editedMessage = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.edited_message;
        return editedMessage;
    }
    get inlineQuery() {
        var _a;
        const inlineQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.inline_query;
        return inlineQuery;
    }
    get shippingQuery() {
        var _a;
        const shippingQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.shipping_query;
        return shippingQuery;
    }
    get preCheckoutQuery() {
        var _a;
        const preCheckoutQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.pre_checkout_query;
        return preCheckoutQuery;
    }
    get chosenInlineResult() {
        var _a;
        const chosenInlineResult = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chosen_inline_result;
        return chosenInlineResult;
    }
    get channelPost() {
        var _a;
        const channelPost = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.channel_post;
        return channelPost;
    }
    get editedChannelPost() {
        var _a;
        const editedChannelPost = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.edited_channel_post;
        return editedChannelPost;
    }
    get callbackQuery() {
        var _a;
        const callbackQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.callback_query;
        return callbackQuery;
    }
    get poll() {
        var _a;
        const poll = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.poll;
        return poll;
    }
    get pollAnswer() {
        var _a;
        const pollAnswer = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.poll_answer;
        return pollAnswer;
    }
    get myChatMember() {
        var _a;
        const myChatMember = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.my_chat_member;
        return myChatMember;
    }
    get chatMember() {
        var _a;
        const chatMember = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chat_member;
        return chatMember;
    }
    get chatJoinRequest() {
        var _a;
        const chatJoinRequest = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chat_join_request;
        return chatJoinRequest;
    }
    get chat() {
        var _a, _b, _c, _d;
        const chat = (_d = ((_c = (_b = (_a = this.chatMember) !== null && _a !== void 0 ? _a : this.myChatMember) !== null && _b !== void 0 ? _b : this.chatJoinRequest) !== null && _c !== void 0 ? _c : this.updates)) === null || _d === void 0 ? void 0 : _d.chat;
        if (!chat) {
            throw new Error("Chat is not available");
        }
        return chat;
    }
    get senderChat() {
        var _a;
        const senderChat = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.sender_chat;
        return senderChat;
    }
    get from() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const from = (_j = ((_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineQuery) !== null && _b !== void 0 ? _b : this.shippingQuery) !== null && _c !== void 0 ? _c : this.preCheckoutQuery) !== null && _d !== void 0 ? _d : this.chosenInlineResult) !== null && _e !== void 0 ? _e : this.chatMember) !== null && _f !== void 0 ? _f : this.myChatMember) !== null && _g !== void 0 ? _g : this.chatJoinRequest) !== null && _h !== void 0 ? _h : this.getMessageFromAnySource)) === null || _j === void 0 ? void 0 : _j.from;
        if (!from) {
            throw new Error("From is not available");
        }
        return from;
    }
    get inlineMessageId() {
        var _a, _b;
        const inlineMessageId = (_b = ((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.chosenInlineResult)) === null || _b === void 0 ? void 0 : _b.inline_message_id;
        if (!inlineMessageId) {
            throw new Error("inlineMessageId is not available");
        }
        return inlineMessageId;
    }
    get passportData() {
        var _a;
        if (this.updates == null)
            return undefined;
        if (!("passport_data" in this.updates))
            return undefined;
        return (_a = this.updates) === null || _a === void 0 ? void 0 : _a.passport_data;
    }
    /**
     * @see https://core.telegram.org/bots/api#answerinlinequery
     */
    answerInlineQuery(args) {
        var _a;
        return this.bot.answerInlineQuery(Object.assign({ inline_query_id: (_a = this.inlineQuery) === null || _a === void 0 ? void 0 : _a.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    answerCallbackQuery(args) {
        var _a;
        return this.bot.answerCallbackQuery(Object.assign({ callback_query_id: (_a = this.callbackQuery) === null || _a === void 0 ? void 0 : _a.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#answershippingquery
     */
    answerShippingQuery(args) {
        var _a;
        return this.bot.answerShippingQuery(Object.assign({ shipping_query_id: (_a = this.shippingQuery) === null || _a === void 0 ? void 0 : _a.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#answerprecheckoutquery
     */
    answerPreCheckoutQuery(args) {
        var _a;
        return this.bot.answerPreCheckoutQuery(Object.assign({ pre_checkout_query_id: (_a = this.preCheckoutQuery) === null || _a === void 0 ? void 0 : _a.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagetext
     */
    editMessageText(text, args) {
        var _a, _b, _c;
        return this.bot.editMessageText(Object.assign({ chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id, message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id, inline_message_id: this.inlineMessageId, text: text }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagecaption
     */
    editMessageCaption(caption, args) {
        var _a, _b, _c;
        return this.bot.editMessageCaption(Object.assign({ chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id, message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id, inline_message_id: this.inlineMessageId, caption: caption }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagemedia
     */
    editMessageMedia(media, reply_markup) {
        var _a, _b, _c;
        return this.bot.editMessageMedia({
            chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id,
            message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id,
            inline_message_id: this.inlineMessageId,
            media: media,
            reply_markup,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagereplymarkup
     */
    editMessageReplyMarkup(markup) {
        var _a, _b, _c;
        return this.bot.editMessageReplyMarkup({
            chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id,
            message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id,
            inline_message_id: this.inlineMessageId,
            reply_markup: markup,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagelivelocation
     */
    editMessageLiveLocation(replyMarkup) {
        var _a, _b, _c;
        return this.bot.editMessageLiveLocation({
            chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id,
            message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id,
            inline_message_id: this.inlineMessageId,
            reply_markup: replyMarkup,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#stopmessagelivelocation
     */
    stopMessageLiveLocation(latitude, longitude, args) {
        var _a, _b, _c;
        return this.bot.stopMessageLiveLocation(Object.assign({ chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id, message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id, inline_message_id: this.inlineMessageId, latitude,
            longitude }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    sendMessage(text, args) {
        return this.bot.sendMessage(Object.assign({ chat_id: this.chat.id, text, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#getchat
     */
    getChat() {
        return this.bot.getChat(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#exportchatinvitelink
     */
    exportChatInviteLink() {
        return this.bot.exportChatInviteLink(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#createchatinvitelink
     */
    createChatInviteLink(args) {
        return this.bot.createChatInviteLink(Object.assign({ chat_id: this.chat.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#editchatinvitelink
     */
    editChatInviteLink(args) {
        return this.bot.editChatInviteLink(Object.assign({ chat_id: this.chat.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#revokechatinvitelink
     */
    revokeChatInviteLink(invite_link) {
        return this.bot.revokeChatInviteLink({
            chat_id: this.chat.id,
            invite_link,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#banchatmember
     */
    banChatMember(userId, args) {
        return this.bot.banChatMember(Object.assign({ chat_id: this.chat.id, user_id: userId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#kickchatmember
     */
    get kickChatMember() {
        return this.banChatMember;
    }
    /**
     * @see https://core.telegram.org/bots/api#unbanchatmember
     */
    unbanChatMember(userId, onlyIfBanned) {
        return this.bot.unbanChatMember({
            chat_id: this.chat.id,
            user_id: userId,
            only_if_banned: onlyIfBanned,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#restrictchatmember
     */
    restrictChatMember(args) {
        return this.bot.restrictChatMember(Object.assign({ chat_id: this.chat.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#promotechatmember
     */
    promoteChatMember(userId, args) {
        return this.bot.promoteChatMember(Object.assign({ chat_id: this.chat.id, user_id: userId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
     */
    setChatAdministratorCustomTitle(args) {
        return this.bot.setChatAdministratorCustomTitle(Object.assign({ chat_id: this.chat.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatphoto
     */
    setChatPhoto(photo) {
        return this.bot.setChatPhoto({
            chat_id: this.chat.id,
            photo,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#deletechatphoto
     */
    deleteChatPhoto() {
        return this.bot.deleteChatPhoto(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchattitle
     */
    setChatTitle(title) {
        return this.bot.setChatTitle({
            chat_id: this.chat.id,
            title,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatdescription
     */
    setChatDescription(description) {
        return this.bot.setChatDescription({
            chat_id: this.chat.id,
            description,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#pinchatmessage
     */
    pinChatMessage(messageId, disableNotification) {
        return this.bot.pinChatMessage({
            chat_id: this.chat.id,
            message_id: messageId,
            disable_notification: disableNotification,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#unpinchatmessage
     */
    unpinChatMessage(messageId) {
        return this.bot.unpinChatMessage({
            chat_id: this.chat.id,
            message_id: messageId,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#unpinallchatmessages
     */
    unpinAllChatMessages() {
        return this.bot.unpinAllChatMessages(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#leavechat
     */
    leaveChat() {
        return this.bot.leaveChat(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatpermissions
     */
    setChatPermissions(permissions, use_independent_chat_permissions) {
        return this.bot.setChatPermissions({
            chat_id: this.chat.id,
            permissions,
            use_independent_chat_permissions,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatadministrators
     */
    getChatAdministrators() {
        return this.bot.getChatAdministrators(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatmember
     */
    getChatMember(userId) {
        return this.bot.getChatMember({
            chat_id: this.chat.id,
            user_id: userId,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatmemberscount
     */
    getChatMembersCount() {
        return this.bot.getChatMemberCount(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#setpassportdataerrors
     */
    setPassportDataErrors(errors) {
        return this.bot.setPassportDataErrors({
            user_id: this.from.id,
            errors,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendphoto
     */
    sendPhoto(photo, args) {
        return this.bot.sendPhoto(Object.assign({ chat_id: this.chat.id, photo, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmediagroup
     */
    sendMediaGroup(media, args) {
        return this.bot.sendMediaGroup(Object.assign({ chat_id: this.chat.id, media, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendaudio
     */
    sendAudio(audio, args) {
        return this.bot.sendAudio(Object.assign({ chat_id: this.chat.id, audio, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#senddice
     */
    sendDice(args) {
        return this.bot.sendDice(Object.assign({ chat_id: this.chat.id, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#senddocument
     */
    sendDocument(document, args) {
        return this.bot.sendDocument(Object.assign({ chat_id: this.chat.id, document, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendsticker
     */
    sendSticker(sticker, args) {
        return this.bot.sendSticker(Object.assign({ chat_id: this.chat.id, sticker, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvideo
     */
    sendVideo(video, args) {
        return this.bot.sendVideo(Object.assign({ chat_id: this.chat.id, video, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendanimation
     */
    sendAnimation(animation, args) {
        return this.bot.sendAnimation(Object.assign({ chat_id: this.chat.id, animation, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvideonote
     */
    sendVideoNote(videoNote, args) {
        return this.bot.sendVideoNote(Object.assign({ chat_id: this.chat.id, video_note: videoNote, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendinvoice
     */
    sendInvoice(args) {
        return this.bot.sendInvoice(Object.assign({ chat_id: this.chat.id, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendgame
     */
    sendGame(gameShortName, args) {
        return this.bot.sendGame(Object.assign({ chat_id: this.chat.id, game_short_name: gameShortName, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvoice
     */
    sendVoice(voice, args) {
        return this.bot.sendVoice(Object.assign({ chat_id: this.chat.id, voice, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    sendPoll(options, args) {
        return this.bot.sendPoll(Object.assign({ chat_id: this.chat.id, options, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#stoppoll
     */
    stopPoll(args) {
        return this.bot.stopPoll(Object.assign({ chat_id: this.chat.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendlocation
     */
    sendLocation(latitude, longitude, args) {
        return this.bot.sendLocation(Object.assign({ chat_id: this.chat.id, latitude,
            longitude, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvenue
     */
    sendVenue(latitude, longitude, title, address, args) {
        return this.bot.sendVenue(Object.assign({ chat_id: this.chat.id, latitude,
            longitude,
            title,
            address, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendcontact
     */
    sendContact(phoneNumber, firstName, args) {
        return this.bot.sendContact(Object.assign({ chat_id: this.chat.id, phone_number: phoneNumber, first_name: firstName, message_thread_id: this.getThreadId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#getstickerset
     */
    getStickerSet(name) {
        return this.bot.getStickerSet(name);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatstickerset
     */
    setChatStickerSet(stickerSetName) {
        return this.bot.setChatStickerSet({
            chat_id: this.chat.id,
            sticker_set_name: stickerSetName,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#deletechatstickerset
     */
    deleteChatStickerSet() {
        return this.bot.deleteChatStickerSet(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#createforumtopic
     */
    createForumTopic(args) {
        return this.bot.createForumTopic(Object.assign({ chat_id: this.chat.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#editforumtopic
     */
    editForumTopic(args) {
        return this.bot.editForumTopic(Object.assign({ chat_id: this.chat.id, message_thread_id: this.updates.message_thread_id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#closeforumtopic
     */
    closeForumTopic() {
        return this.bot.closeForumTopic({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#reopenforumtopic
     */
    reopenForumTopic() {
        return this.bot.reopenForumTopic({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#deleteforumtopic
     */
    deleteForumTopic() {
        return this.bot.deleteForumTopic({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
     */
    unpinAllForumTopicMessages() {
        return this.bot.unpinAllForumTopicMessages({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#editgeneralforumtopic
     */
    editGeneralForumTopic(name) {
        return this.bot.editGeneralForumTopic({
            chat_id: this.chat.id,
            name,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#closegeneralforumtopic
     */
    closeGeneralForumTopic() {
        return this.bot.closeGeneralForumTopic(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
     */
    reopenGeneralForumTopic() {
        return this.bot.reopenGeneralForumTopic(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
     */
    hideGeneralForumTopic() {
        return this.bot.hideGeneralForumTopic(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
     */
    unhideGeneralForumTopic() {
        return this.bot.unhideGeneralForumTopic(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#setstickerpositioninset
     */
    setStickerPositionInSet(sticker, position) {
        return this.bot.setStickerPositionInSet({
            sticker,
            position,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#setstickersetthumbnail
     */
    setStickerSetThumbnail(args) {
        return this.bot.setStickerSetThumbnail(Object.assign({}, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#deletestickerfromset
     */
    deleteStickerFromSet(sticker) {
        return this.bot.deleteStickerFromSet(sticker);
    }
    /**
     * @see https://core.telegram.org/bots/api#uploadstickerfile
     */
    uploadStickerFile(args) {
        return this.bot.uploadStickerFile(Object.assign({ user_id: this.from.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#createnewstickerset
     */
    createNewStickerSet(args) {
        return this.bot.createNewStickerSet(Object.assign({ user_id: this.from.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#addstickertoset
     */
    addStickerToSet(args) {
        return this.bot.addStickerToSet(Object.assign({ user_id: this.from.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#getmycommands
     */
    getMyCommands() {
        return this.bot.getMyCommands();
    }
    /**
     * @see https://core.telegram.org/bots/api#setmycommands
     */
    setMyCommands(commands) {
        return this.bot.setMyCommands({
            commands,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdown(text, args) {
        return this.reply(text, Object.assign({ parse_mode: "Markdown" }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdownV2(text, args) {
        return this.reply(text, Object.assign({ parse_mode: "MarkdownV2" }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithHTML(text, args) {
        return this.reply(text, Object.assign({ parse_mode: "HTML" }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#deletemessage
     */
    deleteMessage(messageId) {
        if (typeof messageId !== "undefined") {
            return this.bot.deleteMessage({
                chat_id: this.chat.id,
                message_id: messageId,
            });
        }
        const message = this.getMessageFromAnySource;
        return this.bot.deleteMessage({
            chat_id: this.chat.id,
            message_id: message.message_id,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#forwardmessage
     */
    forwardMessage(chatId, args) {
        var _a;
        const message = this.getMessageFromAnySource;
        return this.bot.forwardMessage(Object.assign({ chat_id: chatId, message_thread_id: (_a = message.chat) === null || _a === void 0 ? void 0 : _a.id, from_chat_id: message.message_id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#copymessage
     */
    copyMessage(chatId, args) {
        var _a;
        const message = this.getMessageFromAnySource;
        return this.bot.copyMessage(Object.assign({ chat_id: chatId, message_thread_id: (_a = message.chat) === null || _a === void 0 ? void 0 : _a.id, from_chat_id: message.message_id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#approvechatjoinrequest
     */
    approveChatJoinRequest(userId) {
        return this.bot.approveChatJoinRequest({
            chat_id: this.chat.id,
            user_id: userId,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#declinechatjoinrequest
     */
    declineChatJoinRequest(userId) {
        return this.bot.declineChatJoinRequest({
            chat_id: this.chat.id,
            user_id: userId,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#banchatsenderchat
     */
    banChatSenderChat(senderChatId) {
        return this.bot.banChatSenderChat({
            chat_id: this.chat.id,
            sender_chat_id: senderChatId,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#unbanchatsenderchat
     */
    unbanChatSenderChat(senderChatId) {
        return this.bot.unbanChatSenderChat({
            chat_id: this.chat.id,
            sender_chat_id: senderChatId,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatmenubutton
     */
    setChatMenuButton(menuButton) {
        return this.bot.setChatMenuButton({
            chat_id: this.chat.id,
            menu_button: menuButton,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatmenubutton
     */
    getChatMenuButton() {
        return this.bot.getChatMenuButton(this.chat.id);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    reply(text, args) {
        return this.bot.sendMessage(Object.assign({ text: text, chat_id: this.chat.id, reply_to_message_id: this.messageId }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    send(text, args) {
        return this.bot.sendMessage(Object.assign({ text: text, chat_id: this.chat.id }, args));
    }
    /**
     * @see https://core.telegram.org/bots/api#leavechat
     */
    leave() {
        return this.bot.leaveChat(this.chat.id);
    }
    messageCollector(filter, time, max) {
        const message = new MessageCollector_1.MessageCollector({
            chatId: this.chat.id,
            filter,
            time,
            max,
        });
        this.bot.on("message", (ctx) => {
            message.handleMessage(ctx);
        });
        return message;
    }
    processUpdate(webhook) {
        return __awaiter(this, void 0, void 0, function* () {
            let getUpdates;
            while (true) {
                if (!webhook) {
                    getUpdates = yield this.bot.getUpdates();
                }
                else {
                    getUpdates = yield webhook;
                }
                for (const update of getUpdates) {
                    for (const [type, options] of Object.entries(messageTypeMap)) {
                        const updateProperty = update[type];
                        this.updates = updateProperty;
                        if (updateProperty) {
                            const chat = Object.assign({}, updateProperty.chat, {
                                send: (text, args) => this.send(text, args),
                                leave: () => this.leave(),
                            });
                            const message = Object.assign(Object.assign({}, updateProperty), { chat, telegram: this.bot, reply: (text, args) => this.reply(text, args), answerInlineQuery: (args) => this.answerInlineQuery(args), answerCallbackQuery: (args) => this.answerCallbackQuery(args), answerShippingQuery: (args) => this.answerShippingQuery(args), answerPreCheckoutQuery: (args) => this.answerPreCheckoutQuery(args), editMessageText: (text, args) => this.editMessageText(text, args), editMessageCaption: (caption, args) => this.editMessageCaption(caption, args), editMessageMedia: (media, reply_markup) => this.editMessageMedia(media, reply_markup), editMessageReplyMarkup: (markup) => this.editMessageReplyMarkup(markup), editMessageLiveLocation: (replyMarkup) => this.editMessageLiveLocation(replyMarkup), stopMessageLiveLocation: (latitude, longitude, args) => this.stopMessageLiveLocation(latitude, longitude, args), sendMessage: (text, args) => this.sendMessage(text, args), getChat: () => this.getChat(), exportChatInviteLink: () => this.exportChatInviteLink(), createChatInviteLink: (args) => this.createChatInviteLink(args), editChatInviteLink: (args) => this.editChatInviteLink(args), revokeChatInviteLink: (invite_link) => this.revokeChatInviteLink(invite_link), banChatMember: (userId, args) => this.banChatMember(userId, args), kickChatMember: () => this.kickChatMember, unbanChatMember: (userId, onlyIfBanned) => this.unbanChatMember(userId, onlyIfBanned), restrictChatMember: (args) => this.restrictChatMember(args), promoteChatMember: (userId, args) => this.promoteChatMember(userId, args), setChatAdministratorCustomTitle: (args) => this.setChatAdministratorCustomTitle(args), setChatPhoto: (photo) => this.setChatPhoto(photo), deleteChatPhoto: () => this.deleteChatPhoto(), setChatTitle: (title) => this.setChatTitle(title), setChatDescription: (description) => this.setChatDescription(description), pinChatMessage: (messageId, disableNotification) => this.pinChatMessage(messageId, disableNotification), unpinChatMessage: (messageId) => this.unpinChatMessage(messageId), unpinAllChatMessages: () => this.unpinAllChatMessages(), leaveChat: () => this.leaveChat(), setChatPermissions: (permissions, use_independent_chat_permissions) => this.setChatPermissions(permissions, use_independent_chat_permissions), getChatAdministrators: () => this.getChatAdministrators(), getChatMember: (userId) => this.getChatMember(userId), getChatMembersCount: () => this.getChatMembersCount(), setPassportDataErrors: (errors) => this.setPassportDataErrors(errors), sendPhoto: (photo, args) => this.sendPhoto(photo, args), sendMediaGroup: (media, args) => this.sendMediaGroup(media, args), sendAudio: (audio, args) => this.sendAudio(audio, args), sendDice: (args) => this.sendDice(args), sendDocument: (document, args) => this.sendDocument(document, args), sendSticker: (sticker, args) => this.sendSticker(sticker, args), sendVideo: (video, args) => this.sendVideo(video, args), sendAnimation: (animation, args) => this.sendAnimation(animation, args), sendVideoNote: (videoNote, args) => this.sendVideoNote(videoNote, args), sendInvoice: (args) => this.sendInvoice(args), sendGame: (gameShortName, args) => this.sendGame(gameShortName, args), sendVoice: (voice, args) => this.sendVoice(voice, args), sendPoll: (options, args) => this.sendPoll(options, args), stopPoll: (args) => this.stopPoll(args), sendLocation: (latitude, longitude, args) => this.sendLocation(latitude, longitude, args), sendVenue: (latitude, longitude, title, address, args) => this.sendVenue(latitude, longitude, title, address, args), sendContact: (phoneNumber, firstName, args) => this.sendContact(phoneNumber, firstName, args), getStickerSet: (name) => this.getStickerSet(name), setChatStickerSet: (stickerSetName) => this.setChatStickerSet(stickerSetName), deleteChatStickerSet: () => this.deleteChatStickerSet(), createForumTopic: (args) => this.createForumTopic(args), editForumTopic: (args) => this.editForumTopic(args), closeForumTopic: () => this.closeForumTopic(), reopenForumTopic: () => this.reopenForumTopic(), deleteForumTopic: () => this.deleteForumTopic(), unpinAllForumTopicMessages: () => this.unpinAllForumTopicMessages(), editGeneralForumTopic: (name) => this.editGeneralForumTopic(name), closeGeneralForumTopic: () => this.closeGeneralForumTopic(), reopenGeneralForumTopic: () => this.reopenGeneralForumTopic(), hideGeneralForumTopic: () => this.hideGeneralForumTopic(), unhideGeneralForumTopic: () => this.unhideGeneralForumTopic(), setStickerPositionInSet: (sticker, position) => this.setStickerPositionInSet(sticker, position), setStickerSetThumbnail: (args) => this.setStickerSetThumbnail(args), deleteStickerFromSet: (sticker) => this.deleteStickerFromSet(sticker), uploadStickerFile: (args) => this.uploadStickerFile(args), createNewStickerSet: (args) => this.createNewStickerSet(args), addStickerToSet: (args) => this.addStickerToSet(args), getMyCommands: () => this.getMyCommands(), setMyCommands: (commands) => this.setMyCommands(commands), replyWithMarkdown: (text, args) => this.replyWithMarkdown(text, args), replyWithMarkdownV2: (text, args) => this.replyWithMarkdownV2(text, args), replyWithHTML: (text, args) => this.replyWithHTML(text, args), deleteMessage: (messageId) => this.deleteMessage(messageId), forwardMessage: (chatId, args) => this.forwardMessage(chatId, args), copyMessage: (chatId, args) => this.copyMessage(chatId, args), approveChatJoinRequest: (userId) => this.approveChatJoinRequest(userId), declineChatJoinRequest: (userId) => this.declineChatJoinRequest(userId), banChatSenderChat: (senderChatId) => this.banChatSenderChat(senderChatId), unbanChatSenderChat: (senderChatId) => this.unbanChatSenderChat(senderChatId), setChatMenuButton: (menuButton) => this.setChatMenuButton(menuButton), getChatMenuButton: () => this.getChatMenuButton(), messageCollector: (filter, time, max) => this.messageCollector(filter, time, max) });
                            this.bot.emit(options.event, message);
                            if (options.textEvent && updateProperty.text) {
                                this.bot.emit(options.textEvent, message);
                            }
                            if (options.captionEvent && updateProperty.caption) {
                                this.bot.emit(options.captionEvent, message);
                            }
                            if (type === "message" && updateProperty.reply_to_message) {
                                this.bot.emit("reply_message", message);
                            }
                            break;
                        }
                    }
                }
            }
        });
    }
}
exports.CombinedClass = CombinedClass;
