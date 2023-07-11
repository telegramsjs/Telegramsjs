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
        if (!me) {
            throw new Error("getMe is not available");
        }
        return me;
    }
    get messageId() {
        const messageId = this.updates.message_id;
        if (!messageId) {
            throw new Error("messageId is not available");
        }
        return messageId;
    }
    get editedMessage() {
        var _a;
        const editedMessage = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.edited_message;
        if (!editedMessage) {
            throw new Error("editedMessage is not available");
        }
        return editedMessage;
    }
    get inlineQuery() {
        var _a;
        const inlineQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.inline_query;
        if (!inlineQuery) {
            throw new Error("inlineQuery is not available");
        }
        return inlineQuery;
    }
    get shippingQuery() {
        var _a;
        const shippingQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.shipping_query;
        if (!shippingQuery) {
            throw new Error("shippingQuery is not available");
        }
        return shippingQuery;
    }
    get preCheckoutQuery() {
        var _a;
        const preCheckoutQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.pre_checkout_query;
        if (!preCheckoutQuery) {
            throw new Error("preCheckoutQuery is not available");
        }
        return preCheckoutQuery;
    }
    get chosenInlineResult() {
        var _a;
        const chosenInlineResult = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chosen_inline_result;
        if (!chosenInlineResult) {
            throw new Error("chosenInlineResult is not available");
        }
        return chosenInlineResult;
    }
    get channelPost() {
        var _a;
        const channelPost = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.channel_post;
        if (!channelPost) {
            throw new Error("channelPost is not available");
        }
        return channelPost;
    }
    get editedChannelPost() {
        var _a;
        const editedChannelPost = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.edited_channel_post;
        if (!editedChannelPost) {
            throw new Error("editedChannelPost is not available");
        }
        return editedChannelPost;
    }
    get callbackQuery() {
        var _a;
        const callbackQuery = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.callback_query;
        if (!callbackQuery) {
            throw new Error("CallbackQuery is not available");
        }
        return callbackQuery;
    }
    get poll() {
        var _a;
        const poll = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.poll;
        if (!poll) {
            throw new Error("Poll is not available");
        }
        return poll;
    }
    get pollAnswer() {
        const pollAnswer = this.updates.poll_answer;
        if (!pollAnswer) {
            throw new Error("PollAnswer is not available");
        }
        return pollAnswer;
    }
    get myChatMember() {
        var _a;
        const myChatMember = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.my_chat_member;
        if (!myChatMember) {
            throw new Error("myChatMember is not available");
        }
        return myChatMember;
    }
    get chatMember() {
        var _a;
        const chatMember = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chat_member;
        if (!chatMember) {
            throw new Error("chatMember is not available");
        }
        return chatMember;
    }
    get chatJoinRequest() {
        var _a;
        const chatJoinRequest = (_a = this.updates) === null || _a === void 0 ? void 0 : _a.chat_join_request;
        if (!chatJoinRequest) {
            throw new Error("chatJoinRequest is not available");
        }
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
        if (!senderChat) {
            throw new Error("senderChat is not available");
        }
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
    answerInlineQuery(args) {
        return this.bot.answerInlineQuery(Object.assign({ inline_query_id: this.inlineQuery.id }, args));
    }
    answerCallbackQuery(args) {
        return this.bot.answerCallbackQuery(Object.assign({ callback_query_id: this.callbackQuery.id }, args));
    }
    answerShippingQuery(args) {
        return this.bot.answerShippingQuery(Object.assign({ shipping_query_id: this.shippingQuery.id }, args));
    }
    answerPreCheckoutQuery(args) {
        return this.bot.answerPreCheckoutQuery(Object.assign({ pre_checkout_query_id: this.preCheckoutQuery.id }, args));
    }
    editMessageText(text, args) {
        var _a, _b, _c;
        return this.bot.editMessageText(Object.assign({ chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id, message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id, inline_message_id: this.inlineMessageId, text: text }, args));
    }
    editMessageCaption(caption, args) {
        var _a, _b, _c;
        return this.bot.editMessageCaption(Object.assign({ chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id, message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id, inline_message_id: this.inlineMessageId, caption: caption }, args));
    }
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
    editMessageReplyMarkup(markup) {
        var _a, _b, _c;
        return this.bot.editMessageReplyMarkup({
            chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id,
            message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id,
            inline_message_id: this.inlineMessageId,
            reply_markup: markup,
        });
    }
    editMessageLiveLocation(replyMarkup) {
        var _a, _b, _c;
        return this.bot.editMessageLiveLocation({
            chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id,
            message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id,
            inline_message_id: this.inlineMessageId,
            reply_markup: replyMarkup,
        });
    }
    stopMessageLiveLocation(latitude, longitude, args) {
        var _a, _b, _c;
        return this.bot.stopMessageLiveLocation(Object.assign({ chat_id: (_a = this.chat) === null || _a === void 0 ? void 0 : _a.id, message_id: (_c = (_b = this.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id, inline_message_id: this.inlineMessageId, latitude,
            longitude }, args));
    }
    sendMessage(text, args) {
        return this.bot.sendMessage(Object.assign({ chat_id: this.chat.id, text, message_thread_id: this.getThreadId }, args));
    }
    getChat() {
        return this.bot.getChat(this.chat.id);
    }
    exportChatInviteLink() {
        return this.bot.exportChatInviteLink(this.chat.id);
    }
    createChatInviteLink(args) {
        return this.bot.createChatInviteLink(Object.assign({ chat_id: this.chat.id }, args));
    }
    editChatInviteLink(args) {
        return this.bot.editChatInviteLink(Object.assign({ chat_id: this.chat.id }, args));
    }
    revokeChatInviteLink(invite_link) {
        return this.bot.revokeChatInviteLink({
            chat_id: this.chat.id,
            invite_link,
        });
    }
    banChatMember(userId, args) {
        return this.bot.banChatMember(Object.assign({ chat_id: this.chat.id, user_id: userId }, args));
    }
    get kickChatMember() {
        return this.banChatMember;
    }
    unbanChatMember(userId, onlyIfBanned) {
        return this.bot.unbanChatMember({
            chat_id: this.chat.id,
            user_id: userId,
            only_if_banned: onlyIfBanned,
        });
    }
    restrictChatMember(args) {
        return this.bot.restrictChatMember(Object.assign({ chat_id: this.chat.id }, args));
    }
    promoteChatMember(userId, args) {
        return this.bot.promoteChatMember(Object.assign({ chat_id: this.chat.id, user_id: userId }, args));
    }
    setChatAdministratorCustomTitle(args) {
        return this.bot.setChatAdministratorCustomTitle(Object.assign({ chat_id: this.chat.id }, args));
    }
    setChatPhoto(photo) {
        return this.bot.setChatPhoto({
            chat_id: this.chat.id,
            photo,
        });
    }
    deleteChatPhoto() {
        return this.bot.deleteChatPhoto(this.chat.id);
    }
    setChatTitle(title) {
        return this.bot.setChatTitle({
            chat_id: this.chat.id,
            title,
        });
    }
    setChatDescription(description) {
        return this.bot.setChatDescription({
            chat_id: this.chat.id,
            description,
        });
    }
    pinChatMessage(messageId, disableNotification) {
        return this.bot.pinChatMessage({
            chat_id: this.chat.id,
            message_id: messageId,
            disable_notification: disableNotification,
        });
    }
    unpinChatMessage(messageId) {
        return this.bot.unpinChatMessage({
            chat_id: this.chat.id,
            message_id: messageId,
        });
    }
    unpinAllChatMessages() {
        return this.bot.unpinAllChatMessages(this.chat.id);
    }
    leaveChat() {
        return this.bot.leaveChat(this.chat.id);
    }
    setChatPermissions(permissions, use_independent_chat_permissions) {
        return this.bot.setChatPermissions({
            chat_id: this.chat.id,
            permissions,
            use_independent_chat_permissions,
        });
    }
    getChatAdministrators() {
        return this.bot.getChatAdministrators(this.chat.id);
    }
    getChatMember(userId) {
        return this.bot.getChatMember({
            chat_id: this.chat.id,
            user_id: userId,
        });
    }
    getChatMembersCount() {
        return this.bot.getChatMemberCount(this.chat.id);
    }
    setPassportDataErrors(errors) {
        return this.bot.setPassportDataErrors({
            user_id: this.from.id,
            errors,
        });
    }
    sendPhoto(photo, args) {
        return this.bot.sendPhoto(Object.assign({ chat_id: this.chat.id, photo, message_thread_id: this.getThreadId }, args));
    }
    sendMediaGroup(media, args) {
        return this.bot.sendMediaGroup(Object.assign({ chat_id: this.chat.id, media, message_thread_id: this.getThreadId }, args));
    }
    sendAudio(audio, args) {
        return this.bot.sendAudio(Object.assign({ chat_id: this.chat.id, audio, message_thread_id: this.getThreadId }, args));
    }
    sendDice(args) {
        return this.bot.sendDice(Object.assign({ chat_id: this.chat.id, message_thread_id: this.getThreadId }, args));
    }
    sendDocument(document, args) {
        return this.bot.sendDocument(Object.assign({ chat_id: this.chat.id, document, message_thread_id: this.getThreadId }, args));
    }
    sendSticker(sticker, args) {
        return this.bot.sendSticker(Object.assign({ chat_id: this.chat.id, sticker, message_thread_id: this.getThreadId }, args));
    }
    sendVideo(video, args) {
        return this.bot.sendVideo(Object.assign({ chat_id: this.chat.id, video, message_thread_id: this.getThreadId }, args));
    }
    sendAnimation(animation, args) {
        return this.bot.sendAnimation(Object.assign({ chat_id: this.chat.id, animation, message_thread_id: this.getThreadId }, args));
    }
    sendVideoNote(videoNote, args) {
        return this.bot.sendVideoNote(Object.assign({ chat_id: this.chat.id, video_note: videoNote, message_thread_id: this.getThreadId }, args));
    }
    sendInvoice(args) {
        return this.bot.sendInvoice(Object.assign({ chat_id: this.chat.id, message_thread_id: this.getThreadId }, args));
    }
    sendGame(gameShortName, args) {
        return this.bot.sendGame(Object.assign({ chat_id: this.chat.id, game_short_name: gameShortName, message_thread_id: this.getThreadId }, args));
    }
    sendVoice(voice, args) {
        return this.bot.sendVoice(Object.assign({ chat_id: this.chat.id, voice, message_thread_id: this.getThreadId }, args));
    }
    sendPoll(options, args) {
        return this.bot.sendPoll(Object.assign({ chat_id: this.chat.id, options, message_thread_id: this.getThreadId }, args));
    }
    stopPoll(args) {
        return this.bot.stopPoll(Object.assign({ chat_id: this.chat.id }, args));
    }
    sendLocation(latitude, longitude, args) {
        return this.bot.sendLocation(Object.assign({ chat_id: this.chat.id, latitude,
            longitude, message_thread_id: this.getThreadId }, args));
    }
    sendVenue(latitude, longitude, title, address, args) {
        return this.bot.sendVenue(Object.assign({ chat_id: this.chat.id, latitude,
            longitude,
            title,
            address, message_thread_id: this.getThreadId }, args));
    }
    sendContact(phoneNumber, firstName, args) {
        return this.bot.sendContact(Object.assign({ chat_id: this.chat.id, phone_number: phoneNumber, first_name: firstName, message_thread_id: this.getThreadId }, args));
    }
    getStickerSet(name) {
        return this.bot.getStickerSet(name);
    }
    setChatStickerSet(sticker_set_name) {
        return this.bot.setChatStickerSet({
            chat_id: this.chat.id,
            sticker_set_name,
        });
    }
    deleteChatStickerSet() {
        return this.bot.deleteChatStickerSet(this.chat.id);
    }
    createForumTopic(args) {
        return this.bot.createForumTopic(Object.assign({ chat_id: this.chat.id }, args));
    }
    editForumTopic(args) {
        return this.bot.editForumTopic(Object.assign({ chat_id: this.chat.id, message_thread_id: this.updates.message_thread_id }, args));
    }
    closeForumTopic() {
        return this.bot.closeForumTopic({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    reopenForumTopic() {
        return this.bot.reopenForumTopic({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    deleteForumTopic() {
        return this.bot.deleteForumTopic({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    unpinAllForumTopicMessages() {
        return this.bot.unpinAllForumTopicMessages({
            chat_id: this.chat.id,
            message_thread_id: this.updates.message_thread_id,
        });
    }
    editGeneralForumTopic(name) {
        return this.bot.editGeneralForumTopic({
            chat_id: this.chat.id,
            name,
        });
    }
    closeGeneralForumTopic() {
        return this.bot.closeGeneralForumTopic(this.chat.id);
    }
    reopenGeneralForumTopic() {
        return this.bot.reopenGeneralForumTopic(this.chat.id);
    }
    hideGeneralForumTopic() {
        return this.bot.hideGeneralForumTopic(this.chat.id);
    }
    unhideGeneralForumTopic() {
        return this.bot.unhideGeneralForumTopic(this.chat.id);
    }
    setStickerPositionInSet(sticker, position) {
        return this.bot.setStickerPositionInSet({
            sticker,
            position,
        });
    }
    setStickerSetThumbnail(args) {
        return this.bot.setStickerSetThumbnail(Object.assign({}, args));
    }
    deleteStickerFromSet(sticker) {
        return this.bot.deleteStickerFromSet(sticker);
    }
    uploadStickerFile(args) {
        return this.bot.uploadStickerFile(Object.assign({ user_id: this.from.id }, args));
    }
    createNewStickerSet(args) {
        return this.bot.createNewStickerSet(Object.assign({ user_id: this.from.id }, args));
    }
    addStickerToSet(args) {
        return this.bot.addStickerToSet(Object.assign({ user_id: this.from.id }, args));
    }
    getMyCommands() {
        return this.bot.getMyCommands();
    }
    setMyCommands(commands) {
        return this.bot.setMyCommands({
            commands,
        });
    }
    replyWithMarkdown(text, args) {
        return this.reply(text, Object.assign({ parse_mode: "Markdown" }, args));
    }
    replyWithMarkdownV2(text, args) {
        return this.reply(text, Object.assign({ parse_mode: "MarkdownV2" }, args));
    }
    replyWithHTML(text, args) {
        return this.reply(text, Object.assign({ parse_mode: "HTML" }, args));
    }
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
    forwardMessage(chatId, args) {
        const message = this.getMessageFromAnySource;
        return this.bot.forwardMessage(Object.assign({ chat_id: chatId, message_thread_id: message.chat.id, from_chat_id: message.message_id }, args));
    }
    copyMessage(chatId, args) {
        const message = this.getMessageFromAnySource;
        return this.bot.copyMessage(Object.assign({ chat_id: chatId, message_thread_id: message.chat.id, from_chat_id: message.message_id }, args));
    }
    approveChatJoinRequest(userId) {
        return this.bot.approveChatJoinRequest({
            chat_id: this.chat.id,
            user_id: userId,
        });
    }
    declineChatJoinRequest(userId) {
        return this.bot.declineChatJoinRequest({
            chat_id: this.chat.id,
            user_id: userId,
        });
    }
    banChatSenderChat(senderChatId) {
        return this.bot.banChatSenderChat({
            chat_id: this.chat.id,
            sender_chat_id: senderChatId,
        });
    }
    unbanChatSenderChat(senderChatId) {
        return this.bot.unbanChatSenderChat({
            chat_id: this.chat.id,
            sender_chat_id: senderChatId,
        });
    }
    setChatMenuButton(menuButton) {
        return this.bot.setChatMenuButton({
            chat_id: this.chat.id,
            menu_button: menuButton,
        });
    }
    getChatMenuButton() {
        return this.bot.getChatMenuButton(this.chat.id);
    }
    reply(text, args) {
        return this.bot.sendMessage(Object.assign({ text: text, chat_id: this.chat.id, reply_to_message_id: this.messageId }, args));
    }
    send(text, args) {
        return this.bot.sendMessage(Object.assign({ text: text, chat_id: this.chat.id }, args));
    }
    leave() {
        return this.bot.leaveChat(this.chat.id);
    }
    processUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const getUpdates = yield this.bot.getUpdates();
                for (const update of getUpdates) {
                    for (const [type, options] of Object.entries(messageTypeMap)) {
                        const updateProperty = update[type];
                        this.updates = updateProperty;
                        if (updateProperty) {
                            const chat = Object.assign({}, updateProperty.chat, {
                                send: (text, args) => this.send(text, args),
                                leave: () => this.leave(),
                            });
                            const message = Object.assign(Object.assign({}, updateProperty), { chat, telegram: this.bot, reply: (text, args) => this.reply(text, args) });
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
