"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const node_events_1 = require("node:events");
const ApiRequest_1 = require("../rest/ApiRequest");
const collection_1 = require("@telegram.ts/collection");
const UserManager_1 = require("../managers/UserManager");
const ChatManager_1 = require("../managers/ChatManager");
const index_1 = require("../structures/index");
const ChatPermissions_1 = require("../util/ChatPermissions");
const ApiPermissions_1 = require("../util/ApiPermissions");
class BaseClient extends node_events_1.EventEmitter {
    constructor(authToken, options) {
        super();
        Object.defineProperty(this, "apiRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "users", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "updates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The Rest manager of the client
         */
        this.apiRequest = new ApiRequest_1.ApiRequest(authToken, options === null || options === void 0 ? void 0 : options.requestOptions);
        /**
         * All of the objects that have been cached at any point, mapped by their ids
         */
        this.users = new UserManager_1.UserManager(this, options === null || options === void 0 ? void 0 : options.userCacheMaxSize);
        /**
         * All of the that the client is currently handling, mapped by their ids -
         * as long as sharding isn't being used, this will be *every* channel in *every* chat the bot
         * is a member of. Note that DM channels will not be initially cached, and thus not be present
         * in the Manager without their explicit fetching or use.
         */
        this.chats = new ChatManager_1.ChatManager(this, options === null || options === void 0 ? void 0 : options.chatCacheMaxSize);
        /**
         * The updates cache for polling/webhook
         */
        this.updates = new collection_1.Collection();
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    once(event, listener) {
        super.on(event, listener);
        return this;
    }
    /**
     * Increments max listeners by one, if they are not zero.
     * @return {void}
     */
    incrementMaxListeners() {
        const maxListeners = this.getMaxListeners();
        if (maxListeners !== 0) {
            this.setMaxListeners(maxListeners + 1);
        }
    }
    /**
     * Decrements max listeners by one, if they are not zero.
     * @return {void}
     */
    decrementMaxListeners() {
        const maxListeners = this.getMaxListeners();
        if (maxListeners !== 0) {
            this.setMaxListeners(maxListeners - 1);
        }
    }
    /** Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects.
  
    Notes
    1. This method will not work if an outgoing webhook is set up.
    2. In order to avoid getting duplicate updates, recalculate offset after each server response. */
    async getUpdates(params) {
        return await this.apiRequest.get("getUpdates", params);
    }
    /** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.
  
    If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
  
    Notes
    1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
    2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
    3. Ports currently supported for Webhooks: 443, 80, 88, 8443.
  
    If you're having any trouble setting up webhooks, please check out this amazing guide to webhooks. */
    async setWebhook(params) {
        return await this.apiRequest.get("setWebhook", params);
    }
    /** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
    async getMe() {
        return await this.apiRequest
            .get("getMe")
            .then((res) => new index_1.ClientUser(this, res));
    }
    /** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
    async logOut() {
        return await this.apiRequest.get("logOut");
    }
    /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
    async close() {
        return await this.apiRequest.get("close");
    }
    /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
    async deleteWebhook(dropPendingUpdates) {
        return await this.apiRequest.get("deleteWebhook", {
            dropPendingUpdates,
        });
    }
    /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
    async getWebhookInfo() {
        return await this.apiRequest
            .get("getWebhookInfo")
            .then((res) => new index_1.WebhookInfo(this, res));
    }
    /** Use this method to send text messages. On success, the sent Message is returned. */
    async sendMessage(params) {
        return await this.apiRequest
            .get("sendMessage", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send photos. On success, the sent Message is returned. */
    async sendPhoto(params) {
        return await this.apiRequest
            .get("sendPhoto", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
  
    For sending voice messages, use the sendVoice method instead. */
    async sendAudio(params) {
        return await this.apiRequest
            .get("sendAudio", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send paid media to channel chats. On success, the sent Message is returned. */
    async sendPaidMedia(params) {
        return await this.apiRequest
            .get("sendPaidMedia", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
    async sendDocument(params) {
        return await this.apiRequest
            .get("sendDocument", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
    async sendVideo(params) {
        return await this.apiRequest
            .get("sendVideo", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
    async sendAnimation(params) {
        return await this.apiRequest
            .get("sendAnimation", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
    async sendVoice(params) {
        return await this.apiRequest
            .get("sendVoice", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send video messages. On success, the sent Message is returned.
    As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
    async sendVideoNote(params) {
        return await this.apiRequest
            .get("sendVideoNote", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
    async sendMediaGroup(params) {
        return await this.apiRequest
            .get("sendMediaGroup", params)
            .then((res) => res.map((media) => new index_1.Message(this, media)));
    }
    /** Use this method to send point on the map. On success, the sent Message is returned. */
    async sendLocation(params) {
        return await this.apiRequest
            .get("sendLocation", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send information about a venue. On success, the sent Message is returned. */
    async sendVenue(params) {
        return await this.apiRequest
            .get("sendVenue", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
    async forwardMessage(params) {
        return await this.apiRequest
            .get("forwardMessage", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
    async forwardMessages(params) {
        return await this.apiRequest
            .get("forwardMessages", params)
            .then((res) => res.map((msg) => msg.message_id));
    }
    /** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
    async copyMessage(params) {
        return await this.apiRequest
            .get("copyMessage", params)
            .then((res) => res.message_id);
    }
    /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
    async copyMessages(params) {
        return await this.apiRequest
            .get("copyMessages", params)
            .then((res) => res.map((msg) => msg.message_id));
    }
    /** Use this method to send phone contacts. On success, the sent Message is returned. */
    async sendContact(params) {
        return await this.apiRequest
            .get("sendContact", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send a native poll. On success, the sent Message is returned. */
    async sendPoll(params) {
        return await this.apiRequest
            .get("sendPoll", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
    async sendDice(params) {
        return await this.apiRequest
            .get("sendDice", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
  
    Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.
  
    We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
    async sendChatAction(params) {
        return await this.apiRequest.get("sendChatAction", params);
    }
    /** Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success. */
    async setMessageReaction(params) {
        return await this.apiRequest.get("setMessageReaction", params);
    }
    /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
    async getUserProfilePhotos(params) {
        return await this.apiRequest
            .get("getUserProfilePhotos", params)
            .then((res) => new index_1.UserProfilePhotos(this, res));
    }
    /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
  
    Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
    async getFile(fileId) {
        const response = await this.apiRequest.get("getFile", {
            fileId,
        });
        return new index_1.InputFile(this, response);
    }
    /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    async kickChatMember(params) {
        return await this.apiRequest.get("kickChatMember", params);
    }
    /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    async banChatMember(params) {
        return await this.apiRequest.get("banChatMember", params);
    }
    /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
    async unbanChatMember(params) {
        return await this.apiRequest.get("unbanChatMember", params);
    }
    /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
    async restrictChatMember(params) {
        const permissions = new ChatPermissions_1.ChatPermissions(params.permissions);
        return await this.apiRequest.get("restrictChatMember", {
            ...params,
            permissions: (0, ApiPermissions_1.toApiFormat)(permissions.toObject()),
        });
    }
    /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
    async promoteChatMember(params) {
        const permissions = new ChatPermissions_1.ChatPermissions(params.permissions);
        return await this.apiRequest.get("promoteChatMember", { ...params, ...(0, ApiPermissions_1.toApiFormat)(permissions.toObject()) });
    }
    /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
    async setChatAdministratorCustomTitle(params) {
        return await this.apiRequest.get("setChatAdministratorCustomTitle", params);
    }
    /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
    async banChatSenderChat(chatId, senderChatId) {
        return await this.apiRequest.get("banChatSenderChat", { chatId, senderChatId });
    }
    /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
    async unbanChatSenderChat(chatId, senderChatId) {
        return await this.apiRequest.get("unbanChatSenderChat", { chatId, senderChatId });
    }
    /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
    async setChatPermissions(params) {
        const permissions = new ChatPermissions_1.ChatPermissions(params.permissions);
        return await this.apiRequest.get("setChatPermissions", {
            ...params,
            permissions: (0, ApiPermissions_1.toApiFormat)(permissions.toObject()),
        });
    }
    /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
  
    Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
    async exportChatInviteLink(chatId) {
        return await this.apiRequest.get("exportChatInviteLink", { chatId });
    }
    /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
    async createChatInviteLink(params) {
        return await this.apiRequest
            .get("createChatInviteLink", params)
            .then((res) => new index_1.ChatInviteLink(this, res));
    }
    /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
    async editChatInviteLink(params) {
        return await this.apiRequest
            .get("editChatInviteLink", params)
            .then((res) => new index_1.ChatInviteLink(this, res));
    }
    /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
    async revokeChatInviteLink(inviteLink, chatId) {
        return await this.apiRequest
            .get("revokeChatInviteLink", { inviteLink, chatId })
            .then((res) => new index_1.ChatInviteLink(this, res));
    }
    /** Use this method to approve a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
    async approveChatJoinRequest(userId, chatId) {
        return await this.apiRequest.get("approveChatJoinRequest", { userId, chatId });
    }
    /** Use this method to decline a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
    async declineChatJoinRequest(chatId, userId) {
        return await this.apiRequest.get("declineChatJoinRequest", { chatId, userId });
    }
    /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    async setChatPhoto(chatId, photo) {
        return await this.apiRequest.get("setChatPhoto", { chatId, photo });
    }
    /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    async deleteChatPhoto(chatId) {
        return await this.apiRequest.get("deleteChatPhoto", { chatId });
    }
    /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    async setChatTitle(chatId, title) {
        return await this.apiRequest.get("setChatTitle", { chatId, title });
    }
    /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
    async setChatDescription(chatId, description) {
        return await this.apiRequest.get("setChatDescription", { chatId, description });
    }
    /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    async pinChatMessage(params) {
        return await this.apiRequest.get("pinChatMessage", params);
    }
    /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    async unpinChatMessage(params) {
        return await this.apiRequest.get("unpinChatMessage", params);
    }
    /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    async unpinAllChatMessages(chatId) {
        return await this.apiRequest.get("unpinAllChatMessages", { chatId });
    }
    /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
    async leaveChat(chatId) {
        return await this.apiRequest.get("leaveChat", {
            chatId,
        });
    }
    /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
    async getChat(chatId) {
        return await this.apiRequest
            .get("getChat", {
            chatId,
        })
            .then((res) => new index_1.ChatFullInfo(this, res));
    }
    /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
    async getChatAdministrators(chatId) {
        return await this.apiRequest
            .get("getChatAdministrators", { chatId })
            .then((res) => res.map((user) => new index_1.ChatMember(this, chatId, user)));
    }
    /** Use this method to get the number of members in a chat. Returns Int on success. */
    async getChatMemberCount(chatId) {
        return await this.apiRequest.get("getChatMemberCount", { chatId });
    }
    /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
    async getUserChatBoosts(chatId, userId) {
        return await this.apiRequest
            .get("getUserChatBoosts", { chatId, userId })
            .then((res) => new index_1.UserChatBoosts(this, res));
    }
    /** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
    async getBusinessConnection(businessConnectionId) {
        return await this.apiRequest
            .get("getBusinessConnection", { businessConnectionId })
            .then((res) => new index_1.BusinessConnection(this, res));
    }
    /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
    async getChatMember(chatId, userId) {
        return await this.apiRequest
            .get("getChatMember", { chatId, userId })
            .then((res) => new index_1.ChatMember(this, chatId, res));
    }
    /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    async setChatStickerSet(stickerSetName, chatId) {
        return await this.apiRequest.get("setChatStickerSet", { stickerSetName, chatId });
    }
    /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    async deleteChatStickerSet(chatId) {
        return await this.apiRequest.get("deleteChatStickerSet", { chatId });
    }
    /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
    async getForumTopicIconStickers() {
        return await this.apiRequest
            .get("getForumTopicIconStickers")
            .then((res) => res.map((sticker) => new index_1.Sticker(this, sticker)));
    }
    /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
    async createForumTopic(params) {
        return await this.apiRequest
            .get("createForumTopic")
            .then((res) => new index_1.ForumTopic(this, res.message_thread_id, params.chatId, res));
    }
    /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    async editForumTopic(params) {
        return await this.apiRequest.get("editForumTopic", params);
    }
    /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    async closeForumTopic(chatId, messageThreadId) {
        return await this.apiRequest.get("closeForumTopic", { chatId, messageThreadId });
    }
    /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
    async reopenForumTopic(chatId, messageThreadId) {
        return await this.apiRequest.get("reopenForumTopic", { chatId, messageThreadId });
    }
    /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
    async deleteForumTopic(chatId, messageThreadId) {
        return await this.apiRequest.get("deleteForumTopic", { chatId, messageThreadId });
    }
    /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
    async unpinAllForumTopicMessages(chatId, messageThreadId) {
        return await this.apiRequest.get("unpinAllForumTopicMessages", { chatId, messageThreadId });
    }
    /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
    async editGeneralForumTopic(chatId, name) {
        return await this.apiRequest.get("editGeneralForumTopic", { chatId, name });
    }
    /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
    async closeGeneralForumTopic(chatId) {
        return await this.apiRequest.get("closeGeneralForumTopic", { chatId });
    }
    /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
    async reopenGeneralForumTopic(chatId) {
        return await this.apiRequest.get("reopenGeneralForumTopic", { chatId });
    }
    /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
    async hideGeneralForumTopic(chatId) {
        return await this.apiRequest.get("hideGeneralForumTopic", { chatId });
    }
    /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
    async unhideGeneralForumTopic(chatId) {
        return await this.apiRequest.get("unhideGeneralForumTopic", { chatId });
    }
    /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
     */
    async unpinAllGeneralForumTopicMessages(chatId) {
        return await this.apiRequest.get("unpinAllGeneralForumTopicMessages", { chatId });
    }
    /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
  
    Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    async answerCallbackQuery(params) {
        return await this.apiRequest.get("answerCallbackQuery", params);
    }
    /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
    async setMyCommands(params) {
        return await this.apiRequest.get("setMyCommands", params);
    }
    /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
    async deleteMyCommands(scope, languageCode) {
        return await this.apiRequest.get("deleteMyCommands", { scope, languageCode });
    }
    /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
    async getMyCommands(scope, languageCode) {
        return await this.apiRequest.get("getMyCommands", { scope, languageCode });
    }
    /** Use this method to change the bot's name. Returns True on success. */
    async setMyName(name, languageCode) {
        return await this.apiRequest.get("setMyName", {
            name,
            languageCode,
        });
    }
    /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
    async getMyName(languageCode) {
        return await this.apiRequest
            .get("getMyName", {
            languageCode,
        })
            .then((res) => res.name);
    }
    /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
    async setMyDescription(description, languageCode) {
        return await this.apiRequest.get("setMyDescription", { description, languageCode });
    }
    /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
    async getMyDescription(languageCode) {
        return await this.apiRequest
            .get("getMyDescription", { languageCode })
            .then((res) => res.description);
    }
    /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
    async setMyShortDescription(shortDescription, languageCode) {
        return await this.apiRequest.get("setMyShortDescription", { shortDescription, languageCode });
    }
    /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
    async getMyShortDescription(languageCode) {
        return await this.apiRequest
            .get("getMyShortDescription", { languageCode })
            .then((res) => res.short_description);
    }
    /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
    async setChatMenuButton(chatId, menuButton) {
        return await this.apiRequest.get("setChatMenuButton", { chatId, menuButton });
    }
    /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
    async getChatMenuButton(chatId) {
        return await this.apiRequest
            .get("getChatMenuButton", { chatId })
            .then((res) => new index_1.MenuButton(res));
    }
    /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
    async setMyDefaultAdministratorRights(rights, forChannels) {
        const permissions = new ChatPermissions_1.ChatPermissions((rights || {}));
        return await this.apiRequest.get("setMyDefaultAdministratorRights", {
            rights: (0, ApiPermissions_1.toApiFormat)(permissions.toObject()),
            forChannels,
        });
    }
    /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
    async getMyDefaultAdministratorRights(forChannels) {
        return await this.apiRequest
            .get("getMyDefaultAdministratorRights", { forChannels })
            .then((res) => new index_1.ChatAdministratorRights(res));
    }
    /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    async editMessageText(params) {
        return await this.apiRequest
            .get("editMessageText", params)
            .then((res) => {
            var _a;
            if (typeof res === "boolean")
                return res;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    async editMessageCaption(params) {
        return await this.apiRequest
            .get("editMessageCaption", params)
            .then((res) => {
            var _a;
            if (typeof res === "boolean")
                return res;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    async editMessageMedia(params) {
        return await this.apiRequest
            .get("editMessageMedia", params)
            .then((res) => {
            var _a;
            if (typeof res === "boolean")
                return res;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    async editMessageLiveLocation(params) {
        return await this.apiRequest
            .get("editMessageLiveLocation", params)
            .then((res) => (typeof res === "boolean"
            ? res
            : new index_1.Message(this, res)));
    }
    /** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
    async stopMessageLiveLocation(params) {
        return await this.apiRequest
            .get("stopMessageLiveLocation", params)
            .then((res) => (typeof res === "boolean"
            ? res
            : new index_1.Message(this, res)));
    }
    /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
    async editMessageReplyMarkup(params) {
        return await this.apiRequest
            .get("editMessageReplyMarkup", params)
            .then((res) => {
            var _a;
            if (typeof res === "boolean")
                return res;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
    async stopPoll(params) {
        return await this.apiRequest
            .get("stopPoll", params)
            .then((res) => new index_1.Poll(this, res));
    }
    /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
    async sendSticker(params) {
        return await this.apiRequest
            .get("sendSticker", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
    async getStickerSet(name) {
        return await this.apiRequest
            .get("getStickerSet", { name })
            .then((res) => new index_1.StickerSet(this, res));
    }
    /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
    async getCustomEmojiStickers(customEmojiIds) {
        return await this.apiRequest
            .get("getCustomEmojiStickers", { customEmojiIds })
            .then((res) => res.map((sticker) => new index_1.Sticker(this, sticker)));
    }
    /** Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success. */
    async uploadStickerFile(params) {
        const response = await this.apiRequest.get("uploadStickerFile", params);
        return new index_1.InputFile(this, response);
    }
    /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
    async createNewStickerSet(params) {
        return await this.apiRequest.get("createNewStickerSet", params);
    }
    /** Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
    async addStickerToSet(params) {
        return await this.apiRequest.get("addStickerToSet", params);
    }
    /** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
    async replaceStickerInSet(params) {
        return await this.apiRequest.get("replaceStickerInSet", params);
    }
    /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
    async setStickerPositionInSet(sticker, position) {
        return await this.apiRequest.get("setStickerPositionInSet", { sticker, position });
    }
    /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
    async deleteStickerFromSet(sticker) {
        return await this.apiRequest.get("deleteStickerFromSet", { sticker });
    }
    /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
    async setStickerEmojiList(sticker, emojiList) {
        return await this.apiRequest.get("setStickerEmojiList", { sticker, emojiList });
    }
    /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
    async setStickerKeywords(sticker, keywords) {
        return await this.apiRequest.get("setStickerKeywords", { sticker, keywords });
    }
    /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
    async setStickerMaskPosition(sticker, maskPosition) {
        return await this.apiRequest.get("setStickerMaskPosition", { sticker, maskPosition });
    }
    /** Use this method to set the title of a created sticker set. Returns True on success. */
    async setStickerSetTitle(name, title) {
        return await this.apiRequest.get("setStickerSetTitle", { name, title });
    }
    /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
    async setStickerSetThumbnail(params) {
        return await this.apiRequest.get("setStickerSetThumbnail", params);
    }
    /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
    async setCustomEmojiStickerSetThumbnail(name, customEmojiId) {
        return await this.apiRequest.get("setCustomEmojiStickerSetThumbnail", { name, customEmojiId });
    }
    /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
    async deleteStickerSet(name) {
        return await this.apiRequest.get("deleteStickerSet", { name });
    }
    /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
  
    Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    async answerInlineQuery(params) {
        return await this.apiRequest.get("answerInlineQuery", params);
    }
    /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
    async answerWebAppQuery(webAppQueryId, result) {
        return await this.apiRequest
            .get("answerWebAppQuery", { webAppQueryId, result })
            .then((res) => res.inline_message_id);
    }
    /** Use this method to send invoices. On success, the sent Message is returned. */
    async sendInvoice(params) {
        return await this.apiRequest
            .get("sendInvoice", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
    async createInvoiceLink(params) {
        return await this.apiRequest.get("createInvoiceLink", params);
    }
    /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
    async answerShippingQuery(params) {
        return await this.apiRequest.get("answerShippingQuery", params);
    }
    /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
    async answerPreCheckoutQuery(params) {
        return await this.apiRequest.get("answerPreCheckoutQuery", params);
    }
    /** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
    async getStarTransactions(offset, limit) {
        return await this.apiRequest
            .get("getStarTransactions", {
            offset,
            limit,
        })
            .then((res) => new index_1.StarTransactions(this, res));
    }
    /** Refunds a successful payment in Telegram Stars. Returns True on success */
    async refundStarPayment(userId, telegramPaymentChargeId) {
        return await this.apiRequest.get("refundStarPayment", {
            userId,
            telegramPaymentChargeId,
        });
    }
    /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
  
    Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
    async setPassportDataErrors(userId, errors) {
        return await this.apiRequest.get("setPassportDataErrors", { userId, errors });
    }
    /** Use this method to send a game. On success, the sent Message is returned. */
    async sendGame(params) {
        return await this.apiRequest
            .get("sendGame", params)
            .then((res) => {
            var _a;
            const message = new index_1.Message(this, res);
            if ("chat" in message && message.chat) {
                (_a = message.chat.messages) === null || _a === void 0 ? void 0 : _a._add(res);
            }
            return message;
        });
    }
    /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
    async setGameScore(params) {
        return await this.apiRequest
            .get("setGameScore", params)
            .then((res) => (typeof res === "boolean"
            ? res
            : new index_1.Message(this, res)));
    }
    /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.
  
    This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
    async getGameHighScores(params) {
        return await this.apiRequest
            .get("getGameHighScores", params)
            .then((res) => res.map((game) => new index_1.GameHighScore(this, game)));
    }
    /** Use this method to delete a message, including service messages, with the following limitations:
    - A message can only be deleted if it was sent less than 48 hours ago.
    - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
    - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
    - Bots can delete outgoing messages in private chats, groups, and supergroups.
    - Bots can delete incoming messages in private chats.
    - Bots granted can_post_messages permissions can delete outgoing messages in channels.
    - If the bot is an administrator of a group, it can delete any message there.
    - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
    Returns True on success. */
    async deleteMessage(chatId, messageId) {
        return await this.apiRequest.get("deleteMessage", { chatId, messageId });
    }
    /** Use this method to delete multiple messages simultaneously. Returns True on success. */
    async deleteMessages(chatId, messageIds) {
        return await this.apiRequest.get("deleteMessages", { chatId, messageIds });
    }
}
exports.BaseClient = BaseClient;
//# sourceMappingURL=BaseClient.js.map