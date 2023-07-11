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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const request_js_1 = require("./request.js");
const axios_1 = __importDefault(require("axios"));
class BaseClient extends request_js_1.Request {
    /**
     * Creat method Telegram Api
     * @param {string} token - The Telegram Bot API token.
     * @param {string | array | number} [intents] - The client intents.
     * @param {string} [parseMode] - The parse mode for message formatting.
     * @param {string | number} [chatId] - The default chat ID for sending messages.
     * @param {string} [queryString] - The default query string for API requests.
     * @param {string | object} [offSetType] - The type of offset to use for updates.
     * @param {string} [options.parseMode] - The parse mode for message formatting.
     */
    constructor(token, intents) {
        super(token, intents);
        this.token = "";
        this.intents = null;
    }
    getMe() {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getMe";
            const response = yield this.request(method);
            return response.result;
        });
    }
    deleteWebhook(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteWebhook";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getWebhookInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getWebhookInfo";
            const response = yield this.request(method);
            return response.result;
        });
    }
    sendMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendMessage";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendPhoto(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendPhoto";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendAudio(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendAudio";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendDocument(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendDocument";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendVideo(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendVideo";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendAnimation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendAnimation";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendVoice(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendVoice";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendVideoNote(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendVideoNote";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendMediaGroup(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendMediaGroup";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendLocation";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendVenue(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendVenue";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    forwardMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "forwardMessage";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    copyMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "copyMessage";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendContact(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendContact";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendPoll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendPoll";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendDice(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendDice";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendChatAction(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendChatAction";
            const response = yield this.request(method, params);
            return true;
        });
    }
    getUserProfilePhotos(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getUserProfilePhotos";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getFile(file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getFile";
            const response = yield this.request(method, {
                file_id,
            });
            return response.result;
        });
    }
    downloadFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileUrl = `https://api.telegram.org/file/bot${this.token}/${filePath}`;
            try {
                const response = yield axios_1.default.get(fileUrl, {
                    responseType: "arraybuffer",
                });
                return Buffer.from(response.data, "binary");
            }
            catch (error) {
                const downloadError = error;
                throw new Error(`Failed to download file: ${downloadError.message}`);
            }
        });
    }
    banChatMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "banChatMember";
            const response = yield this.request(method, params);
            return true;
        });
    }
    unbanChatMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "unbanChatMember";
            const response = yield this.request(method, params);
            return true;
        });
    }
    restrictChatMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "restrictChatMember";
            const response = yield this.request(method, params);
            return true;
        });
    }
    promoteChatMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "promoteChatMember";
            const response = yield this.request(method, params);
            return true;
        });
    }
    setChatAdministratorCustomTitle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setChatAdministratorCustomTitle";
            const response = yield this.request(method, params);
            return true;
        });
    }
    banChatSenderChat(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "banChatMember";
            const response = yield this.request(method, params);
            return true;
        });
    }
    unbanChatSenderChat(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "unbanChatMember";
            const response = yield this.request(method, params);
            return true;
        });
    }
    setChatPermissions(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setChatPermissions";
            const response = yield this.request(method, params);
            return true;
        });
    }
    exportChatInviteLink(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "exportChatInviteLink";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return response.result;
        });
    }
    createChatInviteLink(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "createChatInviteLink";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    editChatInviteLink(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editChatInviteLink";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    revokeChatInviteLink(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "revokeChatInviteLink";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    approveChatJoinRequest(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "approveChatJoinRequest";
            const response = yield this.request(method, params);
            return true;
        });
    }
    declineChatJoinRequest(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "declineChatJoinRequest";
            const response = yield this.request(method, params);
            return true;
        });
    }
    setChatPhoto(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setChatPhoto";
            const response = yield this.request(method, params);
            return true;
        });
    }
    deleteChatPhoto(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteChatPhoto";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    setChatTitle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setChatTitle";
            const response = yield this.request(method, params);
            return true;
        });
    }
    setChatDescription(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setChatDescription";
            const response = yield this.request(method, params);
            return true;
        });
    }
    pinChatMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "pinChatMessage";
            const response = yield this.request(method, params);
            return true;
        });
    }
    unpinChatMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "unpinChatMessage";
            const response = yield this.request(method, params);
            return true;
        });
    }
    unpinAllChatMessages(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "unpinAllChatMessages";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    leaveChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "leaveChat";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    getChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getChat";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return response.result;
        });
    }
    getChatAdministrators(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getChatAdministrators";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return response.result;
        });
    }
    getChatMemberCount(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getChatMemberCount";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return response.result;
        });
    }
    getChatMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getChatMember";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setChatStickerSet(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setChatStickerSet";
            const response = yield this.request(method, params);
            return true;
        });
    }
    deleteChatStickerSet(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteChatStickerSet";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    getForumTopicIconStickers() {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getForumTopicIconStickers";
            const response = yield this.request(method);
            return response.result;
        });
    }
    createForumTopic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "createForumTopic";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    editForumTopic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editForumTopic";
            const response = yield this.request(method, params);
            return true;
        });
    }
    closeForumTopic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "closeForumTopic";
            const response = yield this.request(method, params);
            return true;
        });
    }
    reopenForumTopic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "reopenForumTopic";
            const response = yield this.request(method, params);
            return true;
        });
    }
    deleteForumTopic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteForumTopic";
            const response = yield this.request(method, params);
            return true;
        });
    }
    unpinAllForumTopicMessages(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "unpinAllForumTopicMessages";
            const response = yield this.request(method, params);
            return true;
        });
    }
    editGeneralForumTopic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editGeneralForumTopic";
            const response = yield this.request(method, params);
            return true;
        });
    }
    closeGeneralForumTopic(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "closeGeneralForumTopic";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    reopenGeneralForumTopic(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "reopenGeneralForumTopic";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    hideGeneralForumTopic(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "hideGeneralForumTopic";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    unhideGeneralForumTopic(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "unhideGeneralForumTopic";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return true;
        });
    }
    answerCallbackQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "answerCallbackQuery";
            const response = yield this.request(method, params);
            return true;
        });
    }
    setMyCommands(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setMyCommands";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    deleteMyCommands(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteMyCommands";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getMyCommands(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getMyCommands";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setMyName(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setMyName";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getMyName(languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getMyName";
            const response = yield this.request(method, {
                language_code: languageCode,
            });
            return response.result;
        });
    }
    setMyDescription(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setMyDescription";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getMyDescription(languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getMyDescription";
            const response = yield this.request(method, {
                language_code: languageCode,
            });
            return response.result;
        });
    }
    setMyShortDescription(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setMyShortDescription";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getMyShortDescription(languageCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getMyShortDescription";
            const response = yield this.request(method, {
                language_code: languageCode,
            });
            return response.result;
        });
    }
    setChatMenuButton(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setChatMenuButton";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getChatMenuButton(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getChatMenuButton";
            const response = yield this.request(method, {
                chat_id: chatId,
            });
            return response.result;
        });
    }
    setMyDefaultAdministratorRights(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setMyDefaultAdministratorRights";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getMyDefaultAdministratorRights(forChannels) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getMyDefaultAdministratorRights";
            const response = yield this.request(method, {
                for_channels: forChannels,
            });
            return response.result;
        });
    }
    editMessageText(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editMessageText";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    editMessageCaption(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editMessageCaption";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    editMessageMedia(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editMessageMedia";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    editMessageLiveLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editMessageLiveLocation";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    stopMessageLiveLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "stopMessageLiveLocation";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    editMessageReplyMarkup(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "editMessageReplyMarkup";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    stopPoll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "stopPoll";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendSticker(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendSticker";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    getStickerSet(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getStickerSet";
            const response = yield this.request(method, {
                name,
            });
            return response.result;
        });
    }
    getCustomEmojiStickers(customEmojiIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "getCustomEmojiStickers";
            const response = yield this.request(method, {
                custom_emoji_ids: customEmojiIds,
            });
            return response.result;
        });
    }
    uploadStickerFile(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "uploadStickerFile";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    createNewStickerSet(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "createNewStickerSet";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    addStickerToSet(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "addStickerToSet";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setStickerPositionInSet(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setStickerPositionInSet";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    deleteStickerFromSet(sticker) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteStickerFromSet";
            const response = yield this.request(method, {
                sticker,
            });
            return response.result;
        });
    }
    setStickerEmoji(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setStickerEmoji";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setStickerKeywords(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setStickerKeywords";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setStickerMaskPosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setStickerMaskPosition";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setStickerSetTitle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setStickerSetTitle";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setStickerSetThumbnail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setStickerSetThumbnail";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setCustomEmojiStickerSetThumbnail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setCustomEmojiStickerSetThumbnail";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    deleteStickerSet(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteStickerSet";
            const response = yield this.request(method, {
                name,
            });
            return response.result;
        });
    }
    answerInlineQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "answerInlineQuery";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    answerWebAppQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "answerWebAppQuery";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendInvoice(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendInvoice";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    createInvoiceLink(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "createInvoiceLink";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    answerShippingQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "answerShippingQuery";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    answerPreCheckoutQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "answerPreCheckoutQuery";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    setPassportDataErrors(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "setPassportDataErrors";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    sendGame(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "sendGame";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
    deleteMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = "deleteMessage";
            const response = yield this.request(method, params);
            return response.result;
        });
    }
}
exports.BaseClient = BaseClient;
