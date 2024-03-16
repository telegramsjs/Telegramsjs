import type { ReadStream } from "node:fs";
import { ApiRequest } from "./core/request";
import { InputFile } from "./core/structures/file";
import type { MethodsReturnType, MethodParameters } from "./core/types";

class Api extends ApiRequest {
  constructor(public readonly authToken: string) {
    super(authToken);
  }

  /** Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects */
  async getUpdates(params?: MethodParameters["getUpdates"]) {
    return await this.request<MethodsReturnType["getUpdates"]>(
      "getUpdates",
      params,
    );
  }

  /** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.

  If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.

  Notes
  1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
  2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
  3. Ports currently supported for Webhooks: 443, 80, 88, 8443.

  If you're having any trouble setting up webhooks, please check out this amazing guide to webhooks. */
  async setWebhook(params: MethodParameters["setWebhook"]) {
    return await this.request<MethodsReturnType["setWebhook"]>(
      "setWebhook",
      params,
    );
  }

  /*
   * A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object.
   */
  async getMe() {
    return await this.request<MethodsReturnType["getMe"]>("getMe");
  }

  /**
   * Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters
   */
  async logOut() {
    return await this.request<MethodsReturnType["logOut"]>("logOut");
  }

  /**
   * Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters.
   */
  async close() {
    return await this.request<MethodsReturnType["close"]>("close");
  }

  /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
  async deleteWebhook(params: MethodParameters["deleteWebhook"]) {
    return await this.request<MethodsReturnType["deleteWebhook"]>(
      "deleteWebhook",
    );
  }

  /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
  async getWebhookInfo() {
    return await this.request<MethodsReturnType["getWebhookInfo"]>(
      "getWebhookInfo",
    );
  }

  /** Use this method to send text messages. On success, the sent Message is returned. */
  async sendMessage(params: MethodParameters["sendMessage"]) {
    return await this.request<MethodsReturnType["sendMessage"]>(
      "sendMessage",
      params,
    );
  }

  /** Use this method to send photos. On success, the sent Message is returned. */
  async sendPhoto(params: MethodParameters["sendPhoto"]) {
    return await this.request<MethodsReturnType["sendPhoto"]>(
      "sendPhoto",
      params,
    );
  }

  /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.

  For sending voice messages, use the sendVoice method instead. */
  async sendAudio(params: MethodParameters["sendAudio"]) {
    return await this.request<MethodsReturnType["sendAudio"]>(
      "sendAudio",
      params,
    );
  }

  /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
  async sendDocument(params: MethodParameters["sendDocument"]) {
    return await this.request<MethodsReturnType["sendDocument"]>(
      "sendDocument",
      params,
    );
  }

  /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
  async sendVideo(params: MethodParameters["sendVideo"]) {
    return await this.request<MethodsReturnType["sendVideo"]>(
      "sendVideo",
      params,
    );
  }

  /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
  async sendAnimation(params: MethodParameters["sendAnimation"]) {
    return await this.request<MethodsReturnType["sendAnimation"]>(
      "sendAnimation",
      params,
    );
  }

  /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
  async sendVoice(params: MethodParameters["sendVoice"]) {
    return await this.request<MethodsReturnType["sendVoice"]>(
      "sendVoice",
      params,
    );
  }

  /** Use this method to send video messages. On success, the sent Message is returned.
  As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
  async sendVideoNote(params: MethodParameters["sendVideoNote"]) {
    return await this.request<MethodsReturnType["sendVideoNote"]>(
      "sendVideoNote",
      params,
    );
  }

  /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
  async sendMediaGroup(params: MethodParameters["sendMediaGroup"]) {
    return await this.request<MethodsReturnType["sendMediaGroup"]>(
      "sendMediaGroup",
      params,
    );
  }

  /** Use this method to send point on the map. On success, the sent Message is returned. */
  async sendLocation(params: MethodParameters["sendLocation"]) {
    return await this.request<MethodsReturnType["sendLocation"]>(
      "sendLocation",
      params,
    );
  }

  /** Use this method to send information about a venue. On success, the sent Message is returned. */
  async sendVenue(params: MethodParameters["sendVenue"]) {
    return await this.request<MethodsReturnType["sendVenue"]>(
      "sendVenue",
      params,
    );
  }

  /** Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned. */
  async forwardMessage(params: MethodParameters["forwardMessage"]) {
    return await this.request<MethodsReturnType["forwardMessage"]>(
      "forwardMessage",
      params,
    );
  }

  /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
  async forwardMessages(params: MethodParameters["forwardMessages"]) {
    return await this.request<MethodsReturnType["forwardMessages"]>(
      "forwardMessages",
      params,
    );
  }

  /** Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
  async copyMessage(params: MethodParameters["copyMessage"]) {
    return await this.request<MethodsReturnType["copyMessage"]>(
      "copyMessage",
      params,
    );
  }

  /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
  async copyMessages(params: MethodParameters["copyMessages"]) {
    return await this.request<MethodsReturnType["copyMessages"]>(
      "copyMessages",
      params,
    );
  }

  /** Use this method to send phone contacts. On success, the sent Message is returned. */
  async sendContact(params: MethodParameters["sendContact"]) {
    return await this.request<MethodsReturnType["sendContact"]>(
      "sendContact",
      params,
    );
  }

  /** Use this method to send a native poll. On success, the sent Message is returned. */
  async sendPoll(params: MethodParameters["sendPoll"]) {
    return await this.request<MethodsReturnType["sendPoll"]>(
      "sendPoll",
      params,
    );
  }

  /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
  async sendDice(params: MethodParameters["sendDice"]) {
    return await this.request<MethodsReturnType["sendDice"]>(
      "sendDice",
      params,
    );
  }

  /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.

  Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.

  We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
  async sendChatAction(params: MethodParameters["sendChatAction"]) {
    return await this.request<MethodsReturnType["sendChatAction"]>(
      "sendChatAction",
      params,
    );
  }

  /** Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success */
  async setMessageReaction(params: MethodParameters["setMessageReaction"]) {
    return await this.request<MethodsReturnType["setMessageReaction"]>(
      "setMessageReaction",
      params,
    );
  }

  /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
  async getUserProfilePhotos(params: MethodParameters["getUserProfilePhotos"]) {
    return await this.request<MethodsReturnType["getUserProfilePhotos"]>(
      "getUserProfilePhotos",
      params,
    );
  }

  /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.

  Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
  async getFile(file_id: string) {
    const response = await this.request<MethodsReturnType["getFile"]>(
      "getFile",
      {
        file_id,
      },
    );
    return new InputFile(response, this);
  }

  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async banChatMember(params: MethodParameters["banChatMember"]) {
    return await this.request<MethodsReturnType["banChatMember"]>(
      "banChatMember",
      params,
    );
  }

  /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
  async unbanChatMember(params: MethodParameters["unbanChatMember"]) {
    return await this.request<MethodsReturnType["unbanChatMember"]>(
      "unbanChatMember",
      params,
    );
  }

  /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
  async restrictChatMember(params: MethodParameters["restrictChatMember"]) {
    return await this.request<MethodsReturnType["restrictChatMember"]>(
      "restrictChatMember",
      params,
    );
  }

  /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
  async promoteChatMember(params: MethodParameters["promoteChatMember"]) {
    return await this.request<MethodsReturnType["promoteChatMember"]>(
      "promoteChatMember",
      params,
    );
  }

  /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
  async setChatAdministratorCustomTitle(
    params: MethodParameters["setChatAdministratorCustomTitle"],
  ) {
    return await this.request<
      MethodsReturnType["setChatAdministratorCustomTitle"]
    >("setChatAdministratorCustomTitle", params);
  }

  /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
  async banChatSenderChat(chat_id: number | string, sender_chat_id: number) {
    return await this.request<MethodsReturnType["banChatSenderChat"]>(
      "banChatSenderChat",
      { chat_id, sender_chat_id },
    );
  }

  /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
  async unbanChatSenderChat(chat_id: number | string, sender_chat_id: number) {
    return await this.request<MethodsReturnType["unbanChatSenderChat"]>(
      "unbanChatSenderChat",
      { chat_id, sender_chat_id },
    );
  }

  /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
  async setChatPermissions(params: MethodParameters["setChatPermissions"]) {
    return await this.request<MethodsReturnType["setChatPermissions"]>(
      "setChatPermissions",
      params,
    );
  }

  /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.

  Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
  async exportChatInviteLink(chat_id?: number | string) {
    return await this.request<MethodsReturnType["exportChatInviteLink"]>(
      "exportChatInviteLink",
      { chat_id },
    );
  }

  /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
  async createChatInviteLink(params: MethodParameters["createChatInviteLink"]) {
    return await this.request<MethodsReturnType["createChatInviteLink"]>(
      "createChatInviteLink",
      params,
    );
  }

  /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  async editChatInviteLink(params: MethodParameters["editChatInviteLink"]) {
    return await this.request<MethodsReturnType["editChatInviteLink"]>(
      "editChatInviteLink",
      params,
    );
  }

  /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
  async revokeChatInviteLink(invite_link: string, chat_id?: number | string) {
    return await this.request<MethodsReturnType["revokeChatInviteLink"]>(
      "revokeChatInviteLink",
      { invite_link, chat_id },
    );
  }

  /** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  async approveChatJoinRequest(user_id: number, chat_id?: number | string) {
    return await this.request<MethodsReturnType["approveChatJoinRequest"]>(
      "approveChatJoinRequest",
      { user_id, chat_id },
    );
  }

  /** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  async declineChatJoinRequest(chat_id: number | string, user_id: number) {
    return await this.request<MethodsReturnType["declineChatJoinRequest"]>(
      "declineChatJoinRequest",
      { chat_id, user_id },
    );
  }

  /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatPhoto(
    chat_id: number | string,
    photo: Buffer | ReadStream | string,
  ) {
    return await this.request<MethodsReturnType["setChatPhoto"]>(
      "setChatPhoto",
      { chat_id, photo },
    );
  }

  /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async deleteChatPhoto(chat_id: number | string) {
    return await this.request<MethodsReturnType["deleteChatPhoto"]>(
      "deleteChatPhoto",
      { chat_id },
    );
  }

  /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatTitle(chat_id: number | string, title: string) {
    return await this.request<MethodsReturnType["setChatTitle"]>(
      "setChatTitle",
      { chat_id, title },
    );
  }

  /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatDescription(chat_id: number, description?: string) {
    return await this.request<MethodsReturnType["setChatDescription"]>(
      "setChatDescription",
      { chat_id, description },
    );
  }

  /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async pinChatMessage(params: MethodParameters["pinChatMessage"]) {
    return await this.request<MethodsReturnType["pinChatMessage"]>(
      "pinChatMessage",
      params,
    );
  }

  /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async unpinChatMessage(chat_id: number | string, message_id?: number) {
    return await this.request<MethodsReturnType["unpinChatMessage"]>(
      "unpinChatMessage",
      { chat_id, message_id },
    );
  }

  /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async unpinAllChatMessages(chat_id: number | string) {
    return await this.request<MethodsReturnType["unpinAllChatMessages"]>(
      "unpinAllChatMessages",
      { chat_id },
    );
  }

  /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
  async leaveChat(chat_id: number | string) {
    return await this.request<MethodsReturnType["leaveChat"]>("leaveChat", {
      chat_id,
    });
  }

  /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
  async getChat(chat_id: number | string) {
    return await this.request<MethodsReturnType["getChat"]>("getChat", {
      chat_id,
    });
  }

  /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
  async getChatAdministrators(chat_id: number | string) {
    return await this.request<MethodsReturnType["getChatAdministrators"]>(
      "getChatAdministrators",
      { chat_id },
    );
  }

  /** Use this method to get the number of members in a chat. Returns Int on success. */
  async getChatMemberCount(chat_id: number | string) {
    return await this.request<MethodsReturnType["getChatMemberCount"]>(
      "getChatMemberCount",
      { chat_id },
    );
  }

  /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
  async getUserChatBoosts(chat_id: number | string, user_id: number) {
    return await this.request<MethodsReturnType["getUserChatBoosts"]>(
      "getUserChatBoosts",
      { chat_id, user_id },
    );
  }

  /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
  async getChatMember(chat_id: number | string, user_id: number) {
    return await this.request<MethodsReturnType["getChatMember"]>(
      "getChatMember",
      { chat_id, user_id },
    );
  }

  /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  async setChatStickerSet(sticker_set_name: string, chat_id?: number | string) {
    return await this.request<MethodsReturnType["setChatStickerSet"]>(
      "setChatStickerSet",
      { sticker_set_name, chat_id },
    );
  }

  /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  async deleteChatStickerSet(chat_id?: number | string) {
    return await this.request<MethodsReturnType["deleteChatStickerSet"]>(
      "deleteChatStickerSet",
      { chat_id },
    );
  }

  /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
  async getForumTopicIconStickers() {
    return await this.request<MethodsReturnType["getForumTopicIconStickers"]>(
      "getForumTopicIconStickers",
    );
  }

  /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
  async createForumTopic(params: MethodParameters["createForumTopic"]) {
    return await this.request<MethodsReturnType["createForumTopic"]>(
      "createForumTopic",
    );
  }

  /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async editForumTopic(params: MethodParameters["editForumTopic"]) {
    return await this.request<MethodsReturnType["editForumTopic"]>(
      "editForumTopic",
      params,
    );
  }

  /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async closeForumTopic(chat_id: number | string, message_thread_id: number) {
    return await this.request<MethodsReturnType["closeForumTopic"]>(
      "closeForumTopic",
      { chat_id, message_thread_id },
    );
  }

  /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async reopenForumTopic(chat_id: number | string, message_thread_id: number) {
    return await this.request<MethodsReturnType["reopenForumTopic"]>(
      "reopenForumTopic",
      { chat_id, message_thread_id },
    );
  }

  /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
  async deleteForumTopic(chat_id: number | string, message_thread_id: number) {
    return await this.request<MethodsReturnType["deleteForumTopic"]>(
      "deleteForumTopic",
      { chat_id, message_thread_id },
    );
  }

  /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
  async unpinAllForumTopicMessages(
    chat_id: number | string,
    message_thread_id: number,
  ) {
    return await this.request<MethodsReturnType["unpinAllForumTopicMessages"]>(
      "unpinAllForumTopicMessages",
      { chat_id, message_thread_id },
    );
  }

  /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
  async editGeneralForumTopic(chat_id: number | string, name: string) {
    return await this.request<MethodsReturnType["editGeneralForumTopic"]>(
      "editGeneralForumTopic",
      { chat_id, name },
    );
  }

  /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  async closeGeneralForumTopic(chat_id: number | string) {
    return await this.request<MethodsReturnType["closeGeneralForumTopic"]>(
      "closeGeneralForumTopic",
      { chat_id },
    );
  }

  /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
  async reopenGeneralForumTopic(chat_id: number | string) {
    return await this.request<MethodsReturnType["reopenGeneralForumTopic"]>(
      "reopenGeneralForumTopic",
      { chat_id },
    );
  }

  /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
  async hideGeneralForumTopic(chat_id: number | string) {
    return await this.request<MethodsReturnType["hideGeneralForumTopic"]>(
      "hideGeneralForumTopic",
      { chat_id },
    );
  }

  /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  async unhideGeneralForumTopic(chat_id: string | number) {
    return await this.request<MethodsReturnType["unhideGeneralForumTopic"]>(
      "unhideGeneralForumTopic",
      { chat_id },
    );
  }

  /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
   */
  async unpinAllGeneralForumTopicMessages(chat_id: string | number) {
    return await this.request<
      MethodsReturnType["unpinAllGeneralForumTopicMessages"]
    >("unpinAllGeneralForumTopicMessages", { chat_id });
  }

  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  async answerCallbackQuery(params: MethodParameters["answerCallbackQuery"]) {
    return await this.request<MethodsReturnType["answerCallbackQuery"]>(
      "answerCallbackQuery",
      params,
    );
  }

  /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
  async setMyCommands(params: MethodParameters["setMyCommands"]) {
    return await this.request<MethodsReturnType["setMyCommands"]>(
      "setMyCommands",
      params,
    );
  }

  /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
  async deleteMyCommands(scope?: string, language_code?: string) {
    return await this.request<MethodsReturnType["deleteMyCommands"]>(
      "deleteMyCommands",
      { scope, language_code },
    );
  }

  /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
  async getMyCommands(
    scope?: MethodParameters["getMyCommands"]["scope"],
    language_code?: string,
  ) {
    return await this.request<MethodsReturnType["getMyCommands"]>(
      "getMyCommands",
      { scope, language_code },
    );
  }

  /** Use this method to change the bot's name. Returns True on success. */
  async setMyName(name?: string, language_code?: string) {
    return await this.request<MethodsReturnType["setMyName"]>("setMyName", {
      name,
      language_code,
    });
  }

  /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
  async getMyName(language_code?: string) {
    return await this.request<MethodsReturnType["getMyName"]>("getMyName", {
      language_code,
    });
  }

  /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
  async setMyDescription(description?: string, language_code?: string) {
    return await this.request<MethodsReturnType["setMyDescription"]>(
      "setMyDescription",
      { description, language_code },
    );
  }

  /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
  async getMyDescription(language_code?: string) {
    return await this.request<MethodsReturnType["getMyDescription"]>(
      "getMyDescription",
      { language_code },
    );
  }

  /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
  async setMyShortDescription(
    short_description?: string,
    language_code?: string,
  ) {
    return await this.request<MethodsReturnType["setMyShortDescription"]>(
      "setMyShortDescription",
      { short_description, language_code },
    );
  }

  /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
  async getMyShortDescription(language_code?: string) {
    return await this.request<MethodsReturnType["getMyShortDescription"]>(
      "getMyShortDescription",
      { language_code },
    );
  }

  /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
  async setChatMenuButton(
    chat_id?: number,
    menu_button?: MethodParameters["setChatMenuButton"]["menu_button"],
  ) {
    return await this.request<MethodsReturnType["setChatMenuButton"]>(
      "setChatMenuButton",
      { chat_id, menu_button },
    );
  }

  /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
  async getChatMenuButton(chat_id?: number | string) {
    return await this.request<MethodsReturnType["getChatMenuButton"]>(
      "getChatMenuButton",
      { chat_id },
    );
  }

  /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
  async setMyDefaultAdministratorRights(
    rights?: MethodParameters["setMyDefaultAdministratorRights"]["rights"],
    for_channels?: boolean,
  ) {
    return await this.request<
      MethodsReturnType["setMyDefaultAdministratorRights"]
    >("setMyDefaultAdministratorRights", { rights, for_channels });
  }

  /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
  async getMyDefaultAdministratorRights(for_channels: boolean) {
    return await this.request<
      MethodsReturnType["getMyDefaultAdministratorRights"]
    >("getMyDefaultAdministratorRights", { for_channels });
  }

  /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async editMessageText(params: MethodParameters["editMessageText"]) {
    return await this.request<MethodsReturnType["editMessageText"]>(
      "editMessageText",
      params,
    );
  }

  /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async editMessageCaption(params: MethodParameters["editMessageCaption"]) {
    return await this.request<MethodsReturnType["editMessageCaption"]>(
      "editMessageCaption",
      params,
    );
  }

  /** Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async editMessageMedia(params: MethodParameters["editMessageMedia"]) {
    return await this.request<MethodsReturnType["editMessageMedia"]>(
      "editMessageMedia",
      params,
    );
  }

  /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async editMessageLiveLocation(
    params: MethodParameters["editMessageLiveLocation"],
  ) {
    return await this.request<MethodsReturnType["editMessageLiveLocation"]>(
      "editMessageLiveLocation",
      params,
    );
  }

  /** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async stopMessageLiveLocation(
    params: MethodParameters["stopMessageLiveLocation"],
  ) {
    return await this.request<MethodsReturnType["stopMessageLiveLocation"]>(
      "stopMessageLiveLocation",
      params,
    );
  }

  /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async editMessageReplyMarkup(
    params: MethodParameters["editMessageReplyMarkup"],
  ) {
    return await this.request<MethodsReturnType["editMessageReplyMarkup"]>(
      "editMessageReplyMarkup",
      params,
    );
  }

  /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
  async stopPoll(params: MethodParameters["stopPoll"]) {
    return await this.request<MethodsReturnType["stopPoll"]>(
      "stopPoll",
      params,
    );
  }

  /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
  async sendSticker(params: MethodParameters["sendSticker"]) {
    return await this.request<MethodsReturnType["sendSticker"]>(
      "sendSticker",
      params,
    );
  }

  /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
  async getStickerSet(name: string) {
    return await this.request<MethodsReturnType["getStickerSet"]>(
      "getStickerSet",
      { name },
    );
  }

  /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
  async getCustomEmojiStickers(custom_emoji_ids: string[]) {
    return await this.request<MethodsReturnType["getCustomEmojiStickers"]>(
      "getCustomEmojiStickers",
      { custom_emoji_ids },
    );
  }

  /** Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success. */
  async uploadStickerFile(params: MethodParameters["uploadStickerFile"]) {
    return await this.request<MethodsReturnType["uploadStickerFile"]>(
      "uploadStickerFile",
      params,
    );
  }

  /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
  async createNewStickerSet(params: MethodParameters["createNewStickerSet"]) {
    return await this.request<MethodsReturnType["createNewStickerSet"]>(
      "createNewStickerSet",
      params,
    );
  }

  /** Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
  async addStickerToSet(params: MethodParameters["addStickerToSet"]) {
    return await this.request<MethodsReturnType["addStickerToSet"]>(
      "addStickerToSet",
      params,
    );
  }

  /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
  async setStickerPositionInSet(sticker: string, position: number) {
    return await this.request<MethodsReturnType["setStickerPositionInSet"]>(
      "setStickerPositionInSet",
      { sticker, position },
    );
  }

  /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
  async deleteStickerFromSet(sticker: string) {
    return await this.request<MethodsReturnType["deleteStickerFromSet"]>(
      "deleteStickerFromSet",
      { sticker },
    );
  }

  /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  async setStickerEmojiList(sticker: string, emoji_list: string[]) {
    return await this.request<MethodsReturnType["setStickerEmojiList"]>(
      "setStickerEmojiList",
      { sticker, emoji_list },
    );
  }

  /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  async setStickerKeywords(sticker: string, keywords?: string[]) {
    return await this.request<MethodsReturnType["setStickerKeywords"]>(
      "setStickerKeywords",
      { sticker, keywords },
    );
  }

  /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
  async setStickerMaskPosition(
    sticker: string,
    mask_position?: MethodParameters["setStickerMaskPosition"]["mask_position"],
  ) {
    return await this.request<MethodsReturnType["setStickerMaskPosition"]>(
      "setStickerMaskPosition",
      { sticker, mask_position },
    );
  }

  /** Use this method to set the title of a created sticker set. Returns True on success. */
  async setStickerSetTitle(name: string, title: string) {
    return await this.request<MethodsReturnType["setStickerSetTitle"]>(
      "setStickerSetTitle",
      { name, title },
    );
  }

  /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
  async setStickerSetThumbnail(
    params: MethodParameters["setStickerSetThumbnail"],
  ) {
    return await this.request<MethodsReturnType["setStickerSetThumbnail"]>(
      "setStickerSetThumbnail",
      params,
    );
  }

  /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
  async setCustomEmojiStickerSetThumbnail(
    name: string,
    custom_emoji_id?: string,
  ) {
    return await this.request<
      MethodsReturnType["setCustomEmojiStickerSetThumbnail"]
    >("setCustomEmojiStickerSetThumbnail", { name, custom_emoji_id });
  }

  /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
  async deleteStickerSet(name: string) {
    return await this.request<MethodsReturnType["deleteStickerSet"]>(
      "deleteStickerSet",
      { name },
    );
  }

  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  async answerInlineQuery(params: MethodParameters["answerInlineQuery"]) {
    return await this.request<MethodsReturnType["answerInlineQuery"]>(
      "answerInlineQuery",
      params,
    );
  }

  /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
  async answerWebAppQuery(
    web_app_query_id: string,
    result: MethodParameters["answerWebAppQuery"]["result"],
  ) {
    return await this.request<MethodsReturnType["answerWebAppQuery"]>(
      "answerWebAppQuery",
      { web_app_query_id, result },
    );
  }

  /** Use this method to send invoices. On success, the sent Message is returned. */
  async sendInvoice(params: MethodParameters["sendInvoice"]) {
    return await this.request<MethodsReturnType["sendInvoice"]>(
      "sendInvoice",
      params,
    );
  }

  /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
  async createInvoiceLink(params: MethodParameters["createInvoiceLink"]) {
    return await this.request<MethodsReturnType["createInvoiceLink"]>(
      "createInvoiceLink",
      params,
    );
  }

  /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
  async answerShippingQuery(params: MethodParameters["answerShippingQuery"]) {
    return await this.request<MethodsReturnType["answerShippingQuery"]>(
      "answerShippingQuery",
      params,
    );
  }

  /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
  async answerPreCheckoutQuery(
    params: MethodParameters["answerPreCheckoutQuery"],
  ) {
    return await this.request<MethodsReturnType["answerPreCheckoutQuery"]>(
      "answerPreCheckoutQuery",
      params,
    );
  }

  /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.

  Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
  async setPassportDataErrors(
    user_id: number,
    errors: MethodParameters["setPassportDataErrors"]["errors"],
  ) {
    return await this.request<MethodsReturnType["setPassportDataErrors"]>(
      "setPassportDataErrors",
      { user_id, errors },
    );
  }

  /** Use this method to send a game. On success, the sent Message is returned. */
  async sendGame(params: MethodParameters["sendGame"]) {
    return await this.request<MethodsReturnType["sendGame"]>(
      "sendGame",
      params,
    );
  }

  /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
  async setGameScore(params: MethodParameters["setGameScore"]) {
    return await this.request<MethodsReturnType["setGameScore"]>(
      "setGameScore",
      params,
    );
  }

  /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.

  This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
  async getGameHighScores(params: MethodParameters["getGameHighScores"]) {
    return await this.request<MethodsReturnType["getGameHighScores"]>(
      "getGameHighScores",
      params,
    );
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
  async deleteMessage(chat_id: number | string, message_id: number) {
    return await this.request<MethodsReturnType["deleteMessage"]>(
      "deleteMessage",
      { chat_id, message_id },
    );
  }

  /** Use this method to delete multiple messages simultaneously. Returns True on success. */
  async deleteMessages(chat_id: number | string, message_ids: number[]) {
    return await this.request<MethodsReturnType["deleteMessages"]>(
      "deleteMessages",
      { chat_id, message_ids },
    );
  }
}

export { Api };
