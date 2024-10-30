import type { ReadStream } from "node:fs";
import { EventEmitter } from "node:events";
import { Rest } from "../rest/Rest";
import { Collection } from "@telegram.ts/collection";
import { UserManager } from "../managers/UserManager";
import { ChatManager } from "../managers/ChatManager";
import type { LanguageCode } from "./interfaces/Language";
import type { ClientOptions, TelegramClient } from "./TelegramClient";
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
  StickerSet,
  StarTransactions,
  ChatInviteLink,
} from "../structures/index";
import {
  ChatPermissions,
  type ChatPermissionFlags,
} from "../util/ChatPermissions";
import { toApiFormat } from "../util/ApiPermissions";
import type {
  MethodsApiReturnType,
  MethodsLibReturnType,
  MethodParameters,
  PossiblyAsync,
} from "../types";

/**
 * Convert an object's keys from camelCase to snake_case.
 * @param params The object with camelCase keys.
 * @returns A new object with snake_case keys.
 */
function toSnakeCase<T extends Record<string, any>>(
  params: T,
): Record<string, any> {
  const snakeCasedParams: Record<string, any> = {};

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      snakeCasedParams[snakeCaseKey] = params[key];
    }
  }

  return snakeCasedParams;
}

interface EventHandlers {
  ready: (
    telegram: import("./TelegramClient").TelegramClient,
  ) => PossiblyAsync<void>;
  disconnect: (
    telegram: import("./TelegramClient").TelegramClient,
  ) => PossiblyAsync<void>;
  error: (detalis: [number, unknown]) => PossiblyAsync<void>;
  rawUpdate: (
    raw: import("@telegram.ts/types").Update & { client: TelegramClient },
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
    newMessage: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  editedChannelPost: (
    newMessage: import("../structures/message/Message").Message,
  ) => PossiblyAsync<void>;
  editedBusinessMessage: (
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
  purchasedPaidMedia: (
    paidMedia: import("../structures/PaidMediaPurchased").PaidMediaPurchased,
  ) => PossiblyAsync<void>;
}

type EventHandlerParameters =
  | import("@telegram.ts/types").Update
  | import("../structures/message/Message").Message
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
  | import("../structures/ChatBoostRemoved").ChatBoostRemoved
  | import("../structures/PaidMediaPurchased").PaidMediaPurchased;

class BaseClient extends EventEmitter {
  public readonly rest: Rest;
  public readonly users: UserManager;
  public readonly chats: ChatManager;
  public readonly updates: Collection<number, EventHandlerParameters>;

  constructor(authToken: string, options?: ClientOptions) {
    super();

    /**
     * The Rest manager of the client
     */
    this.rest = new Rest(authToken, options?.restOptions);

    /**
     * All of the objects that have been cached at any point, mapped by their ids
     */
    this.users = new UserManager(this, [], {
      cacheSize: options?.userCacheMaxSize ?? -1,
      ...(options?.userCacheFilter && {
        cacheFilter: options?.userCacheFilter,
      }),
    });

    /**
     * All of the that the client is currently handling, mapped by their ids -
     * as long as sharding isn't being used, this will be *every* channel in *every* chat the bot
     * is a member of. Note that DM channels will not be initially cached, and thus not be present
     * in the Manager without their explicit fetching or use.
     */
    this.chats = new ChatManager(this, [], {
      cacheSize: options?.chatCacheMaxSize ?? -1,
      ...(options?.chatCacheFilter && {
        cacheFilter: options?.chatCacheFilter,
      }),
    });

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
  override on<T extends keyof EventHandlers>(
    event: T,
    listener: EventHandlers[T],
  ): this;

  override on(event: string, listener: (...data: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  /**
   * Adds a typed one-time listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The ManagerEvents instance.
   */
  override once<T extends keyof EventHandlers>(
    event: T,
    listener: EventHandlers[T],
  ): this;

  override once(event: string, listener: (...data: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  /**
   * Increments max listeners by one, if they are not zero.
   * @returns {void}
   */
  incrementMaxListeners() {
    const maxListeners = this.getMaxListeners();
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + 1);
    }
  }

  /**
   * Decrements max listeners by one, if they are not zero.
   * @returns {void}
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
    return await this.rest.request<MethodsApiReturnType["getUpdates"]>(
      "getUpdates",
      toSnakeCase(params || {}),
    );
  }

  /** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.

  If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.

  Notes
  1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
  2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
  3. Ports currently supported for Webhooks: 443, 80, 88, 8443.

  If you're having any trouble setting up webhooks, please check out this amazing guide to webhooks. */
  async setWebhook(
    params: MethodParameters["setWebhook"],
  ): Promise<MethodsLibReturnType["setWebhook"]> {
    return await this.rest.request<MethodsApiReturnType["setWebhook"]>(
      "setWebhook",
      toSnakeCase(params),
    );
  }

  /** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
  async getMe(): Promise<MethodsLibReturnType["getMe"]> {
    return await this.rest
      .request<MethodsApiReturnType["getMe"]>("getMe")
      .then((res) => new ClientUser(this, res));
  }

  /** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
  async logOut(): Promise<MethodsLibReturnType["logOut"]> {
    return await this.rest.request<MethodsApiReturnType["logOut"]>("logOut");
  }

  /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
  async close(): Promise<MethodsLibReturnType["close"]> {
    return await this.rest.request<MethodsApiReturnType["close"]>("close");
  }

  /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
  async deleteWebhook(
    dropPendingUpdates?: boolean,
  ): Promise<MethodsLibReturnType["deleteWebhook"]> {
    return await this.rest.request<MethodsApiReturnType["deleteWebhook"]>(
      "deleteWebhook",
      {
        dropPendingUpdates,
      },
    );
  }

  /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
  async getWebhookInfo(): Promise<MethodsLibReturnType["getWebhookInfo"]> {
    return await this.rest
      .request<MethodsApiReturnType["getWebhookInfo"]>("getWebhookInfo")
      .then((res) => new WebhookInfo(this, res));
  }

  /** Use this method to send text messages. On success, the sent Message is returned. */
  async sendMessage(
    params: MethodParameters["sendMessage"],
  ): Promise<MethodsLibReturnType["sendMessage"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendMessage"]
      >("sendMessage", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendMessage"],
      );
  }

  /** Use this method to send photos. On success, the sent Message is returned. */
  async sendPhoto(
    params: MethodParameters["sendPhoto"],
  ): Promise<MethodsLibReturnType["sendPhoto"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendPhoto"]
      >("sendPhoto", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendPhoto"],
      );
  }

  /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.

  For sending voice messages, use the sendVoice method instead. */
  async sendAudio(
    params: MethodParameters["sendAudio"],
  ): Promise<MethodsLibReturnType["sendAudio"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendAudio"]
      >("sendAudio", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendAudio"],
      );
  }

  /** Use this method to send paid media to channel chats. On success, the sent Message is returned. */
  async sendPaidMedia(
    params: MethodParameters["sendPaidMedia"],
  ): Promise<MethodsLibReturnType["sendPaidMedia"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendPaidMedia"]
      >("sendPaidMedia", toSnakeCase(params))
      .then(
        (res) =>
          new Message(this, res) as MethodsLibReturnType["sendPaidMedia"],
      );
  }

  /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
  async sendDocument(
    params: MethodParameters["sendDocument"],
  ): Promise<MethodsLibReturnType["sendDocument"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendDocument"]
      >("sendDocument", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendDocument"],
      );
  }

  /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
  async sendVideo(
    params: MethodParameters["sendVideo"],
  ): Promise<MethodsLibReturnType["sendVideo"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendVideo"]
      >("sendVideo", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendVideo"],
      );
  }

  /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
  async sendAnimation(
    params: MethodParameters["sendAnimation"],
  ): Promise<MethodsLibReturnType["sendAnimation"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendAnimation"]
      >("sendAnimation", toSnakeCase(params))
      .then(
        (res) =>
          new Message(this, res) as MethodsLibReturnType["sendAnimation"],
      );
  }

  /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
  async sendVoice(
    params: MethodParameters["sendVoice"],
  ): Promise<MethodsLibReturnType["sendVoice"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendVoice"]
      >("sendVoice", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendVoice"],
      );
  }

  /** Use this method to send video messages. On success, the sent Message is returned.
  As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
  async sendVideoNote(
    params: MethodParameters["sendVideoNote"],
  ): Promise<MethodsLibReturnType["sendVideoNote"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendVideoNote"]
      >("sendVideoNote", toSnakeCase(params))
      .then(
        (res) =>
          new Message(this, res) as MethodsLibReturnType["sendVideoNote"],
      );
  }

  /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
  async sendMediaGroup(
    params: MethodParameters["sendMediaGroup"],
  ): Promise<MethodsLibReturnType["sendMediaGroup"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendMediaGroup"]
      >("sendMediaGroup", toSnakeCase(params))
      .then(
        (res) =>
          res.map(
            (media) => new Message(this, media),
          ) as MethodsLibReturnType["sendMediaGroup"],
      );
  }

  /** Use this method to send point on the map. On success, the sent Message is returned. */
  async sendLocation(
    params: MethodParameters["sendLocation"],
  ): Promise<MethodsLibReturnType["sendLocation"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendLocation"]
      >("sendLocation", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendLocation"],
      );
  }

  /** Use this method to send information about a venue. On success, the sent Message is returned. */
  async sendVenue(
    params: MethodParameters["sendVenue"],
  ): Promise<MethodsLibReturnType["sendVenue"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendVenue"]
      >("sendVenue", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendVenue"],
      );
  }

  /** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
  async forwardMessage(
    params: MethodParameters["forwardMessage"],
  ): Promise<MethodsLibReturnType["forwardMessage"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["forwardMessage"]
      >("forwardMessage", toSnakeCase(params))
      .then((res) => new Message(this, res));
  }

  /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
  async forwardMessages(
    params: MethodParameters["forwardMessages"],
  ): Promise<MethodsLibReturnType["forwardMessages"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["forwardMessages"]
      >("forwardMessages", toSnakeCase(params))
      .then((res) => res.map((msg) => msg.message_id));
  }

  /** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
  async copyMessage(
    params: MethodParameters["copyMessage"],
  ): Promise<MethodsLibReturnType["copyMessage"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["copyMessage"]
      >("copyMessage", toSnakeCase(params))
      .then((res) => res.message_id);
  }

  /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
  async copyMessages(
    params: MethodParameters["copyMessages"],
  ): Promise<MethodsLibReturnType["copyMessages"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["copyMessages"]
      >("copyMessages", toSnakeCase(params))
      .then((res) => res.map((msg) => msg.message_id));
  }

  /** Use this method to send phone contacts. On success, the sent Message is returned. */
  async sendContact(
    params: MethodParameters["sendContact"],
  ): Promise<MethodsLibReturnType["sendContact"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendContact"]
      >("sendContact", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendContact"],
      );
  }

  /** Use this method to send a native poll. On success, the sent Message is returned. */
  async sendPoll(
    params: MethodParameters["sendPoll"],
  ): Promise<MethodsLibReturnType["sendPoll"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendPoll"]
      >("sendPoll", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendPoll"],
      );
  }

  /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
  async sendDice(
    params: MethodParameters["sendDice"],
  ): Promise<MethodsLibReturnType["sendDice"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendDice"]
      >("sendDice", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendDice"],
      );
  }

  /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.

  Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.

  We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
  async sendChatAction(
    params: MethodParameters["sendChatAction"],
  ): Promise<MethodsLibReturnType["sendChatAction"]> {
    return await this.rest.request<MethodsApiReturnType["sendChatAction"]>(
      "sendChatAction",
      toSnakeCase(params),
    );
  }

  /** Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success. */
  async setMessageReaction(
    params: MethodParameters["setMessageReaction"],
  ): Promise<MethodsLibReturnType["setMessageReaction"]> {
    return await this.rest.request<MethodsApiReturnType["setMessageReaction"]>(
      "setMessageReaction",
      toSnakeCase(params),
    );
  }

  /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
  async getUserProfilePhotos(
    params: MethodParameters["getUserProfilePhotos"],
  ): Promise<MethodsLibReturnType["getUserProfilePhotos"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getUserProfilePhotos"]
      >("getUserProfilePhotos", toSnakeCase(params))
      .then((res) => new UserProfilePhotos(this, res));
  }

  /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.

  Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
  async getFile(fileId: string): Promise<MethodsLibReturnType["getFile"]> {
    const response = await this.rest.request<MethodsApiReturnType["getFile"]>(
      "getFile",
      {
        file_id: fileId,
      },
    );
    return new InputFile(this, response);
  }

  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async kickChatMember(
    params: MethodParameters["kickChatMember"],
  ): Promise<MethodsLibReturnType["kickChatMember"]> {
    return await this.rest.request<MethodsApiReturnType["kickChatMember"]>(
      "kickChatMember",
      toSnakeCase(params),
    );
  }

  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async banChatMember(
    params: MethodParameters["banChatMember"],
  ): Promise<MethodsLibReturnType["banChatMember"]> {
    return await this.rest.request<MethodsApiReturnType["banChatMember"]>(
      "banChatMember",
      toSnakeCase(params),
    );
  }

  /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
  async unbanChatMember(
    params: MethodParameters["unbanChatMember"],
  ): Promise<MethodsLibReturnType["unbanChatMember"]> {
    return await this.rest.request<MethodsApiReturnType["unbanChatMember"]>(
      "unbanChatMember",
      toSnakeCase(params),
    );
  }

  /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
  async restrictChatMember(
    params: Omit<MethodParameters["restrictChatMember"], "permissions"> & {
      permissions: ChatPermissionFlags;
    },
  ): Promise<MethodsLibReturnType["restrictChatMember"]> {
    const permissions = new ChatPermissions(params.permissions);
    return await this.rest.request<MethodsApiReturnType["restrictChatMember"]>(
      "restrictChatMember",
      {
        ...toSnakeCase(params),
        permissions: toApiFormat(permissions.toObject()),
      },
    );
  }

  /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
  async promoteChatMember(
    params: Omit<
      MethodParameters["promoteChatMember"],
      keyof ChatPermissionFlags
    > & { permissions: ChatPermissionFlags },
  ): Promise<MethodsLibReturnType["promoteChatMember"]> {
    const permissions = new ChatPermissions(params.permissions);
    return await this.rest.request<MethodsApiReturnType["promoteChatMember"]>(
      "promoteChatMember",
      { ...toSnakeCase(params), ...toApiFormat(permissions.toObject()) },
    );
  }

  /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
  async setChatAdministratorCustomTitle(
    params: MethodParameters["setChatAdministratorCustomTitle"],
  ): Promise<MethodsLibReturnType["setChatAdministratorCustomTitle"]> {
    return await this.rest.request<
      MethodsApiReturnType["setChatAdministratorCustomTitle"]
    >("setChatAdministratorCustomTitle", toSnakeCase(params));
  }

  /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
  async banChatSenderChat(
    chatId: number | string,
    senderChatId: number | string,
  ): Promise<MethodsLibReturnType["banChatSenderChat"]> {
    return await this.rest.request<MethodsApiReturnType["banChatSenderChat"]>(
      "banChatSenderChat",
      { chat_id: chatId, sender_chat_id: senderChatId },
    );
  }

  /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
  async unbanChatSenderChat(
    chatId: number | string,
    senderChatId: number | string,
  ): Promise<MethodsLibReturnType["unbanChatSenderChat"]> {
    return await this.rest.request<MethodsApiReturnType["unbanChatSenderChat"]>(
      "unbanChatSenderChat",
      { chat_id: chatId, sender_chat_id: senderChatId },
    );
  }

  /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
  async setChatPermissions(
    params: Omit<MethodParameters["setChatPermissions"], "permissions"> & {
      permissions?: ChatPermissionFlags;
    },
  ): Promise<MethodsLibReturnType["setChatPermissions"]> {
    const permissions = new ChatPermissions(params.permissions);
    return await this.rest.request<MethodsApiReturnType["setChatPermissions"]>(
      "setChatPermissions",
      {
        ...toSnakeCase(params),
        permissions: toApiFormat(permissions.toObject()),
      },
    );
  }

  /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.

  Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
  async exportChatInviteLink(
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["exportChatInviteLink"]> {
    return await this.rest.request<
      MethodsApiReturnType["exportChatInviteLink"]
    >("exportChatInviteLink", { chat_id: chatId });
  }

  /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
  async createChatInviteLink(
    params: MethodParameters["createChatInviteLink"],
  ): Promise<MethodsLibReturnType["createChatInviteLink"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["createChatInviteLink"]
      >("createChatInviteLink", toSnakeCase(params))
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  async editChatInviteLink(
    params: MethodParameters["editChatInviteLink"],
  ): Promise<MethodsLibReturnType["editChatInviteLink"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["editChatInviteLink"]
      >("editChatInviteLink", toSnakeCase(params))
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink. Returns the new invite link as a ChatInviteLink object. */
  async createChatSubscriptionInviteLink(
    params: MethodParameters["createChatSubscriptionInviteLink"],
  ): Promise<MethodsLibReturnType["createChatSubscriptionInviteLink"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["createChatSubscriptionInviteLink"]
      >("createChatSubscriptionInviteLink", toSnakeCase(params))
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  async editChatSubscriptionInviteLink(
    params: MethodParameters["editChatSubscriptionInviteLink"],
  ): Promise<MethodsLibReturnType["editChatSubscriptionInviteLink"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["editChatSubscriptionInviteLink"]
      >("editChatSubscriptionInviteLink", toSnakeCase(params))
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
  async revokeChatInviteLink(
    inviteLink: string,
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["revokeChatInviteLink"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["revokeChatInviteLink"]
      >("revokeChatInviteLink", { invite_link: inviteLink, ...(chatId && { chat_id: chatId }) })
      .then((res) => new ChatInviteLink(this, res));
  }

  /** Use this method to approve a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  async approveChatJoinRequest(
    userId: number | string,
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["approveChatJoinRequest"]> {
    return await this.rest.request<
      MethodsApiReturnType["approveChatJoinRequest"]
    >("approveChatJoinRequest", {
      ...(chatId && { chat_id: chatId }),
      user_id: userId,
    });
  }

  /** Use this method to decline a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  async declineChatJoinRequest(
    chatId: number | string,
    userId: number | string,
  ): Promise<MethodsLibReturnType["declineChatJoinRequest"]> {
    return await this.rest.request<
      MethodsApiReturnType["declineChatJoinRequest"]
    >("declineChatJoinRequest", { chat_id: chatId, user_id: userId });
  }

  /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatPhoto(
    chatId: number | string,
    photo:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string,
  ): Promise<MethodsLibReturnType["setChatPhoto"]> {
    return await this.rest.request<MethodsApiReturnType["setChatPhoto"]>(
      "setChatPhoto",
      { chat_id: chatId, photo },
    );
  }

  /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async deleteChatPhoto(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["deleteChatPhoto"]> {
    return await this.rest.request<MethodsApiReturnType["deleteChatPhoto"]>(
      "deleteChatPhoto",
      { chat_id: chatId },
    );
  }

  /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatTitle(
    chatId: number | string,
    title: string,
  ): Promise<MethodsLibReturnType["setChatTitle"]> {
    return await this.rest.request<MethodsApiReturnType["setChatTitle"]>(
      "setChatTitle",
      { chat_id: chatId, title },
    );
  }

  /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  async setChatDescription(
    chatId: number | string,
    description?: string,
  ): Promise<MethodsLibReturnType["setChatDescription"]> {
    return await this.rest.request<MethodsApiReturnType["setChatDescription"]>(
      "setChatDescription",
      {
        chat_id: chatId,
        ...(description && { description }),
      },
    );
  }

  /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async pinChatMessage(
    params: MethodParameters["pinChatMessage"],
  ): Promise<MethodsLibReturnType["pinChatMessage"]> {
    return await this.rest.request<MethodsApiReturnType["pinChatMessage"]>(
      "pinChatMessage",
      toSnakeCase(params),
    );
  }

  /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async unpinChatMessage(
    params: MethodParameters["unpinChatMessage"],
  ): Promise<MethodsLibReturnType["unpinChatMessage"]> {
    return await this.rest.request<MethodsApiReturnType["unpinChatMessage"]>(
      "unpinChatMessage",
      toSnakeCase(params),
    );
  }

  /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  async unpinAllChatMessages(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["unpinAllChatMessages"]> {
    return await this.rest.request<
      MethodsApiReturnType["unpinAllChatMessages"]
    >("unpinAllChatMessages", { chat_id: chatId });
  }

  /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
  async leaveChat(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["leaveChat"]> {
    return await this.rest.request<MethodsApiReturnType["leaveChat"]>(
      "leaveChat",
      {
        chat_id: chatId,
      },
    );
  }

  /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
  async getChat(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["getChat"]> {
    return await this.rest
      .request<MethodsApiReturnType["getChat"]>("getChat", {
        chat_id: chatId,
      })
      .then(
        (res) =>
          new ChatFullInfo(
            this,
            res,
          ) as unknown as MethodsLibReturnType["getChat"],
      );
  }

  /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
  async getChatAdministrators(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["getChatAdministrators"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getChatAdministrators"]
      >("getChatAdministrators", { chat_id: chatId })
      .then(
        (res) =>
          res.map(
            (user) => new ChatMember(this, chatId, user),
          ) as unknown as MethodsLibReturnType["getChatAdministrators"],
      );
  }

  /** Use this method to get the number of members in a chat. Returns Int on success. */
  async getChatMemberCount(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["getChatMemberCount"]> {
    return await this.rest.request<MethodsApiReturnType["getChatMemberCount"]>(
      "getChatMemberCount",
      { chat_id: chatId },
    );
  }

  /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
  async getUserChatBoosts(
    chatId: number | string,
    userId: number | string,
  ): Promise<MethodsLibReturnType["getUserChatBoosts"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getUserChatBoosts"]
      >("getUserChatBoosts", { chat_id: chatId, user_id: userId })
      .then((res) => new UserChatBoosts(this, res));
  }

  /** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
  async getBusinessConnection(
    businessConnectionId: string,
  ): Promise<MethodsLibReturnType["getBusinessConnection"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getBusinessConnection"]
      >("getBusinessConnection", { business_connection_id: businessConnectionId })
      .then((res) => new BusinessConnection(this, res));
  }

  /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
  async getChatMember(
    chatId: number | string,
    userId: number | string,
  ): Promise<MethodsLibReturnType["getChatMember"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getChatMember"]
      >("getChatMember", { chat_id: chatId, user_id: userId })
      .then((res) => new ChatMember(this, chatId, res));
  }

  /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  async setChatStickerSet(
    stickerSetName: string,
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["setChatStickerSet"]> {
    return await this.rest.request<MethodsApiReturnType["setChatStickerSet"]>(
      "setChatStickerSet",
      { sticker_set_name: stickerSetName, ...(chatId && { chat_id: chatId }) },
    );
  }

  /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  async deleteChatStickerSet(
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["deleteChatStickerSet"]> {
    return await this.rest.request<
      MethodsApiReturnType["deleteChatStickerSet"]
    >("deleteChatStickerSet", { ...(chatId && { chat_id: chatId }) });
  }

  /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
  async getForumTopicIconStickers(): Promise<
    MethodsLibReturnType["getForumTopicIconStickers"]
  > {
    return await this.rest
      .request<
        MethodsApiReturnType["getForumTopicIconStickers"]
      >("getForumTopicIconStickers")
      .then(
        (res) =>
          res.map(
            (sticker) => new Sticker(this, sticker),
          ) as unknown as MethodsLibReturnType["getForumTopicIconStickers"],
      );
  }

  /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
  async createForumTopic(
    params: MethodParameters["createForumTopic"],
  ): Promise<MethodsLibReturnType["createForumTopic"]> {
    return await this.rest
      .request<MethodsApiReturnType["createForumTopic"]>("createForumTopic")
      .then(
        (res) =>
          new ForumTopic(this, res.message_thread_id, params.chatId, res),
      );
  }

  /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async editForumTopic(
    params: MethodParameters["editForumTopic"],
  ): Promise<MethodsLibReturnType["editForumTopic"]> {
    return await this.rest.request<MethodsApiReturnType["editForumTopic"]>(
      "editForumTopic",
      toSnakeCase(params),
    );
  }

  /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async closeForumTopic(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["closeForumTopic"]> {
    return await this.rest.request<MethodsApiReturnType["closeForumTopic"]>(
      "closeForumTopic",
      { chat_id: chatId, message_thread_id: messageThreadId },
    );
  }

  /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  async reopenForumTopic(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["reopenForumTopic"]> {
    return await this.rest.request<MethodsApiReturnType["reopenForumTopic"]>(
      "reopenForumTopic",
      { chat_id: chatId, message_thread_id: messageThreadId },
    );
  }

  /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
  async deleteForumTopic(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["deleteForumTopic"]> {
    return await this.rest.request<MethodsApiReturnType["deleteForumTopic"]>(
      "deleteForumTopic",
      { chat_id: chatId, message_thread_id: messageThreadId },
    );
  }

  /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
  async unpinAllForumTopicMessages(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["unpinAllForumTopicMessages"]> {
    return await this.rest.request<
      MethodsApiReturnType["unpinAllForumTopicMessages"]
    >("unpinAllForumTopicMessages", {
      chat_id: chatId,
      message_thread_id: messageThreadId,
    });
  }

  /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
  async editGeneralForumTopic(
    chatId: number | string,
    name: string,
  ): Promise<MethodsLibReturnType["editGeneralForumTopic"]> {
    return await this.rest.request<
      MethodsApiReturnType["editGeneralForumTopic"]
    >("editGeneralForumTopic", { chat_id: chatId, name });
  }

  /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  async closeGeneralForumTopic(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["closeGeneralForumTopic"]> {
    return await this.rest.request<
      MethodsApiReturnType["closeGeneralForumTopic"]
    >("closeGeneralForumTopic", { chat_id: chatId });
  }

  /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
  async reopenGeneralForumTopic(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["reopenGeneralForumTopic"]> {
    return await this.rest.request<
      MethodsApiReturnType["reopenGeneralForumTopic"]
    >("reopenGeneralForumTopic", { chat_id: chatId });
  }

  /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
  async hideGeneralForumTopic(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["hideGeneralForumTopic"]> {
    return await this.rest.request<
      MethodsApiReturnType["hideGeneralForumTopic"]
    >("hideGeneralForumTopic", { chat_id: chatId });
  }

  /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  async unhideGeneralForumTopic(
    chatId: string | number,
  ): Promise<MethodsLibReturnType["unhideGeneralForumTopic"]> {
    return await this.rest.request<
      MethodsApiReturnType["unhideGeneralForumTopic"]
    >("unhideGeneralForumTopic", { chat_id: chatId });
  }

  /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
   */
  async unpinAllGeneralForumTopicMessages(
    chatId: string | number,
  ): Promise<MethodsLibReturnType["unpinAllGeneralForumTopicMessages"]> {
    return await this.rest.request<
      MethodsApiReturnType["unpinAllGeneralForumTopicMessages"]
    >("unpinAllGeneralForumTopicMessages", { chat_id: chatId });
  }

  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  async answerCallbackQuery(
    params: MethodParameters["answerCallbackQuery"],
  ): Promise<MethodsLibReturnType["answerCallbackQuery"]> {
    return await this.rest.request<MethodsApiReturnType["answerCallbackQuery"]>(
      "answerCallbackQuery",
      toSnakeCase(params),
    );
  }

  /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
  async setMyCommands(
    params: MethodParameters["setMyCommands"],
  ): Promise<MethodsLibReturnType["setMyCommands"]> {
    return await this.rest.request<MethodsApiReturnType["setMyCommands"]>(
      "setMyCommands",
      toSnakeCase(params),
    );
  }

  /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
  async deleteMyCommands(
    scope?: MethodParameters["deleteMyCommands"]["scope"],
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["deleteMyCommands"]> {
    return await this.rest.request<MethodsApiReturnType["deleteMyCommands"]>(
      "deleteMyCommands",
      {
        ...(scope && { scope }),
        ...(languageCode && { language_code: languageCode }),
      },
    );
  }

  /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
  async getMyCommands(
    scope?: MethodParameters["getMyCommands"]["scope"],
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyCommands"]> {
    return await this.rest.request<MethodsApiReturnType["getMyCommands"]>(
      "getMyCommands",
      {
        ...(scope && { scope }),
        ...(languageCode && { language_code: languageCode }),
      },
    );
  }

  /** Use this method to change the bot's name. Returns True on success. */
  async setMyName(
    name?: string,
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["setMyName"]> {
    return await this.rest.request<MethodsApiReturnType["setMyName"]>(
      "setMyName",
      {
        ...(name && { name }),
        ...(languageCode && { language_code: languageCode }),
      },
    );
  }

  /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
  async getMyName(
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyName"]> {
    return await this.rest
      .request<MethodsApiReturnType["getMyName"]>("getMyName", {
        ...(languageCode && { language_code: languageCode }),
      })
      .then((res) => res.name);
  }

  /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
  async setMyDescription(
    description?: string,
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["setMyDescription"]> {
    return await this.rest.request<MethodsApiReturnType["setMyDescription"]>(
      "setMyDescription",
      {
        ...(description && { description }),
        ...(languageCode && { language_code: languageCode }),
      },
    );
  }

  /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
  async getMyDescription(
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyDescription"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getMyDescription"]
      >("getMyDescription", { ...(languageCode && { language_code: languageCode }) })
      .then((res) => res.description);
  }

  /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
  async setMyShortDescription(
    shortDescription?: string,
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["setMyShortDescription"]> {
    return await this.rest.request<
      MethodsApiReturnType["setMyShortDescription"]
    >("setMyShortDescription", {
      ...(shortDescription && { short_description: shortDescription }),
      ...(languageCode && { language_code: languageCode }),
    });
  }

  /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
  async getMyShortDescription(
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyShortDescription"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getMyShortDescription"]
      >("getMyShortDescription", { ...(languageCode && { language_code: languageCode }) })
      .then((res) => res.short_description);
  }

  /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
  async setChatMenuButton(
    chatId?: string | number,
    menuButton?: MethodParameters["setChatMenuButton"]["menuButton"],
  ): Promise<MethodsLibReturnType["setChatMenuButton"]> {
    return await this.rest.request<MethodsApiReturnType["setChatMenuButton"]>(
      "setChatMenuButton",
      {
        ...(chatId && { chat_id: chatId }),
        ...(menuButton && { menu_button: menuButton }),
      },
    );
  }

  /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
  async getChatMenuButton(
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["getChatMenuButton"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getChatMenuButton"]
      >("getChatMenuButton", { ...(chatId && { chat_id: chatId }) })
      .then((res) => new MenuButton(res));
  }

  /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
  async setMyDefaultAdministratorRights(
    rights?: ChatPermissionFlags,
    forChannels?: boolean,
  ): Promise<MethodsLibReturnType["setMyDefaultAdministratorRights"]> {
    const permissions = new ChatPermissions(
      (rights || {}) as ChatPermissionFlags,
    );
    return await this.rest.request<
      MethodsApiReturnType["setMyDefaultAdministratorRights"]
    >("setMyDefaultAdministratorRights", {
      ...(rights && { rights: toApiFormat(permissions.toObject()) }),
      ...(typeof forChannels === "boolean" && { for_channels: forChannels }),
    });
  }

  /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
  async getMyDefaultAdministratorRights(
    forChannels?: boolean,
  ): Promise<MethodsLibReturnType["getMyDefaultAdministratorRights"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getMyDefaultAdministratorRights"]
      >("getMyDefaultAdministratorRights", { ...(typeof forChannels === "boolean" && { for_channels: forChannels }) })
      .then((res) => new ChatAdministratorRights(res));
  }

  /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageText(
    params: MethodParameters["editMessageText"],
  ): Promise<MethodsLibReturnType["editMessageText"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["editMessageText"]
      >("editMessageText", toSnakeCase(params))
      .then((res) => {
        if (typeof res === "boolean") return res;
        return new Message(
          this,
          res,
        ) as unknown as MethodsLibReturnType["editMessageText"];
      });
  }

  /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageCaption(
    params: MethodParameters["editMessageCaption"],
  ): Promise<MethodsLibReturnType["editMessageCaption"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["editMessageCaption"]
      >("editMessageCaption", toSnakeCase(params))
      .then((res) => {
        if (typeof res === "boolean") return res;
        return new Message(
          this,
          res,
        ) as unknown as MethodsLibReturnType["editMessageCaption"];
      });
  }

  /** Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageMedia(
    params: MethodParameters["editMessageMedia"],
  ): Promise<MethodsLibReturnType["editMessageMedia"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["editMessageMedia"]
      >("editMessageMedia", toSnakeCase(params))
      .then((res) => {
        if (typeof res === "boolean") return res;
        return new Message(
          this,
          res,
        ) as unknown as MethodsLibReturnType["editMessageMedia"];
      });
  }

  /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async editMessageLiveLocation(
    params: MethodParameters["editMessageLiveLocation"],
  ): Promise<MethodsLibReturnType["editMessageLiveLocation"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["editMessageLiveLocation"]
      >("editMessageLiveLocation", toSnakeCase(params))
      .then(
        (res) =>
          (typeof res === "boolean"
            ? res
            : new Message(
                this,
                res,
              )) as MethodsLibReturnType["editMessageLiveLocation"],
      );
  }

  /** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
  async stopMessageLiveLocation(
    params: MethodParameters["stopMessageLiveLocation"],
  ): Promise<MethodsLibReturnType["stopMessageLiveLocation"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["stopMessageLiveLocation"]
      >("stopMessageLiveLocation", toSnakeCase(params))
      .then(
        (res) =>
          (typeof res === "boolean"
            ? res
            : new Message(
                this,
                res,
              )) as MethodsLibReturnType["stopMessageLiveLocation"],
      );
  }

  /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  async editMessageReplyMarkup(
    params: MethodParameters["editMessageReplyMarkup"],
  ): Promise<MethodsLibReturnType["editMessageReplyMarkup"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["editMessageReplyMarkup"]
      >("editMessageReplyMarkup", toSnakeCase(params))
      .then((res) => {
        if (typeof res === "boolean") return res;
        return new Message(
          this,
          res,
        ) as unknown as MethodsLibReturnType["editMessageReplyMarkup"];
      });
  }

  /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
  async stopPoll(
    params: MethodParameters["stopPoll"],
  ): Promise<MethodsLibReturnType["stopPoll"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["stopPoll"]
      >("stopPoll", toSnakeCase(params))
      .then((res) => new Poll(this, res));
  }

  /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
  async sendSticker(
    params: MethodParameters["sendSticker"],
  ): Promise<MethodsLibReturnType["sendSticker"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendSticker"]
      >("sendSticker", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendSticker"],
      );
  }

  /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
  async getStickerSet(
    name: string,
  ): Promise<MethodsLibReturnType["getStickerSet"]> {
    return await this.rest
      .request<MethodsApiReturnType["getStickerSet"]>("getStickerSet", { name })
      .then((res) => new StickerSet(this, res));
  }

  /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
  async getCustomEmojiStickers(
    customEmojiIds: string[],
  ): Promise<MethodsLibReturnType["getCustomEmojiStickers"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getCustomEmojiStickers"]
      >("getCustomEmojiStickers", { custom_emoji_ids: customEmojiIds })
      .then((res) => res.map((sticker) => new Sticker(this, sticker)));
  }

  /** Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success. */
  async uploadStickerFile(
    params: MethodParameters["uploadStickerFile"],
  ): Promise<MethodsLibReturnType["uploadStickerFile"]> {
    const response = await this.rest.request<
      MethodsApiReturnType["uploadStickerFile"]
    >("uploadStickerFile", toSnakeCase(params));
    return new InputFile(this, response);
  }

  /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
  async createNewStickerSet(
    params: MethodParameters["createNewStickerSet"],
  ): Promise<MethodsLibReturnType["createNewStickerSet"]> {
    return await this.rest.request<MethodsApiReturnType["createNewStickerSet"]>(
      "createNewStickerSet",
      toSnakeCase(params),
    );
  }

  /** Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
  async addStickerToSet(
    params: MethodParameters["addStickerToSet"],
  ): Promise<MethodsLibReturnType["addStickerToSet"]> {
    return await this.rest.request<MethodsApiReturnType["addStickerToSet"]>(
      "addStickerToSet",
      toSnakeCase(params),
    );
  }

  /** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
  async replaceStickerInSet(
    params: MethodParameters["replaceStickerInSet"],
  ): Promise<MethodsLibReturnType["replaceStickerInSet"]> {
    return await this.rest.request<MethodsApiReturnType["replaceStickerInSet"]>(
      "replaceStickerInSet",
      toSnakeCase(params),
    );
  }

  /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
  async setStickerPositionInSet(
    sticker: string,
    position: number,
  ): Promise<MethodsLibReturnType["setStickerPositionInSet"]> {
    return await this.rest.request<
      MethodsApiReturnType["setStickerPositionInSet"]
    >("setStickerPositionInSet", { sticker, position });
  }

  /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
  async deleteStickerFromSet(
    sticker: string,
  ): Promise<MethodsLibReturnType["deleteStickerFromSet"]> {
    return await this.rest.request<
      MethodsApiReturnType["deleteStickerFromSet"]
    >("deleteStickerFromSet", { sticker });
  }

  /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  async setStickerEmojiList(
    sticker: string,
    emojiList: string[],
  ): Promise<MethodsLibReturnType["setStickerEmojiList"]> {
    return await this.rest.request<MethodsApiReturnType["setStickerEmojiList"]>(
      "setStickerEmojiList",
      { sticker, emoji_list: emojiList },
    );
  }

  /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  async setStickerKeywords(
    sticker: string,
    keywords?: string[],
  ): Promise<MethodsLibReturnType["setStickerKeywords"]> {
    return await this.rest.request<MethodsApiReturnType["setStickerKeywords"]>(
      "setStickerKeywords",
      { sticker, ...(keywords && { keywords }) },
    );
  }

  /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
  async setStickerMaskPosition(
    sticker: string,
    maskPosition?: MethodParameters["setStickerMaskPosition"]["maskPosition"],
  ): Promise<MethodsLibReturnType["setStickerMaskPosition"]> {
    return await this.rest.request<
      MethodsApiReturnType["setStickerMaskPosition"]
    >("setStickerMaskPosition", {
      sticker,
      ...(maskPosition && { mask_position: maskPosition }),
    });
  }

  /** Use this method to set the title of a created sticker set. Returns True on success. */
  async setStickerSetTitle(
    name: string,
    title: string,
  ): Promise<MethodsLibReturnType["setStickerSetTitle"]> {
    return await this.rest.request<MethodsApiReturnType["setStickerSetTitle"]>(
      "setStickerSetTitle",
      { name, title },
    );
  }

  /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
  async setStickerSetThumbnail(
    params: MethodParameters["setStickerSetThumbnail"],
  ): Promise<MethodsLibReturnType["setStickerSetThumbnail"]> {
    return await this.rest.request<
      MethodsApiReturnType["setStickerSetThumbnail"]
    >("setStickerSetThumbnail", toSnakeCase(params));
  }

  /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
  async setCustomEmojiStickerSetThumbnail(
    name: string,
    customEmojiId?: string,
  ): Promise<MethodsLibReturnType["setCustomEmojiStickerSetThumbnail"]> {
    return await this.rest.request<
      MethodsApiReturnType["setCustomEmojiStickerSetThumbnail"]
    >("setCustomEmojiStickerSetThumbnail", {
      name,
      ...(customEmojiId && { custom_emoji_id: customEmojiId }),
    });
  }

  /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
  async deleteStickerSet(
    name: string,
  ): Promise<MethodsLibReturnType["deleteStickerSet"]> {
    return await this.rest.request<MethodsApiReturnType["deleteStickerSet"]>(
      "deleteStickerSet",
      { name },
    );
  }

  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  async answerInlineQuery(
    params: MethodParameters["answerInlineQuery"],
  ): Promise<MethodsLibReturnType["answerInlineQuery"]> {
    return await this.rest.request<MethodsApiReturnType["answerInlineQuery"]>(
      "answerInlineQuery",
      toSnakeCase(params),
    );
  }

  /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
  async answerWebAppQuery(
    webAppQueryId: string,
    result: MethodParameters["answerWebAppQuery"]["result"],
  ): Promise<MethodsLibReturnType["answerWebAppQuery"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["answerWebAppQuery"]
      >("answerWebAppQuery", { web_app_query_id: webAppQueryId, result })
      .then((res) => res.inline_message_id);
  }

  /** Use this method to send invoices. On success, the sent Message is returned. */
  async sendInvoice(
    params: MethodParameters["sendInvoice"],
  ): Promise<MethodsLibReturnType["sendInvoice"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendInvoice"]
      >("sendInvoice", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendInvoice"],
      );
  }

  /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
  async createInvoiceLink(
    params: MethodParameters["createInvoiceLink"],
  ): Promise<MethodsLibReturnType["createInvoiceLink"]> {
    return await this.rest.request<MethodsApiReturnType["createInvoiceLink"]>(
      "createInvoiceLink",
      toSnakeCase(params),
    );
  }

  /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
  async answerShippingQuery(
    params: MethodParameters["answerShippingQuery"],
  ): Promise<MethodsLibReturnType["answerShippingQuery"]> {
    return await this.rest.request<MethodsApiReturnType["answerShippingQuery"]>(
      "answerShippingQuery",
      toSnakeCase(params),
    );
  }

  /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
  async answerPreCheckoutQuery(
    params: MethodParameters["answerPreCheckoutQuery"],
  ): Promise<MethodsLibReturnType["answerPreCheckoutQuery"]> {
    return await this.rest.request<
      MethodsApiReturnType["answerPreCheckoutQuery"]
    >("answerPreCheckoutQuery", toSnakeCase(params));
  }

  /** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
  async getStarTransactions(
    offset?: number,
    limit?: number,
  ): Promise<MethodsLibReturnType["getStarTransactions"]> {
    return await this.rest
      .request<MethodsApiReturnType["getStarTransactions"]>(
        "getStarTransactions",
        {
          offset,
          limit,
        },
      )
      .then(
        (res) =>
          new StarTransactions(
            this,
            res,
          ) as unknown as MethodsLibReturnType["getStarTransactions"],
      );
  }

  /** Refunds a successful payment in Telegram Stars. Returns True on success */
  async refundStarPayment(
    userId: number | string,
    telegramPaymentChargeId: string,
  ): Promise<MethodsLibReturnType["refundStarPayment"]> {
    return await this.rest.request<MethodsApiReturnType["refundStarPayment"]>(
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
    userId: number | string,
    errors: MethodParameters["setPassportDataErrors"]["errors"],
  ): Promise<MethodsLibReturnType["setPassportDataErrors"]> {
    return await this.rest.request<
      MethodsApiReturnType["setPassportDataErrors"]
    >("setPassportDataErrors", { user_id: userId, errors });
  }

  /** Use this method to send a game. On success, the sent Message is returned. */
  async sendGame(
    params: MethodParameters["sendGame"],
  ): Promise<MethodsLibReturnType["sendGame"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["sendGame"]
      >("sendGame", toSnakeCase(params))
      .then(
        (res) => new Message(this, res) as MethodsLibReturnType["sendGame"],
      );
  }

  /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
  async setGameScore(
    params: MethodParameters["setGameScore"],
  ): Promise<MethodsLibReturnType["setGameScore"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["setGameScore"]
      >("setGameScore", toSnakeCase(params))
      .then(
        (res) =>
          (typeof res === "boolean"
            ? res
            : new Message(this, res)) as MethodsLibReturnType["setGameScore"],
      );
  }

  /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.

  This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
  async getGameHighScores(
    params: MethodParameters["getGameHighScores"],
  ): Promise<MethodsLibReturnType["getGameHighScores"]> {
    return await this.rest
      .request<
        MethodsApiReturnType["getGameHighScores"]
      >("getGameHighScores", toSnakeCase(params))
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
  async deleteMessage(
    chatId: number | string,
    messageId: number | string,
  ): Promise<MethodsLibReturnType["deleteMessage"]> {
    return await this.rest.request<MethodsApiReturnType["deleteMessage"]>(
      "deleteMessage",
      { chat_id: chatId, message_id: messageId },
    );
  }

  /** Use this method to delete multiple messages simultaneously. Returns True on success. */
  async deleteMessages(
    chatId: number | string,
    messageIds: (number | string)[],
  ): Promise<MethodsLibReturnType["deleteMessages"]> {
    return await this.rest.request<MethodsApiReturnType["deleteMessages"]>(
      "deleteMessages",
      { chat_id: chatId, message_ids: messageIds },
    );
  }
}

export { BaseClient, type EventHandlerParameters };
