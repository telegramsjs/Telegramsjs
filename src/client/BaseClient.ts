import { EventEmitter } from "node:events";
import type { ReadStream } from "node:fs";
import type { RequestInit } from "node-fetch";
import { ApiRequest } from "../rest/ApiRequest";
import { Collection } from "@telegram.ts/collection";
import type { ClientOptions } from "./TelegramClient";
import { UserManager } from "../managers/UserManager";
import { ChatManager } from "../managers/ChatManager";
import { Permissions } from "../util/Permissions";
import {
  Message,
  MenuButton,
  ForumTopic,
  ChatFullInfo,
  WebhookInfo,
  UserChatBoosts,
  UserProfilePhotos,
  BusinessConnection,
  ChatAdministratorRights,
  InputFile,
  GameHighScore,
  ClientUser,
  ChatMember,
  Poll,
  Sticker,
  StarTransactions,
  ChatInviteLink,
} from "../structures/index";
import type {
  MethodsReturnType,
  MethodParameters,
  PossiblyAsync,
} from "../types";

interface EventHandlers {
  ready: (
    telegram: import("./TelegramClient").TelegramClient,
  ) => PossiblyAsync<void>;
  disconnect: (
    telegram: import("./TelegramClient").TelegramClient,
  ) => PossiblyAsync<void>;
  message: (
    message: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  channelPost: (
    message: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  businessMessage: (
    message: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  businessConnection: (
    message: import("../structures/business/BusinessConnection").BusinessConnection,
  ) => PossiblyAsync<void>;
  editedMessage: (
    oldMessage: import("../structures/message/Message").Message | null,
    newMessage: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  editedChannelPost: (
    oldMessage: import("../structures/message/Message").Message | null,
    newMessage: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  editedBusinessMessage: (
    oldMessage: import("../structures/message/Message").Message | null,
    newMessage: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  deletedBusinessMessages: (
    message: import("../structures/business/BusinessMessagesDeleted").BusinessMessagesDeleted,
  ) => PossiblyAsync<void>;
  messageReaction: (
    message: import("../structures/MessageReactionUpdated").MessageReactionUpdated,
  ) => PossiblyAsync<void>;
  messageReactionCount: (
    message: import("../structures/MessageReactionCountUpdated").MessageReactionCountUpdated,
  ) => PossiblyAsync<void>;
  inlineQuery: (
    inline: import("../structures/InlineQuery").InlineQuery,
  ) => PossiblyAsync<void>;
  chosenInlineResult: (
    inlineResult: import("../structures/ChosenInlineResult").ChosenInlineResult,
  ) => PossiblyAsync<void>;
  callbackQuery: (
    query: import("../structures/CallbackQuery").CallbackQuery,
  ) => PossiblyAsync<void>;
  shippingQuery: (
    query: import("../structures/ShippingQuery").ShippingQuery,
  ) => PossiblyAsync<void>;
  preCheckoutQuery: (
    checkoutQuery: import("../structures/PreCheckoutQuery").PreCheckoutQuery,
  ) => PossiblyAsync<void>;
  poll: (poll: import("../structures/media/Poll").Poll) => PossiblyAsync<void>;
  pollAnswer: (
    pollAnswer: import("../structures/PollAnswer").PollAnswer,
  ) => PossiblyAsync<void>;
  myChatMember: (
    member: import("../structures/ChatMemberUpdated").ChatMemberUpdated,
  ) => PossiblyAsync<void>;
  chatMember: (
    member: import("../structures/ChatMemberUpdated").ChatMemberUpdated,
  ) => PossiblyAsync<void>;
  chatCreate: (
    message: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  chatMemberAdd: (
    message: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  chatDelete: (
    message: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  chatMemberRemove: (
    message: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  chatJoinRequest: (
    joinRequest: import("../structures/ChatJoinRequest").ChatJoinRequest,
  ) => PossiblyAsync<void>;
  chatBoost: (
    boostChat: import("../structures/ChatBoostUpdated").ChatBoostUpdated,
  ) => PossiblyAsync<void>;
  removedChatBoost: (
    chatBoost: import("../structures/ChatBoostRemoved").ChatBoostRemoved,
  ) => PossiblyAsync<void>;
}

type EventHandlerParameters =
  | import("../structures/message/Message").Message
  | [
      null | import("../structures/message/Message").Message,
      import("../structures/message/Message").Message,
    ]
  | import("../structures/business/BusinessConnection").BusinessConnection
  | import("../structures/business/BusinessMessagesDeleted").BusinessMessagesDeleted
  | import("../structures/MessageReactionUpdated").MessageReactionUpdated
  | import("../structures/MessageReactionCountUpdated").MessageReactionCountUpdated
  | import("../structures/InlineQuery").InlineQuery
  | import("../structures/ChosenInlineResult").ChosenInlineResult
  | import("../structures/CallbackQuery").CallbackQuery
  | import("../structures/ShippingQuery").ShippingQuery
  | import("../structures/PreCheckoutQuery").PreCheckoutQuery
  | import("../structures/media/Poll").Poll
  | import("../structures/PollAnswer").PollAnswer
  | import("../structures/ChatMemberUpdated").ChatMemberUpdated
  | import("../structures/ChatJoinRequest").ChatJoinRequest
  | import("../structures/ChatBoostUpdated").ChatBoostUpdated
  | import("../structures/ChatBoostRemoved").ChatBoostRemoved;

class BaseClient extends EventEmitter {
  public readonly apiRequest: ApiRequest;
  public readonly users: UserManager;
  public readonly chats: ChatManager;
  public readonly updates: Collection<number, EventHandlerParameters>;

  constructor(authToken: string, options?: ClientOptions) {
    super();

    /**
     * The Rest manager of the client
     */
    this.apiRequest = new ApiRequest(authToken, options?.requestOptions);

    /**
     * All of the objects that have been cached at any point, mapped by their ids
     */
    this.users = new UserManager(this, options?.userCacheMaxSize);

    /**
     * All of the that the client is currently handling, mapped by their ids -
     * as long as sharding isn't being used, this will be *every* channel in *every* chat the bot
     * is a member of. Note that DM channels will not be initially cached, and thus not be present
     * in the Manager without their explicit fetching or use.
     */
    this.chats = new ChatManager(this, options?.chatCacheMaxSize);

    /**
     * The updates cache for polling/webhook
     */
    this.updates = new Collection();
  }

  /**
   * Adds a typed listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The ManagerEvents instance.
   */
  on<T extends keyof EventHandlers>(event: T, listener: EventHandlers[T]): this;

  on(event: string, listener: (...data: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  /**
   * Adds a typed one-time listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The ManagerEvents instance.
   */
  once<T extends keyof EventHandlers>(
    event: T,
    listener: EventHandlers[T],
  ): this;

  once(event: string, listener: (...data: any[]) => void) {
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
  async getUpdates(params?: MethodParameters["getUpdates"]) {
    return await this.apiRequest.get<MethodsReturnType["getUpdates"]>(
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
    return await this.apiRequest.get<MethodsReturnType["setWebhook"]>(
      "setWebhook",
      params,
    );
  }

  /** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
  async getMe() {
    return await this.apiRequest
      .get<MethodsReturnType["getMe"]>("getMe")
      .then((res) => new ClientUser(this, res));
  }

  /** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
  async logOut() {
    return await this.apiRequest.get<MethodsReturnType["logOut"]>("logOut");
  }

  /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
  async close() {
    return await this.apiRequest.get<MethodsReturnType["close"]>("close");
  }

  /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
  async deleteWebhook(params?: boolean) {
    return await this.apiRequest.get<MethodsReturnType["deleteWebhook"]>(
      "deleteWebhook",
      {
        drop_pending_updates: params,
      },
    );
  }

  /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
  async getWebhookInfo() {
    return await this.apiRequest
      .get<MethodsReturnType["getWebhookInfo"]>("getWebhookInfo")
      .then((res) => new WebhookInfo(this, res));
  }

  /** Use this method to send text messages. On success, the sent Message is returned. */
  async sendMessage(params: MethodParameters["sendMessage"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendMessage"]>("sendMessage", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send photos. On success, the sent Message is returned. */
  async sendPhoto(params: MethodParameters["sendPhoto"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendPhoto"]>("sendPhoto", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.

  For sending voice messages, use the sendVoice method instead. */
  async sendAudio(params: MethodParameters["sendAudio"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendAudio"]>("sendAudio", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send paid media to channel chats. On success, the sent Message is returned. */
  async sendPaidMedia(params: MethodParameters["sendPaidMedia"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendPaidMedia"]>("sendPaidMedia", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
  async sendDocument(params: MethodParameters["sendDocument"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendDocument"]>("sendDocument", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
  async sendVideo(params: MethodParameters["sendVideo"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendVideo"]>("sendVideo", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
  async sendAnimation(params: MethodParameters["sendAnimation"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendAnimation"]>("sendAnimation", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
  async sendVoice(params: MethodParameters["sendVoice"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendVoice"]>("sendVoice", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send video messages. On success, the sent Message is returned.
  As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
  async sendVideoNote(params: MethodParameters["sendVideoNote"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendVideoNote"]>("sendVideoNote", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
  async sendMediaGroup(params: MethodParameters["sendMediaGroup"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendMediaGroup"]>("sendMediaGroup", params)
      .then((res) => res.map((media) => new Message(this, media)));
  }

  /** Use this method to send point on the map. On success, the sent Message is returned. */
  async sendLocation(params: MethodParameters["sendLocation"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendLocation"]>("sendLocation", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send information about a venue. On success, the sent Message is returned. */
  async sendVenue(params: MethodParameters["sendVenue"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendVenue"]>("sendVenue", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
  async forwardMessage(params: MethodParameters["forwardMessage"]) {
    return await this.apiRequest
      .get<MethodsReturnType["forwardMessage"]>("forwardMessage", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
  async forwardMessages(params: MethodParameters["forwardMessages"]) {
    return await this.apiRequest
      .get<MethodsReturnType["forwardMessages"]>("forwardMessages", params)
      .then((res) => res.map((msg) => msg.message_id));
  }

  /** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
  async copyMessage(params: MethodParameters["copyMessage"]) {
    return await this.apiRequest
      .get<MethodsReturnType["copyMessage"]>("copyMessage", params)
      .then((res) => res.message_id);
  }

  /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
  async copyMessages(params: MethodParameters["copyMessages"]) {
    return await this.apiRequest
      .get<MethodsReturnType["copyMessages"]>("copyMessages", params)
      .then((res) => res.map((msg) => msg.message_id));
  }

  /** Use this method to send phone contacts. On success, the sent Message is returned. */
  async sendContact(params: MethodParameters["sendContact"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendContact"]>("sendContact", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send a native poll. On success, the sent Message is returned. */
  async sendPoll(params: MethodParameters["sendPoll"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendPoll"]>("sendPoll", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
  async sendDice(params: MethodParameters["sendDice"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendDice"]>("sendDice", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.

  Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.

  We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
  async sendChatAction(params: MethodParameters["sendChatAction"]) {
    return await this.apiRequest.get<MethodsReturnType["sendChatAction"]>(
      "sendChatAction",
      params,
    );
  }

  /** Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success. */
  async setMessageReaction(params: MethodParameters["setMessageReaction"]) {
    return await this.apiRequest.get<MethodsReturnType["setMessageReaction"]>(
      "setMessageReaction",
      params,
    );
  }

  /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
  async getUserProfilePhotos(params: MethodParameters["getUserProfilePhotos"]) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getUserProfilePhotos"]
      >("getUserProfilePhotos", params)
      .then((res) => new UserProfilePhotos(this, res));
  }

  /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.

  Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
  async getFile(file_id: string) {
    const response = await this.apiRequest.get<MethodsReturnType["getFile"]>(
      "getFile",
      {
        file_id,
      },
    );
    return new InputFile(this, response);
  }

  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @deprecated Use `banChatMember` instead. */
  async kickChatMember(params: MethodParameters["kickChatMember"]) {
    return await this.apiRequest.get<MethodsReturnType["kickChatMember"]>(
      "kickChatMember",
      params,
    );
  }

  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async banChatMember(params: MethodParameters["banChatMember"]) {
    return await this.apiRequest.get<MethodsReturnType["banChatMember"]>(
      "banChatMember",
      params,
    );
  }

  /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
  async unbanChatMember(params: MethodParameters["unbanChatMember"]) {
    return await this.apiRequest.get<MethodsReturnType["unbanChatMember"]>(
      "unbanChatMember",
      params,
    );
  }

  /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
  async restrictChatMember(params: MethodParameters["restrictChatMember"]) {
    return await this.apiRequest.get<MethodsReturnType["restrictChatMember"]>(
      "restrictChatMember",
      params,
    );
  }

  /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
  async promoteChatMember(params: MethodParameters["promoteChatMember"]) {
    return await this.apiRequest.get<MethodsReturnType["promoteChatMember"]>(
      "promoteChatMember",
      params,
    );
  }

  /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
  async setChatAdministratorCustomTitle(
    params: MethodParameters["setChatAdministratorCustomTitle"],
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["setChatAdministratorCustomTitle"]
    >("setChatAdministratorCustomTitle", params);
  }

  /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
  async banChatSenderChat(chat_id: number | string, sender_chat_id: number) {
    return await this.apiRequest.get<MethodsReturnType["banChatSenderChat"]>(
      "banChatSenderChat",
      { chat_id, sender_chat_id },
    );
  }

  /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
  async unbanChatSenderChat(chat_id: number | string, sender_chat_id: number) {
    return await this.apiRequest.get<MethodsReturnType["unbanChatSenderChat"]>(
      "unbanChatSenderChat",
      { chat_id, sender_chat_id },
    );
  }

  /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
  async setChatPermissions(params: MethodParameters["setChatPermissions"]) {
    const permissions = new Permissions(
      (params?.permissions || {}) as Record<string, boolean>,
    );
    return await this.apiRequest.get<MethodsReturnType["setChatPermissions"]>(
      "setChatPermissions",
      {
        ...params,
        permissions: permissions.toApiFormat(permissions.toObject()),
      },
    );
  }

  /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.

  Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
  async exportChatInviteLink(chat_id?: number | string) {
    return await this.apiRequest.get<MethodsReturnType["exportChatInviteLink"]>(
      "exportChatInviteLink",
      { chat_id },
    );
  }

  /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
  async createChatInviteLink(params: MethodParameters["createChatInviteLink"]) {
    return await this.apiRequest
      .get<
        MethodsReturnType["createChatInviteLink"]
      >("createChatInviteLink", params)
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  async editChatInviteLink(params: MethodParameters["editChatInviteLink"]) {
    return await this.apiRequest
      .get<
        MethodsReturnType["editChatInviteLink"]
      >("editChatInviteLink", params)
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
  async revokeChatInviteLink(invite_link: string, chat_id?: number | string) {
    return await this.apiRequest
      .get<
        MethodsReturnType["revokeChatInviteLink"]
      >("revokeChatInviteLink", { invite_link, chat_id })
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to approve a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  async approveChatJoinRequest(user_id: number, chat_id?: number | string) {
    return await this.apiRequest.get<
      MethodsReturnType["approveChatJoinRequest"]
    >("approveChatJoinRequest", { user_id, chat_id });
  }

  /** Use this method to decline a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  async declineChatJoinRequest(chat_id: number | string, user_id: number) {
    return await this.apiRequest.get<
      MethodsReturnType["declineChatJoinRequest"]
    >("declineChatJoinRequest", { chat_id, user_id });
  }

  /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatPhoto(
    chat_id: number | string,
    photo: Buffer | ReadStream | string,
  ) {
    return await this.apiRequest.get<MethodsReturnType["setChatPhoto"]>(
      "setChatPhoto",
      { chat_id, photo },
    );
  }

  /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async deleteChatPhoto(chat_id: number | string) {
    return await this.apiRequest.get<MethodsReturnType["deleteChatPhoto"]>(
      "deleteChatPhoto",
      { chat_id },
    );
  }

  /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatTitle(chat_id: number | string, title: string) {
    return await this.apiRequest.get<MethodsReturnType["setChatTitle"]>(
      "setChatTitle",
      { chat_id, title },
    );
  }

  /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatDescription(chat_id: number, description?: string) {
    return await this.apiRequest.get<MethodsReturnType["setChatDescription"]>(
      "setChatDescription",
      { chat_id, description },
    );
  }

  /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async pinChatMessage(params: MethodParameters["pinChatMessage"]) {
    return await this.apiRequest.get<MethodsReturnType["pinChatMessage"]>(
      "pinChatMessage",
      params,
    );
  }

  /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async unpinChatMessage(chat_id: number | string, message_id?: number) {
    return await this.apiRequest.get<MethodsReturnType["unpinChatMessage"]>(
      "unpinChatMessage",
      { chat_id, message_id },
    );
  }

  /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async unpinAllChatMessages(chat_id: number | string) {
    return await this.apiRequest.get<MethodsReturnType["unpinAllChatMessages"]>(
      "unpinAllChatMessages",
      { chat_id },
    );
  }

  /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
  async leaveChat(chat_id: number | string) {
    return await this.apiRequest.get<MethodsReturnType["leaveChat"]>(
      "leaveChat",
      {
        chat_id,
      },
    );
  }

  /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
  async getChat(chat_id: number | string) {
    return await this.apiRequest
      .get<MethodsReturnType["getChat"]>("getChat", {
        chat_id,
      })
      .then((res) => new ChatFullInfo(this, res));
  }

  /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
  async getChatAdministrators(chat_id: number | string) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getChatAdministrators"]
      >("getChatAdministrators", { chat_id })
      .then((res) => res.map((user) => new ChatMember(this, chat_id, user)));
  }

  /** Use this method to get the number of members in a chat. Returns Int on success. */
  async getChatMemberCount(chat_id: number | string) {
    return await this.apiRequest.get<MethodsReturnType["getChatMemberCount"]>(
      "getChatMemberCount",
      { chat_id },
    );
  }

  /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
  async getUserChatBoosts(chat_id: number | string, user_id: number) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getUserChatBoosts"]
      >("getUserChatBoosts", { chat_id, user_id })
      .then((res) => new UserChatBoosts(this, res));
  }

  /** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
  async getBusinessConnection(business_connection_id: string) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getBusinessConnection"]
      >("getBusinessConnection", { business_connection_id })
      .then((res) => new BusinessConnection(this, res));
  }

  /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
  async getChatMember(chat_id: number | string, user_id: number) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getChatMember"]
      >("getChatMember", { chat_id, user_id })
      .then((res) => new ChatMember(this, chat_id, res));
  }

  /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  async setChatStickerSet(sticker_set_name: string, chat_id?: number | string) {
    return await this.apiRequest.get<MethodsReturnType["setChatStickerSet"]>(
      "setChatStickerSet",
      { sticker_set_name, chat_id },
    );
  }

  /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  async deleteChatStickerSet(chat_id?: number | string) {
    return await this.apiRequest.get<MethodsReturnType["deleteChatStickerSet"]>(
      "deleteChatStickerSet",
      { chat_id },
    );
  }

  /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
  async getForumTopicIconStickers() {
    return await this.apiRequest
      .get<
        MethodsReturnType["getForumTopicIconStickers"]
      >("getForumTopicIconStickers")
      .then((res) => res.map((sticker) => new Sticker(this, sticker)));
  }

  /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
  async createForumTopic(params: MethodParameters["createForumTopic"]) {
    return await this.apiRequest
      .get<MethodsReturnType["createForumTopic"]>("createForumTopic")
      .then(
        (res) =>
          new ForumTopic(this, res.message_thread_id, params.chat_id, res),
      );
  }

  /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async editForumTopic(params: MethodParameters["editForumTopic"]) {
    return await this.apiRequest.get<MethodsReturnType["editForumTopic"]>(
      "editForumTopic",
      params,
    );
  }

  /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async closeForumTopic(chat_id: number | string, message_thread_id: number) {
    return await this.apiRequest.get<MethodsReturnType["closeForumTopic"]>(
      "closeForumTopic",
      { chat_id, message_thread_id },
    );
  }

  /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async reopenForumTopic(chat_id: number | string, message_thread_id: number) {
    return await this.apiRequest.get<MethodsReturnType["reopenForumTopic"]>(
      "reopenForumTopic",
      { chat_id, message_thread_id },
    );
  }

  /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
  async deleteForumTopic(chat_id: number | string, message_thread_id: number) {
    return await this.apiRequest.get<MethodsReturnType["deleteForumTopic"]>(
      "deleteForumTopic",
      { chat_id, message_thread_id },
    );
  }

  /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
  async unpinAllForumTopicMessages(
    chat_id: number | string,
    message_thread_id: number,
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["unpinAllForumTopicMessages"]
    >("unpinAllForumTopicMessages", { chat_id, message_thread_id });
  }

  /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
  async editGeneralForumTopic(chat_id: number | string, name: string) {
    return await this.apiRequest.get<
      MethodsReturnType["editGeneralForumTopic"]
    >("editGeneralForumTopic", { chat_id, name });
  }

  /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  async closeGeneralForumTopic(chat_id: number | string) {
    return await this.apiRequest.get<
      MethodsReturnType["closeGeneralForumTopic"]
    >("closeGeneralForumTopic", { chat_id });
  }

  /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
  async reopenGeneralForumTopic(chat_id: number | string) {
    return await this.apiRequest.get<
      MethodsReturnType["reopenGeneralForumTopic"]
    >("reopenGeneralForumTopic", { chat_id });
  }

  /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
  async hideGeneralForumTopic(chat_id: number | string) {
    return await this.apiRequest.get<
      MethodsReturnType["hideGeneralForumTopic"]
    >("hideGeneralForumTopic", { chat_id });
  }

  /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  async unhideGeneralForumTopic(chat_id: string | number) {
    return await this.apiRequest.get<
      MethodsReturnType["unhideGeneralForumTopic"]
    >("unhideGeneralForumTopic", { chat_id });
  }

  /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
   */
  async unpinAllGeneralForumTopicMessages(chat_id: string | number) {
    return await this.apiRequest.get<
      MethodsReturnType["unpinAllGeneralForumTopicMessages"]
    >("unpinAllGeneralForumTopicMessages", { chat_id });
  }

  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  async answerCallbackQuery(params: MethodParameters["answerCallbackQuery"]) {
    return await this.apiRequest.get<MethodsReturnType["answerCallbackQuery"]>(
      "answerCallbackQuery",
      params,
    );
  }

  /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
  async setMyCommands(params: MethodParameters["setMyCommands"]) {
    return await this.apiRequest.get<MethodsReturnType["setMyCommands"]>(
      "setMyCommands",
      params,
    );
  }

  /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
  async deleteMyCommands(scope?: string, language_code?: string) {
    return await this.apiRequest.get<MethodsReturnType["deleteMyCommands"]>(
      "deleteMyCommands",
      { scope, language_code },
    );
  }

  /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
  async getMyCommands(
    scope?: MethodParameters["getMyCommands"]["scope"],
    language_code?: string,
  ) {
    return await this.apiRequest.get<MethodsReturnType["getMyCommands"]>(
      "getMyCommands",
      { scope, language_code },
    );
  }

  /** Use this method to change the bot's name. Returns True on success. */
  async setMyName(name?: string, language_code?: string) {
    return await this.apiRequest.get<MethodsReturnType["setMyName"]>(
      "setMyName",
      {
        name,
        language_code,
      },
    );
  }

  /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
  async getMyName(language_code?: string) {
    return await this.apiRequest
      .get<MethodsReturnType["getMyName"]>("getMyName", {
        language_code,
      })
      .then((res) => res.name);
  }

  /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
  async setMyDescription(description?: string, language_code?: string) {
    return await this.apiRequest.get<MethodsReturnType["setMyDescription"]>(
      "setMyDescription",
      { description, language_code },
    );
  }

  /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
  async getMyDescription(language_code?: string) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getMyDescription"]
      >("getMyDescription", { language_code })
      .then((res) => res.description);
  }

  /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
  async setMyShortDescription(
    short_description?: string,
    language_code?: string,
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["setMyShortDescription"]
    >("setMyShortDescription", { short_description, language_code });
  }

  /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
  async getMyShortDescription(language_code?: string) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getMyShortDescription"]
      >("getMyShortDescription", { language_code })
      .then((res) => res.short_description);
  }

  /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
  async setChatMenuButton(
    chat_id?: number,
    menu_button?: MethodParameters["setChatMenuButton"]["menu_button"],
  ) {
    return await this.apiRequest.get<MethodsReturnType["setChatMenuButton"]>(
      "setChatMenuButton",
      { chat_id, menu_button },
    );
  }

  /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
  async getChatMenuButton(chat_id?: number | string) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getChatMenuButton"]
      >("getChatMenuButton", { chat_id })
      .then((res) => new MenuButton(res));
  }

  /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
  async setMyDefaultAdministratorRights(
    rights?: MethodParameters["setMyDefaultAdministratorRights"]["rights"],
    for_channels?: boolean,
  ) {
    const permissions = new Permissions(
      (rights || {}) as Record<string, boolean>,
    );
    return await this.apiRequest.get<
      MethodsReturnType["setMyDefaultAdministratorRights"]
    >("setMyDefaultAdministratorRights", {
      rights: permissions.toApiFormat(permissions.toObject()),
      for_channels,
    });
  }

  /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
  async getMyDefaultAdministratorRights(for_channels: boolean) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getMyDefaultAdministratorRights"]
      >("getMyDefaultAdministratorRights", { for_channels })
      .then((res) => new ChatAdministratorRights(res));
  }

  /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageText(params: MethodParameters["editMessageText"]) {
    return await this.apiRequest
      .get<MethodsReturnType["editMessageText"]>("editMessageText", params)
      .then((res) => {
        if (typeof res === "boolean") return res;
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageCaption(params: MethodParameters["editMessageCaption"]) {
    return await this.apiRequest
      .get<
        MethodsReturnType["editMessageCaption"]
      >("editMessageCaption", params)
      .then((res) => {
        if (typeof res === "boolean") return res;
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageMedia(params: MethodParameters["editMessageMedia"]) {
    return await this.apiRequest
      .get<MethodsReturnType["editMessageMedia"]>("editMessageMedia", params)
      .then((res) => {
        if (typeof res === "boolean") return res;
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async editMessageLiveLocation(
    params: MethodParameters["editMessageLiveLocation"],
  ) {
    return await this.apiRequest
      .get<
        MethodsReturnType["editMessageLiveLocation"]
      >("editMessageLiveLocation", params)
      .then((res) => (typeof res === "boolean" ? res : new Message(this, res)));
  }

  /** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async stopMessageLiveLocation(
    params: MethodParameters["stopMessageLiveLocation"],
  ) {
    return await this.apiRequest
      .get<
        MethodsReturnType["stopMessageLiveLocation"]
      >("stopMessageLiveLocation", params)
      .then((res) => (typeof res === "boolean" ? res : new Message(this, res)));
  }

  /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageReplyMarkup(
    params: MethodParameters["editMessageReplyMarkup"],
  ) {
    return await this.apiRequest
      .get<
        MethodsReturnType["editMessageReplyMarkup"]
      >("editMessageReplyMarkup", params)
      .then((res) => {
        if (typeof res === "boolean") return res;
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
  async stopPoll(params: MethodParameters["stopPoll"]) {
    return await this.apiRequest
      .get<MethodsReturnType["stopPoll"]>("stopPoll", params)
      .then((res) => new Poll(this, res));
  }

  /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
  async sendSticker(params: MethodParameters["sendSticker"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendSticker"]>("sendSticker", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
  async getStickerSet(name: string) {
    return await this.apiRequest.get<MethodsReturnType["getStickerSet"]>(
      "getStickerSet",
      { name },
    );
  }

  /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
  async getCustomEmojiStickers(custom_emoji_ids: string[]) {
    return await this.apiRequest
      .get<
        MethodsReturnType["getCustomEmojiStickers"]
      >("getCustomEmojiStickers", { custom_emoji_ids })
      .then((res) => res.map((sticker) => new Sticker(this, sticker)));
  }

  /** Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success. */
  async uploadStickerFile(params: MethodParameters["uploadStickerFile"]) {
    const response = await this.apiRequest.get<
      MethodsReturnType["uploadStickerFile"]
    >("uploadStickerFile", params);
    return new InputFile(this, response);
  }

  /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
  async createNewStickerSet(params: MethodParameters["createNewStickerSet"]) {
    return await this.apiRequest.get<MethodsReturnType["createNewStickerSet"]>(
      "createNewStickerSet",
      params,
    );
  }

  /** Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
  async addStickerToSet(params: MethodParameters["addStickerToSet"]) {
    return await this.apiRequest.get<MethodsReturnType["addStickerToSet"]>(
      "addStickerToSet",
      params,
    );
  }

  /** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
  async replaceStickerInSet(params: MethodParameters["replaceStickerInSet"]) {
    return await this.apiRequest.get<MethodsReturnType["replaceStickerInSet"]>(
      "replaceStickerInSet",
      params,
    );
  }

  /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
  async setStickerPositionInSet(sticker: string, position: number) {
    return await this.apiRequest.get<
      MethodsReturnType["setStickerPositionInSet"]
    >("setStickerPositionInSet", { sticker, position });
  }

  /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
  async deleteStickerFromSet(sticker: string) {
    return await this.apiRequest.get<MethodsReturnType["deleteStickerFromSet"]>(
      "deleteStickerFromSet",
      { sticker },
    );
  }

  /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  async setStickerEmojiList(sticker: string, emoji_list: string[]) {
    return await this.apiRequest.get<MethodsReturnType["setStickerEmojiList"]>(
      "setStickerEmojiList",
      { sticker, emoji_list },
    );
  }

  /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  async setStickerKeywords(sticker: string, keywords?: string[]) {
    return await this.apiRequest.get<MethodsReturnType["setStickerKeywords"]>(
      "setStickerKeywords",
      { sticker, keywords },
    );
  }

  /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
  async setStickerMaskPosition(
    sticker: string,
    mask_position?: MethodParameters["setStickerMaskPosition"]["mask_position"],
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["setStickerMaskPosition"]
    >("setStickerMaskPosition", { sticker, mask_position });
  }

  /** Use this method to set the title of a created sticker set. Returns True on success. */
  async setStickerSetTitle(name: string, title: string) {
    return await this.apiRequest.get<MethodsReturnType["setStickerSetTitle"]>(
      "setStickerSetTitle",
      { name, title },
    );
  }

  /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
  async setStickerSetThumbnail(
    params: MethodParameters["setStickerSetThumbnail"],
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["setStickerSetThumbnail"]
    >("setStickerSetThumbnail", params);
  }

  /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
  async setCustomEmojiStickerSetThumbnail(
    name: string,
    custom_emoji_id?: string,
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["setCustomEmojiStickerSetThumbnail"]
    >("setCustomEmojiStickerSetThumbnail", { name, custom_emoji_id });
  }

  /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
  async deleteStickerSet(name: string) {
    return await this.apiRequest.get<MethodsReturnType["deleteStickerSet"]>(
      "deleteStickerSet",
      { name },
    );
  }

  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  async answerInlineQuery(params: MethodParameters["answerInlineQuery"]) {
    return await this.apiRequest.get<MethodsReturnType["answerInlineQuery"]>(
      "answerInlineQuery",
      params,
    );
  }

  /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
  async answerWebAppQuery(
    web_app_query_id: string,
    result: MethodParameters["answerWebAppQuery"]["result"],
  ) {
    return await this.apiRequest
      .get<
        MethodsReturnType["answerWebAppQuery"]
      >("answerWebAppQuery", { web_app_query_id, result })
      .then((res) => res.inline_message_id);
  }

  /** Use this method to send invoices. On success, the sent Message is returned. */
  async sendInvoice(params: MethodParameters["sendInvoice"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendInvoice"]>("sendInvoice", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
  async createInvoiceLink(params: MethodParameters["createInvoiceLink"]) {
    return await this.apiRequest.get<MethodsReturnType["createInvoiceLink"]>(
      "createInvoiceLink",
      params,
    );
  }

  /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
  async answerShippingQuery(params: MethodParameters["answerShippingQuery"]) {
    return await this.apiRequest.get<MethodsReturnType["answerShippingQuery"]>(
      "answerShippingQuery",
      params,
    );
  }

  /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
  async answerPreCheckoutQuery(
    params: MethodParameters["answerPreCheckoutQuery"],
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["answerPreCheckoutQuery"]
    >("answerPreCheckoutQuery", params);
  }

  /** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
  async getStarTransactions(offset?: number, limit?: number) {
    return await this.apiRequest
      .get<MethodsReturnType["getStarTransactions"]>("getStarTransactions", {
        offset,
        limit,
      })
      .then((res) => new StarTransactions(this, res));
  }

  /** Refunds a successful payment in Telegram Stars. Returns True on success */
  async refundStarPayment(userId: number, telegramPaymentChargeId: string) {
    return await this.apiRequest.get<MethodsReturnType["refundStarPayment"]>(
      "refundStarPayment",
      {
        user_id: userId,
        telegram_payment_charge_id: telegramPaymentChargeId,
      },
    );
  }

  /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.

  Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
  async setPassportDataErrors(
    user_id: number,
    errors: MethodParameters["setPassportDataErrors"]["errors"],
  ) {
    return await this.apiRequest.get<
      MethodsReturnType["setPassportDataErrors"]
    >("setPassportDataErrors", { user_id, errors });
  }

  /** Use this method to send a game. On success, the sent Message is returned. */
  async sendGame(params: MethodParameters["sendGame"]) {
    return await this.apiRequest
      .get<MethodsReturnType["sendGame"]>("sendGame", params)
      .then((res) => {
        const message = new Message(this, res);
        if ("chat" in message && message.chat) {
          message.chat.messages._add(res);
        }
        return message;
      });
  }

  /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
  async setGameScore(params: MethodParameters["setGameScore"]) {
    return await this.apiRequest
      .get<MethodsReturnType["setGameScore"]>("setGameScore", params)
      .then((res) => (typeof res === "boolean" ? res : new Message(this, res)));
  }

  /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.

  This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
  async getGameHighScores(params: MethodParameters["getGameHighScores"]) {
    return await this.apiRequest
      .get<MethodsReturnType["getGameHighScores"]>("getGameHighScores", params)
      .then((res) => res.map((game) => new GameHighScore(this, game)));
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
    return await this.apiRequest.get<MethodsReturnType["deleteMessage"]>(
      "deleteMessage",
      { chat_id, message_id },
    );
  }

  /** Use this method to delete multiple messages simultaneously. Returns True on success. */
  async deleteMessages(chat_id: number | string, message_ids: number[]) {
    return await this.apiRequest.get<MethodsReturnType["deleteMessages"]>(
      "deleteMessages",
      { chat_id, message_ids },
    );
  }
}

export { BaseClient, EventHandlerParameters };
