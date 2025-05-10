import * as http from "node:http";
import * as https from "node:https";
import { Collection } from "@telegram.ts/collection";
import {
  ApiMethods as Methods,
  Chat as ApiChat,
  User as ApiUser,
  ParseMode,
  Update,
} from "@telegram.ts/types";
import {
  BodyInit,
  Headers,
  HeadersInit,
  RequestInit,
  Response,
} from "node-fetch";
import { Blob, Buffer } from "node:buffer";
import { EventEmitter } from "node:events";
import { ReadStream } from "node:fs";
import { IncomingMessage, RequestListener, ServerResponse } from "node:http";
import { Agent } from "node:https";
import { Stream } from "node:stream";
import { TlsOptions } from "node:tls";
import { SandwichStream } from "sandwich-stream";
import {
  PassportElementError,
  MessageEntity,
  ReplyParameters,
  InlineKeyboardMarkup,
  KeyboardButton,
  KeyboardButtonPollType,
  KeyboardButtonRequestChat,
  KeyboardButtonRequestUsers,
  SwitchInlineQueryChosenChat,
  BotCommandScope,
  AcceptedGiftTypes,
  BotCommand,
  WebAppInfo,
  InlineQueryResult,
  InputPollOption,
  InputPaidMedia,
  InputMedia,
  LoginUrl,
  ApiMethods,
  ShippingOption,
  LabeledPrice,
  ForceReply,
  ReplyKeyboardRemove,
  ReplyKeyboardMarkup,
  CopyTextButton,
  InputMediaVideo,
  InputMediaPhoto,
  InputMediaDocument,
  InputMediaAudio,
  InlineKeyboardButton,
  InlineQueryResultsButton,
  LanguageCode,
  InputContactMessageContent,
  InputInvoiceMessageContent,
  InputLocationMessageContent,
  InputTextMessageContent,
  InputVenueMessageContent,
  InlineQueryResultCachedAudio,
  InlineQueryResultCachedDocument,
  InlineQueryResultCachedGif,
  InlineQueryResultCachedMpeg4Gif,
  InlineQueryResultCachedPhoto,
  InlineQueryResultCachedSticker,
  InlineQueryResultCachedVideo,
  InlineQueryResultCachedVoice,
  InlineQueryResultArticle,
  InlineQueryResultAudio,
  InlineQueryResultContact,
  InlineQueryResultDocument,
  InlineQueryResultGame,
  InlineQueryResultGif,
  InlineQueryResultLocation,
  InlineQueryResultMpeg4Gif,
  InlineQueryResultPhoto,
  InlineQueryResultVenue,
  InlineQueryResultVideo,
  InlineQueryResultVoice,
  InputMessageContent,
  MediaDataParam,
  InputStoryContent,
} from "./telegram/index";

/**
 * Represents an immutable version of a collection
 */
export type ReadonlyCollection<K, V> = Omit<
  Collection<K, V>,
  "delete" | "ensure" | "forEach" | "get" | "reverse" | "set" | "sort" | "sweep"
> &
  ReadonlyMap<K, V>;

/**
 * Type representing the string literals for chat permissions.
 */
export type ChatPermissionString =
  | "isAnonymous"
  | "sendMessages"
  | "sendAudios"
  | "sendDocuments"
  | "sendPhotos"
  | "sendVideos"
  | "sendVideoNotes"
  | "sendVoiceNotes"
  | "sendPolls"
  | "sendOtherMessages"
  | "addWebPagePreviews"
  | "changeInfo"
  | "inviteUsers"
  | "pinMessages"
  | "manageTopics";

/**
 * Interface representing the chat permission flags.
 */
export interface ChatPermissionFlags {
  isAnonymous?: boolean;
  sendMessages?: boolean;
  sendAudios?: boolean;
  sendDocuments?: boolean;
  sendPhotos?: boolean;
  sendVideos?: boolean;
  sendVideoNotes?: boolean;
  sendVoiceNotes?: boolean;
  sendPolls?: boolean;
  sendOtherMessages?: boolean;
  addWebPagePreviews?: boolean;
  changeInfo?: boolean;
  inviteUsers?: boolean;
  pinMessages?: boolean;
  manageTopics?: boolean;
}

/**
 * Represents a set of chat permissions and provides methods to manage them.
 */
export declare class ChatPermissions {
  private allowed;
  private denied;
  /**
   * Constructs a new instance of ChatPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data?: ChatPermissionFlags);
  /**
   * Grants the specified permissions.
   * @param permissions - The permissions to grant.
   * @returns The updated ChatPermissions instance.
   */
  allow(permissions: ChatPermissionResolvable): ChatPermissions;
  /**
   * Denies the specified permissions.
   * @param permissions - The permissions to deny.
   * @returns The updated ChatPermissions instance.
   */
  deny(permissions: ChatPermissionResolvable): ChatPermissions;
  /**
   * Checks if the specified permission is granted.
   * @param permission - The permission to check.
   * @returns `true` if the permission is granted, otherwise `false`.
   */
  has(permission: ChatPermissionString): boolean;
  /**
   * Converts the permissions to a plain object representation.
   * @returns An object with permissions and their status.
   */
  toObject(): ChatPermissionFlags;
  /**
   * Checks if this instance is equal to another ChatPermissions instance.
   * @param other - The other instance to compare.
   * @returns `true` if both instances are equal, otherwise `false`.
   */
  equals(other: ChatPermissions): boolean;
  /**
   * Updates the permissions based on the provided data.
   * @param data - An object containing permission states.
   */
  private _patch;
  /**
   * Checks if the provided permission is valid.
   * @param permission - The permission to validate.
   * @returns `true` if the permission is valid, otherwise `false`.
   */
  static isValid(permission: string): boolean;
  /**
   * A mapping of chat permission strings to their numeric equivalents.
   */
  static Flags: Record<ChatPermissionString, number>;
}

/**
 * Type representing a value that can be resolved to chat permissions.
 */
export type ChatPermissionResolvable =
  | ChatPermissionString
  | ChatPermissionFlags
  | ChatPermissions;

/**
 * A class representing a multipart stream for composing HTTP multipart requests.
 * Extends SandwichStream.
 */
export declare class MultipartStream extends SandwichStream {
  /**
   * Constructs a new MultipartStream instance with the specified boundary.
   * @param boundary - The boundary string used to separate parts in the multipart stream.
   */
  constructor(boundary: string);
  /**
   * Adds a part to the multipart stream with optional headers and body.
   * @param part - An object representing the part to add to the multipart stream.
   *                May include headers and body.
   */
  addPart(part?: {
    headers?: {
      [key: string]: string;
    };
    body?: any;
  }): void;
  /**
   * Checks if the provided object is a stream.
   * @param stream - The object to check.
   * @returns A boolean indicating whether the object is a stream.
   */
  static isStream(stream: any): stream is Stream;
}

/**
 * Interface representing the configuration for an API request.
 */
export interface IApiConfig {
  method: string;
  compress: boolean;
  headers: HeadersInit;
  body: MultipartStream | BodyInit;
  agent?: RequestInit["agent"];
}

/**
 * A class for handling media data and preparing configuration for API requests.
 */
export declare class MediaData {
  /**
   * Mapping of media type extensions.
   */
  readonly extensions: Record<string, string>;
  /**
   * Fields in the form data that should be JSON-encoded.
   */
  readonly formDataJsonFields: string[];
  /**
   * Parameters that can contain media data.
   */
  readonly sourceParametersMedia: string[];
  /**
   * Checks if the given value is a media-related object.
   * This function determines if the provided value is an object associated with media data types such as Buffer, ArrayBuffer, Blob, FormData, Uint8Array, or DataView.
   *
   * @param value - The value to check.
   * @returns `true` if the value is a media-related object; otherwise, `false`.
   */
  isMediaType(value: any): boolean;
  /**
   * Checks if the payload contains media data.
   * @param payload - The data to check.
   * @returns `true` if media is found, otherwise `false`.
   */
  hasMedia(payload: Record<string, any>): boolean;
  /**
   * Builds the configuration for a JSON request.
   * @param payload - The data to be sent in the request.
   * @param requestOptions - Additional options for the request.
   * @returns The configuration for the request.
   */
  buildJSONConfig(
    payload: Record<string, any>,
    requestOptions?: RequestInit,
  ): IApiConfig;
  /**
   * Builds the configuration for a form-data request.
   * @param apiPayload - The data to be sent in the request.
   * @param requestOptions - Additional options for the request.
   * @returns The configuration for the request.
   */
  buildFormDataConfig(
    apiPayload: Record<string, any>,
    requestOptions?: RequestInit,
  ): Promise<IApiConfig>;
  /**
   * Attaches a value to the form data.
   * @param form - The form to which the value should be attached.
   * @param id - The name of the form field.
   * @param value - The value to attach to the form.
   * @param agent - The agent to use for fetching external resources.
   */
  attachFormValue(
    form: MultipartStream,
    id: string,
    value: any,
    agent: RequestInit["agent"],
  ): Promise<void>;
  /**
   * Attaches media to the form data.
   * @param form - The form to which the media should be attached.
   * @param media - The media to attach, can be a string path, buffer, or read stream.
   * @param options - The options of the form field.
   */
  attachFormMedia(
    form: MultipartStream,
    media: string | Buffer | ReadStream,
    options: { id: string; filename?: string },
  ): Promise<void>;
}

export interface IRateLimitData {
  /** The API method of this request */
  method: keyof ApiMethods;
  /** In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
  retryAfter?: number;
  /** The group has been migrated to a supergroup with the specified identifier */
  migrateToChatId?: string;
}

export interface IRestEventHandlers {
  rateLimit: (rateLimitData: IRateLimitData) => PossiblyAsync<void>;
  apiRequest: (method: string, options: RequestInit) => PossiblyAsync<void>;
  apiResponse: (
    method: string,
    response: IRequestSuccess<unknown> | IRequestFailt,
  ) => PossiblyAsync<void>;
}

export type IRestOptions = {
  enableRateLimit?: boolean;
} & Omit<RequestInit, "timeout" | "size" | "follow" | "signal" | "redirect">;

/**
 * Handles API requests to the Telegram Bot API.
 */
export declare class Rest extends EventEmitter {
  readonly options?: IRestOptions;
  media: MediaData;
  /**
   * @param authToken - The authentication token for the Telegram Bot API.
   * @param requestOptions - Options for the fetch request.
   */
  constructor(authToken: string, requestOptions?: IRestOptions);
  /**
   * Adds a typed listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The Rest instance.
   */
  on<T extends keyof IRestEventHandlers>(
    event: T,
    listener: IRestEventHandlers[T],
  ): this;
  /**
   * Adds a typed one-time listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The Rest instance.
   */
  once<T extends keyof IRestEventHandlers>(
    event: T,
    listener: IRestEventHandlers[T],
  ): this;
  /**
   * Prepares the configuration for the fetch request based on the provided options.
   * @param options - The options to include in the request.
   * @returns The configuration for the fetch request.
   */
  transferDataToServer(options: Record<string, unknown>): Promise<RequestInit>;
  /**
   * Makes a request to the Telegram Bot API.
   * Handles rate limits and retries the request if necessary.
   * @param method - The API method to call.
   * @param options - The options to include in the request.
   * @returns The result from the API response.
   * @throws {HTTPResponseError} If the API response indicates an error.
   */
  request<T>(
    method: keyof ApiMethods,
    options?: Record<string, unknown>,
  ): Promise<T>;
}

export declare class InputFile extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the file object from the Telegram API
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").File,
  );
  /**
   * The unique identifier for this file
   */
  id: string;
  /**
   * The unique identifier for this file, which is supposed to be consistent across different bots
   */
  uniqueId: string;
  /**
   * The size of the file in bytes, if available
   */
  size: number | null;
  /**
   * The path to the file on the Telegram server, if available
   */
  path: string | null;
  /**
   * Gets the URL to access the file on the Telegram server.
   */
  get url(): string | null;
  /**
   * Fetch about the file
   */
  fetch(): Promise<InputFile>;
  /**
   * Downloads the file from the Telegram server.
   * @returns A promise that resolves with the file data as a Buffer.
   */
  download(): Promise<Buffer>;

  /**
   * Writes the file to the specified path.
   * @param path - The path where the file should be written.
   * @param writeType - The type of write operation.
   * @param options - Additional options for writing the file.
   * @returns A promise that resolves when the file has been written.
   */
  write(
    path: string,
    writeType?: "promise",
    options?: {
      encoding?: BufferEncoding;
      flag?: string;
      signal?: AbortSignal;
    },
  ): Promise<void>;

  /**
   * Writes the file to the specified path.
   * @param path - The path where the file should be written.
   * @param writeType - The type of write operation.
   * @param options - Additional options for writing the file.
   * @returns A promise that resolves when the file has been written.
   */
  write(
    path: string,
    writeType: "stream",
    options?: {
      encoding?: BufferEncoding;
      autoClose?: boolean;
      emitClose?: boolean;
      start?: number;
      highWaterMark?: number;
      flush?: boolean;
    },
  ): Promise<void>;

  /**
   * Writes the file to the specified path.
   * @param path - The path where the file should be written.
   * @param writeType - The type of write operation.
   * @param options - Additional options for writing the file.
   * @returns A promise that resolves when the file has been written.
   */
  write(
    path: string,
    writeType?: "promise" | "stream",
    options?: undefined,
  ): Promise<void>;
}

export declare class Photo extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents one size of a photo or a file / sticker thumbnail
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PhotoSize,
  );
  /** Photo width */
  width: number;
  /** Photo height */
  height: number;
}

export declare class UserProfilePhotos extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represent a user's profile pictures
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").UserProfilePhotos,
  );
  /** Total number of profile pictures the target user has */
  count: number;
  /** Requested profile pictures (in up to 4 sizes each) */
  photos: Photo[][];
}

export declare class User extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - represents a Telegram user or bot
   */
  constructor(
    client: TelegramClient | BaseClient,
    data:
      | import("@telegram.ts/types").User
      | import("@telegram.ts/types").UserFromGetMe,
  );
  /** Unique identifier for this user or bot. */
  id: string;
  /** True, if this user is a bot */
  isBot: boolean;
  /** User's or bot's first name */
  firstName: string;
  /**
   * @param data - represents a Telegram user or bot
   * @override
   */
  override _patch(
    data:
      | import("@telegram.ts/types").User
      | import("@telegram.ts/types").UserFromGetMe,
  ):
    | import("@telegram.ts/types").User
    | import("@telegram.ts/types").UserFromGetMe;
  /**
   * User's or bot's last name
   */
  lastName?: string;
  /**
   * User's or bot's username
   */
  username?: string;
  /**
   * IETF language tag of the user's language
   */
  language?: LanguageCode;
  /**
   * True, if this user is a Telegram Premium user
   */
  isPremium?: boolean;
  /**
   * True, if this user added the bot to the attachment menu
   */
  inAttachmentMenu?: boolean;
  /**
   * Fetches this user
   * @param options - options for fetch user
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo?: false },
  ): Promise<User>;
  /**
   * Fetches this user
   * @param options - options for fetch user
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;
  /**
   * Fetches this user
   * @param options - options for fetch user
   */
  fetch(options?: Omit<IFetchOptions, "cache">): Promise<User | ChatFullInfo>;
  /**
   * Use this method to send text messages.
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing and media group options
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  send(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  send(
    text: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        media: ReadonlyArray<
          | InputMediaAudio
          | InputMediaDocument
          | InputMediaPhoto
          | InputMediaVideo
        >;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
      },
      "chatId"
    >,
  ): Promise<
    Array<
      | (Message & {
          audio: Audio;
        })
      | (Message & {
          document: Document;
        })
      | (Message & {
          photo: Photo;
        })
      | (Message & {
          video: Video;
        })
    >
  >;
  send(
    text:
      | string
      | Omit<
          {
            businessConnectionId?: string;
            chatId: number | string;
            messageThreadId?: string | number;
            media: ReadonlyArray<
              | InputMediaAudio
              | InputMediaDocument
              | InputMediaPhoto
              | InputMediaVideo
            >;
            disableNotification?: boolean;
            protectContent?: boolean;
            messageEffectId?: string;
            replyParameters?: ReplyParameters;
          },
          "chatId"
        >,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    | (Message & {
        content: string;
      })
    | Array<
        | (Message & {
            audio: Audio;
          })
        | (Message & {
            document: Document;
          })
        | (Message & {
            photo: Photo;
          })
        | (Message & {
            video: Video;
          })
      >
  >;
  /**
   * Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receive.
   * @param giftId - Identifier of the gift.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  sendGift(
    giftId: string,
    options?: Omit<MethodParameters["sendGift"], "giftId" | "userId">,
  ): Promise<true>;
  /**
   * Gifts a Telegram Premium subscription to the given user.
   * @param monthCount - Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12.
   * @param starCount - Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  giftPremiumSubscription(
    monthCount: 3 | 6 | 12,
    starCount: 1000 | 1500 | 2500,
    options?: Omit<
      MethodParameters["giftPremiumSubscription"],
      "monthCount" | "starCount" | "userId"
    >,
  ): Promise<true>;
  /**
   * Stores a message that can be sent by a user of a Mini App.
   * @param result - An object describing the message to be sent.
   * @param options - out parameters.
   * @returns Returns a PreparedInlineMessage object.
   */
  saveInlineMessage(
    result: InlineQueryResult,
    options?: Omit<
      MethodParameters["savePreparedInlineMessage"],
      "userId" | "result"
    >,
  ): Promise<PreparedInlineMessage>;
  /**
   * Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars.
   * @param telegramPaymentChargeId - Telegram payment identifier for the subscription.
   * @param isCanceled - Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot.
   * @returns Returns True on success.
   */
  setStarSubscription(
    telegramPaymentChargeId: string,
    isCanceled: boolean,
  ): Promise<true>;
  /**
   * Refunds a successful payment in Telegram Stars.
   * @param telegramPaymentId - Telegram payment identifier
   * @returns Returns True on success.
   */
  refundStarPayment(telegramPaymentId: string): Promise<true>;
  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   * @param errors - An array describing the errors
   * @returns Returns True on success.
   */
  setPassportErrors(errors: readonly PassportElementError[]): Promise<true>;
  /**
   * Use this method to get a list of profile pictures for a user.
   * @param offset - Sequential number of the first photo to be returned. By default, all photos are returned
   * @param limit - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100
   * @returns Returns a UserProfilePhotos object.
   */
  fetchProfilePhotos(
    offset?: number,
    limit?: number,
  ): Promise<UserProfilePhotos>;
  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @param chatId - Unique identifier for the chat or username of the channel (in the format @channelusername).
   * @returns Returns a UserChatBoosts object.
   */
  fetchChatBoosts(chatId: number | string): Promise<UserChatBoosts>;
  /**
   * Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  setEmojiStatus(options?: {
    /** Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status. */
    emojiStatusCustomEmojiId?: string;
    /** Expiration date of the emoji status, if any */
    emojiStatusExpirationDate?: number;
  }): Promise<true>;
  /**
   * Verifies a user on behalf of the organization which is represented by the bot.
   * @param description - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   * @returns Returns True on success.
   */
  verify(description?: string): Promise<true>;
  /**
   * Removes verification from a user who is currently verified on behalf of the organization represented by the bot.
   * @returns Returns True on success.
   */
  removeVerification(): Promise<true>;
  /**
   * Checks if this user is equal to another user.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of User and are equal based on key properties, otherwise false.
   */
  equals(other: User | ClientUser): boolean;
}

export type Constructable<Entity> = new (...args: any[]) => Entity;

export interface ICachedOptions<T> {
  /**
   * Optional maximum cache size. If not set, the cache is unlimited.
   */
  cacheSize?: number;
  /**
   * Optional filter function to determine if an item should be cached.
   * Returns `true` to cache the item, `false` otherwise.
   */
  cacheFilter?: (holds: T) => boolean;
}

export interface IFetchOptions {
  /**
   * Whether to bypass the cache and fetch directly from the source.
   * Defaults to `false`.
   */
  force?: boolean;
  /**
   * Whether to cache the fetched data. Defaults to `true`.
   */
  cache?: boolean;
  /**
   * Whether to retrieve complete, detailed information.
   * Defaults to `false`.
   */
  fullInfo?: boolean;
}

export declare class BaseManager<
  T extends Base,
  ApiObject extends {
    id: number;
  },
> {
  public readonly cache: Collection<string, T>;
  public readonly cacheSize: number;
  public readonly cacheFilter?: (holds: T) => boolean;
  /**
   * @param client - The client instance.
   * @param holds - The class or function that the manager holds.
   * @param iterable - Data iterable.
   * @param options - Options for save cached.
   */
  constructor(
    client: TelegramClient | BaseClient,
    holds: Constructable<T>,
    iterable: ApiObject[],
    options?: ICachedOptions<T>,
  );
  /**
   * The client that instantiated this
   */
  get client(): TelegramClient | BaseClient;
  /**
   * Adds or updates an entry in the cache.
   * @param data - The data to be added or updated in the cache.
   * @param options - Additional options.
   * @returns The cached or newly created entry.
   */
  _add(
    data: ApiObject,
    cache?: boolean,
    {
      id,
      extras,
    }?: {
      id?: string;
      extras?: unknown[];
    },
  ): T;
  /**
   * Removes an entry from the cache.
   * @param id - The ID of the entry to remove.
   * @returns Whether the entry was successfully removed.
   */
  remove(id: string): boolean;
  /**
   * Resolves an entry from the cache.
   * @param idOrInstance - The ID or instance to resolve.
   * @returns The resolved entry or null if not found.
   */
  resolve(idOrInstance: any): T | null;
  /**
   * Resolves the ID of an entry from the cache.
   * @param idOrInstance - The ID or instance to resolve.
   * @returns The resolved ID or null if not found.
   */
  resolveId(idOrInstance: any): string | null;
  /**
   * Returns a new Iterator object that contains the [key, value] pairs for each element in the collection.
   * @returns An iterator object that can be used to iterate over the key-value pairs of the Collection.
   */
  [Symbol.iterator](): IterableIterator<[string, T]>;
}

/**
 * Type representing the string literals for user permissions.
 */
export type UserPermissionString =
  | "manageChat"
  | "deleteMessages"
  | "manageVideoChats"
  | "restrictMembers"
  | "promoteMembers"
  | "changeInfo"
  | "inviteUsers"
  | "postStories"
  | "editStories"
  | "deleteStories"
  | "postMessages"
  | "editMessages"
  | "pinMessages"
  | "manageTopics";

/**
 * Interface representing the user permission flags.
 */
export interface UserPermissionFlags {
  manageChat?: boolean;
  deleteMessages?: boolean;
  manageVideoChats?: boolean;
  restrictMembers?: boolean;
  promoteMembers?: boolean;
  changeInfo?: boolean;
  inviteUsers?: boolean;
  postStories?: boolean;
  editStories?: boolean;
  deleteStories?: boolean;
  postMessages?: boolean;
  editMessages?: boolean;
  pinMessages?: boolean;
  manageTopics?: boolean;
}

/**
 * Represents a set of user permissions and provides methods to manage them.
 */
export declare class UserPermissions {
  private allowed;
  private denied;
  /**
   * Constructs a new instance of UserPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data?: UserPermissionFlags);
  /**
   * Grants the specified permissions.
   * @param permissions - The permissions to grant.
   * @returns The updated UserPermissions instance.
   */
  allow(permissions: UserPermissionResolvable): UserPermissions;
  /**
   * Denies the specified permissions.
   * @param permissions - The permissions to deny.
   * @returns The updated UserPermissions instance.
   */
  deny(permissions: UserPermissionResolvable): UserPermissions;
  /**
   * Checks if the specified permission is granted.
   * @param permission - The permission to check.
   * @returns `true` if the permission is granted, otherwise `false`.
   */
  has(permission: UserPermissionString): boolean;
  /**
   * Converts the permissions to a plain object representation.
   * @returns An object with permissions and their status.
   */
  toObject(): UserPermissionFlags;
  /**
   * Checks if this instance is equal to another UserPermissions instance.
   * @param other - The other instance to compare.
   * @returns `true` if both instances are equal, otherwise `false`.
   */
  equals(other: UserPermissions): boolean;
  /**
   * A mapping of user permission strings to their numeric equivalents.
   */
  static Flags: Record<UserPermissionString, number>;
}

/**
 * Type representing a value that can be resolved to user permissions.
 */
export type UserPermissionResolvable =
  | UserPermissionString
  | UserPermissionFlags
  | UserPermissions;

/**
 * Type representing the string literals for user permissions.
 */
export type BusinessPermissionString =
  | "canReply"
  | "readMessages"
  | "deleteOutgoingMessages"
  | "deleteAllMessages"
  | "editName"
  | "editBio"
  | "editProfilePhoto"
  | "editUsername"
  | "editStories"
  | "changeGiftSettings"
  | "viewGiftsAndStars"
  | "postMessages"
  | "convertGiftsToStars"
  | "transferAndUpgradeGifts"
  | "transferStars"
  | "manageStories";

/**
 * Interface representing the user permission flags.
 */
export interface BusinessPermissionFlags {
  canReply?: boolean;
  readMessages?: boolean;
  deleteOutgoingMessages?: boolean;
  deleteAllMessages?: boolean;
  editName?: boolean;
  editBio?: boolean;
  editProfilePhoto?: boolean;
  editUsername?: boolean;
  editStories?: boolean;
  changeGiftSettings?: boolean;
  viewGiftsAndStars?: boolean;
  postMessages?: boolean;
  convertGiftsToStars?: boolean;
  transferAndUpgradeGifts?: boolean;
  transferStars?: boolean;
  manageStories?: boolean;
}

/**
 * Represents a set of user permissions and provides methods to manage them.
 */
export declare class BusinessPermissions {
  private allowed;
  private denied;
  /**
   * Constructs a new instance of BusinessPermissions with optional initial data.
   * @param data - An object containing the initial permissions.
   */
  constructor(data?: BusinessPermissionFlags);
  /**
   * Grants the specified permissions.
   * @param permissions - The permissions to grant.
   * @returns The updated BusinessPermissions instance.
   */
  allow(permissions: BusinessPermissionResolvable): BusinessPermissions;
  /**
   * Denies the specified permissions.
   * @param permissions - The permissions to deny.
   * @returns The updated BusinessPermissions instance.
   */
  deny(permissions: BusinessPermissionResolvable): BusinessPermissions;
  /**
   * Checks if the specified permission is granted.
   * @param permission - The permission to check.
   * @returns `true` if the permission is granted, otherwise `false`.
   */
  has(permission: BusinessPermissionString): boolean;
  /**
   * Converts the permissions to a plain object representation.
   * @returns An object with permissions and their status.
   */
  toObject(): BusinessPermissionFlags;
  /**
   * Checks if this instance is equal to another BusinessPermissions instance.
   * @param other - The other instance to compare.
   * @returns `true` if both instances are equal, otherwise `false`.
   */
  equals(other: BusinessPermissions): boolean;
  /**
   * Updates the permissions based on the provided data.
   * @param data - An object containing permission states.
   */
  private _patch;
  /**
   * Checks if the provided permission is valid.
   * @param permission - The permission to validate.
   * @returns `true` if the permission is valid, otherwise `false`.
   */
  static isValid(permission: string): boolean;
  /**
   * A mapping of user permission strings to their numeric equivalents.
   */
  static Flags: Record<BusinessPermissionString, number>;
}

/**
 * Type representing a value that can be resolved to user permissions.
 */
export type BusinessPermissionResolvable =
  | BusinessPermissionString
  | BusinessPermissionFlags
  | BusinessPermissions;

/**
 * Interface representing the options for the collector.
 */
export interface ICollectorOptions<EventCtx, Collected> {
  dispose?: boolean;
  filter?: (
    data: Collected,
    collected: ReadonlyCollection<EventCtx, Collected>,
  ) => PossiblyAsync<boolean>;
  idle?: number;
  max?: number;
  maxProcessed?: number;
  time?: number;
}

/**
 * Interface representing the events for the collector.
 */
export interface ICollectorEvent<K, V> {
  /**
   * Triggered when a new item is collected. The `collect` function receives the
   * item (`data`) and the collection itself (`collect`). Can perform any
   * asynchronous or synchronous operations needed to handle the collected item.
   *
   * @param data - The data item to be collected.
   * @param collect - The collection where the data is stored.
   */
  collect: (data: V, collect: ReadonlyCollection<K, V>) => PossiblyAsync<void>;

  /**
   * Triggered when a data item is ignored. The `ignore` function is called with
   * the ignored item (`data`). This is useful for cases where items do not meet
   * certain criteria and should not be added to the collection.
   *
   * @param data - The data item to be ignored.
   */
  ignore: (data: V) => PossiblyAsync<void>;

  /**
   * Triggered when an item is removed or disposed of from the collection. The
   * `dispose` function receives the data item (`data`) and the collection itself
   * (`collect`). Use this to handle any cleanup or additional logic when an item
   * is removed from the collection.
   *
   * @param data - The data item to be disposed of.
   * @param collect - The collection where the data is stored.
   */
  dispose: (data: V, collect: ReadonlyCollection<K, V>) => PossiblyAsync<void>;

  /**
   * Triggered when the collection process ends. The `end` function receives the
   * final collection (`collected`) and a reason (`reason`) for the collection’s
   * termination. Use this to handle any finalization or post-processing steps.
   *
   * @param collected - The collection of all collected data.
   * @param reason - The reason the collection process ended.
   */
  end: (
    collected: ReadonlyCollection<K, V>,
    reason: string,
  ) => PossiblyAsync<void>;
}

/**
 * Abstract class representing a generic collector.
 */
export declare abstract class Collector<K, V> extends EventEmitter {
  readonly options: ICollectorOptions<K, V>;
  /**
   * Indicates whether the collector has ended.
   */
  isEnded: boolean;
  /**
   * Filter function to determine if data should be collected.
   */
  filter: Required<ICollectorOptions<K, V>>["filter"];
  /**
   * Collection of collected data.
   */
  collected: Collection<K, V>;
  /**
   * Timestamp of the last collected item.
   */
  lastCollectedTimestamp: number | Date | null;
  private _timeout;
  private _idleTimeout;
  private _endReason;
  /**
   * Creates an instance of Collector.
   * @param options - The options for the collector.
   */
  constructor(options: ICollectorOptions<K, V>);

  on<T extends keyof ICollectorEvent<K, V>>(
    event: T,
    listener: ICollectorEvent<K, V>[T],
  ): this;

  once<T extends keyof ICollectorEvent<K, V>>(
    event: T,
    listener: ICollectorEvent<K, V>[T],
  ): this;
  /**
   * Gets the timestamp of the last collected item.
   */
  get lastCollectedAt(): number | null | Date;
  /**
   * Handles the collection of a new item.
   * @param msg - The item to collect.
   */
  handleCollect(msg: V): Promise<void>;
  /**
   * Handles the disposal of an item.
   * @param msg - The item to dispose.
   */
  handleDispose(msg: V): Promise<void>;
  /**
   * Returns a promise that resolves with the next collected item.
   */
  get next(): Promise<V>;
  /**
   * Stops the collector.
   * @param reason - The reason for stopping the collector.
   */
  stop(reason?: string): void;
  /**
   * Resets the timer for the collector.
   * @param param0 - An object containing new time and idle values.
   */
  resetTimer({ time, idle }?: { time?: number; idle?: number }): void;
  /**
   * Checks if the collector should end based on the options.
   * @returns True if the collector should end, false otherwise.
   */
  checkEnd(): boolean;
  /**
   * Async generator for iterating over collected items.
   */
  [Symbol.asyncIterator](): AsyncGenerator<[V, Collection<K, V>]>;
  /**
   * Gets the reason for ending the collector.
   */
  get endReason(): string | null;
  /**
   * Abstract method to collect an item.
   * @param msg - The item to collect.
   * @returns The key of the collected item or null.
   */
  abstract collect(msg: V): Awaitable<K | null>;
  /**
   * Abstract method to dispose of an item.
   * @param msg - The item to dispose.
   * @returns The key of the disposed item or null.
   */
  abstract dispose(msg: V): K | null;
}

export type SearchResult = {
  /**
   * - The index of the entity.
   */
  index: number;
  /**
   * - The starting offset of the entity.
   */
  offset: number;
  /**
   * - The length of the entity.
   */
  length: number;
  /**
   * - The text that matches the entity.
   */
  search: string;
};

export declare class MessageEntities extends Base {
  /**
   * Creates an instance of the MessageEntities class.
   * @param client - The client that instantiated this.
   * @param searchText - The text to search within.
   * @param entities - The array of message entities.
   */
  constructor(
    client: TelegramClient | BaseClient,
    searchText: string,
    entities: import("@telegram.ts/types").MessageEntity[],
  );
  /**
   * The text to search within.
   */
  public readonly searchText: string;
  /**
   * Retrieves all mention entities from the message.
   * @returns An array of objects representing mention entities.
   */
  get mention(): SearchResult[];
  /**
   * Retrieves all hashtag entities from the message.
   * @returns An array of objects representing hashtag entities.
   */
  get hashtag(): SearchResult[];
  /**
   * Retrieves all cashtag entities from the message.
   * @returns An array of objects representing cashtag entities.
   */
  get cashtag(): SearchResult[];
  /**
   * Retrieves all bot command entities from the message.
   * @returns An array of objects representing bot command entities.
   */
  get botCommand(): SearchResult[];
  /**
   * Retrieves all URL entities from the message.
   * @returns An array of objects representing URL entities.
   */
  get url(): SearchResult[];
  /**
   * Retrieves all email entities from the message.
   * @returns An array of objects representing email entities.
   */
  get email(): SearchResult[];
  /**
   * Retrieves all phone number entities from the message.
   * @returns An array of objects representing phone number entities.
   */
  get phoneNumber(): SearchResult[];
  /**
   * Retrieves all bold entities from the message.
   * @returns An array of objects representing bold entities.
   */
  get bold(): SearchResult[];
  /**
   * Retrieves all italic entities from the message.
   * @returns An array of objects representing italic entities.
   */
  get italic(): SearchResult[];
  /**
   * Retrieves all underline entities from the message.
   * @returns An array of objects representing underline entities.
   */
  get underline(): SearchResult[];
  /**
   * Retrieves all strikethrough entities from the message.
   * @returns An array of objects representing strikethrough entities.
   */
  get strikethrough(): SearchResult[];
  /**
   * Retrieves all spoiler entities from the message.
   * @returns An array of objects representing spoiler entities.
   */
  get spoiler(): SearchResult[];
  /**
   * Retrieves all blockquote entities from the message.
   * @returns An array of objects representing blockquote entities.
   */
  get blockquote(): SearchResult[];
  /**
   * Retrieves all code entities from the message.
   * @returns An array of objects representing code entities.
   */
  get code(): SearchResult[];
  /**
   * Retrieves all pre entities from the message.
   * @returns An array of objects representing pre entities.
   */
  get pre(): (SearchResult & { language?: string })[];
  /**
   * Retrieves all text link entities from the message.
   * @returns An array of objects representing text link entities.
   */
  get textLink(): (SearchResult & { url: string })[];
  /**
   * Retrieves all text mention entities from the message.
   * @returns An array of objects representing text mention entities.
   */
  get textMention(): (SearchResult & { user: User })[];
  /**
   * Retrieves all custom emoji entities from the message.
   * @returns An array of objects representing custom emoji entities.
   */
  get customEmoji(): (SearchResult & { customEmojiId: string })[];
  /**
   * Searches for a specific type of entity in the message.
   * @param searchType - The type of entity to search for.
   * @returns An array of objects representing the found entities.
   */
  searchEntity(
    searchType:
      | "mention"
      | "hashtag"
      | "cashtag"
      | "bot_command"
      | "url"
      | "email"
      | "phone_number"
      | "bold"
      | "italic"
      | "underline"
      | "strikethrough"
      | "spoiler"
      | "blockquote"
      | "code"
      | "pre"
      | "text_link"
      | "text_mention"
      | "custom_emoji",
  ): (SearchResult &
    (
      | { language?: string }
      | { url: string }
      | { user: User }
      | { customEmojiId: string }
    ))[];
  /**
   * Enables iteration over the message entities.
   * @returns An iterator over the message entities.
   */
  [Symbol.iterator](): Generator<
    SearchResult & {
      type:
        | "mention"
        | "hashtag"
        | "cashtag"
        | "botCommand"
        | "url"
        | "email"
        | "phoneNumber"
        | "bold"
        | "italic"
        | "underline"
        | "strikethrough"
        | "spoiler"
        | "blockquote"
        | "code";
    } & (
        | { type: "pre"; language?: string }
        | { type: "textLink"; url: string }
        | { type: "textMention"; user: User }
        | { type: "customEmoji"; customEmojiId: string }
      )
  >;
}

export declare class ReactionType {
  /**
   * @param data - Data about the describes the type of a reaction
   */
  constructor(
    data:
      | import("@telegram.ts/types").ReactionType
      | {
          customEmojiId: string;
        },
  );
  /** Reaction emoji. Currently, it can be one of "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡" */
  emoji?:
    | "\uD83D\uDC4D"
    | "\uD83D\uDC4E"
    | "\u2764"
    | "\uD83D\uDD25"
    | "\uD83E\uDD70"
    | "\uD83D\uDC4F"
    | "\uD83D\uDE01"
    | "\uD83E\uDD14"
    | "\uD83E\uDD2F"
    | "\uD83D\uDE31"
    | "\uD83E\uDD2C"
    | "\uD83D\uDE22"
    | "\uD83C\uDF89"
    | "\uD83E\uDD29"
    | "\uD83E\uDD2E"
    | "\uD83D\uDCA9"
    | "\uD83D\uDE4F"
    | "\uD83D\uDC4C"
    | "\uD83D\uDD4A"
    | "\uD83E\uDD21"
    | "\uD83E\uDD71"
    | "\uD83E\uDD74"
    | "\uD83D\uDE0D"
    | "\uD83D\uDC33"
    | "\u2764\u200D\uD83D\uDD25"
    | "\uD83C\uDF1A"
    | "\uD83C\uDF2D"
    | "\uD83D\uDCAF"
    | "\uD83E\uDD23"
    | "\u26A1"
    | "\uD83C\uDF4C"
    | "\uD83C\uDFC6"
    | "\uD83D\uDC94"
    | "\uD83E\uDD28"
    | "\uD83D\uDE10"
    | "\uD83C\uDF53"
    | "\uD83C\uDF7E"
    | "\uD83D\uDC8B"
    | "\uD83D\uDD95"
    | "\uD83D\uDE08"
    | "\uD83D\uDE34"
    | "\uD83D\uDE2D"
    | "\uD83E\uDD13"
    | "\uD83D\uDC7B"
    | "\uD83D\uDC68\u200D\uD83D\uDCBB"
    | "\uD83D\uDC40"
    | "\uD83C\uDF83"
    | "\uD83D\uDE48"
    | "\uD83D\uDE07"
    | "\uD83D\uDE28"
    | "\uD83E\uDD1D"
    | "\u270D"
    | "\uD83E\uDD17"
    | "\uD83E\uDEE1"
    | "\uD83C\uDF85"
    | "\uD83C\uDF84"
    | "\u2603"
    | "\uD83D\uDC85"
    | "\uD83E\uDD2A"
    | "\uD83D\uDDFF"
    | "\uD83C\uDD92"
    | "\uD83D\uDC98"
    | "\uD83D\uDE49"
    | "\uD83E\uDD84"
    | "\uD83D\uDE18"
    | "\uD83D\uDC8A"
    | "\uD83D\uDE4A"
    | "\uD83D\uDE0E"
    | "\uD83D\uDC7E"
    | "\uD83E\uDD37\u200D\u2642"
    | "\uD83E\uDD37"
    | "\uD83E\uDD37\u200D\u2640"
    | "\uD83D\uDE21";
  /** Custom emoji identifier */
  customEmojiId?: string;

  isEmoji(): this is this & {
    emoji: import("@telegram.ts/types").ReactionTypeEmoji["emoji"];
    customEmojiId?: undefined;
  };

  isCustomEmoji(): this is this & {
    customEmojiId: string;
    emoji?: undefined;
  };

  isPaid(): this is this & {
    customEmojiId?: undefined;
    emoji?: undefined;
  };
}

/**
 * Collector class for handling messages in a specific chat.
 */
export declare class MessageCollector extends Collector<string, Message> {
  readonly client: TelegramClient;
  readonly chat: Chat;
  readonly options: ICollectorOptions<string, Message>;
  /**
   * The number of received messages.
   */
  received: number;
  /**
   * Creates an instance of MessageCollector.
   * @param client - The TelegramClient instance.
   * @param chat - The chat in which messages are being collected.
   * @param options - The options for the collector.
   */
  constructor(
    client: TelegramClient,
    chat: Chat,
    options?: ICollectorOptions<string, Message>,
  );
  /**
   * Collects a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  collect(message: Message): string | null;
  /**
   * Disposes of a message.
   * @param message - The message context.
   * @returns The ID of the message or null.
   */
  dispose(message: Message): string | null;
  /**
   * Gets the reason for ending the collector.
   * @returns The reason for ending the collector or null.
   */
  get endReason(): string | null;
}

/**
 * Interface for reaction event collector.
 */
export interface IReactionEventCollector
  extends ICollectorEvent<string, MessageReactionUpdated> {
  /**
   * Event emitted when a user reacts.
   * @param data - The collection of user reactions.
   */
  user: (
    data: ReadonlyCollection<string, MessageReactionUpdated[]>,
  ) => PossiblyAsync<void>;
  /**
   * Event emitted when a reaction is created.
   * @param data - The reaction context.
   */
  create: (data: MessageReactionUpdated) => PossiblyAsync<void>;
}

/**
 * Collector class for handling message reactions in a specific chat.
 */
export declare class ReactionCollector extends Collector<
  string,
  MessageReactionUpdated
> {
  readonly client: TelegramClient;
  readonly chat: Chat;
  readonly options: ICollectorOptions<string, MessageReactionUpdated>;
  /**
   * The number of received reactions.
   */
  received: number;
  /**
   * Collection of users and their reactions.
   */
  users: Collection<string, MessageReactionUpdated[]>;
  /**
   * Creates an instance of ReactionCollector.
   * @param client - The TelegramClient instance.
   * @param chat - The chat in which reactions are being collected.
   * @param options - The options for the collector.
   */
  constructor(
    client: TelegramClient,
    chat: Chat,
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  );
  /**
   * Registers an event listener for reaction events.
   * @param event - The event name.
   * @param listener - The event listener.
   * @returns The current instance of ReactionCollector.
   */
  on<K extends keyof IReactionEventCollector>(
    event: K,
    listener: IReactionEventCollector[K],
  ): this;
  /**
   * Registers a one-time event listener for reaction events.
   * @param event - The event name.
   * @param listener - The event listener.
   * @returns The current instance of ReactionCollector.
   */
  once<K extends keyof IReactionEventCollector>(
    event: K,
    listener: IReactionEventCollector[K],
  ): this;
  /**
   * Collects a reaction.
   * @param reaction - The reaction context.
   * @returns The key of the reaction or null.
   */
  collect(reaction: MessageReactionUpdated): string | null;
  /**
   * Disposes of a reaction.
   * @param reaction - The reaction context.
   * @returns The key of the reaction or null.
   */
  dispose(reaction: MessageReactionUpdated): string | null;
  /**
   * Handles users' reactions.
   * @param reaction - The reaction context.
   */
  handleUsers(reaction: MessageReactionUpdated): void;
  /**
   * Gets the reason for ending the collector.
   * @returns The reason for ending the collector or null.
   */
  get endReason(): string | null;
}

export declare class Location extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a point on the map
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Location,
  );
  /** Latitude as defined by sender */
  latitude: number;
  /** Longitude as defined by sender */
  longitude: number;
  /** The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontalAccuracy?: number;
  /** Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only */
  livePeriod?: number;
  /** The direction in which user is moving, in degrees; 1-360. For active live locations only */
  heading?: number;
  /** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only */
  proximityAlertRadius?: number;
}

export declare class MessageReactionUpdated extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a change of a reaction on a message performed by a user
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").MessageReactionUpdated,
  );
  /** Unique identifier of the message inside the chat */
  id: string;
  /**
   * The chat containing the message the user reacted to
   */
  chat: Chat;
  /**
   * The user that changed the reaction, if the user isn't anonymous
   */
  user?: User;
  /**
   * The chat on behalf of which the reaction was changed, if the user is anonymous
   */
  actorChat: Chat;
  /** Date of the change in Unix time */
  createdUnixTime: number;
  /** Summary of emoji reactions */
  emojiSummary?: {
    added: (
      | "\uD83D\uDC4D"
      | "\uD83D\uDC4E"
      | "\u2764"
      | "\uD83D\uDD25"
      | "\uD83E\uDD70"
      | "\uD83D\uDC4F"
      | "\uD83D\uDE01"
      | "\uD83E\uDD14"
      | "\uD83E\uDD2F"
      | "\uD83D\uDE31"
      | "\uD83E\uDD2C"
      | "\uD83D\uDE22"
      | "\uD83C\uDF89"
      | "\uD83E\uDD29"
      | "\uD83E\uDD2E"
      | "\uD83D\uDCA9"
      | "\uD83D\uDE4F"
      | "\uD83D\uDC4C"
      | "\uD83D\uDD4A"
      | "\uD83E\uDD21"
      | "\uD83E\uDD71"
      | "\uD83E\uDD74"
      | "\uD83D\uDE0D"
      | "\uD83D\uDC33"
      | "\u2764\u200D\uD83D\uDD25"
      | "\uD83C\uDF1A"
      | "\uD83C\uDF2D"
      | "\uD83D\uDCAF"
      | "\uD83E\uDD23"
      | "\u26A1"
      | "\uD83C\uDF4C"
      | "\uD83C\uDFC6"
      | "\uD83D\uDC94"
      | "\uD83E\uDD28"
      | "\uD83D\uDE10"
      | "\uD83C\uDF53"
      | "\uD83C\uDF7E"
      | "\uD83D\uDC8B"
      | "\uD83D\uDD95"
      | "\uD83D\uDE08"
      | "\uD83D\uDE34"
      | "\uD83D\uDE2D"
      | "\uD83E\uDD13"
      | "\uD83D\uDC7B"
      | "\uD83D\uDC68\u200D\uD83D\uDCBB"
      | "\uD83D\uDC40"
      | "\uD83C\uDF83"
      | "\uD83D\uDE48"
      | "\uD83D\uDE07"
      | "\uD83D\uDE28"
      | "\uD83E\uDD1D"
      | "\u270D"
      | "\uD83E\uDD17"
      | "\uD83E\uDEE1"
      | "\uD83C\uDF85"
      | "\uD83C\uDF84"
      | "\u2603"
      | "\uD83D\uDC85"
      | "\uD83E\uDD2A"
      | "\uD83D\uDDFF"
      | "\uD83C\uDD92"
      | "\uD83D\uDC98"
      | "\uD83D\uDE49"
      | "\uD83E\uDD84"
      | "\uD83D\uDE18"
      | "\uD83D\uDC8A"
      | "\uD83D\uDE4A"
      | "\uD83D\uDE0E"
      | "\uD83D\uDC7E"
      | "\uD83E\uDD37\u200D\u2642"
      | "\uD83E\uDD37"
      | "\uD83E\uDD37\u200D\u2640"
      | "\uD83D\uDE21"
    )[];
    kept: (
      | "\uD83D\uDC4D"
      | "\uD83D\uDC4E"
      | "\u2764"
      | "\uD83D\uDD25"
      | "\uD83E\uDD70"
      | "\uD83D\uDC4F"
      | "\uD83D\uDE01"
      | "\uD83E\uDD14"
      | "\uD83E\uDD2F"
      | "\uD83D\uDE31"
      | "\uD83E\uDD2C"
      | "\uD83D\uDE22"
      | "\uD83C\uDF89"
      | "\uD83E\uDD29"
      | "\uD83E\uDD2E"
      | "\uD83D\uDCA9"
      | "\uD83D\uDE4F"
      | "\uD83D\uDC4C"
      | "\uD83D\uDD4A"
      | "\uD83E\uDD21"
      | "\uD83E\uDD71"
      | "\uD83E\uDD74"
      | "\uD83D\uDE0D"
      | "\uD83D\uDC33"
      | "\u2764\u200D\uD83D\uDD25"
      | "\uD83C\uDF1A"
      | "\uD83C\uDF2D"
      | "\uD83D\uDCAF"
      | "\uD83E\uDD23"
      | "\u26A1"
      | "\uD83C\uDF4C"
      | "\uD83C\uDFC6"
      | "\uD83D\uDC94"
      | "\uD83E\uDD28"
      | "\uD83D\uDE10"
      | "\uD83C\uDF53"
      | "\uD83C\uDF7E"
      | "\uD83D\uDC8B"
      | "\uD83D\uDD95"
      | "\uD83D\uDE08"
      | "\uD83D\uDE34"
      | "\uD83D\uDE2D"
      | "\uD83E\uDD13"
      | "\uD83D\uDC7B"
      | "\uD83D\uDC68\u200D\uD83D\uDCBB"
      | "\uD83D\uDC40"
      | "\uD83C\uDF83"
      | "\uD83D\uDE48"
      | "\uD83D\uDE07"
      | "\uD83D\uDE28"
      | "\uD83E\uDD1D"
      | "\u270D"
      | "\uD83E\uDD17"
      | "\uD83E\uDEE1"
      | "\uD83C\uDF85"
      | "\uD83C\uDF84"
      | "\u2603"
      | "\uD83D\uDC85"
      | "\uD83E\uDD2A"
      | "\uD83D\uDDFF"
      | "\uD83C\uDD92"
      | "\uD83D\uDC98"
      | "\uD83D\uDE49"
      | "\uD83E\uDD84"
      | "\uD83D\uDE18"
      | "\uD83D\uDC8A"
      | "\uD83D\uDE4A"
      | "\uD83D\uDE0E"
      | "\uD83D\uDC7E"
      | "\uD83E\uDD37\u200D\u2642"
      | "\uD83E\uDD37"
      | "\uD83E\uDD37\u200D\u2640"
      | "\uD83D\uDE21"
    )[];
    removed: (
      | "\uD83D\uDC4D"
      | "\uD83D\uDC4E"
      | "\u2764"
      | "\uD83D\uDD25"
      | "\uD83E\uDD70"
      | "\uD83D\uDC4F"
      | "\uD83D\uDE01"
      | "\uD83E\uDD14"
      | "\uD83E\uDD2F"
      | "\uD83D\uDE31"
      | "\uD83E\uDD2C"
      | "\uD83D\uDE22"
      | "\uD83C\uDF89"
      | "\uD83E\uDD29"
      | "\uD83E\uDD2E"
      | "\uD83D\uDCA9"
      | "\uD83D\uDE4F"
      | "\uD83D\uDC4C"
      | "\uD83D\uDD4A"
      | "\uD83E\uDD21"
      | "\uD83E\uDD71"
      | "\uD83E\uDD74"
      | "\uD83D\uDE0D"
      | "\uD83D\uDC33"
      | "\u2764\u200D\uD83D\uDD25"
      | "\uD83C\uDF1A"
      | "\uD83C\uDF2D"
      | "\uD83D\uDCAF"
      | "\uD83E\uDD23"
      | "\u26A1"
      | "\uD83C\uDF4C"
      | "\uD83C\uDFC6"
      | "\uD83D\uDC94"
      | "\uD83E\uDD28"
      | "\uD83D\uDE10"
      | "\uD83C\uDF53"
      | "\uD83C\uDF7E"
      | "\uD83D\uDC8B"
      | "\uD83D\uDD95"
      | "\uD83D\uDE08"
      | "\uD83D\uDE34"
      | "\uD83D\uDE2D"
      | "\uD83E\uDD13"
      | "\uD83D\uDC7B"
      | "\uD83D\uDC68\u200D\uD83D\uDCBB"
      | "\uD83D\uDC40"
      | "\uD83C\uDF83"
      | "\uD83D\uDE48"
      | "\uD83D\uDE07"
      | "\uD83D\uDE28"
      | "\uD83E\uDD1D"
      | "\u270D"
      | "\uD83E\uDD17"
      | "\uD83E\uDEE1"
      | "\uD83C\uDF85"
      | "\uD83C\uDF84"
      | "\u2603"
      | "\uD83D\uDC85"
      | "\uD83E\uDD2A"
      | "\uD83D\uDDFF"
      | "\uD83C\uDD92"
      | "\uD83D\uDC98"
      | "\uD83D\uDE49"
      | "\uD83E\uDD84"
      | "\uD83D\uDE18"
      | "\uD83D\uDC8A"
      | "\uD83D\uDE4A"
      | "\uD83D\uDE0E"
      | "\uD83D\uDC7E"
      | "\uD83E\uDD37\u200D\u2642"
      | "\uD83E\uDD37"
      | "\uD83E\uDD37\u200D\u2640"
      | "\uD83D\uDE21"
    )[];
  };
  /** Summary of custom emoji reactions */
  customEmojiSummary?: {
    added: string[];
    kept: string[];
    removed: string[];
  };
  /** Summary of paid emoji reactions */
  paidEmoji?: {
    added: boolean;
    removed: boolean;
  };
  /**
   * Return the timestamp change, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date of the change
   */
  get createdAt(): Date;
  /**
   * @param options - message collector options
   */
  createMessageCollector(
    options?: ICollectorOptions<string, Message>,
  ): MessageCollector;
  /**
   * @param options - message collector options
   */
  awaitMessage(
    options?: ICollectorOptions<string, Message>,
  ): Promise<
    [import("@telegram.ts/collection").Collection<string, Message>, string]
  >;
  /**
   * @param options - message collector options
   */
  awaitMessages(
    options?: ICollectorOptions<string, Message> & {
      errors?: string[];
    },
  ): Promise<import("@telegram.ts/collection").Collection<string, Message>>;
  /**
   * @param options - reaction collector options
   */
  createReactionCollector(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): ReactionCollector;
  /**
   * @param options - reaction collector options
   */
  awaitReaction(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): Promise<
    [
      import("@telegram.ts/collection").Collection<
        string,
        MessageReactionUpdated
      >,
      string,
    ]
  >;
  /**
   * @param options - reaction collector options
   */
  awaitReactions(
    options?: ICollectorOptions<string, MessageReactionUpdated> & {
      errors?: string[];
    },
  ): Promise<
    import("@telegram.ts/collection").Collection<string, MessageReactionUpdated>
  >;
  /**
   * @param options - inline keyboard collector options
   */
  createMessageComponentCollector(
    options?: ICollectorOptions<string, CallbackQuery>,
  ): InlineKeyboardCollector;
  /**
   * Reply to the current message
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  reply(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param reaction - A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots
   * @param isBig - Pass True to set the reaction with a big animation
   * @returns Returns True on success.
   */
  react(
    reaction:
      | string
      | import("@telegram.ts/types").ReactionType
      | import("@telegram.ts/types").ReactionType[]
      | ReactionType
      | ReactionType[],
    isBig?: boolean,
  ): Promise<true>;
  /**
   * Use this method to edit text and game messages.
   * @param text - New text of the message, 1-4096 characters after entities parsing
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "text" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        content: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit captions of messages.
   * @param caption - New caption of the message, 0-1024 characters after entities parsing
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editCaption(
    caption?: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "caption" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        caption?: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit animation, audio, document, photo, video messages or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param media - An object for a new media content of the message
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(
    media: MethodParameters["editMessageMedia"]["media"],
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        media: InputMedia;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "media" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit only the reply markup of messages.
   * @param replyMarkup - An object for an inline keyboard
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(
    replyMarkup: InlineKeyboardMarkup,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "media" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  forward(
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        videoStartTimestamp?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageId: string | number;
      },
      "chatId" | "messageId" | "fromChatId"
    >,
  ): Promise<Message>;
  /**
   * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns Returns the message id of the sent message on success.
   */
  copy(
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        videoStartTimestamp?: number;
        messageId: string | number;
        caption?: string;
        parseMode?: ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "chatId" | "messageId" | "fromChatId"
    >,
  ): Promise<number>;
  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param options - options for pinned message
   * @returns Returns True on success.
   */
  pin(options?: {
    /** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats */
    notification?: boolean;
    /** Unique identifier of the business connection on behalf of which the message will be pinned */
    businessConnectionId?: string;
  }): Promise<true>;
  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param businessConnectionId - Unique identifier of the business connection on behalf of which the message will be unpinned
   * @returns Returns True on success.
   */
  unpin(businessConnectionId?: string): Promise<true>;
  /**
	 * Use this method to delete a message, including service messages, with the following limitations:
	- A message can only be deleted if it was sent less than 48 hours ago.
	- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
	- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
	- Bots can delete outgoing messages in private chats, groups, and supergroups.
	- Bots can delete incoming messages in private chats.
	- Bots granted can_post_messages permissions can delete outgoing messages in channels.
	- If the bot is an administrator of a group, it can delete any message there.
	- If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
	 * @returns Returns True on success.
 */
  delete(): Promise<true>;
  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param latitude - Latitude of new location
   * @param longitude - Longitude of new location
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(
    latitude: number,
    longitude: number,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        latitude: number;
        longitude: number;
        livePeriod?: number;
        horizontalAccuracy?: number;
        heading?: number;
        proximityAlertRadius?: number;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageId" | "latitude" | "longitude"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
        location: Location;
      })
  >;
  /**
   * Use this method to stop updating a live location message before live_period expires.
   * @param options - out parameters
   * @returns On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
        location: Location;
      })
  >;
}

export declare class MessageOrigin extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes the origin of a message
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").MessageOrigin,
  );
  /** Date the message was sent originally in Unix time */
  createdUnixTime: number;
  /**
   * @param data - Data about the describes the origin of a message
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").MessageOrigin,
  ): import("@telegram.ts/types").MessageOrigin;
  /**
   * Unique message identifier inside this chat. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent
   */
  id?: string;
  /**
   * User that sent the message originally
   */
  senderUser?: User;
  /**
   * Name of the user that sent the message originally
   */
  username?: string;
  /**
   * Chat that sent the message originally
   */
  senderChat?: Chat;
  /**
   * Channel chat to which the message was originally sent
   */
  chat?: Chat;
  /**
   * Signature of the original post author
   */
  authorSignature?: string;

  isUser(): this is this & {
    senderUser: User;
  };

  isHiddenUser(): this is this & {
    username: string;
  };

  isChat(): this is this & {
    senderChat: Chat;
    authorSignature?: string;
  };

  isChennel(): this is this & {
    id: string;
    chat: Chat;
    authorSignature?: string;
  };
  /**
   * @param options - message collector options
   */
  createMessageCollector(
    options?: ICollectorOptions<string, Message>,
  ): MessageCollector;
  /**
   * @param options - message collector options
   */
  awaitMessage(
    options?: ICollectorOptions<string, Message>,
  ): Promise<
    [import("@telegram.ts/collection").Collection<string, Message>, string]
  >;
  /**
   * @param options - message collector options
   */
  awaitMessages(
    options?: ICollectorOptions<string, Message> & {
      errors?: string[];
    },
  ): Promise<import("@telegram.ts/collection").Collection<string, Message>>;
  /**
   * @param options - reaction collector options
   */
  createReactionCollector(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): ReactionCollector;
  /**
   * @param options - reaction collector options
   */
  awaitReaction(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): Promise<
    [
      import("@telegram.ts/collection").Collection<
        string,
        MessageReactionUpdated
      >,
      string,
    ]
  >;
  /**
   * @param options - reaction collector options
   */
  awaitReactions(
    options?: ICollectorOptions<string, MessageReactionUpdated> & {
      errors?: string[];
    },
  ): Promise<
    import("@telegram.ts/collection").Collection<string, MessageReactionUpdated>
  >;
  /**
   * @param options - inline keyboard collector options
   */
  createMessageComponentCollector(
    options?: ICollectorOptions<string, CallbackQuery>,
  ): InlineKeyboardCollector;
  /**
   * Reply to the current message
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  reply(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param reaction - A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots
   * @param isBig - Pass True to set the reaction with a big animation
   * @returns Returns True on success.
   */
  react(
    reaction:
      | string
      | import("@telegram.ts/types").ReactionType
      | import("@telegram.ts/types").ReactionType[]
      | ReactionType
      | ReactionType[],
    isBig?: boolean,
  ): Promise<true>;
  /**
   * Use this method to edit text and game messages.
   * @param text - New text of the message, 1-4096 characters after entities parsing
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "text" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        content: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit captions of messages.
   * @param caption - New caption of the message, 0-1024 characters after entities parsing
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editCaption(
    caption?: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "caption" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        caption?: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit animation, audio, document, photo, video messages or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param media - An object for a new media content of the message
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(
    media: MethodParameters["editMessageMedia"]["media"],
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        media: InputMedia;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "media" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit only the reply markup of messages.
   * @param replyMarkup - An object for an inline keyboard
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(
    replyMarkup: InlineKeyboardMarkup,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "media" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  forward(
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        videoStartTimestamp?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageId: string | number;
      },
      "chatId" | "messageId" | "fromChatId"
    >,
  ): Promise<Message>;
  /**
   * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns Returns the message id of the sent message on success.
   */
  copy(
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        videoStartTimestamp?: number;
        messageId: string | number;
        caption?: string;
        parseMode?: ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "chatId" | "messageId" | "fromChatId"
    >,
  ): Promise<number>;
  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param options - options for pinned message
   * @returns Returns True on success.
   */
  pin(options?: {
    /** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats */
    notification?: boolean;
    /** Unique identifier of the business connection on behalf of which the message will be pinned */
    businessConnectionId?: string;
  }): Promise<true>;
  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param businessConnectionId - Unique identifier of the business connection on behalf of which the message will be unpinned
   * @returns Returns True on success.
   */
  unpin(businessConnectionId?: string): Promise<true>;
  /**
	 * Use this method to delete a message, including service messages, with the following limitations:
	- A message can only be deleted if it was sent less than 48 hours ago.
	- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
	- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
	- Bots can delete outgoing messages in private chats, groups, and supergroups.
	- Bots can delete incoming messages in private chats.
	- Bots granted can_post_messages permissions can delete outgoing messages in channels.
	- If the bot is an administrator of a group, it can delete any message there.
	- If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
	 * @returns Returns True on success.
 */
  delete(): Promise<true>;
  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param latitude - Latitude of new location
   * @param longitude - Longitude of new location
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(
    latitude: number,
    longitude: number,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        latitude: number;
        longitude: number;
        livePeriod?: number;
        horizontalAccuracy?: number;
        heading?: number;
        proximityAlertRadius?: number;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageId" | "latitude" | "longitude"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
        location: Location;
      })
  >;
  /**
   * Use this method to stop updating a live location message before live_period expires.
   * @param options - out parameters
   * @returns On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
        location: Location;
      })
  >;
  /**
   * Return the timestamp message was sent originally, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date the message was sent originally
   */
  get createdAt(): Date;
}

export declare class LinkPreviewOptions {
  /**
   * @param data - Data about the options used for link preview generation
   */
  constructor(data: import("@telegram.ts/types").LinkPreviewOptions);
  /** True, if the link preview is disabled */
  disabled?: boolean;
  /** URL to use for the link preview. If empty, then the first URL found in the message text will be used */
  url?: string;
  /** True, if the media in the link preview is suppposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
  smallMedia?: boolean;
  /** True, if the media in the link preview is suppposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
  largeMedia?: boolean;
  /** True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
  aboveText?: boolean;
}

export declare class Animation extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents an animation file (GIF or H.264/MPEG-4 AVC video without sound)
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Animation,
  );
  /** Video width as defined by sender */
  width: number;
  /** Video height as defined by sender */
  height: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Original animation filename as defined by sender */
  name?: string;
  /** Animation thumbnail as defined by sender */
  thumbnail?: Photo;
  /** MIME type of the file as defined by sender */
  mimeType?: string;
}

export declare class Audio extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents an audio file to be treated as music by the Telegram clients
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Audio,
  );
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** Performer of the audio as defined by sender or by audio tags */
  performer?: string;
  /** Original filename as defined by sender */
  name?: string;
  /** Thumbnail of the album cover to which the music file belongs */
  thumbnail?: Photo;
  /** MIME type of the file as defined by sender */
  mimeType?: string;
}

export declare class Document extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a general file (as opposed to photos, voice messages and audio files)
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Document,
  );
  /** Original filename as defined by sender */
  name?: string;
  /** Document thumbnail as defined by sender */
  thumbnail?: Photo;
  /** MIME type of the file as defined by sender */
  mimeType?: string;
}

export declare class Sticker extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a sticker
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Sticker,
  );
  /** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
  type: "regular" | "custom_emoji" | "mask";
  /** Sticker width */
  width: number;
  /** Sticker height */
  height: number;
  /** True, if the sticker is animated */
  animated: boolean;
  /** True, if the sticker is a video sticker */
  video: boolean;
  /** Sticker thumbnail in the .WEBP or .JPG format */
  thumbnail?: Photo;
  /** Emoji associated with the sticker */
  emoji?: string;
  /** Name of the sticker set to which the sticker belongs */
  setName?: string;
  /** For premium regular stickers, premium animation for the sticker */
  animation?: InputFile;
  /** For mask stickers, the position where the mask should be placed */
  mask?: import("@telegram.ts/types").MaskPosition;
  /** For custom emoji stickers, unique identifier of the custom emoji */
  emojiId?: string;
}

export declare class Story extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a story
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Story,
  );
  /** Unique identifier for the story in the chat */
  id: number;
  /**
   * Chat that posted the story
   */
  chat: Chat;
}

export declare class Video extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a video file
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Video,
  );
  /** Video width as defined by sender */
  width: number;
  /** Video height as defined by sender */
  height: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Available sizes of the cover of the video in the message */
  cover?: Photo[];
  /** Timestamp in seconds from which the video will play in the message */
  startedTimestamp?: number;
  /** Original filename as defined by sender */
  name?: string;
  /** Video thumbnail */
  thumbnail?: Photo;
  /** MIME type of the file as defined by sender */
  mimeType?: string;

  /**
   * Date the video was sent. Timestamp in seconds from which the video will play in the message
   */
  get createdAt(): Date | null;
}

export declare class VideoNote extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a video message (available in Telegram apps as of v.4.0)
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").VideoNote,
  );
  /** Video width and height (diameter of the video message) as defined by sender */
  length: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Video thumbnail */
  thumbnail?: Photo;
}

export declare class Voice extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a voice note
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Voice,
  );
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** MIME type of the file as defined by sender */
  mimeType?: string;
}

export declare class Contact {
  /**
   * @param data - Data about the represents a phone contact
   */
  constructor(data: import("@telegram.ts/types").Contact);
  /** Contact's phone number */
  phoneNumber: string;
  /** Contact's first name */
  firstName: string;
  /** Contact's last name */
  lastName?: string;
  /** Contact's user identifier in Telegram */
  userId?: string;
  /** Additional data about the contact in the form of a vCard */
  vcard?: string;
}

export declare class Dice {
  /**
   * @param data - Data about the represents an animated emoji that displays a random value
   */
  constructor(data: import("@telegram.ts/types").Dice);
  /** Emoji on which the dice throw animation is based */
  emoji: string;
  /** Value of the dice, 1-6 for "🎲", "🎯" and "🎳" base emoji, 1-5 for "🏀" and "⚽" base emoji, 1-64 for "🎰" base Emoji */
  value: number;
}

export declare class GameHighScore extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents one row of the high scores table for a game
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").GameHighScore,
  );
  /** Position in high score table for the game */
  position: number;
  /** Score */
  score: number;
  /** User */
  user: User;
}

export declare class Game extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Game,
  );
  /** Title of the game */
  title: string;
  /** Description of the game */
  description: string;
  /** Photo that will be displayed in the game message in chats */
  photo: Photo[];
  /** Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters */
  text: string;
  /** Special entities that appear in text, such as usernames, URLs, bot commands, etc */
  entities: MessageEntities;
  /** Animation that will be displayed in the game message in chats. Upload via BotFather */
  animation: Animation;
  /**
   * Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned.
   * @param userId - User identifier
   * @param score - New score, must be non-negative
   * @param options - out parameters
   * @returns On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
   */
  setScore(
    userId: string | number,
    score: number,
    options?: Omit<
      {
        userId: string | number;
        score: number;
        force?: boolean;
        disableEditMessage?: boolean;
        chatId?: string | number;
        messageId?: string | number;
        inlineMessageId?: string;
      },
      "userId" | "score"
    >,
  ): Promise<
    | boolean
    | (Message & {
        game: Game;
        editedTimestamp: number;
      })
  >;
  /**
   * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game.
   * @param userId - Target user id
   * @param options - out parameters
   * @returns  Returns an Array of GameHighScore objects.
   * This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change.
   */
  fetchHighScores(
    userId: string | number,
    options?: Omit<
      {
        userId: string | number;
        chatId?: string | number;
        messageId?: string | number;
        inlineMessageId?: string;
      },
      "userId"
    >,
  ): Promise<GameHighScore[]>;
}

export declare class Gift extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the gift that can be sent by the bot.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Gift,
  );
  /** Unique identifier of the gift */
  id: string;
  /** The sticker that represents the gift */
  sticker: Sticker;
  /** The number of Telegram Stars that must be paid to send the sticker */
  startCount: number;
  /** The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
  upgradeStarCount?: number;
  /** The total number of the gifts of this type that can be sent; for limited gifts only */
  totalCount?: number;
  /** The number of remaining gifts of this type that can be sent; for limited gifts only */
  remainingCount?: number;
  /** Sends a gift to the given user. The gift can't be converted to Telegram Stars by the user.
   * @param userId - Unique identifier of the target user that will receive the gift.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  sendGift(
    userId: string | number,
    options?: Omit<MethodParameters["sendGift"], "giftId" | "userId">,
  ): Promise<true>;
  /**
   * Checks if this gift is equal to another gift.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of Gift and are equal based on key properties, otherwise false.
   */
  equals(other: Gift): boolean;
}

export class GiftInfo extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the message about a regular gift that was sent or received.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").GiftInfo,
  );
  /** Information about the regular gift */
  gift: Gift;
  /** Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
  ownedGiftId?: string;
  /** Text of the message that was added to the gift */
  content?: string;
  /** Special entities that appear in the text */
  entities?: MessageEntities;
  /** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  isPrivate?: true;
  /** True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
  beUpgraded?: true;
  /** Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars */
  convertStarCount?: number;
  /** Number of Telegram Stars that were paid by the sender for the ability to upgrade the gift */
  prepaidUpgradeStarCount?: number;
}

export declare class Gifts {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the list of gifts.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Gifts,
  );
  /** The list of gifts */
  gifts: Collection<string, Gift>;
  /**
   * Checks if this gifts is equal to another gifts.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of Gifts and are equal based on key properties, otherwise false.
   */
  equals(other: Gifts): boolean;
  /**
   * Makes the class iterable, returning each `Gift` object.
   */
  [Symbol.iterator](): IterableIterator<Gift>;
}

export class OwnedGiftRegular extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the regular gift owned by a user or a chat.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").OwnedGiftRegular,
  );
  /** Type of the gift, always “regular” */
  type: "regular";
  /** Information about the regular gift */
  gift: Gift;
  /** Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
  ownedGiftId?: string;
  /** Sender of the gift if it is a known user */
  senderUser: User;
  /** Date the gift was sent in Unix time */
  senderUnixTime: number;
  /** Text of the message that was added to the gift */
  content?: string;
  /** Special entities that appear in the text */
  entities?: MessageEntities;
  /** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  isPrivate?: true;
  /** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
  isSaved?: true;
  /** True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
  beUpgraded?: true;
  /** True, if the gift was refunded and isn't available anymore */
  wasRefunded?: true;
  /** Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars */
  convertStarCount?: number;
  /** Number of Telegram Stars that were paid by the sender for the ability to upgrade the gift */
  prepaidUpgradeStarCount?: number;
  /**
   * Return the timestamp message was sent, in milliseconds
   */
  get senderTimestamp(): number;
  /**
   * Date the message was sent. It is always a positive number, representing a valid date
   */
  get senderAt(): Date;
}

export class OwnedGifts extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the list of gifts received and owned by a user or a chat.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").OwnedGifts,
  );
  /** The total number of gifts owned by the user or the chat */
  totalCount: number;
  /** The list of gifts */
  gifts?: (OwnedGiftUnique | OwnedGiftRegular)[];
  /** Offset for the next request. If empty, then there are no more results */
  nextOffset?: string;
}

export class OwnedGiftUnique extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the unique gift received and owned by a user or a chat.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").OwnedGiftUnique,
  );
  /** Type of the gift, always “unique” */
  type: "unique";
  /** Information about the unique gift */
  gift: UniqueGift;
  /** Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
  ownedGiftId?: string;
  /**
   * Sender of the gift if it is a known user
   */
  senderUser: User;
  /** Date the gift was sent in Unix time */
  senderUnixTime: number;
  /** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
  isSaved?: true;
  /** True, if the gift can be transferred to another owner; for gifts received on behalf of business accounts only */
  beTransferred?: true;
  /** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
  transferStarCount?: number;
  /**
   * Return the timestamp message was sent, in milliseconds
   */
  get senderTimestamp(): number;
  /**
   * Date the message was sent. It is always a positive number, representing a valid date
   */
  get senderAt(): Date;
}

export class UniqueGift extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about unique gift that was upgraded from a regular gift.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").UniqueGift,
  );
  /** Human-readable name of the regular gift from which this unique gift was upgraded */
  baseName: string;
  /** Unique name of the gift. This name can be used in https://t.me/nft/... links and story areas */
  name: string;
  /** Unique number of the upgraded gift among gifts upgraded from the same regular gift */
  number: number;
  /** Model of the gift */
  model: {
    /** Name of the model */
    name: string;
    /** The sticker that represents the unique gift */
    sticker: Sticker;
    /** The number of unique gifts that receive this model for every 1000 gifts upgraded */
    rarityPerMille: number;
  };
  /** Symbol of the gift */
  symbol: {
    /** Name of the model */
    name: string;
    /** The sticker that represents the unique gift */
    sticker: Sticker;
    /** The number of unique gifts that receive this model for every 1000 gifts upgraded */
    rarityPerMille: number;
  };
  /** Backdrop of the gift */
  backdrop: {
    /** Name of the backdrop */
    name: string;
    /** Colors of the backdrop */
    colors: {
      /** The color in the center of the backdrop in RGB format */
      center: number;
      /** The color on the edges of the backdrop in RGB format */
      edge: number;
      /** The color to be applied to the symbol in RGB format */
      symbol: number;
      /** The color for the text on the backdrop in RGB format */
      text: number;
    };
    /** The number of unique gifts that receive this backdrop for every 1000 gifts upgraded */
    rarityPerMille: number;
  };
}

export class UniqueGiftInfo extends Base {
  /**
   * @param {import("../../client/TelegramClient").TelegramClient | import("../../client/BaseClient").BaseClient} client - The client that instantiated this
   * @param {import("@telegram.ts/types").UniqueGiftInfo} data - Data about the message about a unique gift that was sent or received.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").UniqueGiftInfo,
  );
  /** Information about the gift */
  gift: UniqueGift;
  /** Origin of the gift. Currently, either “upgrade” or “transfer” */
  origin: "upgrade" | "transfer";
  /** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
  ownedGiftId?: string;
  /** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
  transferStarCount?: number;
}

export declare class Giveaway extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a message about a scheduled giveaway
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Giveaway,
  );
  /**
   * The list of chats which the user must join to participate in the giveaway
   */
  chats: Collection<string, Chat>;
  /** Point in time (Unix timestamp) when winners of the giveaway will be selected */
  selectedUnixTime: number;
  /** The number of users which are supposed to be selected as winners of the giveaway */
  winnerCount: number;
  /** True, if only users who join the chats after the giveaway started should be eligible to win */
  onlyNewMembers?: true;
  /** True, if the list of giveaway winners will be visible to everyone */
  publicWinners?: true;
  /** Description of additional giveaway prize */
  description?: string;
  /** A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways */
  countryCodes?: string[];
  /** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
  starCount?: number;
  /** The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
  subscriptionMonthCount?: number;
  /**
   * Return the timestamp winners of the giveaway will be selected, in milliseconds
   */
  get selectedTimestamp(): number;
  /**
   * Point in time when winners of the giveaway will be selected
   */
  get selectedAt(): Date;
  /**
   * Checks if this giveaway is equal to another giveaway.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of Giveaway and are equal based on key properties, otherwise false.
   */
  equals(other: Giveaway): boolean;
}

export declare class GiveawayWinners extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a message about the completion of a giveaway with public winners
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").GiveawayWinners,
  );
  /**
   * The chat that created the giveaway
   */
  chat: Chat;
  /** Identifier of the messsage with the giveaway in the chat */
  messageId: string;
  /** Point in time (Unix timestamp) when winners of the giveaway were selected */
  selectionUnixTime: number;
  /** Total number of winners in the giveaway */
  count: number;
  /**
   * List of up to 100 winners of the giveaway
   */
  winners: Collection<string, User>;
  /**
   * @param data - Data about the represents a message about the completion of a giveaway with public winners
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").GiveawayWinners,
  ): import("@telegram.ts/types").GiveawayWinners;
  /**
   * The number of other chats the user had to join in order to be eligible for the giveaway
   */
  addChatCount?: number;
  /**
   * The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only
   */
  starCount?: number;
  /**
   * The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only
   */
  subscriptionMonthCount?: number;
  /**
   * Number of undistributed prizes
   */
  unclaimedPrizeCount?: number;
  /**
   * True, if only users who had joined the chats after the giveaway started were eligible to win
   */
  onlyNewMembers?: boolean;
  /**
   * True, if the giveaway was canceled because the payment for it was refunded
   */
  refunded?: true;
  /**
   * Description of additional giveaway prize
   */
  description?: string;
  /**
   * Return the timestamp winners of the giveaway were selected, in milliseconds
   */
  get selectionTimestamp(): number;
  /**
   * Point in time when winners of the giveaway were selected
   */
  get selectionAt(): Date;
  /**
   * Checks if this giveaway winners object is equal to another giveaway winners object.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of GiveawayWinners and are equal based on key properties, otherwise false.
   */
  equals(other: GiveawayWinners): boolean;
  /**
   * Makes the class iterable, returning each `User` object.
   */
  [Symbol.iterator](): IterableIterator<User>;
}

export declare class AffiliateInfo {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the affiliate that received a commission via this transaction.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").AffiliateInfo,
  );
  /** The bot or the user that received an affiliate commission if it was received by a bot or a user */
  user?: User;
  /** The chat that received an affiliate commission if it was received by a chat */
  chat?: Chat;
  /** The number of Telegram Stars received by the affiliate for each 1000 Telegram Stars received by the bot from referred users */
  commissionRate: number;
  /** Integer amount of Telegram Stars received by the affiliate from the transaction, rounded to 0; can be negative for refunds */
  amount: number;
  /** The number of 1/1000000000 shares of Telegram Stars received by the affiliate; can be negative for refunds */
  nanostarAmount?: number;
}

export declare class Invoice extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains basic information about an invoice
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Invoice,
  );
  /** Product name */
  title: string;
  /** Product description */
  description: string;
  /** Unique bot deep-linking parameter that can be used to generate this invoice */
  startParameter: string;
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  totalAmount: number;
  /**
   * Use this method to create a link for an invoice.
   * @param payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes
   * @param prices - Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
   * @param options - out parameters
   * @returns Returns the created invoice link as String on success.
   */
  create(
    payload: string,
    prices: LabeledPrice[],
    options?: Omit<
      {
        title: string;
        description: string;
        payload: string;
        providerToken?: string;
        currency: string;
        prices: LabeledPrice[];
        maxTipAmount?: number;
        suggestedTipAmounts?: number[];
        providerData?: string;
        photoUrl?: string;
        photoSize?: number;
        photoWidth?: number;
        photoHeight?: number;
        needName?: boolean;
        needPhoneNumber?: boolean;
        needEmail?: boolean;
        needShippingAddress?: boolean;
        sendPhoneNumberToProvider?: boolean;
        sendEmailToProvider?: boolean;
        isFlexible?: boolean;
      },
      | "currency"
      | "description"
      | "title"
      | "payload"
      | "prices"
      | "maxTipAmount"
    >,
  ): Promise<string>;
}

export declare class PaidMedia extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes paid media
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PaidMedia,
  );
  /**
   * @param data - Data about the describes paid media
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").PaidMedia,
  ): import("@telegram.ts/types").PaidMedia;
  /**
   * Media width as defined by the sender
   */
  width?: number;
  /**
   * Media height as defined by the sender
   */
  height?: number;
  /**
   * Duration of the media in seconds as defined by the sender
   */
  duration?: number;
  /**
   * The photo
   */
  photo?: Photo[];
  /**
   * The video
   */
  video?: Video;

  isPreview(): this is this & {
    video?: undefined;
    photo?: undefined;
  };

  isPhoto(): this is this & {
    photo: Photo[];
  };

  isVideo(): this is this & {
    video: Video;
  };
}

export declare class PaidMediaInfo {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes the paid media added to a message
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PaidMediaInfo,
  );
  /** The number of Telegram Stars that must be paid to buy access to the media */
  starCount: number;
  /** Information about the paid media */
  media: PaidMedia[];
  /** Makes the class iterable, returning each `PaidMedia` object. */
  [Symbol.iterator](): IterableIterator<PaidMedia>;
}

export declare class Poll extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains information about a poll
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Poll,
  );
  /** Unique poll identifier */
  id: string;
  /** Poll question, 1-300 characters */
  question: string;
  /** Total number of users that voted in the poll */
  totalVoterCount: number;
  /** True, if the poll is closed */
  closed: boolean;
  /** True, if the poll is anonymous */
  anonymous: boolean;
  /** Poll type, currently can be “regular” or “quiz” */
  type: "quiz" | "regular";
  /** True, if the poll allows multiple answers */
  allowAnswers: boolean;
  /**
   * @param data - Data about the contains information about a poll
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").Poll,
  ): import("@telegram.ts/types").Poll;
  /**
   * Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions
   */
  questionEntities?: MessageEntities;
  /**
   * List of poll options
   */
  options?: {
    /**
     * - Option text, 1-100 characters
     */
    text: string;
    /**
     * - Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts
     */
    entities: MessageEntities;
    /**
     * - Number of users that voted for this option
     */
    voterCount: number;
  }[];
  /**
   * 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot
   */
  correctId?: number;
  /**
   * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters
   */
  explanation?: string;
  /**
   * Special entities like usernames, URLs, bot commands, etc. that appear in the explanation
   */
  explanationEntities?: MessageEntities;
  /**
   * Amount of time in seconds the poll will be active after creation
   */
  openPeriod?: number;
  /**
   * Point in time (Unix timestamp) when the poll will be automatically closed
   */
  closeUnixTime?: number;
  /**
   * Return the timestamp poll will be automatically closed, in milliseconds
   */
  get closeTimestamp(): number | null;
  /**
   * Point in time when the poll will be automatically closed
   */
  get closedAt(): Date | null;
  /**
   * Use this method to stop a poll which was sent by the bot. ONLY BOT POLL
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
   * @param messageId -Identifier of the original message with the poll.
   * @param options - options for stopping poll
   * @return On success, the stopped Poll is returned
   */
  close(
    chatId: number | string,
    messageId: number | string,
    options?: {
      /** Unique identifier of the business connection on behalf of which the message to be edited was sent. */
      businessConnectionId?: string;
      /** An object for a new message inline keyboard. */
      replyMarkup?: InlineKeyboardMarkup;
    },
  ): Promise<Omit<Poll, "close">>;
}

export declare class Venue extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a venue
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Venue,
  );
  /** Venue location. Can't be a live location */
  location: Location;
  /** Name of the venue */
  title: string;
  /** Address of the venue */
  address: string;
  /** Foursquare identifier of the venue */
  foursquareId?: string;
  /** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  foursquareType?: string;
  /** Google Places identifier of the venue */
  googlePlaceId?: string;
  /** Google Places type of the venue. (See supported types.) */
  googlePlaceType?: string;
}

export declare class ExternalReplyInfo extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains information about a message that is being replied to, which may come from another chat or forum topic
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ExternalReplyInfo,
  );
  /** Origin of the message replied to by the given message */
  origin: MessageOrigin;
  /**
   * @param data - Data about the contains information about a message that is being replied to, which may come from another chat or forum topic
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").ExternalReplyInfo,
  ): import("@telegram.ts/types").ExternalReplyInfo;
  /**
   * Chat the original message belongs to. Available only if the chat is a supergroup or a channel
   */
  chat?: Chat;
  /**
   * Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel
   */
  messageId?: string;
  /**
   * Options used for link preview generation for the original message, if it is a text message
   */
  linkPreviewOpts?: LinkPreviewOptions;
  /**
   * Message is an animation, information about the animation
   */
  animation?: Animation;
  /**
   * Message is an audio file, information about the file
   */
  audio?: Audio;
  /**
   * Message is a general file, information about the file
   */
  document?: Document;
  /**
   * Message is a photo, available sizes of the photo
   */
  photo?: Photo[];
  /**
   * Message is a sticker, information about the sticker
   */
  sticker?: Sticker;
  /**
   * Message is a forwarded story
   */
  story?: Story;
  /**
   * Message is a video, information about the video
   */
  video?: Video;
  /**
   * Message is a video note, information about the video message
   */
  videoNote?: VideoNote;
  /**
   * Message is a voice message, information about the file
   */
  voice?: Voice;
  /**
   * True, if the message media is covered by a spoiler animation
   */
  mediaSpoiler?: true;
  /**
   * Message is a shared contact, information about the contact
   */
  contact?: Contact;
  /**
   * Message is a dice with random value
   */
  dice?: Dice;
  /**
   * Message is a game, information about the game. More about games
   */
  game?: Game;
  /**
   * Message is a scheduled giveaway, information about the giveaway
   */
  giveaway?: Giveaway;
  /**
   * A giveaway with public winners was completed
   */
  giveawayWinners?: GiveawayWinners;
  /**
   * Message is an invoice for a payment, information about the invoice. More about payments
   */
  invoice?: Invoice;
  /**
   * Message is a shared location, information about the location
   */
  location?: Location;
  /**
   * Message contains paid media; information about the paid media
   */
  paidMedia?: PaidMediaInfo;
  /**
   * Message is a native poll, information about the poll
   */
  poll?: Poll;
  /**
   * Message is a venue, information about the venue
   */
  venue?: Venue;
}

export declare class TextQuote {
  /**
   * @param client - The client that instantiated this.
   * @param data - Data about the contains information about the quoted part of a message that is replied to by the given message
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").TextQuote,
  );
  /** Text of the quoted part of a message that is replied to by the given message */
  text: string;
  /** Special entities that appear in the quote. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are kept in quotes. */
  entities?: MessageEntities;
  /** Approximate quote position in the original message in UTF-16 code units as specified by the sender */
  position: number;
  /** True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server. */
  manual?: true;
}

export declare class Forum extends Base {
  /**
   * @param client - The client that instantiated this
   * @param threadId - Unique identifier of the forum topic
   * @param chatId - Unique identifier for this chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    threadId: number | string,
    chatId: number | string,
  );
  /** Unique identifier of the forum topic */
  threadId: string;
  /** Unique identifier for this chat */
  chatId: string;
  /**
   * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic.
   * @param options - Options for edited forum topic.
   * @returns Returns True on success.
   */
  edit(options?: {
    /** New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept */
    name?: string;
    /** New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept */
    customEmojiId?: string;
  }): Promise<true>;
  /**
   * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @returns Returns True on success.
   */
  close(): Promise<true>;
  /**
   * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @returns Returns True on success.
   */
  reopen(): Promise<true>;
  /**
   * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights.
   * @returns Returns True on success.
   */
  delete(): Promise<true>;
  /**
   * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @returns Returns True on success.
   */
  unpinAllMessages(): Promise<true>;
}

export declare class OrderInfo {
  /**
   * @param data - Data about the represents information about an order
   */
  constructor(data: import("@telegram.ts/types").OrderInfo);
  /** User name */
  name?: string;
  /** User's phone number */
  phoneNumber?: string;
  /** User email */
  email?: string;
  /**
   * This object represents a shipping address
   */
  shippingAddress?: {
    /**
     * - Two-letter ISO 3166-1 alpha-2 country code
     */
    countryCode: string;
    /**
     * - State, if applicable
     */
    state: string;
    /**
     * - City
     */
    city: string;
    /**
     * - First line for the address
     */
    streetLine1: string;
    /**
     * - Second line for the address
     */
    streetLine2: string;
    /**
     * - Address post code
     */
    postCode: string;
  };
}

export declare class SuccessfulPayment extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains basic information about a successful payment
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").SuccessfulPayment,
  );
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  totalAmount: number;
  /** Bot specified invoice payload */
  payload: string;
  /** Expiration date of the subscription, in Unix time; for recurring payments only */
  subscriptionExpirationUnixTime?: number;
  /** True, if the payment is a recurring payment for a subscription */
  isRecurring: boolean;
  /** True, if the payment is the first payment for a subscription */
  isFirstRecurring: boolean;
  /** Identifier of the shipping option chosen by the user */
  shippingId?: string;
  /** Order information provided by the user */
  orderInfo?: OrderInfo;
  /** Telegram payment identifier */
  telegramPaymentId: string;
  /** Provider payment identifier */
  providedPaymentId: string;
  /**
   * Return the timestamp subscription, in milliseconds
   */
  get subscriptionExpirationTimestamp(): null | number;
  /**
   * Date the subscription
   */
  get editedAt(): null | Date;
  /**
   * Refunds a successful payment in Telegram Stars.
   * @param userId - Identifier of the user whose payment will be refunded
   * @returns Returns True on success.
   */
  refundStarPayment(userId: string | number): Promise<true>;
  /** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  editStarSubscription(options: {
    /** Identifier of the user whose subscription will be edited. */
    userId: number | string;
    /** Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot. */
    isCanceled: boolean;
  }): Promise<true>;
}

export declare class RefundedPayment extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains basic information about a refunded payment
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").RefundedPayment,
  );
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars. Currently, always “XTR” */
  currency: string;
  /** Total refunded price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45, total_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  totalAmount: number;
  /** Bot-specified invoice payload */
  invoicePayload: string;
  /** Telegram payment identifier */
  telegramChargeId: string;
  /** Provider payment identifier */
  providerChargeId?: string;
  /**
   * Refunds a successful payment in Telegram Stars.
   * @param userId - Identifier of the user whose payment will be refunded
   * @returns Returns True on success.
   */
  refundStarPayment(userId: string | number): Promise<true>;
}

export declare class SharedUser extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains information about a user that was shared with the bot using a KeyboardButtonRequestUser button
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").SharedUser,
  );
  /** Identifier of the shared user. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
  userId: string;
  /**
   * @param data - Data about the contains information about a user that was shared with the bot using a KeyboardButtonRequestUser button
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").SharedUser,
  ): import("@telegram.ts/types").SharedUser;
  /**
   * First name of the user, if the name was requested by the bot
   */
  firstName?: string;
  /**
   * Last name of the user, if the name was requested by the bot
   */
  lastName?: string;
  /**
   * Username of the user, if the username was requested by the bot
   */
  username?: string;
  /**
   * Available sizes of the chat photo, if the photo was requested by the bot
   */
  photo?: Photo[];
  /**
   * Fetches this user
   * @param options - options for fetch user
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo?: false },
  ): Promise<User>;
  /**
   * Fetches this user
   * @param options - options for fetch user
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;
  /**
   * Fetches this user
   * @param options - options for fetch user
   */
  fetch(options?: Omit<IFetchOptions, "cache">): Promise<User | ChatFullInfo>;
  /**
   * Use this method to send text messages.
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing and media group options
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  send(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  send(
    text: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        media: ReadonlyArray<
          | InputMediaAudio
          | InputMediaDocument
          | InputMediaPhoto
          | InputMediaVideo
        >;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
      },
      "chatId"
    >,
  ): Promise<
    Array<
      | (Message & {
          audio: Audio;
        })
      | (Message & {
          document: Document;
        })
      | (Message & {
          photo: Photo;
        })
      | (Message & {
          video: Video;
        })
    >
  >;
  send(
    text:
      | string
      | Omit<
          {
            businessConnectionId?: string;
            chatId: number | string;
            messageThreadId?: string | number;
            media: ReadonlyArray<
              | InputMediaAudio
              | InputMediaDocument
              | InputMediaPhoto
              | InputMediaVideo
            >;
            disableNotification?: boolean;
            protectContent?: boolean;
            messageEffectId?: string;
            replyParameters?: ReplyParameters;
          },
          "chatId"
        >,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    | (Message & {
        content: string;
      })
    | Array<
        | (Message & {
            audio: Audio;
          })
        | (Message & {
            document: Document;
          })
        | (Message & {
            photo: Photo;
          })
        | (Message & {
            video: Video;
          })
      >
  >;
  /**
   * Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receive.
   * @param giftId - Identifier of the gift.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  sendGift(
    giftId: string,
    options?: Omit<MethodParameters["sendGift"], "giftId" | "userId">,
  ): Promise<true>;
  /**
   * Gifts a Telegram Premium subscription to the given user.
   * @param monthCount - Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12.
   * @param starCount - Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  giftPremiumSubscription(
    monthCount: 3 | 6 | 12,
    starCount: 1000 | 1500 | 2500,
    options?: Omit<
      MethodParameters["giftPremiumSubscription"],
      "monthCount" | "starCount" | "userId"
    >,
  ): Promise<true>;
  /**
   * Stores a message that can be sent by a user of a Mini App.
   * @param result - An object describing the message to be sent.
   * @param options - out parameters.
   * @returns Returns a PreparedInlineMessage object.
   */
  saveInlineMessage(
    result: InlineQueryResult,
    options?: Omit<
      MethodParameters["savePreparedInlineMessage"],
      "userId" | "result"
    >,
  ): Promise<PreparedInlineMessage>;
  /**
   * Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars.
   * @param telegramPaymentChargeId - Telegram payment identifier for the subscription.
   * @param isCanceled - Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot.
   * @returns Returns True on success.
   */
  setStarSubscription(
    telegramPaymentChargeId: string,
    isCanceled: boolean,
  ): Promise<true>;
  /**
   * Refunds a successful payment in Telegram Stars.
   * @param telegramPaymentId - Telegram payment identifier
   * @returns Returns True on success.
   */
  refundStarPayment(telegramPaymentId: string): Promise<true>;
  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   * @param errors - An array describing the errors
   * @returns Returns True on success.
   */
  setPassportErrors(errors: readonly PassportElementError[]): Promise<true>;
  /**
   * Use this method to get a list of profile pictures for a user.
   * @param offset - Sequential number of the first photo to be returned. By default, all photos are returned
   * @param limit - Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100
   * @returns Returns a UserProfilePhotos object.
   */
  fetchProfilePhotos(
    offset?: number,
    limit?: number,
  ): Promise<UserProfilePhotos>;
  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @param chatId - Unique identifier for the chat or username of the channel (in the format @channelusername).
   * @returns Returns a UserChatBoosts object.
   */
  fetchChatBoosts(chatId: number | string): Promise<UserChatBoosts>;
  /**
   * Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  setEmojiStatus(options?: {
    /** Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status. */
    emojiStatusCustomEmojiId?: string;
    /** Expiration date of the emoji status, if any */
    emojiStatusExpirationDate?: number;
  }): Promise<true>;
  /**
   * Verifies a user on behalf of the organization which is represented by the bot.
   * @param description - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   * @returns Returns True on success.
   */
  verify(description?: string): Promise<true>;
  /**
   * Removes verification from a user who is currently verified on behalf of the organization represented by the bot.
   * @returns Returns True on success.
   */
  removeVerification(): Promise<true>;
  /**
   * Checks if this user is equal to another user.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of User and are equal based on key properties, otherwise false.
   */
  equals(other: SharedUser): boolean;
}

export class StarAmount {
  /**
   * @param data - Data about the describes an amount of Telegram Stars.
   */
  constructor(data: import("@telegram.ts/types").StarAmount);
  /** Integer amount of Telegram Stars, rounded to 0; can be negative */
  amount: number;
  /** The number of 1/1000000000 shares of Telegram Stars; from -999999999 to 999999999; can be negative if and only if amount is non-positive */
  nanostarAmount?: number;
}

export declare class UsersShared {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUsers button
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").UsersShared,
  );
  /** Identifier of the request */
  requestId: number;
  /** Information about users shared with the bot. */
  users: Collection<string, SharedUser>;
  /** Makes the class iterable, returning each `SharedUser` object. */
  [Symbol.iterator](): IterableIterator<SharedUser>;
}

export declare class ChatShared extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatShared,
  );
  /** Identifier of the shared chat. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
  id: number;
  /** Identifier of the request */
  requestId: number;
  /** Title of the chat, if the title was requested by the bot. */
  title?: string;
  /** Username of the chat, if the username was requested by the bot and available. */
  username?: string;
  /** Available sizes of the chat photo, if the photo was requested by the bot */
  photo?: Photo[];
  me(): Promise<ChatMember>;
  /**
   * Fetches this chat
   * @param options - options for fetch chat
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo?: false },
  ): Promise<Chat>;
  /**
   * Fetches this chat
   * @param options - options for fetch chat
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;
  /**
   * Fetches this chat
   * @param options - options for fetch chat
   */
  fetch(options?: Omit<IFetchOptions, "cache">): Promise<Chat | ChatFullInfo>;
  /**
   * Retrieves the permissions of a specific member in the chat.
   * @param member - The member object to check permissions for.
   * @param checkAdmin - A flag to check if the member is an admin or creator.
   * @returns The permissions object of the member or null if not available.
   */
  memberPermissions(
    member: ChatMember | string,
    checkAdmin?: boolean,
  ): Promise<UserPermissions | null>;
  /**
   * @param options - message collector options
   */
  createMessageCollector(
    options?: ICollectorOptions<string, Message>,
  ): MessageCollector;
  /**
   * @param options - message collector options
   */
  awaitMessages(
    options?: ICollectorOptions<string, Message> & {
      errors?: string[];
    },
  ): Promise<import("@telegram.ts/collection").Collection<string, Message>>;
  /**
   * @param options - reaction collector options
   */
  createReactionCollector(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): ReactionCollector;
  /**
   * @param options - reaction collector options
   */
  awaitReactions(
    options?: ICollectorOptions<string, MessageReactionUpdated> & {
      errors?: string[];
    },
  ): Promise<
    import("@telegram.ts/collection").Collection<string, MessageReactionUpdated>
  >;
  /**
   * @param options - inline keyboard collector options
   */
  createMessageComponentCollector(
    options?: ICollectorOptions<string, CallbackQuery>,
  ): InlineKeyboardCollector;
  /**
   * Use this method to send text messages.
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing and media group options
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  send(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  send(
    text: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        media: ReadonlyArray<
          | InputMediaAudio
          | InputMediaDocument
          | InputMediaPhoto
          | InputMediaVideo
        >;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
      },
      "chatId" | "messageThreadId"
    >,
  ): Promise<
    Array<
      | (Message & {
          audio: Audio;
        })
      | (Message & {
          document: Document;
        })
      | (Message & {
          photo: Photo;
        })
      | (Message & {
          video: Video;
        })
    >
  >;
  send(
    text:
      | string
      | Omit<
          {
            businessConnectionId?: string;
            chatId: number | string;
            messageThreadId?: string | number;
            media: ReadonlyArray<
              | InputMediaAudio
              | InputMediaDocument
              | InputMediaPhoto
              | InputMediaVideo
            >;
            disableNotification?: boolean;
            protectContent?: boolean;
            messageEffectId?: string;
            replyParameters?: ReplyParameters;
          },
          "chatId" | "messageThreadId"
        >,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    | (Message & {
        content: string;
      })
    | Array<
        | (Message & {
            audio: Audio;
          })
        | (Message & {
            document: Document;
          })
        | (Message & {
            photo: Photo;
          })
        | (Message & {
            video: Video;
          })
      >
  >;
  /**
   * Verifies a chat on behalf of the organization which is represented by the bot.
   * @param description - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   * @returns Returns True on success.
   */
  verify(description?: string): Promise<true>;
  /**
   * Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success.
   * @returns Returns True on success.
   */
  removeVerification(): Promise<true>;
  /**
   * Use this method for your bot to leave this group, supergroup or channel.
   * @returns Returns True on success.
   */
  leave(): Promise<true>;
  /**
   * Use this method to get a list of administrators in a chat, which aren't bots.
   * @returns Returns an Array of ChatAdministratorRights objects.
   */
  fetchAdmins(): Promise<ChatAdministratorRights[]>;
  /**
   * Use this method to get the number of members in a chat.
   * @returns Returns Int on success.
   */
  membersCount(): Promise<number>;
  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @param userId - Unique identifier of the target user.
   * @returns Returns a UserChatBoosts object.
   */
  fetchUserBoosts(userId: number | string): Promise<UserChatBoosts>;
  /**
   * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages.
   * @param messageIds - A list of 1-100 identifiers of messages in the chat fromChatId to forward. The identifiers must be specified in a strictly increasing order
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  forwardMessages(
    messageIds: (number | string)[],
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        messageIds: (string | number)[];
        disableNotification?: boolean;
        protectContent?: boolean;
      },
      "chatId" | "fromChatId" | "messageIds"
    >,
  ): Promise<number[]>;
  /**
   * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correctOptionId is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages.
   * @param messageIds - A list of 1-100 identifiers of messages in the chat fromChatId to copy. The identifiers must be specified in a strictly increasing order
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  copyMessages(
    messageIds: (number | string)[],
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        messageIds: (string | number)[];
        disableNotification?: boolean;
        protectContent?: boolean;
        removeCaption?: boolean;
      },
      "chatId" | "fromChatId" | "messageIds"
    >,
  ): Promise<number[]>;
  /**
	 * Use this method to delete a message, including service messages, with the following limitations:
	- A message can only be deleted if it was sent less than 48 hours ago.
	- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
	- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
	- Bots can delete outgoing messages in private chats, groups, and supergroups.
	- Bots can delete incoming messages in private chats.
	- Bots granted can_post_messages permissions can delete outgoing messages in channels.
	- If the bot is an administrator of a group, it can delete any message there.
	- If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
	 * @param id - Identifier of the message to delete
	 * @returns Returns True on success.
 */
  deleteMessage(id: number | string): Promise<true>;
  /**
   * Use this method to delete multiple messages simultaneously.
   * @param ids - A list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted
   * @returns Returns True on success.
   */
  deleteMessages(ids: (number | string)[]): Promise<true>;
  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   * @param menuButton - An object for the bot's new menu button. Defaults to MenuButtonDefault
   * @returns Returns True on success.
   */
  setMenuButton(menuButton?: MenuButton): Promise<true>;
  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param messageId - Identifier of a message to pin
   * @param options - Options for pinned message
   * @returns Returns True on success.
   */
  pinMessage(
    messageId: string | number,
    options?: {
      /** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats */
      notification?: boolean;
      /** Unique identifier of the business connection on behalf of which the message will be pinned */
      businessConnectionId?: string;
    },
  ): Promise<true>;
  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param options - Options for unpinned message
   * @returns Returns True on success.
   */
  unpinMessage(options?: {
    /** Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be pinned */
    messageId?: boolean;
    /** Unique identifier of the business connection on behalf of which the message will be pinned */
    businessConnectionId?: string;
  }): Promise<true>;
  /**
   * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @returns Returns True on success.
   */
  unpinAllMessages(): Promise<true>;
  /**
   * Use this method to send photos.
   * @param photo - Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendPhoto(
    photo: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        photo: MediaDataParam;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "photo" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      photo: Photo[];
    }
  >;
  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * @param audio - Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendAudio(
    audio: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        audio: MediaDataParam;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        duration?: number;
        performer?: string;
        title?: string;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "audio" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      audio: Audio;
    }
  >;
  /**
   * Use this method to send paid media to channel chats.
   * @param media - An array describing the media to be sent; up to 10 items
   * @param starCount - The number of Telegram Stars that must be paid to buy access to the media
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendPaidMedia(
    media: MethodParameters["sendPaidMedia"]["media"],
    starCount: number,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        starCount: number;
        media: InputPaidMedia[];
        caption?: string;
        parseMode?: ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "media" | "chatId" | "starCount"
    >,
  ): Promise<
    Message & {
      paidMedia: PaidMediaInfo;
    }
  >;
  /**
   * Use this method to send general files.
   * @param document - File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   */
  sendDocument(
    document: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        document: MediaDataParam;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        disableContentTypeDetection?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "document" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      document: Document;
    }
  >;
  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
   * @param video - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVideo(
    video: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        video: MediaDataParam;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        cover?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        startTimestamp?: number;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        supportsStreaming?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "video" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      video: Video;
    }
  >;
  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
   * @param animation - Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendAnimation(
    animation: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        animation: MediaDataParam;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "animation" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      animation: Animation;
    }
  >;
  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document).
   * @param voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVoice(
    voice: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        voice: MediaDataParam;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        duration?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "voice" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      voice: Voice;
    }
  >;
  /**
   * Use this method to send video messages.
   * @param videoNote - Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendVideoNote(
    videoNote: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        videoNote: MediaDataParam;
        duration?: number;
        length?: number;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "videoNote" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      videoNote: VideoNote;
    }
  >;
  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type.
   * @param media - media
   * @param options - out parameters
   * @returns On success, an array of Messages that were sent is returned.
   */
  sendMediaGroup(
    media: MethodParameters["sendMediaGroup"]["media"],
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        media: ReadonlyArray<
          | InputMediaAudio
          | InputMediaDocument
          | InputMediaPhoto
          | InputMediaVideo
        >;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
      },
      "media" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Array<
      | (Message & {
          audio: Audio;
        })
      | (Message & {
          document: Document;
        })
      | (Message & {
          photo: Photo;
        })
      | (Message & {
          video: Video;
        })
    >
  >;
  /**
   * Use this method to send point on the map.
   * @param latitude - Latitude of the location
   * @param longitude - Longitude of the location
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendLocation(
    latitude: number,
    longitude: number,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        latitude: number;
        longitude: number;
        horizontalAccuracy?: number;
        livePeriod?: number;
        heading?: number;
        proximityAlertRadius?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "chatId" | "messageThreadId" | "latitude" | "longitude"
    >,
  ): Promise<
    Message & {
      location: Location;
    }
  >;
  /**
   * Use this method to send information about a venue.
   * @param latitude - Latitude of the location
   * @param longitude - Longitude of the location
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendVenue(
    latitude: number,
    longitude: number,
    options: Omit<
      MethodParameters["sendVenue"],
      "latitude" | "longitude" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      venue: Venue;
    }
  >;
  /**
   * Use this method to send phone contacts.
   * @param phoneNumber - Contact's phone number
   * @param firstName - Contact's first name
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendContact(
    phoneNumber: string,
    firstName: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        phoneNumber: string;
        firstName: string;
        lastName?: string;
        vcard?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "chatId" | "phoneNumber" | "firstName"
    >,
  ): Promise<
    Message & {
      contact: Contact;
    }
  >;
  /**
   * Use this method to send a native poll.
   * @param question - Poll question, 1-300 characters
   * @param options - A list of 2-10 answer options
   * @param other - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendPoll(
    question: string,
    options: InputPollOption[],
    other?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        question: string;
        questionParseMode?: ParseMode;
        questionEntities?: MessageEntity[];
        options: InputPollOption[];
        isAnonymous?: boolean;
        type?: "quiz" | "regular";
        allowsMultipleAnswers?: boolean;
        correctOptionId?: number;
        explanation?: string;
        explanationParseMode?: import("@telegram.ts/types").ParseMode;
        explanationEntities?: MessageEntity[];
        openPeriod?: number;
        closeDate?: number;
        isClosed?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "options" | "chatId" | "messageThreadId" | "question"
    >,
  ): Promise<
    Message & {
      poll: Poll;
    }
  >;
  /**
   * Use this method to send an animated emoji that will display a random value.
   * @param emoji - Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰".
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendDice(
    emoji: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        emoji?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "emoji" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      dice: Dice;
    }
  >;
  /**
   * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
   * @param action - Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes
   * @returns Returns True on success.
   */
  sendAction(
    action?:
      | "typing"
      | "upload_photo"
      | "record_video"
      | "upload_video"
      | "record_voice"
      | "upload_voice"
      | "upload_document"
      | "choose_sticker"
      | "find_location"
      | "record_video_note"
      | "upload_video_note",
  ): Promise<true>;
  /**
   * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers.
   * @param sticker - Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. Video and animated stickers can't be sent via an HTTP URL
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendSticker(
    sticker: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        sticker: MediaDataParam;
        emoji?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "sticker" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      sticker: Sticker;
    }
  >;
  /**
   * Use this method to send invoices.
   * @param title - Product name, 1-32 characters
   * @param description - Product description, 1-255 characters
   * @param payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes
   * @param currency - Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars
   * @param prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendInvoice(
    title: string,
    description: string,
    payload: string,
    currency: string,
    prices: import("@telegram.ts/types").LabeledPrice[],
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        title: string;
        description: string;
        payload: string;
        providerToken?: string;
        currency: string;
        prices: readonly LabeledPrice[];
        maxTipAmount?: number;
        suggestedTipAmounts?: number[];
        startParameter?: string;
        providerData?: string;
        photoUrl?: string;
        photoSize?: number;
        photoWidth?: number;
        photoHeight?: number;
        needName?: boolean;
        needPhoneNumber?: boolean;
        needEmail?: boolean;
        needShippingAddress?: boolean;
        sendPhoneNumberToProvider?: boolean;
        sendEmailToProvider?: boolean;
        isFlexible?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?: InlineKeyboardMarkup;
      },
      | "currency"
      | "description"
      | "title"
      | "chatId"
      | "messageThreadId"
      | "payload"
      | "prices"
    >,
  ): Promise<
    Message & {
      invoice: Invoice;
    }
  >;
  /**
   * Use this method to send a game.
   * @param gameShortName - Short name of the game, serves as the unique identifier for the game. Set up your games via BotFather.
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendGame(
    gameShortName: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: string | number;
        messageThreadId?: string | number;
        gameShortName: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageThreadId" | "gameShortName"
    >,
  ): Promise<
    Message & {
      game: Game;
    }
  >;
  /**
   * Checks if this chat is equal to another chat.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of ChatShared and are equal based on key properties, otherwise false.
   */
  equals(other: ChatShared): boolean;
}

export declare class PassportFile extends InputFile {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a file uploaded to Telegram Passport. Currently, all Telegram Passport files are in JPEG format when decrypted and do not exceed 10MB
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PassportFile,
  );
  /** Unix time when the file was uploaded */
  createdUnixTime: number;
  /**
   * Return the timestamp file was uploaded, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date when the file was uploaded
   */
  get createdAt(): Date;
}

export declare class EncryptedPassportElement extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes documents or other Telegram Passport elements shared with the bot by the user
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").EncryptedPassportElement,
  );
  /** Element type. Possible values are "personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration", "phone_number", and "email". */
  type:
    | "personal_details"
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "address"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration"
    | "phone_number"
    | "email";
  /** Base64-encoded element hash for use in PassportElementErrorUnspecified. */
  hash: string;
  /**
   * @param data - Data about the describes documents or other Telegram Passport elements shared with the bot by the user
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").EncryptedPassportElement,
  ): import("@telegram.ts/types").EncryptedPassportElement;
  /**
   * Base64-encoded encrypted Telegram Passport element data provided by the user; available only for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials
   */
  data?: string;
  /**
   *  User's verified phone number; available only for type "phone_number"
   */
  phoneNumber?: string;
  /**
   * User's verified email address; available only for type "email"
   */
  email?: string;
  /**
   * Array of encrypted files with documents provided by the user; This array is available only for types "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration". The files can be decrypted and verified using the accompanying EncryptedCredentials
   */
  files?: InputFile[];
  /**
   * Encrypted file with the front side of the document, provided by the user; This file is available only for types "passport", "driver_license", "identity_card", and "internal_passport". It can be decrypted and verified using the accompanying EncryptedCredentials
   */
  frontSide?: PassportFile;
  /**
   * Encrypted file with the reverse side of the document, provided by the user; This file is available only for types "driver_license" and "identity_card". It can be decrypted and verified using the accompanying EncryptedCredentials
   */
  reverseSide?: PassportFile;
  /**
   * Encrypted file with the selfie of the user holding a document, provided by the user. This file is available if requested for types "passport", "driver_license", "identity_card", and "internal_passport". It can be decrypted and verified using the accompanying EncryptedCredentials
   */
  selfie?: PassportFile;
  /**
   * Array of encrypted files with translated versions of documents provided by the user; This array is available only for types "passport", "driver_license", "identity_card", "internal_passport", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", and "temporary_registration".
   * The files can be decrypted and verified using the accompanying EncryptedCredentials
   */
  translation?: PassportFile[];
}

export declare class PassportData extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes the user's Telegram Passport data shared with the bot
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PassportData,
  );
  /** Array containing information about documents and other Telegram Passport elements shared with the bot. */
  data: EncryptedPassportElement[];
  /** Encrypted credentials required to decrypt the data. */
  credentials: {
    data: string;
    hash: string;
    secret: string;
  };
  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   * @param userId - User identifier
   * @param errors - An array describing the errors
   * @returns Returns True on success.
   */
  setDataErrors(
    userId: string | number,
    errors: readonly PassportElementError[],
  ): Promise<true>;
}

export declare class BackgroundFill {
  /**
   * @param data - Data about the describes the way a background is filled based on the selected colors
   */
  constructor(data: import("@telegram.ts/types").BackgroundFill);
  /**
   * The color of the background fill in the RGB24 format
   */
  color?: number;
  /**
   * Top color of the gradient in the RGB24 format
   */
  topColor?: number;
  /**
   * Bottom color of the gradient in the RGB24 format
   */
  bottomColor?: number;
  /**
   * Clockwise rotation angle of the background fill in degrees; 0-359
   */
  rotationAngle?: number;
  /**
   * A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format
   */
  colors?: number[];

  isSolid(): this is this & {
    color: number;
  };

  isGradient(): this is this & {
    topColor: number;
    bottomColor: number;
    rotationAngle: number;
  };

  isFreeformGradient(): this is this & {
    colors: number[];
  };
}

export declare class BackgroundType {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes the type of a background
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").BackgroundType,
  );
  /**
   * The background fill
   */
  fill?: BackgroundFill;
  /**
   * Dimming of the background in dark themes, as a percentage; 0-100
   */
  darkDimming?: number;
  /**
   * Document with the wallpaper
   */
  document?: Document;
  /**
   * True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12
   */
  blurred?: true;
  /**
   * True, if the background moves slightly when the device is tilted
   */
  moving?: true;
  /**
   * Intensity of the pattern when it is shown above the filled background; 0-100
   */
  intensity: number;
  /**
   * True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only
   */
  inverted?: true;
  /**
   * Name of the chat theme, which is usually an emoji
   */
  themeName?: string;

  isFill(): this is this & {
    fill: BackgroundFill;
    darkDimming: number;
  };

  isWallpaper(): this is this & {
    document: Document;
    darkDimming: number;
  };

  isPattern(): this is this & {
    fill: BackgroundFill;
    document: Document;
    intensity: number;
  };
}

export declare class ChatBackground {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a chat background
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatBackground,
  );
  /** Type of the background */
  type: BackgroundType;
}

export declare class ForumTopic extends Forum {
  /**
   * @param client - The client that instantiated this
   * @param threadId - Unique identifier of the forum topic
   * @param chatId - Unique identifier for this chat
   * @param data - Unique identifier for this
   */
  constructor(
    client: TelegramClient | BaseClient,
    threadId: string | number,
    chatId: string | number,
    data:
      | import("@telegram.ts/types").ForumTopic
      | import("@telegram.ts/types").ForumTopicEdited,
  );
  /** Name of the topic */
  name: string | null;
  /** Color of the topic icon in RGB format */
  iconColor: number | null;
  /** Unique identifier of the custom emoji shown as the topic icon */
  iconEmojiId?: string;
}

export declare class GiveawayCompleted {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a service message about the completion of a giveaway without public winners
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").GiveawayCompleted,
  );
  /** Number of winners in the giveaway */
  count: number;
  /** Number of undistributed prizes */
  unclaimedPrizeCount?: number;
  /** Message with the giveaway that was completed, if it wasn't deleted */
  message?: Message;
  /** True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway */
  startedGiveaway?: boolean;
}

export declare class VideoChatScheduled {
  /**
   * @param data - Data about the represents a service message about a video chat scheduled in the chat
   */
  constructor(data: import("@telegram.ts/types").VideoChatScheduled);
  /**
   * Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator
   */
  startedUnixTime: number;
  /**
   * Return the timestamp video chat is supposed to be started by a chat administrator
   */
  get startedTimestamp(): number;
  /**
   * Point in time when the video chat is supposed to be started by a chat administrator
   */
  get startedAt(): Date;
}

export declare class VideoChatParticipantsInvited extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a service message about new members invited to a video chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").VideoChatParticipantsInvited,
  );
  /**
   * New members that were invited to the video chat
   */
  users: Collection<string, User>;
  /**
   * Makes the class iterable, returning each `User` object.
   */
  [Symbol.iterator](): IterableIterator<User>;
}

export declare class Message extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the message
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Message,
  );
  /** Unique message identifier inside this chat. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent */
  id: string;
  /**
   * Date the message was sent in Unix time. It is always a positive number, representing a valid date
   */
  createdUnixTime: number;
  /**
   * Date the message was last edited in Unix time
   */
  editedUnixTime?: number;
  /**
   * @param data - Data about the message
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").Message,
  ): import("@telegram.ts/types").Message;
  /**
   * Unique identifier of a message thread or a forum topic to which the message belongs; for supergroups only
   */
  threadId?: string;
  /**
   * Sender of the message; may be empty for messages sent to channels. For backward compatibility, if the message was sent on behalf of a chat, the field contains a fake sender user in non-channel chats
   */
  author?: User;
  /**
   * Sender of the message when sent on behalf of a chat. For example, the supergroup itself for messages sent by its anonymous administrators or a linked channel for messages automatically forwarded to the channel's discussion group. For backward compatibility, if the message was sent on behalf of a chat, the field *from* contains a fake sender user in non-channel chats.
   */
  chat?: Chat;
  /**
   * Member that were added to the message group or supergroup and information about them
   */
  member?: ChatMember;
  /**
   * For text messages, the actual UTF-8 text of the message
   */
  content?: string;
  /**
   * Caption for the animation, audio, document, photo, video or voice
   */
  caption?: string;
  /**
   * For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
   */
  captionEntities?: MessageEntities;
  /**
   * For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
   */
  entities?: MessageEntities;
  /**
   * If the sender of the message boosted the chat, the number of boosts added by the user
   */
  senderBoostCount?: number;
  /**
   * The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account.
   */
  senderBusinessBot?: User;
  /**
   * Information about the original message for forwarded messages
   */
  forwardOrigin?: MessageOrigin;
  /**
   * True, if the message is a channel post that was automatically forwarded to the connected discussion group
   */
  automaticForward?: boolean;
  /**
   * For replies in the same chat and message thread, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply
   */
  originalMessage?: Message;
  /**
   * Information about the message that is being replied to, which may come from another chat or forum topic
   */
  externalReply?: ExternalReplyInfo;
  /**
   * For replies that quote part of the original message, the quoted part of the message
   */
  quote?: TextQuote;
  /**
   * For replies to a story, the original message
   */
  story?: Story;
  /**
   * Bot through which the message was sent
   */
  viaBot?: User;
  /**
   * True, if the message can't be forwarded
   */
  protectedContent?: true;
  /**
   * True, if the caption must be shown above the message media
   */
  showAboveMedia?: true;
  /**
   * True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message
   */
  authorOffline?: true;
  /**
   * Signature of the post author for messages in channels, or the custom title of an anonymous group administrator
   */
  authorSignature?: string;
  /**
   * Options used for link preview generation for the message, if it is a text message and link preview options were changed
   */
  linkPreviewOpts?: LinkPreviewOptions;
  /**
   * Unique identifier of the message effect added to the message
   */
  effectId?: string;
  /**
   * The number of Telegram Stars that were paid by the sender of the message to send it
   */
  paidStarCount?: number;
  /**
   * Chat that sent the message originally
   */
  senderChat?: Chat;
  /**
   * Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier
   */
  businessId?: string;
  /**
   * If the message is sent to a forum topic
   */
  forum?: Forum;
  /**
   * True, if the message is sent to a forum topic
   */
  inTopic?: boolean;
  /**
   * New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
   */
  newChatMembers?: Collection<string, User>;
  /**
   * A member was removed from the group, information about them (this member may be the bot itself)
   */
  leftChatMember?: User;
  /**
   * A chat title was changed to this value
   */
  newChatTitle?: string;
  /**
   * A chat photo was change to this value
   */
  newChatPhoto?: Photo[];
  /**
   * Service message: the chat photo was deleted
   */
  deleteChatPhoto?: true;
  /**
   * Service message: the group has been created
   */
  groupChatCreated?: true;
  /**
   * Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup
   */
  supergroupChatCreated?: true;
  /**
   * Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel
   */
  channelChatCreated?: true;
  /**
   * Service message: auto-delete timer settings changed in the chat
   */
  autoDelTimerChanged?: {
    /**
     * - New auto-delete time for messages in the chat; in seconds
     */
    autoDelTime: number;
  };
  /**
   * The supergroup has been migrated from a group with the specified identifier
   */
  migrateFromChatId?: string;
  /**
   * Message is a service message about a successful payment, information about the payment. More about payments
   */
  successfulPayment?: SuccessfulPayment;
  /**
   * Message is a service message about a refunded payment, information about the payment. More about payments
   */
  refundedPayment?: RefundedPayment;
  /**
   * Service message: users were shared with the bot
   */
  usersShared?: UsersShared;
  /**
   * Service message: a chat was shared with the bot
   */
  chatShared?: ChatShared;
  /**
   * The domain name of the website on which the user has logged in. More about Telegram Login
   */
  connectedWebsite?: string;
  /**
   * Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess
   */
  writeAccessAllowed?: {
    /**
     * - True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess
     */
    authorRequest?: boolean;
    /**
     * - Name of the Web App, if the access was granted when the Web App was launched from a link
     */
    appName?: string;
    /**
     * - True, if the access was granted when the bot was added to the attachment or side menu
     */
    authorAttachmentMenu?: boolean;
  };
  /**
   * Telegram Passport data
   */
  passport?: PassportData;
  /**
   * Service message. A user in the chat triggered another user's proximity alert while sharing Live Location
   */
  proximityAlertTriggered?: {
    /**
     * - User that triggered the alert
     */
    traveler: User;
    /**
     * - User that set the alert
     */
    watcher: User;
    /**
     * - The distance between the users
     */
    distance: number;
  };
  /**
   * Service message: user boosted the chat
   */
  boostAdded?: {
    /**
     * - Number of boosts added by the user
     */
    count: number;
  };
  /**
   * Service message: chat background set
   */
  chatBackgroundSet?: ChatBackground;
  /**
   * Service message: forum topic created
   */
  forumCreated?: ForumTopic;
  /**
   * Service message: forum topic edited
   */
  forumEdited?: ForumTopic;
  /**
   * Service message: forum topic closed
   */
  forumClosed?: true;
  /**
   * Service message: forum topic reopened
   */
  forumTopicReopened?: true;
  /**
   * Service message: the 'General' forum topic hidden
   */
  generalForumHidden?: true;
  /**
   * Service message: the 'General' forum topic unhidden
   */
  generalForumUnhidden?: true;
  /**
   * Service message: a scheduled giveaway was created
   */
  giveawayCreated?: {
    /**
     * - The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only
     */
    starCount?: number;
  };
  /**
   * The message is a scheduled giveaway message
   */
  giveaway?: Giveaway;
  /**
   * A giveaway with public winners was completed
   */
  giveawayWinners?: GiveawayWinners;
  /**
   * Service message: a giveaway without public winners was completed
   */
  giveawayCompleted?: GiveawayCompleted;
  /**
   * Service message: a regular gift was sent or received
   */
  gift?: GiftInfo;
  /**
   * Service message: a unique gift was sent or received
   */
  uniqueGift?: UniqueGiftInfo;
  /**
   * Service message: the price for paid messages has changed in the chat; The new number of Telegram Stars that must be paid by non-administrator users of the supergroup chat for each sent message
   */
  paidPriceStartCount?: number;
  /**
   * Service message: video chat scheduled
   */
  videoChatScheduled?: VideoChatScheduled;
  /**
   * Service message: video chat started
   */
  videoChatStarted?: true;
  /**
   * Service message: video chat ended
   */
  videoChatEnded?: {
    /**
     * - Video chat duration in seconds
     */
    duration: number;
  };
  /**
   * Service message: new participants invited to a video chat
   */
  videoChatParticiInvited?: VideoChatParticipantsInvited;
  /**
   * Service message: data sent by a Web App
   */
  webApp?: {
    /**
     * - The data. Be aware that a bad client can send arbitrary data in this field
     */
    data: string;
    /**
     * - Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field
     */
    text: string;
  };
  /**
   * Message is a shared location, information about the location
   */
  location?: Location;
  /**
   * Message contains paid media; information about the paid media
   */
  paidMedia?: PaidMediaInfo;
  /**
   * Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set
   */
  animation?: Animation;
  /**
   * Message is an audio file, information about the file
   */
  audio?: Audio;
  /**
   * Message is a general file, information about the file
   */
  document?: Document;
  /**
   * Message is a photo, available sizes of the photo
   */
  photo?: Photo[];
  /**
   * Message is a video, information about the video
   */
  video?: Video;
  /**
   * Message is a video note, information about the video message
   */
  videoNote?: VideoNote;
  /**
   * Message is a voice message, information about the file
   */
  voice?: Voice;
  /**
   * Message is a sticker, information about the sticker
   */
  sticker?: Sticker;
  /**
   * Message is a shared contact, information about the contact
   */
  contact?: Contact;
  /**
   * Message is a native poll, information about the poll
   */
  poll?: Poll;
  /**
   * Message is a venue, information about the venue
   */
  venue?: Venue;
  /**
   * Message is a game, information about the game. More about games
   */
  game?: Game;
  /**
   * Message is a dice with random value
   */
  dice?: Dice;

  /** Checking if the message has been edited */
  isEdited(): this is this & {
    editedUnixTime: number;
    editedTimestamp: number;
    editedAt: Date;
  };
  /**
   * Checking if the message video has been pending.
   * @remarks The check will only be valid on December 1, 2024.
   */
  isPendingVideoMessage(): boolean;
  /**
   * Return the timestamp message was sent, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date the message was sent. It is always a positive number, representing a valid date
   */
  get createdAt(): Date;
  /**
   * Return the timestamp message was last edited, in milliseconds
   */
  get editedTimestamp(): Date | null;
  /**
   * Date the message was last edited
   */
  get editedAt(): Date | null;
  /**
   * @param options - message collector options
   */
  createMessageCollector(
    options?: ICollectorOptions<string, Message>,
  ): MessageCollector;
  /**
   * @param options - message collector options
   */
  awaitMessage(
    options?: ICollectorOptions<string, Message>,
  ): Promise<
    [import("@telegram.ts/collection").Collection<string, Message>, string]
  >;
  /**
   * @param options - message collector options
   */
  awaitMessages(
    options?: ICollectorOptions<string, Message> & {
      errors?: string[];
    },
  ): Promise<import("@telegram.ts/collection").Collection<string, Message>>;
  /**
   * @param options - reaction collector options
   */
  createReactionCollector(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): ReactionCollector;
  /**
   * @param options - reaction collector options
   */
  awaitReaction(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): Promise<
    [
      import("@telegram.ts/collection").Collection<
        string,
        MessageReactionUpdated
      >,
      string,
    ]
  >;
  /**
   * @param options - reaction collector options
   */
  awaitReactions(
    options?: ICollectorOptions<string, MessageReactionUpdated> & {
      errors?: string[];
    },
  ): Promise<
    import("@telegram.ts/collection").Collection<string, MessageReactionUpdated>
  >;
  /**
   * @param options - inline keyboard collector options
   */
  createMessageComponentCollector(
    options?: ICollectorOptions<string, CallbackQuery>,
  ): InlineKeyboardCollector;
  /**
   * Reply to the current message
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  reply(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message.
   * @param reaction - A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots
   * @param isBig - Pass True to set the reaction with a big animation
   * @returns Returns True on success.
   */
  react(
    reaction:
      | string
      | import("@telegram.ts/types").ReactionType
      | import("@telegram.ts/types").ReactionType[]
      | ReactionType
      | ReactionType[],
    isBig?: boolean,
  ): Promise<true>;
  /**
   * Use this method to edit text and game messages.
   * @param text - New text of the message, 1-4096 characters after entities parsing
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  edit(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "text" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        content: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit captions of messages.
   * @param caption - New caption of the message, 0-1024 characters after entities parsing
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editCaption(
    caption?: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "caption" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        caption?: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit animation, audio, document, photo, video messages or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL.
   * @param media - An object for a new media content of the message
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editMedia(
    media: MethodParameters["editMessageMedia"]["media"],
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        media: InputMedia;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "media" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to edit only the reply markup of messages.
   * @param replyMarkup - An object for an inline keyboard
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
   */
  editReplyMarkup(
    replyMarkup: InlineKeyboardMarkup,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "media" | "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
  >;
  /**
   * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  forward(
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        videoStartTimestamp?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageId: string | number;
      },
      "chatId" | "messageThreadId" | "messageId" | "fromChatId"
    >,
  ): Promise<Message>;
  /**
   * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns Returns the message id of the sent message on success.
   */
  copy(
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        videoStartTimestamp?: number;
        messageId: string | number;
        caption?: string;
        parseMode?: ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "chatId" | "messageId" | "fromChatId"
    >,
  ): Promise<number>;
  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param options - options for pinned message
   * @returns Returns True on success.
   */
  pin(options?: {
    /** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats */
    notification?: boolean;
    /** Unique identifier of the business connection on behalf of which the message will be pinned */
    businessConnectionId?: string;
  }): Promise<true>;
  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param businessConnectionId - Unique identifier of the business connection on behalf of which the message will be unpinned
   * @returns Returns True on success.
   */
  unpin(businessConnectionId?: string): Promise<true>;
  /**
	 * Use this method to delete a message, including service messages, with the following limitations:
	- A message can only be deleted if it was sent less than 48 hours ago.
	- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
	- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
	- Bots can delete outgoing messages in private chats, groups, and supergroups.
	- Bots can delete incoming messages in private chats.
	- Bots granted can_post_messages permissions can delete outgoing messages in channels.
	- If the bot is an administrator of a group, it can delete any message there.
	- If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
	 * @returns Returns True on success.
 */
  delete(): Promise<true>;
  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * @param latitude - Latitude of new location
   * @param longitude - Longitude of new location
   * @param options - out parameters
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editLiveLocation(
    latitude: number,
    longitude: number,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string | number;
        latitude: number;
        longitude: number;
        livePeriod?: number;
        horizontalAccuracy?: number;
        heading?: number;
        proximityAlertRadius?: number;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageId" | "latitude" | "longitude"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
        location: Location;
      })
  >;
  /**
   * Use this method to stop updating a live location message before live_period expires.
   * @param options - out parameters
   * @returns On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  stopLiveLocation(
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId?: number | string;
        messageId?: string | number;
        inlineMessageId?: string;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageId"
    >,
  ): Promise<
    | true
    | (Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
        location: Location;
      })
  >;
}

export declare class CallbackQuery extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").CallbackQuery,
  );
  /** Unique identifier for this query */
  id: string;
  /** Sender */
  author: User;
  /** Message sent by the bot with the callback button that originated the query */
  message?: Message;
  /** Identifier of the message sent via the bot in inline mode, that originated the query */
  inlineMessageId?: string;
  /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games */
  chatInstance: string;
  /** Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data */
  data?: string;
  /** Short name of a Game to be returned, serves as the unique identifier for the game */
  gameShortName?: string;
  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen
   * @param text - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   * @param options - out parameters
   * @returns On success, True is returned.
   */
  send(
    text: string,
    options?: Omit<
      {
        callbackQueryId: string;
        text?: string;
        showAlert?: boolean;
        url?: string;
        cacheTime?: number;
      },
      "text" | "callbackQueryId"
    >,
  ): Promise<true>;
  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat as an alert
   * @param text - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   * @param url - URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter
   * @param cacheTime - The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0
   * @returns On success, True is returned.
   */
  showAlert(text: string, url?: string, cacheTime?: number): Promise<true>;
}

/**
 * Collector class for handling inline keyboard callback queries.
 */
export declare class InlineKeyboardCollector extends Collector<
  string,
  CallbackQuery
> {
  readonly client: TelegramClient;
  readonly options: ICollectorOptions<string, CallbackQuery>;
  /**
   * The number of received callback queries.
   */
  received: number;
  /**
   * Creates an instance of InlineKeyboardCollector.
   * @param client - The TelegramClient instance.
   * @param options - The options for the collector.
   */
  constructor(
    client: TelegramClient,
    options?: ICollectorOptions<string, CallbackQuery>,
  );
  /**
   * Collects the callback query.
   * @param callbackQuery - The callback query context.
   * @returns The ID of the callback query or null.
   */
  collect(callbackQuery: CallbackQuery): string | null;
  /**
   * Disposes of the callback query.
   * @param callbackQuery - The callback query context.
   * @returns The ID of the callback query or null.
   */
  dispose(callbackQuery: CallbackQuery): string | null;
  /**
   * Gets the reason for ending the collector.
   * @returns The reason for ending the collector or null.
   */
  get endReason(): string | null;
}

export declare class ChatAdministratorRights {
  /**
   * @param data - Data about the rights of administrator in a chat
   */
  constructor(data: import("@telegram.ts/types").ChatAdministratorRights);
  /** True, if the user's presence in the chat is hidden */
  anonymous: boolean;
  /** Represents the rights of an administrator in a chat */
  permissions: ChatPermissions;
}

export declare class ChatInviteLink extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents an invite link for a chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatInviteLink,
  );
  /**
   * The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with "...".
   */
  link: string;
  /**
   * Creator of the link
   */
  creator: User;
  /**
   * True, if users joining the chat via the link need to be approved by chat administrators
   */
  createsRequest: boolean;
  /**
   * True, if the link is primary
   */
  primary: boolean;
  /**
   * True, if the link is revoked
   */
  revoked: boolean;
  /**
   * Invite link name
   */
  name?: string;
  /**
   * Point in time (Unix timestamp) when the link will expire or has been expired
   */
  expiredUnixTime?: number;
  /**
   * The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
   */
  limit?: number;
  /**
   * Number of pending join requests created using this link
   */
  requestsCount?: number;
  /** The number of seconds the subscription will be active for before the next payment */
  subscriptionPeriod?: number;
  /** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat using the link */
  subscriptionPrice?: number;
  /**
   * Return the timestamp link will expire or has been expired, in milliseconds
   */
  get expiredTimestamp(): number | null;
  /**
   * Point in time when the link will expire or has been expired
   */
  get expiredAt(): Date | null;
}

export declare class Chat extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").Chat & {
      threadId?: string;
      inTopic?: boolean;
    },
  );
  /** Unique identifier for this chat */
  id: string;
  /**
   * @param data - Data about the represents a chat
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").Chat & {
      threadId?: string;
      inTopic?: boolean;
    },
  ): import("@telegram.ts/types").Chat & {
    threadId?: string;
    inTopic?: boolean;
  };
  /**
   * Title, for supergroups, channels and group chats
   */
  title?: string;
  /**
   * Username, for private chats, supergroups and channels if available
   */
  username?: string;
  /**
   * First name of the other party in a private chat
   */
  firstName?: string;
  /**
   * Last name of the other party in a private chat
   */
  lastName?: string;
  /**
   * True, if the supergroup chat is a forum (has topics enabled)
   */
  forum?: boolean;
  /**
   * Unique identifier of the forum topic
   */
  threadId?: string;
  /**
   * True, if the message is sent to a forum topic
   */
  inTopic?: boolean;

  isChannel(): this is this & {
    title: string;
    username?: string;
    firstName?: undefined;
    lastName?: undefined;
    forum?: undefined;
    threadId?: undefined;
    inTopic?: undefined;
  };

  isSupergroup(): this is this & {
    title: string;
    username?: string;
    firstName?: undefined;
    lastName?: undefined;
    forum?: true;
    threadId?: string;
    inTopic?: boolean;
  };

  isGroup(): this is this & {
    title: string;
    username?: undefined;
    firstName?: undefined;
    lastName?: undefined;
    forum?: undefined;
    threadId?: undefined;
    inTopic?: undefined;
  };

  isPrivate(): this is this & {
    title?: undefined;
    username?: string;
    firstName: string;
    lastName?: string;
    forum?: undefined;
    threadId?: undefined;
    inTopic?: undefined;
  };

  me(): Promise<ChatMember>;
  /**
   * Fetches this chat
   * @param options - options for fetch chat
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo?: false },
  ): Promise<Chat>;
  /**
   * Fetches this chat
   * @param options - options for fetch chat
   */
  fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;
  /**
   * Fetches this chat
   * @param options - options for fetch chat
   */
  fetch(options?: Omit<IFetchOptions, "cache">): Promise<Chat | ChatFullInfo>;
  /**
   * Retrieves the permissions of a specific member in the chat.
   * @param member - The member object to check permissions for.
   * @param checkAdmin - A flag to check if the member is an admin or creator.
   * @returns The permissions object of the member or null if not available.
   */
  memberPermissions(
    member: ChatMember | string,
    checkAdmin?: boolean,
  ): Promise<UserPermissions | null>;
  /**
   * @param options - message collector options
   */
  createMessageCollector(
    options?: ICollectorOptions<string, Message>,
  ): MessageCollector;
  /**
   * @param options - message collector options
   */
  awaitMessages(
    options?: ICollectorOptions<string, Message> & {
      errors?: string[];
    },
  ): Promise<import("@telegram.ts/collection").Collection<string, Message>>;
  /**
   * @param options - reaction collector options
   */
  createReactionCollector(
    options?: ICollectorOptions<string, MessageReactionUpdated>,
  ): ReactionCollector;
  /**
   * @param options - reaction collector options
   */
  awaitReactions(
    options?: ICollectorOptions<string, MessageReactionUpdated> & {
      errors?: string[];
    },
  ): Promise<
    import("@telegram.ts/collection").Collection<string, MessageReactionUpdated>
  >;
  /**
   * @param options - inline keyboard collector options
   */
  createMessageComponentCollector(
    options?: ICollectorOptions<string, CallbackQuery>,
  ): InlineKeyboardCollector;
  /**
   * Use this method to send text messages.
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing and media group options
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  send(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  send(
    text: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        media: ReadonlyArray<
          | InputMediaAudio
          | InputMediaDocument
          | InputMediaPhoto
          | InputMediaVideo
        >;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
      },
      "chatId" | "messageThreadId"
    >,
  ): Promise<
    Array<
      | (Message & {
          audio: Audio;
        })
      | (Message & {
          document: Document;
        })
      | (Message & {
          photo: Photo;
        })
      | (Message & {
          video: Video;
        })
    >
  >;
  send(
    text:
      | string
      | Omit<
          {
            businessConnectionId?: string;
            chatId: number | string;
            messageThreadId?: string | number;
            media: ReadonlyArray<
              | InputMediaAudio
              | InputMediaDocument
              | InputMediaPhoto
              | InputMediaVideo
            >;
            disableNotification?: boolean;
            protectContent?: boolean;
            messageEffectId?: string;
            replyParameters?: ReplyParameters;
          },
          "chatId" | "messageThreadId"
        >,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    | (Message & {
        content: string;
      })
    | Array<
        | (Message & {
            audio: Audio;
          })
        | (Message & {
            document: Document;
          })
        | (Message & {
            photo: Photo;
          })
        | (Message & {
            video: Video;
          })
      >
  >;
  /**
   * Verifies a chat on behalf of the organization which is represented by the bot.
   * @param description - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   * @returns Returns True on success.
   */
  verify(description?: string): Promise<true>;
  /**
   * Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success.
   * @returns Returns True on success.
   */
  removeVerification(): Promise<true>;
  /**
   * Use this method to kick a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param userId - Unique identifier of the target user
   * @param options - out parameters
   * @returns Returns True on success.
   */
  kick(
    userId: string | number,
    options?: Omit<
      {
        chatId: number | string;
        userId: string | number;
        untilDate?: number;
        revokeMessages?: boolean;
      },
      "chatId" | "userId"
    >,
  ): Promise<true>;
  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param userId - Unique identifier of the target user
   * @param options - out parameters
   * @returns Returns True on success.
   */
  ban(
    userId: string | number,
    options?: Omit<
      {
        chatId: number | string;
        userId: string | number;
        untilDate?: number;
        revokeMessages?: boolean;
      },
      "chatId" | "userId"
    >,
  ): Promise<true>;
  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
   * @param userId - Unique identifier of the target user
   * @param onlyIfBanned - Do nothing if the user is not banned
   * @returns Returns True on success.
   */
  unban(userId: string | number, onlyIfBanned?: boolean): Promise<true>;
  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
   * @param senderChatId - Unique identifier of the target sender chat
   * @returns Returns True on success.
   */
  banSenderChat(senderChatId: string | number): Promise<true>;
  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights.
   * @param senderChatId - Unique identifier of the target sender chat
   * @returns Returns True on success.
   */
  unbanSenderChat(senderChatId: string | number): Promise<true>;
  /**
   * Use this method for your bot to leave this group, supergroup or channel.
   * @returns Returns True on success.
   */
  leave(): Promise<true>;
  /**
   * Use this method to get a list of administrators in a chat, which aren't bots.
   * @returns Returns an Array of ChatAdministratorRights objects.
   */
  fetchAdmins(): Promise<ChatAdministratorRights[]>;
  /**
   * Use this method to get the number of members in a chat.
   * @returns Returns Int on success.
   */
  membersCount(): Promise<number>;
  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @param userId - Unique identifier of the target user.
   * @returns Returns a UserChatBoosts object.
   */
  fetchUserBoosts(userId: number | string): Promise<UserChatBoosts>;
  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method
   * @param name - Name of the sticker set to be set as the group sticker set.
   * @returns Returns True on success.
   */
  setStickerSet(name: string): Promise<true>;
  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method.
   * @returns Returns True on success.
   */
  deleteStickerSet(): Promise<true>;
  /**
   * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages.
   * @param messageIds - A list of 1-100 identifiers of messages in the chat fromChatId to forward. The identifiers must be specified in a strictly increasing order
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  forwardMessages(
    messageIds: (number | string)[],
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        messageIds: (string | number)[];
        disableNotification?: boolean;
        protectContent?: boolean;
      },
      "chatId" | "fromChatId" | "messageIds"
    >,
  ): Promise<number[]>;
  /**
   * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correctOptionId is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages.
   * @param messageIds - A list of 1-100 identifiers of messages in the chat fromChatId to copy. The identifiers must be specified in a strictly increasing order
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options - out parameters
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  copyMessages(
    messageIds: (number | string)[],
    chatId: number | string,
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        fromChatId: number | string;
        messageIds: (string | number)[];
        disableNotification?: boolean;
        protectContent?: boolean;
        removeCaption?: boolean;
      },
      "chatId" | "fromChatId" | "messageIds"
    >,
  ): Promise<number[]>;
  /**
	 * Use this method to delete a message, including service messages, with the following limitations:
	- A message can only be deleted if it was sent less than 48 hours ago.
	- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
	- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
	- Bots can delete outgoing messages in private chats, groups, and supergroups.
	- Bots can delete incoming messages in private chats.
	- Bots granted can_post_messages permissions can delete outgoing messages in channels.
	- If the bot is an administrator of a group, it can delete any message there.
	- If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
	 * @param id - Identifier of the message to delete
	 * @returns Returns True on success.
 */
  deleteMessage(id: number | string): Promise<true>;
  /**
   * Use this method to delete multiple messages simultaneously.
   * @param ids - A list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted
   * @returns Returns True on success.
   */
  deleteMessages(ids: (number | string)[]): Promise<true>;
  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   * @param menuButton - An object for the bot's new menu button. Defaults to MenuButtonDefault
   * @returns Returns True on success.
   */
  setMenuButton(menuButton?: MenuButton): Promise<true>;
  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param name - Topic name, 1-128 characters
   * @param options - out parameters
   * @returns Returns information about the created topic as a ForumTopic object.
   */
  createForumTopic(
    name: string,
    options?: Omit<
      {
        chatId: number | string;
        name: string;
        iconColor?:
          | 7322096
          | 16766590
          | 13338331
          | 9367192
          | 16749490
          | 16478047;
        iconCustomEmojiId?: string;
      },
      "name" | "chatId"
    >,
  ): Promise<ForumTopic>;
  /**
   * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights.
   * @param name - New topic name, 1-128 characters
   * @returns Returns True on success.
   */
  editGeneralForumTopic(name: string): Promise<true>;
  /**
   * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @returns Returns True on success.
   */
  closeGeneralForumTopic(): Promise<true>;
  /**
   * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden.
   * @returns Returns True on success.
   */
  reopenGeneralForumTopic(): Promise<true>;
  /**
   * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open.
   * @returns Returns True on success.
   */
  hideGeneralForumTopic(): Promise<true>;
  /**
   * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @returns Returns True on success.
   */
  unhideGeneralForumTopic(): Promise<true>;
  /**
   * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @returns Returns True on success.
   */
  unpinAllGeneralForumTopicMessages(): Promise<true>;
  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights.
   * @param perms - An object for new default chat permissions
   * @param useIndependentChatPermissions - Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission
   * @returns Returns True on success.
   */
  setPermissions(
    perms: ChatPermissionFlags,
    useIndependentChatPermissions?: boolean,
  ): Promise<true>;
  /**
   * Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink.
   * @param subscriptionPeriod - The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days)
   * @param subscriptionPrice - The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-2500
   * @param name - Invite link name; 0-32 characters
   * @returns Returns the new invite link as a ChatInviteLink object.
   */
  createSubscriptionInvite(
    subscriptionPeriod: number,
    subscriptionPrice: number,
    name?: string,
  ): Promise<ChatInviteLink>;
  /**
   * Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights.
   * @param inviteLink - The invite link to edit
   * @param name - Invite link name; 0-32 characters
   * @returns Returns the edited invite link as a ChatInviteLink object.
   */
  editSubscriptionInvite(
    inviteLink: string,
    name?: string,
  ): Promise<ChatInviteLink>;
  /**
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink.
   * @param options - out parameters
   * @returns Returns the new invite link as ChatInviteLink object.
   */
  createInvite(
    options?: Omit<
      {
        chatId: number | string;
        name?: string;
        expireDate?: number;
        memberLimit?: number;
        createsJoinRequest?: boolean;
      },
      "chatId"
    >,
  ): Promise<ChatInviteLink>;
  /**
   * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param inviteLink - The invite link to edit
   * @param options - out parameters
   * @returns Returns the edited invite link as a ChatInviteLink object.
   */
  editInvite(
    inviteLink: string,
    options?: Omit<
      {
        chatId: number | string;
        inviteLink: string;
        name?: string;
        expireDate?: number;
        memberLimit?: number;
        createsJoinRequest?: boolean;
      },
      "chatId" | "inviteLink"
    >,
  ): Promise<ChatInviteLink>;
  /**
   * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param inviteLink - The invite link to revoke
   * @returns Returns the revoked invite link as ChatInviteLink object.
   */
  revokeInvite(inviteLink: string): Promise<ChatInviteLink>;
  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param photo - New chat photo, uploaded using multipart/form-data
   * @returns Returns True on success.
   */
  setPhoto(photo: MediaDataParam): Promise<true>;
  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @returns Returns True on success.
   */
  deletePhoto(): Promise<true>;
  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param title - New chat title, 1-128 characters
   * @returns Returns True on success.
   */
  setTitle(title: string): Promise<true>;
  /**
   * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param description - New chat description, 0-255 characters
   * @returns Returns True on success.
   */
  setDescription(description?: string): Promise<true>;
  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param messageId - Identifier of a message to pin
   * @param options - Options for pinned message
   * @returns Returns True on success.
   */
  pinMessage(
    messageId: string | number,
    options?: {
      /** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats */
      notification?: boolean;
      /** Unique identifier of the business connection on behalf of which the message will be pinned */
      businessConnectionId?: string;
    },
  ): Promise<true>;
  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @param options - Options for unpinned message
   * @returns Returns True on success.
   */
  unpinMessage(options?: {
    /** Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be pinned */
    messageId?: boolean;
    /** Unique identifier of the business connection on behalf of which the message will be pinned */
    businessConnectionId?: string;
  }): Promise<true>;
  /**
   * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel.
   * @returns Returns True on success.
   */
  unpinAllMessages(): Promise<true>;
  /**
   * Use this method to send photos.
   * @param photo - Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendPhoto(
    photo: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        photo: MediaDataParam;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "photo" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      photo: Photo[];
    }
  >;
  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * @param audio - Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendAudio(
    audio: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        audio: MediaDataParam;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        duration?: number;
        performer?: string;
        title?: string;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "audio" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      audio: Audio;
    }
  >;
  /**
   * Use this method to send paid media to channel chats.
   * @param media - An array describing the media to be sent; up to 10 items
   * @param starCount - The number of Telegram Stars that must be paid to buy access to the media
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendPaidMedia(
    media: MethodParameters["sendPaidMedia"]["media"],
    starCount: number,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        starCount: number;
        media: InputPaidMedia[];
        caption?: string;
        parseMode?: ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "media" | "chatId" | "starCount"
    >,
  ): Promise<
    Message & {
      paidMedia: PaidMediaInfo;
    }
  >;
  /**
   * Use this method to send general files.
   * @param document - File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   */
  sendDocument(
    document: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        document: MediaDataParam;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        disableContentTypeDetection?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "document" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      document: Document;
    }
  >;
  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document).
   * @param video - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVideo(
    video: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        video: MediaDataParam;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        cover?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        startTimestamp?: number;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        supportsStreaming?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "video" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      video: Video;
    }
  >;
  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
   * @param animation - Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendAnimation(
    animation: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        animation: MediaDataParam;
        duration?: number;
        width?: number;
        height?: number;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        showCaptionAboveMedia?: boolean;
        hasSpoiler?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "animation" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      animation: Animation;
    }
  >;
  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document).
   * @param voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param options - out parameters
   * @returns On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVoice(
    voice: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        voice: MediaDataParam;
        caption?: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        captionEntities?: MessageEntity[];
        duration?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "voice" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      voice: Voice;
    }
  >;
  /**
   * Use this method to send video messages.
   * @param videoNote - Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendVideoNote(
    videoNote: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        videoNote: MediaDataParam;
        duration?: number;
        length?: number;
        thumbnail?:
          | Buffer
          | import("fs").ReadStream
          | import("buffer").Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "videoNote" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      videoNote: VideoNote;
    }
  >;
  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type.
   * @param media - media
   * @param options - out parameters
   * @returns On success, an array of Messages that were sent is returned.
   */
  sendMediaGroup(
    media: MethodParameters["sendMediaGroup"]["media"],
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        media: ReadonlyArray<
          | InputMediaAudio
          | InputMediaDocument
          | InputMediaPhoto
          | InputMediaVideo
        >;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
      },
      "media" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Array<
      | (Message & {
          audio: Audio;
        })
      | (Message & {
          document: Document;
        })
      | (Message & {
          photo: Photo;
        })
      | (Message & {
          video: Video;
        })
    >
  >;
  /**
   * Use this method to send point on the map.
   * @param latitude - Latitude of the location
   * @param longitude - Longitude of the location
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendLocation(
    latitude: number,
    longitude: number,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        latitude: number;
        longitude: number;
        horizontalAccuracy?: number;
        livePeriod?: number;
        heading?: number;
        proximityAlertRadius?: number;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "chatId" | "messageThreadId" | "latitude" | "longitude"
    >,
  ): Promise<
    Message & {
      location: Location;
    }
  >;
  /**
   * Use this method to send information about a venue.
   * @param latitude - Latitude of the location
   * @param longitude - Longitude of the location
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendVenue(
    latitude: number,
    longitude: number,
    options: Omit<
      MethodParameters["sendVenue"],
      "latitude" | "longitude" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      venue: Venue;
    }
  >;
  /**
   * Use this method to send phone contacts.
   * @param phoneNumber - Contact's phone number
   * @param firstName - Contact's first name
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendContact(
    phoneNumber: string,
    firstName: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        phoneNumber: string;
        firstName: string;
        lastName?: string;
        vcard?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "chatId" | "phoneNumber" | "firstName"
    >,
  ): Promise<
    Message & {
      contact: Contact;
    }
  >;
  /**
   * Use this method to send a native poll.
   * @param question - Poll question, 1-300 characters
   * @param options - A list of 2-10 answer options
   * @param other - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendPoll(
    question: string,
    options: InputPollOption[],
    other?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        question: string;
        questionParseMode?: ParseMode;
        questionEntities?: MessageEntity[];
        options: InputPollOption[];
        isAnonymous?: boolean;
        type?: "quiz" | "regular";
        allowsMultipleAnswers?: boolean;
        correctOptionId?: number;
        explanation?: string;
        explanationParseMode?: import("@telegram.ts/types").ParseMode;
        explanationEntities?: MessageEntity[];
        openPeriod?: number;
        closeDate?: number;
        isClosed?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "options" | "chatId" | "messageThreadId" | "question"
    >,
  ): Promise<
    Message & {
      poll: Poll;
    }
  >;
  /**
   * Use this method to send an animated emoji that will display a random value.
   * @param emoji - Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰".
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendDice(
    emoji: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        emoji?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "emoji" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      dice: Dice;
    }
  >;
  /**
   * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
   * @param action - Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes
   * @returns Returns True on success.
   */
  sendAction(
    action?:
      | "typing"
      | "upload_photo"
      | "record_video"
      | "upload_video"
      | "record_voice"
      | "upload_voice"
      | "upload_document"
      | "choose_sticker"
      | "find_location"
      | "record_video_note"
      | "upload_video_note",
  ): Promise<true>;
  /**
   * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers.
   * @param sticker - Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. Video and animated stickers can't be sent via an HTTP URL
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendSticker(
    sticker: MediaDataParam,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        sticker: MediaDataParam;
        emoji?: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "sticker" | "chatId" | "messageThreadId"
    >,
  ): Promise<
    Message & {
      sticker: Sticker;
    }
  >;
  /**
   * Use this method to send invoices.
   * @param title - Product name, 1-32 characters
   * @param description - Product description, 1-255 characters
   * @param payload - Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes
   * @param currency - Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars
   * @param prices - Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendInvoice(
    title: string,
    description: string,
    payload: string,
    currency: string,
    prices: import("@telegram.ts/types").LabeledPrice[],
    options?: Omit<
      {
        chatId: number | string;
        messageThreadId?: string | number;
        title: string;
        description: string;
        payload: string;
        providerToken?: string;
        currency: string;
        prices: readonly LabeledPrice[];
        maxTipAmount?: number;
        suggestedTipAmounts?: number[];
        startParameter?: string;
        providerData?: string;
        photoUrl?: string;
        photoSize?: number;
        photoWidth?: number;
        photoHeight?: number;
        needName?: boolean;
        needPhoneNumber?: boolean;
        needEmail?: boolean;
        needShippingAddress?: boolean;
        sendPhoneNumberToProvider?: boolean;
        sendEmailToProvider?: boolean;
        isFlexible?: boolean;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?: InlineKeyboardMarkup;
      },
      | "currency"
      | "description"
      | "title"
      | "chatId"
      | "messageThreadId"
      | "payload"
      | "prices"
    >,
  ): Promise<
    Message & {
      invoice: Invoice;
    }
  >;
  /**
   * Use this method to send a game.
   * @param gameShortName - Short name of the game, serves as the unique identifier for the game. Set up your games via BotFather.
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  sendGame(
    gameShortName: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: string | number;
        messageThreadId?: string | number;
        gameShortName: string;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?: InlineKeyboardMarkup;
      },
      "chatId" | "messageThreadId" | "gameShortName"
    >,
  ): Promise<
    Message & {
      game: Game;
    }
  >;
}

export declare class ChatMember extends Base {
  /**
   * @param client - The client that instantiated this
   * @param chatId - Identifier of the chat
   * @param data - Data about the contains information about one member of a chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    chatId: string | number,
    data: import("@telegram.ts/types").ChatMember,
  );
  /** Identifier of the chat */
  chatId: string;
  /** The member's status in the chat */
  status:
    | "creator"
    | "administrator"
    | "member"
    | "restricted"
    | "left"
    | "kicked";
  /** Represents the rights of an administrator in a chat */
  permissions: UserPermissions;
  /**
   * @param data - Data about the contains information about one member of a chat
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").ChatMember,
  ): import("@telegram.ts/types").ChatMember;
  /**
   * Information about the user
   */
  user?: User;
  /**
   * True, if the user's presence in the chat is hidden
   */
  anonymous: boolean;
  /**
   * Custom title for this user
   */
  nickName?: string;
  /**
   * True, if the user is a member of the chat at the moment of the request
   */
  isMember?: boolean;
  /**
   * Date when the user's subscription will expire; Unix time
   */
  untilUnixTime?: number;
  /**
   * Return the member id
   */
  get id(): string | null;
  /**
   * Date when the user's subscription will expire, in milliseconds
   */
  get untilTimestamp(): number | null;
  /**
   * Date the user's subscription will expire
   */
  get untilAt(): Date | null;
  /**
   * Fetches this ChatMember
   */
  fetch(): Promise<ChatMember | null>;
  /**
   * Retrieves the permissions of the current member in a specific chat.
   * @param channel - The identifier of the chat channel.
   * @param checkAdmin - A flag to check if the member is an admin or creator.
   * @returns The permissions object of the user in the chat or null if not available.
   */
  permissionsIn(
    channel: ChatMember | string,
    checkAdmin?: boolean,
  ): Promise<UserPermissions | null>;
  /**
   * Use this method to kick a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param options
   * @returns Returns True on success.
   */
  kick(
    options?: Omit<
      {
        chatId: number | string;
        userId: string | number;
        untilDate?: number;
        revokeMessages?: boolean;
      },
      "chatId" | "userId"
    >,
  ): Promise<true>;
  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * @param options
   * @returns Returns True on success.
   */
  ban(
    options?: Omit<
      {
        chatId: number | string;
        userId: string | number;
        untilDate?: number;
        revokeMessages?: boolean;
      },
      "chatId" | "userId"
    >,
  ): Promise<true>;
  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned.
   * @param onlyIfBanned - Do nothing if the user is not banned
   * @returns Returns True on success.
   */
  unban(onlyIfBanned?: boolean): Promise<true>;
  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
   * @param senderChatId - Unique identifier of the target sender chat
   * @returns Returns True on success.
   */
  banSenderChat(senderChatId: string | number): Promise<true>;
  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights.
   * @param senderChatId - Unique identifier of the target sender chat
   * @returns Returns True on success.
   */
  unbanSenderChat(senderChatId: string | number): Promise<true>;
  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
   * @param perms - An object for new user permissions
   * @param options - out parameters
   * @returns Returns True on success.
   */
  restrict(
    perms: ChatPermissionFlags,
    options?: Omit<
      {
        chatId: number | string;
        userId: string | number;
        permissions: ChatPermissionFlags;
        useIndependentChatPermissions?: boolean;
        untilDate?: number;
      },
      "chatId" | "userId" | "permissions"
    >,
  ): Promise<true>;
  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user.
   * @param persm - An object for new user permissions
   * @param isAnonymous - Pass True if the administrator's presence in the chat is hidden
   * @returns Returns True on success.
   */
  promote(persm: ChatPermissionFlags, isAnonymous?: boolean): Promise<true>;
  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot.
   * @param name - New custom title for the administrator; 0-16 characters, emoji are not allowed
   * @returns Returns True on success.
   */
  setNikeName(name: string): Promise<true>;
  /**
   * Checks if this member is equal to another member.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of ChatMember and are equal based on key properties, otherwise false.
   */
  equals(other: ChatMember): boolean;
}

export declare class UserManager extends BaseManager<User, ApiUser> {
  /**
   * @param client - The client instance.
   * @param iterable - Data iterable.
   * @param cacheSize - The maximum size of the cache. Default is unlimited.
   */
  constructor(
    client: TelegramClient | BaseClient,
    iterable: ApiUser[],
    options?: ICachedOptions<User>,
  );
  /**
   * Resolves a user from a ChatMember, Message, or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved User instance or null if not found.
   */
  override resolve(user: ChatMember | Message | string): User | null;
  /**
   * Resolves the user ID from a ChatMember, Message, or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved user ID or null if not found.
   */
  override resolveId(user: ChatMember | Message | string): string | null;
  /**
   * Fetches a user by ID, optionally caching the result.
   * @param user - The ChatMember, Message, or user ID to fetch.
   * @param options - Options for fetching.
   * @returns The fetched User instance.
   */
  fetch(
    user: ChatMember | Message | string,
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo?: false },
  ): Promise<User>;
  /**
   * Fetches a user by ID, optionally caching the result.
   * @param user - The ChatMember, Message, or user ID to fetch.
   * @param options - Options for fetching.
   * @returns The fetched ChatFullInfo instance.
   */
  fetch(
    user: ChatMember | Message | string,
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;
  /**
   * Fetches a user by ID, optionally caching the result.
   * @param user - The ChatMember, Message, or user ID to fetch.
   * @param options - Options for fetching.
   * @returns The fetched User or ChatFullInfo instance.
   */
  fetch(
    user: ChatMember | Message | string,
    options?: IFetchOptions,
  ): Promise<User | ChatFullInfo>;
}

export declare class ChatManager extends BaseManager<Chat, ApiChat> {
  /**
   * @param client - The client instance.
   * @param iterable - Data iterable.
   * @param options - Options for save cached.
   */
  constructor(
    client: TelegramClient | BaseClient,
    iterable: ApiChat[],
    options?: ICachedOptions<Chat>,
  );
  /**
   * Resolves a chat object.
   * @param chat - The chat instance, chat member, message, or ID.
   * @returns - The resolved chat object or null if not found.
   */
  override resolve(chat: Chat | ChatMember | Message | string): Chat | null;
  /**
   * Fetches a chat object from the API.
   * @param chat - The chat instance or ID.
   * @param options - Additional options.
   * @returns The fetched chat object.
   */
  fetch(
    user: Chat | string,
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo?: false },
  ): Promise<Chat>;
  /**
   * Fetches a chat object from the API.
   * @param chat - The chat instance or ID.
   * @param options - Additional options.
   * @returns The fetched ChatFullInfo object.
   */
  fetch(
    user: Chat | string,
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;
  /**
   * Fetches a chat object from the API.
   * @param chat - The chat instance or ID.
   * @param options - Additional options.
   * @returns The fetched chat or full chat info object.
   */
  fetch(
    user: Chat | string,
    options?: IFetchOptions,
  ): Promise<Chat | ChatFullInfo>;
}

export declare class BusinessConnection extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the connection of the bot with a business account
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").BusinessConnection,
  );
  /**
   * Unique identifier of the business connection
   */
  id: string;
  /**
   * Business account user that created the business connection
   */
  user: User;
  /**
   * Identifier of a private chat with the user who created the business connection
   */
  userChatId: string;
  /**
   * Date the connection was established in Unix time
   */
  createdUnixTime: number;
  /**
   * Permissions of the business bot
   */
  permissions?: BusinessPermissions;
  /**
   * True, if the connection is active
   */
  enabled: boolean;
  /**
   * Return the timestamp connection was established, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date the connection was established
   */
  get createdAt(): Date;
  /**
   * Use this method to send text messages.
   * @param text - Text of the message to be sent, 1-4096 characters after entities parsing and media group options
   * @param options - out parameters
   * @returns On success, the sent Message is returned.
   */
  send(
    text: string,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    Message & {
      content: string;
    }
  >;
  send(
    text: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        media: ReadonlyArray<
          | InputMediaAudio
          | InputMediaDocument
          | InputMediaPhoto
          | InputMediaVideo
        >;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
      },
      "chatId"
    >,
  ): Promise<
    Array<
      | (Message & {
          audio: Audio;
        })
      | (Message & {
          document: Document;
        })
      | (Message & {
          photo: Photo;
        })
      | (Message & {
          video: Video;
        })
    >
  >;
  send(
    text:
      | string
      | Omit<
          {
            businessConnectionId?: string;
            chatId: number | string;
            messageThreadId?: string | number;
            media: ReadonlyArray<
              | InputMediaAudio
              | InputMediaDocument
              | InputMediaPhoto
              | InputMediaVideo
            >;
            disableNotification?: boolean;
            protectContent?: boolean;
            messageEffectId?: string;
            replyParameters?: ReplyParameters;
          },
          "chatId"
        >,
    options?: Omit<
      {
        businessConnectionId?: string;
        chatId: number | string;
        messageThreadId?: string | number;
        text: string;
        parseMode?: import("@telegram.ts/types").ParseMode;
        entities?: MessageEntity[];
        linkPreviewOptions?: import("@telegram.ts/types").LinkPreviewOptions;
        disableNotification?: boolean;
        protectContent?: boolean;
        messageEffectId?: string;
        replyParameters?: ReplyParameters;
        replyMarkup?:
          | InlineKeyboardMarkup
          | ReplyKeyboardMarkup
          | ReplyKeyboardRemove
          | ForceReply;
      },
      "text" | "chatId"
    >,
  ): Promise<
    | (Message & {
        content: string;
      })
    | Array<
        | (Message & {
            audio: Audio;
          })
        | (Message & {
            document: Document;
          })
        | (Message & {
            photo: Photo;
          })
        | (Message & {
            video: Video;
          })
      >
  >;
  /**
   * Marks incoming message as read on behalf of a business account. Requires the can_read_messages business bot right.
   * @param messageId - Unique identifier of the message to mark as read.
   * @param chatId - Unique identifier of the chat in which the message was received. The chat must have been active in the last 24 hours.
   * @returns Returns True on success.
   */
  readMessage(
    messageId: string | number,
    chatId?: string | number,
  ): Promise<true>;
  /**
   * Posts a story on behalf of a managed business account. Requires the can_manage_stories business bot right.
   * @param content - Content of the story.
   * @param activePeriod - Period after which the story is moved to the archive, in seconds; must be one of 6 * 3600, 12 * 3600, 86400, or 2 * 86400.
   * @param options - out parameters.
   * @returns Returns Story on success.
   */
  postStory(
    content: InputStoryContent,
    activePeriod: number,
    options?: Omit<
      MethodParameters["postStory"],
      "businessConnectionId" | "content" | "activePeriod"
    >,
  ): Promise<Story>;
  /**
   * Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receive.
   * @param giftId - Identifier of the gift.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  sendGift(
    giftId: string,
    options?: Omit<MethodParameters["sendGift"], "giftId" | "userId">,
  ): Promise<true>;
  /**
   * Gifts a Telegram Premium subscription to the given user.
   * @param monthCount - Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12.
   * @param starCount - Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  giftPremiumSubscription(
    monthCount: 3 | 6 | 12,
    starCount: 1000 | 1500 | 2500,
    options?: Omit<
      MethodParameters["giftPremiumSubscription"],
      "monthCount" | "starCount" | "userId"
    >,
  ): Promise<true>;
  /**
   * Stores a message that can be sent by a user of a Mini App.
   * @param result - An object describing the message to be sent.
   * @param options - out parameters.
   * @returns Returns a PreparedInlineMessage object.
   */
  saveInlineMessage(
    result: InlineQueryResult,
    options?: Omit<
      MethodParameters["savePreparedInlineMessage"],
      "userId" | "result"
    >,
  ): Promise<PreparedInlineMessage>;
  /**
   * Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars.
   * @param telegramPaymentChargeId - Telegram payment identifier for the subscription.
   * @param isCanceled - Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot.
   * @returns Returns True on success.
   */
  setStarSubscription(
    telegramPaymentChargeId: string,
    isCanceled: boolean,
  ): Promise<true>;
  /**
   * Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  setEmojiStatus(options?: {
    /** Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status. */
    emojiStatusCustomEmojiId?: string;
    /** Expiration date of the emoji status, if any */
    emojiStatusExpirationDate?: number;
  }): Promise<true>;
  /**
   * Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success.
   * @param firstName - The new value of the first name for the business account; 1-64 characters.
   * @param lastName - The new value of the last name for the business account; 0-64 characters.
   * @returns Returns True on success.
   */
  setAccountName(firstName: string, lastName?: string): Promise<true>;
  /**
   * Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success.
   * @param username - The new value of the username for the business account; 0-32 characters.
   * @returns Returns True on success.
   */
  setAccountUsername(username?: string): Promise<true>;
  /**
   * Changes the bio of a managed business account. Requires the can_change_bio business bot right.
   * @param bio - The new value of the bio for the business account; 0-140 characters.
   * @returns Returns True on success.
   */
  setAccountBio(bio?: string): Promise<true>;
  /**
   * Changes the profile photo of a managed business account. Requires the can_edit_profile_photo business bot right.
   * @param photo - The new profile photo to set.
   * @param isPublic - Pass True to set the public photo, which will be visible even if the main photo is hidden by the business account's privacy settings. An account can have only one public photo.
   * @returns Returns True on success.
   */
  setAccountProfilePhoto(
    photo: MethodParameters["setBusinessAccountProfilePhoto"]["photo"],
    isPublic?: boolean,
  ): Promise<true>;
  /**
   * Removes the current profile photo of a managed business account. Requires the can_edit_profile_photo business bot right.
   * @param isPublic - Pass True to remove the public photo, which is visible even if the main photo is hidden by the business account's privacy settings. After the main photo is removed, the previous profile photo (if present) becomes the main photo.
   * @returns Returns True on success.
   */
  deleteAccountProfilePhoto(isPublic?: boolean): Promise<true>;
  /**
   * Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the can_change_gift_settings business bot right.
   * @param showGiftButton - Pass True, if a button for sending a gift to the user or by the business account must always be shown in the input field.
   * @param acceptedGiftTypes - Types of gifts accepted by the business account
   *  Returns True on success.
   */
  setAccountGiftSettings(
    showGiftButton: boolean,
    acceptedGiftTypes: MethodParameters["setBusinessAccountGiftSettings"]["acceptedGiftTypes"],
  ): Promise<true>;
  /**
   * Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right.
   * @returns Returns StarAmount on success.
   */
  fetchAccountStarBalance(): Promise<StarAmount>;
  /**
   * Returns the gifts received and owned by a managed business account. Requires the can_view_gifts_and_stars business bot right.
   * @param options - out parameters.
   * @returns Returns OwnedGifts on success.
   */
  fetchAccountGifts(
    options?: Omit<
      MethodParameters["getBusinessAccountGifts"],
      "businessConnectionId"
    >,
  ): Promise<OwnedGifts>;
  /**
   * Converts a given regular gift to Telegram Stars. Requires the can_convert_gifts_to_stars business bot right.
   * @param ownedGiftId - Unique identifier of the regular gift that should be converted to Telegram Stars.
   * @returns Returns True on success.
   */
  convertGiftsToStars(ownedGiftId: string): Promise<true>;
  /**
   * Upgrades a given regular gift to a unique gift. Requires the can_transfer_and_upgrade_gifts business bot right. Additionally requires the can_transfer_stars business bot right if the upgrade is paid.
   * @param ownedGiftId - Unique identifier of the regular gift that should be upgraded to a unique one.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  upgradeGift(
    ownedGiftId: string,
    options?: Omit<
      MethodParameters["upgradeGift"],
      "businessConnectionId" | "ownedGiftId"
    >,
  ): Promise<true>;
  /**
   * Transfers an owned unique gift to another user. Requires the can_transfer_and_upgrade_gifts business bot right. Requires can_transfer_stars business bot right if the transfer is paid.
   * @param options - out parameters.
   * @returns Returns True on success.
   */
  transferGift(
    options: Omit<MethodParameters["transferGift"], "businessConnectionId">,
  ): Promise<true>;
  /**
   * Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right.
   * @param starCount - Number of Telegram Stars to transfer; 1-10000.
   * @returns Returns True on success.
   */
  transferAccountStars(starCount: number): Promise<true>;
  /**
   * Delete messages on behalf of a business account. Requires the can_delete_outgoing_messages business bot right to delete messages sent by the bot itself, or the can_delete_all_messages business bot right to delete any message.
   * @param messageIds - A list of 1-100 identifiers of messages to delete. All messages must be from the same chat. See deleteMessage for limitations on which messages can be deleted.
   * @returns Returns True on success.
   */
  deleteMessages(messageIds: (string | number)[]): Promise<true>;
  /**
   * Verifies a user on behalf of the organization which is represented by the bot.
   * @param description - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   * @returns Returns True on success.
   */
  verify(description?: string): Promise<true>;
  /**
   * Removes verification from a user who is currently verified on behalf of the organization represented by the bot.
   * @returns Returns True on success.
   */
  removeVerification(): Promise<true>;
}

export declare class BusinessMessagesDeleted extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the received when messages are deleted from a connected business account
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").BusinessMessagesDeleted,
  );
  /**
   * Unique identifier of the business connection
   */
  id: string;
  /**
   * Information about a chat in the business account. The bot may not have access to the chat or the corresponding user
   */
  chat: Chat;
  /**
   * The list of identifiers of deleted messages in the chat of the business account
   */
  ids: string[];
  /**
   * Makes the class iterable, returning each messages identifiers
   */
  [Symbol.iterator](): IterableIterator<string>;
}

export declare class ReactionCount {
  /**
   * @param data - Data about the eepresents a reaction added to a message along with the number of times it was added
   */
  constructor(data: import("@telegram.ts/types").ReactionCount);
  /** Number of times the reaction was added */
  totalCount: number;
  /** Type of the reaction */
  type: ReactionType;
}

export declare class MessageReactionCountUpdated extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents reaction changes on a message with anonymous reactions
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").MessageReactionCountUpdated,
  );
  /** Unique message identifier inside the chat */
  id: string;
  /** The chat containing the message */
  chat: Chat;
  /** List of reactions that are present on the message */
  reactions: ReactionCount[];
  /** Date of the change in Unix time */
  createdUnixTime: number;
  /**
   * Return the timestamp change, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date of the change
   */
  get createdAt(): Date;
}

export declare class InlineQuery extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").InlineQuery,
  );
  /** Unique identifier for this query */
  id: string;
  /** Sender */
  author: User;
  /** Text of the query (up to 256 characters) */
  query: string;
  /**  Offset of the results to be returned, can be controlled by the bot */
  offset: string;
  /** Type of the chat from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat */
  type?: "group" | "channel" | "private" | "supergroup" | "sender";
  /** Sender location, only for bots that request user location */
  location?: Location;
  /**
   * Use this method to send answers to an inline query.
   * @param results - An array of results for the inline query
   * @param options - out parameters
   * @returns On success, True is returned.
   */
  answerQuery(
    results: readonly InlineQueryResult[],
    options?: Omit<
      {
        inlineQueryId: string;
        results: readonly InlineQueryResult[];
        cacheTime?: number;
        isPersonal?: boolean;
        nextOffset?: string;
        button?: InlineQueryResultsButton;
      },
      "results" | "inlineQueryId"
    >,
  ): Promise<true>;
}

export declare class ChosenInlineResult extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the Represents a result of an inline query that was chosen by the user and sent to their chat partner
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChosenInlineResult,
  );
  /** The unique identifier for the result that was chosen */
  id: string;
  /** The user that chose the result */
  author: User;
  /** Sender location, only for bots that require user location */
  location?: Location;
  /** The query that was used to obtain the result */
  query: string;
  /** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message */
  inlineMessageId?: string;
}

export declare class ShippingQuery extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains information about an incoming shipping query
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ShippingQuery,
  );
  /** Unique query identifier */
  id: string;
  /** User who sent the query */
  author: User;
  /** Bot specified invoice payload. */
  invoicePayload: string;
  /**
   * User specified shipping address
   */
  shippingAddress: {
    /**
     * - Two-letter ISO 3166-1 alpha-2 country code
     */
    countryCode: string;
    /**
     * - State, if applicable
     */
    state: string;
    /**
     * - City
     */
    city: string;
    /**
     * - First line for the address
     */
    streetLine1: string;
    /**
     * - Second line for the address
     */
    streetLine2: string;
    /**
     * - Address post code
     */
    postCode: string;
  };
  /**
   * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries.
   * @param ok - Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
   * @param options - out parameters
   * @returns On success, True is returned.
   */
  answerQuery(
    ok: boolean,
    options?: Omit<
      {
        shippingQueryId: string;
        ok: boolean;
        shippingOptions?: readonly ShippingOption[];
        errorMessage?: string;
      },
      "ok" | "shippingQueryId"
    >,
  ): Promise<true>;
}

export declare class PreCheckoutQuery extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains information about an incoming pre-checkout query
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PreCheckoutQuery,
  );
  /** Unique query identifier */
  id: string;
  /** User who sent the query */
  author: User;
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies) */
  totalAmount: number;
  /** Bot specified invoice payload */
  invoicePayload: string;
  /** Identifier of the shipping option chosen by the user */
  shippingOptionId?: string;
  /** Order information provided by the user */
  orderInfo?: OrderInfo;
  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries.
   * @param ok - Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems
   * @param errorMessage - Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user
   * @returns On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
   */
  answerQuery(ok: boolean, errorMessage?: string): Promise<true>;
}

export declare class PollAnswer extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents an answer of a user in a non-anonymous poll
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PollAnswer,
  );
  /** Unique poll identifier */
  id: string;
  /** The chat that changed the answer to the poll, if the voter is anonymous */
  voterChat: Chat;
  /** The user that changed the answer to the poll, if the voter isn't anonymous */
  user: User;
  /** 0-based identifiers of chosen answer options. May be empty if the vote was retracted */
  ids: number[];
}

export declare class ChatMemberUpdated extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents changes in the status of a chat member
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatMemberUpdated,
  );
  /** Chat the user belongs to */
  chat: Chat;
  /** Performer of the action, which resulted in the change */
  author: User;
  /** Date the change was done in Unix time */
  createdUnixTime: number;
  /** Previous information about the chat member */
  oldMember: ChatMember;
  /** New information about the chat member */
  newMember: ChatMember;
  /** Chat invite link, which was used by the user to join the chat; for joining by invite link events only */
  inviteLink?: ChatInviteLink;
  /** True, if the user joined the chat after sending a direct join request without using an invite link without using an invite link and being approved by an administrator */
  viaJoinRequest?: boolean;
  /** True, if the user joined the chat via a chat folder invite link */
  viaInviteLink?: boolean;
  /**
   * Return the timestamp change was done, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date the change was done
   */
  get createdAt(): Date;
}

export declare class ChatJoinRequest extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a join request sent to a chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatJoinRequest,
  );
  /** Identifier of a private chat with the user who sent the join request. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user. */
  userChatId: string;
  /**
   * Chat to which the request was sent
   */
  chat: Chat;
  /** User that sent the join request */
  author: User;
  /** Bio of the user */
  bio?: string;
  /** Chat invite link that was used by the user to send the join request */
  inviteLink?: ChatInviteLink;
  /** Date the request was sent in Unix time */
  createdUnixTime: number;
  /**
   * Return the timestamp request was sent, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Date the request was sent
   */
  get createdAt(): Date;
  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
   * @returns Returns True on success.
   */
  approveJoinRequest(): Promise<true>;
  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
   * @returns Returns True on success.
   */
  declineJoinRequest(): Promise<true>;
}

export declare class ChatBoostSource extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the boost source
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatBoostSource,
  );
  /**
   * @param data - Data about the boost source
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").ChatBoostSource,
  ): import("@telegram.ts/types").ChatBoostSource;
  /**
   * User that boosted the chat
   */
  user?: User;
  /**
   * Identifier of a message in the chat with the giveaway; the message could have been deleted already
   */
  giveawayId?: string;
  /**
   * The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only
   */
  starCount?: number;
  /**
   * True, if the giveaway was completed, but there was no user to win the prize
   */
  unclaimed: boolean;

  isGiveaway(): this is this & {
    giveawayId: string;
  };

  isPremiumAndGift(): this is this & {
    user: User;
    giveawayId: string;
  };
}

export declare class ChatBoost {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the boost
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatBoost,
  );
  /** Unique identifier of the boost */
  id: string;
  /** Point in time (Unix timestamp) when the chat was boosted */
  createdUnixTime: number;
  /** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
  expirationedUnixTime: number;
  /** Source of the added boost */
  source: ChatBoostSource;
  /**
   * Returns the timestamp when the chat was created, in milliseconds
   */
  get createdTimestamp(): number;
  /**
   * Point in time when the chat was boosted
   */
  get createdAt(): Date;
  /**
   * Return the timestamp when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged, in milliseconds
   */
  get expirationedTimestamp(): number;
  /**
   * Point in time when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged
   */
  get expirationedAt(): Date;
}

export declare class ChatBoostUpdated extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a boost added to a chat or changed
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatBoostUpdated,
  );
  /** Chat which was boosted */
  chat: Chat;
  /** Information about the chat boost */
  boost: ChatBoost;
}

export declare class ChatBoostRemoved extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a boost removed from a chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatBoostRemoved,
  );
  /** Unique identifier of the boost */
  id: string;
  /** Chat which was boosted */
  chat: Chat;
  /** Source of the removed boost */
  source: ChatBoostSource;
  /** Point in time (Unix timestamp) when the boost was removed */
  removedUnixTime: number;
  /**
   * Return the timestamp boost was removed, in milliseconds
   */
  get removedTimestamp(): number;
  /**
   * Point in time when the boost was removed
   */
  get removedAt(): Date;
}

export interface EventHandlers {
  ready: (telegram: TelegramClient) => PossiblyAsync<void>;
  disconnect: (telegram: TelegramClient) => PossiblyAsync<void>;
  error: (detalis: [number, unknown]) => PossiblyAsync<void>;
  rawUpdate: (raw: Update & { client: TelegramClient }) => PossiblyAsync<void>;
  message: (message: Message) => PossiblyAsync<void>;
  channelPost: (message: Message) => PossiblyAsync<void>;
  businessMessage: (message: Message) => PossiblyAsync<void>;
  businessConnection: (message: BusinessConnection) => PossiblyAsync<void>;
  editedMessage: (newMessage: Message) => PossiblyAsync<void>;
  editedChannelPost: (newMessage: Message) => PossiblyAsync<void>;
  editedBusinessMessage: (newMessage: Message) => PossiblyAsync<void>;
  deletedBusinessMessages: (
    message: BusinessMessagesDeleted,
  ) => PossiblyAsync<void>;
  messageReaction: (message: MessageReactionUpdated) => PossiblyAsync<void>;
  messageReactionCount: (
    message: MessageReactionCountUpdated,
  ) => PossiblyAsync<void>;
  inlineQuery: (inline: InlineQuery) => PossiblyAsync<void>;
  chosenInlineResult: (inlineResult: ChosenInlineResult) => PossiblyAsync<void>;
  callbackQuery: (query: CallbackQuery) => PossiblyAsync<void>;
  shippingQuery: (query: ShippingQuery) => PossiblyAsync<void>;
  preCheckoutQuery: (checkoutQuery: PreCheckoutQuery) => PossiblyAsync<void>;
  poll: (poll: Poll) => PossiblyAsync<void>;
  pollAnswer: (pollAnswer: PollAnswer) => PossiblyAsync<void>;
  myChatMember: (member: ChatMemberUpdated) => PossiblyAsync<void>;
  chatMember: (member: ChatMemberUpdated) => PossiblyAsync<void>;
  chatCreate: (message: Message) => PossiblyAsync<void>;
  chatMemberAdd: (message: Message) => PossiblyAsync<void>;
  chatDelete: (message: Message) => PossiblyAsync<void>;
  chatMemberRemove: (message: Message) => PossiblyAsync<void>;
  chatJoinRequest: (joinRequest: ChatJoinRequest) => PossiblyAsync<void>;
  chatBoost: (boostChat: ChatBoostUpdated) => PossiblyAsync<void>;
  removedChatBoost: (chatBoost: ChatBoostRemoved) => PossiblyAsync<void>;
  purchasedPaidMedia: (paidMedia: PaidMediaPurchased) => PossiblyAsync<void>;
}

export type EventHandlerParameters =
  | (Update & { client: TelegramClient })
  | Message
  | BusinessConnection
  | BusinessMessagesDeleted
  | MessageReactionUpdated
  | MessageReactionCountUpdated
  | InlineQuery
  | ChosenInlineResult
  | CallbackQuery
  | ShippingQuery
  | PreCheckoutQuery
  | Poll
  | PollAnswer
  | ChatMemberUpdated
  | ChatJoinRequest
  | ChatBoostUpdated
  | ChatBoostRemoved
  | PaidMediaPurchased;

export declare class BaseClient extends EventEmitter {
  readonly rest: Rest;
  readonly users: UserManager;
  readonly chats: ChatManager;
  readonly updates: Collection<number, EventHandlerParameters>;
  constructor(authToken: string, options?: ClientOptions);
  /**
   * Adds a typed listener for the specified event.
   * @param event - The event name.
   * @param listener - The listener function.
   * @returns The ManagerEvents instance.
   */
  on<T extends keyof EventHandlers>(event: T, listener: EventHandlers[T]): this;
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
  /**
   * Increments max listeners by one, if they are not zero.
   */
  incrementMaxListeners(): void;
  /**
   * Decrements max listeners by one, if they are not zero.
   */
  decrementMaxListeners(): void;
  /** Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects.
  
	Notes
	1. This method will not work if an outgoing webhook is set up.
	2. In order to avoid getting duplicate updates, recalculate offset after each server response. */
  getUpdates(
    params?: MethodParameters["getUpdates"],
  ): Promise<import("@telegram.ts/types").Update[]>;
  /** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.
  
	If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
  
	Notes
	1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
	2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
	3. Ports currently supported for Webhooks: 443, 80, 88, 8443.
  
	If you're having any trouble setting up webhooks, please check out this amazing guide to webhooks. */
  setWebhook(
    params: MethodParameters["setWebhook"],
  ): Promise<MethodsLibReturnType["setWebhook"]>;
  /** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
  getMe(): Promise<MethodsLibReturnType["getMe"]>;
  /** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
  logOut(): Promise<MethodsLibReturnType["logOut"]>;
  /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
  close(): Promise<MethodsLibReturnType["close"]>;
  /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
  deleteWebhook(
    dropPendingUpdates?: boolean,
  ): Promise<MethodsLibReturnType["deleteWebhook"]>;
  /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
  getWebhookInfo(): Promise<MethodsLibReturnType["getWebhookInfo"]>;
  /** Use this method to send text messages. On success, the sent Message is returned. */
  sendMessage(
    params: MethodParameters["sendMessage"],
  ): Promise<MethodsLibReturnType["sendMessage"]>;
  /** Use this method to send photos. On success, the sent Message is returned. */
  sendPhoto(
    params: MethodParameters["sendPhoto"],
  ): Promise<MethodsLibReturnType["sendPhoto"]>;
  /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
  
	For sending voice messages, use the sendVoice method instead. */
  sendAudio(
    params: MethodParameters["sendAudio"],
  ): Promise<MethodsLibReturnType["sendAudio"]>;
  /** Use this method to send paid media to channel chats. On success, the sent Message is returned. */
  sendPaidMedia(
    params: MethodParameters["sendPaidMedia"],
  ): Promise<MethodsLibReturnType["sendPaidMedia"]>;
  /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
  sendDocument(
    params: MethodParameters["sendDocument"],
  ): Promise<MethodsLibReturnType["sendDocument"]>;
  /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
  sendVideo(
    params: MethodParameters["sendVideo"],
  ): Promise<MethodsLibReturnType["sendVideo"]>;
  /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
  sendAnimation(
    params: MethodParameters["sendAnimation"],
  ): Promise<MethodsLibReturnType["sendAnimation"]>;
  /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
  sendVoice(
    params: MethodParameters["sendVoice"],
  ): Promise<MethodsLibReturnType["sendVoice"]>;
  /** Use this method to send video messages. On success, the sent Message is returned.
	As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
  sendVideoNote(
    params: MethodParameters["sendVideoNote"],
  ): Promise<MethodsLibReturnType["sendVideoNote"]>;
  /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
  sendMediaGroup(
    params: MethodParameters["sendMediaGroup"],
  ): Promise<MethodsLibReturnType["sendMediaGroup"]>;
  /** Use this method to send point on the map. On success, the sent Message is returned. */
  sendLocation(
    params: MethodParameters["sendLocation"],
  ): Promise<MethodsLibReturnType["sendLocation"]>;
  /** Use this method to send information about a venue. On success, the sent Message is returned. */
  sendVenue(
    params: MethodParameters["sendVenue"],
  ): Promise<MethodsLibReturnType["sendVenue"]>;
  /** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
  forwardMessage(
    params: MethodParameters["forwardMessage"],
  ): Promise<MethodsLibReturnType["forwardMessage"]>;
  /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
  forwardMessages(
    params: MethodParameters["forwardMessages"],
  ): Promise<MethodsLibReturnType["forwardMessages"]>;
  /** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
  copyMessage(
    params: MethodParameters["copyMessage"],
  ): Promise<MethodsLibReturnType["copyMessage"]>;
  /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
  copyMessages(
    params: MethodParameters["copyMessages"],
  ): Promise<MethodsLibReturnType["copyMessages"]>;
  /** Use this method to phone contacts. On success, the sent Message is returned. */
  sendContact(
    params: MethodParameters["sendContact"],
  ): Promise<MethodsLibReturnType["sendContact"]>;
  /** Use this method to send a native poll. On success, the sent Message is returned. */
  sendPoll(
    params: MethodParameters["sendPoll"],
  ): Promise<MethodsLibReturnType["sendPoll"]>;
  /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
  sendDice(
    params: MethodParameters["sendDice"],
  ): Promise<MethodsLibReturnType["sendDice"]>;
  /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
  
	Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.
  
	We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
  sendChatAction(
    params: MethodParameters["sendChatAction"],
  ): Promise<MethodsLibReturnType["sendChatAction"]>;
  /** Marks incoming message as read on behalf of a business account. Requires the can_read_messages business bot right. Returns True on success. */
  readBusinessMessage(
    params: MethodParameters["readBusinessMessage"],
  ): Promise<MethodsLibReturnType["readBusinessMessage"]>;
  /** Use this method to change the chosen reactions on a message. Service messages can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success. */
  setMessageReaction(
    params: MethodParameters["setMessageReaction"],
  ): Promise<MethodsLibReturnType["setMessageReaction"]>;
  /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
  getUserProfilePhotos(
    params: MethodParameters["getUserProfilePhotos"],
  ): Promise<MethodsLibReturnType["getUserProfilePhotos"]>;
  /** Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess. Returns True on success. */
  setUserEmojiStatus(
    params: MethodParameters["setUserEmojiStatus"],
  ): Promise<MethodsLibReturnType["setUserEmojiStatus"]>;
  /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
  
	Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
  getFile(fileId: string): Promise<MethodsLibReturnType["getFile"]>;
  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  kickChatMember(
    params: MethodParameters["kickChatMember"],
  ): Promise<MethodsLibReturnType["kickChatMember"]>;
  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  banChatMember(
    params: MethodParameters["banChatMember"],
  ): Promise<MethodsLibReturnType["banChatMember"]>;
  /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
  unbanChatMember(
    params: MethodParameters["unbanChatMember"],
  ): Promise<MethodsLibReturnType["unbanChatMember"]>;
  /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
  restrictChatMember(
    params: Omit<MethodParameters["restrictChatMember"], "permissions"> & {
      permissions: ChatPermissionFlags;
    },
  ): Promise<MethodsLibReturnType["restrictChatMember"]>;
  /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
  promoteChatMember(
    params: Omit<
      MethodParameters["promoteChatMember"],
      keyof ChatPermissionFlags
    > & {
      permissions: ChatPermissionFlags;
    },
  ): Promise<MethodsLibReturnType["promoteChatMember"]>;
  /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
  setChatAdministratorCustomTitle(
    params: MethodParameters["setChatAdministratorCustomTitle"],
  ): Promise<MethodsLibReturnType["setChatAdministratorCustomTitle"]>;
  /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
  banChatSenderChat(
    chatId: number | string,
    senderChatId: number | string,
  ): Promise<MethodsLibReturnType["banChatSenderChat"]>;
  /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
  unbanChatSenderChat(
    chatId: number | string,
    senderChatId: number | string,
  ): Promise<MethodsLibReturnType["unbanChatSenderChat"]>;
  /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
  setChatPermissions(
    params: Omit<MethodParameters["setChatPermissions"], "permissions"> & {
      permissions?: ChatPermissionFlags;
    },
  ): Promise<MethodsLibReturnType["setChatPermissions"]>;
  /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
  
	Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
  exportChatInviteLink(
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["exportChatInviteLink"]>;
  /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
  createChatInviteLink(
    params: MethodParameters["createChatInviteLink"],
  ): Promise<MethodsLibReturnType["createChatInviteLink"]>;
  /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  editChatInviteLink(
    params: MethodParameters["editChatInviteLink"],
  ): Promise<MethodsLibReturnType["editChatInviteLink"]>;
  /** Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink. Returns the new invite link as a ChatInviteLink object. */
  createChatSubscriptionInviteLink(
    params: MethodParameters["createChatSubscriptionInviteLink"],
  ): Promise<MethodsLibReturnType["createChatSubscriptionInviteLink"]>;
  /** Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  editChatSubscriptionInviteLink(
    params: MethodParameters["editChatSubscriptionInviteLink"],
  ): Promise<MethodsLibReturnType["editChatSubscriptionInviteLink"]>;
  /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
  revokeChatInviteLink(
    inviteLink: string,
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["revokeChatInviteLink"]>;
  /** Use this method to approve a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  approveChatJoinRequest(
    userId: number | string,
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["approveChatJoinRequest"]>;
  /** Use this method to decline a chat join get. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  declineChatJoinRequest(
    chatId: number | string,
    userId: number | string,
  ): Promise<MethodsLibReturnType["declineChatJoinRequest"]>;
  /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  setChatPhoto(
    chatId: number | string,
    photo: MediaDataParam,
  ): Promise<MethodsLibReturnType["setChatPhoto"]>;
  /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  deleteChatPhoto(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["deleteChatPhoto"]>;
  /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  setChatTitle(
    chatId: number | string,
    title: string,
  ): Promise<MethodsLibReturnType["setChatTitle"]>;
  /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  setChatDescription(
    chatId: number | string,
    description?: string,
  ): Promise<MethodsLibReturnType["setChatDescription"]>;
  /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  pinChatMessage(
    params: MethodParameters["pinChatMessage"],
  ): Promise<MethodsLibReturnType["pinChatMessage"]>;
  /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  unpinChatMessage(
    params: MethodParameters["unpinChatMessage"],
  ): Promise<MethodsLibReturnType["unpinChatMessage"]>;
  /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  unpinAllChatMessages(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["unpinAllChatMessages"]>;
  /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
  leaveChat(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["leaveChat"]>;
  /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
  getChat(chatId: number | string): Promise<MethodsLibReturnType["getChat"]>;
  /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
  getChatAdministrators(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["getChatAdministrators"]>;
  /** Use this method to get the number of members in a chat. Returns Int on success. */
  getChatMemberCount(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["getChatMemberCount"]>;
  /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
  getUserChatBoosts(
    chatId: number | string,
    userId: number | string,
  ): Promise<MethodsLibReturnType["getUserChatBoosts"]>;
  /** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
  getBusinessConnection(
    businessConnectionId: string,
  ): Promise<MethodsLibReturnType["getBusinessConnection"]>;
  /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
  getChatMember(
    chatId: number | string,
    userId: number | string,
  ): Promise<MethodsLibReturnType["getChatMember"]>;
  /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  setChatStickerSet(
    stickerSetName: string,
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["setChatStickerSet"]>;
  /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  deleteChatStickerSet(
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["deleteChatStickerSet"]>;
  /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
  getForumTopicIconStickers(): Promise<
    MethodsLibReturnType["getForumTopicIconStickers"]
  >;
  /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
  createForumTopic(
    params: MethodParameters["createForumTopic"],
  ): Promise<MethodsLibReturnType["createForumTopic"]>;
  /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  editForumTopic(
    params: MethodParameters["editForumTopic"],
  ): Promise<MethodsLibReturnType["editForumTopic"]>;
  /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  closeForumTopic(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["closeForumTopic"]>;
  /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  reopenForumTopic(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["reopenForumTopic"]>;
  /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
  deleteForumTopic(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["deleteForumTopic"]>;
  /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
  unpinAllForumTopicMessages(
    chatId: number | string,
    messageThreadId: number | string,
  ): Promise<MethodsLibReturnType["unpinAllForumTopicMessages"]>;
  /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
  editGeneralForumTopic(
    chatId: number | string,
    name: string,
  ): Promise<MethodsLibReturnType["editGeneralForumTopic"]>;
  /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  closeGeneralForumTopic(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["closeGeneralForumTopic"]>;
  /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
  reopenGeneralForumTopic(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["reopenGeneralForumTopic"]>;
  /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
  hideGeneralForumTopic(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["hideGeneralForumTopic"]>;
  /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  unhideGeneralForumTopic(
    chatId: string | number,
  ): Promise<MethodsLibReturnType["unhideGeneralForumTopic"]>;
  /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
   */
  unpinAllGeneralForumTopicMessages(
    chatId: string | number,
  ): Promise<MethodsLibReturnType["unpinAllGeneralForumTopicMessages"]>;
  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
   * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
   */
  answerCallbackQuery(
    params: MethodParameters["answerCallbackQuery"],
  ): Promise<MethodsLibReturnType["answerCallbackQuery"]>;
  /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
  setMyCommands(
    params: MethodParameters["setMyCommands"],
  ): Promise<MethodsLibReturnType["setMyCommands"]>;
  /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
  deleteMyCommands(
    scope?: MethodParameters["deleteMyCommands"]["scope"],
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["deleteMyCommands"]>;
  /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
  getMyCommands(
    scope?: MethodParameters["getMyCommands"]["scope"],
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyCommands"]>;
  /** Use this method to change the bot's name. Returns True on success. */
  setMyName(
    name?: string,
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["setMyName"]>;
  /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
  getMyName(
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyName"]>;
  /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
  setMyDescription(
    description?: string,
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["setMyDescription"]>;
  /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
  getMyDescription(
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyDescription"]>;
  /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
  setMyShortDescription(
    shortDescription?: string,
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["setMyShortDescription"]>;
  /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
  getMyShortDescription(
    languageCode?: LanguageCode,
  ): Promise<MethodsLibReturnType["getMyShortDescription"]>;
  /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
  setChatMenuButton(
    chatId?: string | number,
    menuButton?: MethodParameters["setChatMenuButton"]["menuButton"],
  ): Promise<MethodsLibReturnType["setChatMenuButton"]>;
  /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
  getChatMenuButton(
    chatId?: number | string,
  ): Promise<MethodsLibReturnType["getChatMenuButton"]>;
  /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
  setMyDefaultAdministratorRights(
    rights?: ChatPermissionFlags,
    forChannels?: boolean,
  ): Promise<MethodsLibReturnType["setMyDefaultAdministratorRights"]>;
  /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
  getMyDefaultAdministratorRights(
    forChannels?: boolean,
  ): Promise<MethodsLibReturnType["getMyDefaultAdministratorRights"]>;
  /** Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success. */
  setBusinessAccountName(
    params: MethodParameters["setBusinessAccountName"],
  ): Promise<true>;
  /** Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success. */
  setBusinessAccountUsername(
    businessConnectionId: string,
    username?: string,
  ): Promise<MethodsLibReturnType["setBusinessAccountUsername"]>;
  /** Changes the bio of a managed business account. Requires the can_change_bio business bot right. Returns True on success.. */
  setBusinessAccountBio(
    businessConnectionId: string,
    bio?: string,
  ): Promise<MethodsLibReturnType["setBusinessAccountBio"]>;
  /** Changes the profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
  setBusinessAccountProfilePhoto(
    params: MethodParameters["setBusinessAccountProfilePhoto"],
  ): Promise<MethodsLibReturnType["setBusinessAccountProfilePhoto"]>;
  /** Removes the current profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
  removeBusinessAccountProfilePhoto(
    businessConnectionId: string,
    isPublic?: boolean,
  ): Promise<MethodsLibReturnType["removeBusinessAccountProfilePhoto"]>;
  /** Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the can_change_gift_settings business bot right. Returns True on success. */
  setBusinessAccountGiftSettings(
    params: MethodParameters["setBusinessAccountGiftSettings"],
  ): Promise<MethodsLibReturnType["setBusinessAccountGiftSettings"]>;
  /** Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns StarAmount on success. */
  getBusinessAccountStarBalance(
    businessConnectionId: string,
  ): Promise<MethodsLibReturnType["getBusinessAccountStarBalance"]>;
  /** Returns the gifts received and owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns OwnedGifts on success. */
  getBusinessAccountGifts(
    params: MethodParameters["getBusinessAccountGifts"],
  ): Promise<MethodsLibReturnType["getBusinessAccountGifts"]>;
  /** Converts a given regular gift to Telegram Stars. Requires the can_convert_gifts_to_stars business bot right. Returns True on success. */
  convertGiftToStars(
    businessConnectionId: string,
    ownedGiftId: string,
  ): Promise<MethodsLibReturnType["convertGiftToStars"]>;
  /** Upgrades a given regular gift to a unique gift. Requires the can_transfer_and_upgrade_gifts business bot right. Additionally requires the can_transfer_stars business bot right if the upgrade is paid. Returns True on success. */
  upgradeGift(
    params: MethodParameters["upgradeGift"],
  ): Promise<MethodsLibReturnType["upgradeGift"]>;
  /** Transfers an owned unique gift to another user. Requires the can_transfer_and_upgrade_gifts business bot right. Requires can_transfer_stars business bot right if the transfer is paid. Returns True on success.  */
  transferGift(
    params: MethodParameters["transferGift"],
  ): Promise<MethodsLibReturnType["transferGift"]>;
  /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageText(
    params: MethodParameters["editMessageText"],
  ): Promise<MethodsLibReturnType["editMessageText"]>;
  /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageCaption(
    params: MethodParameters["editMessageCaption"],
  ): Promise<MethodsLibReturnType["editMessageCaption"]>;
  /** Use this method to edit animation, audio, document, photo, video messages or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageMedia(
    params: MethodParameters["editMessageMedia"],
  ): Promise<MethodsLibReturnType["editMessageMedia"]>;
  /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  editMessageLiveLocation(
    params: MethodParameters["editMessageLiveLocation"],
  ): Promise<MethodsLibReturnType["editMessageLiveLocation"]>;
  /** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
  stopMessageLiveLocation(
    params: MethodParameters["stopMessageLiveLocation"],
  ): Promise<MethodsLibReturnType["stopMessageLiveLocation"]>;
  /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageReplyMarkup(
    params: MethodParameters["editMessageReplyMarkup"],
  ): Promise<MethodsLibReturnType["editMessageReplyMarkup"]>;
  /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
  stopPoll(
    params: MethodParameters["stopPoll"],
  ): Promise<MethodsLibReturnType["stopPoll"]>;
  /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
  sendSticker(
    params: MethodParameters["sendSticker"],
  ): Promise<MethodsLibReturnType["sendSticker"]>;
  /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
  getStickerSet(name: string): Promise<MethodsLibReturnType["getStickerSet"]>;
  /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
  getCustomEmojiStickers(
    customEmojiIds: string[],
  ): Promise<MethodsLibReturnType["getCustomEmojiStickers"]>;
  /** Use this method to upload a file with a sticker for later use in the createNewStickerSet and addStickerToSet methods (the file can be used multiple times). Returns the uploaded File on success. */
  uploadStickerFile(
    params: MethodParameters["uploadStickerFile"],
  ): Promise<MethodsLibReturnType["uploadStickerFile"]>;
  /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
  createNewStickerSet(
    params: MethodParameters["createNewStickerSet"],
  ): Promise<MethodsLibReturnType["createNewStickerSet"]>;
  /** Use this method to add a new sticker to a set created by the bot. The format of the added sticker must match the format of the other stickers in the set. Emoji sticker sets can have up to 200 stickers. Animated and video sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
  addStickerToSet(
    params: MethodParameters["addStickerToSet"],
  ): Promise<MethodsLibReturnType["addStickerToSet"]>;
  /** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
  replaceStickerInSet(
    params: MethodParameters["replaceStickerInSet"],
  ): Promise<MethodsLibReturnType["replaceStickerInSet"]>;
  /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
  setStickerPositionInSet(
    sticker: string,
    position: number,
  ): Promise<MethodsLibReturnType["setStickerPositionInSet"]>;
  /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
  deleteStickerFromSet(
    sticker: string,
  ): Promise<MethodsLibReturnType["deleteStickerFromSet"]>;
  /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  setStickerEmojiList(
    sticker: string,
    emojiList: string[],
  ): Promise<MethodsLibReturnType["setStickerEmojiList"]>;
  /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  setStickerKeywords(
    sticker: string,
    keywords?: string[],
  ): Promise<MethodsLibReturnType["setStickerKeywords"]>;
  /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
  setStickerMaskPosition(
    sticker: string,
    maskPosition?: MethodParameters["setStickerMaskPosition"]["maskPosition"],
  ): Promise<MethodsLibReturnType["setStickerMaskPosition"]>;
  /** Use this method to set the title of a created sticker set. Returns True on success. */
  setStickerSetTitle(
    name: string,
    title: string,
  ): Promise<MethodsLibReturnType["setStickerSetTitle"]>;
  /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
  setStickerSetThumbnail(
    params: MethodParameters["setStickerSetThumbnail"],
  ): Promise<MethodsLibReturnType["setStickerSetThumbnail"]>;
  /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
  setCustomEmojiStickerSetThumbnail(
    name: string,
    customEmojiId?: string,
  ): Promise<MethodsLibReturnType["setCustomEmojiStickerSetThumbnail"]>;
  /** Posts a story on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
  postStory(
    args: MethodParameters["postStory"],
  ): Promise<MethodsLibReturnType["postStory"]>;
  /** Edits a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
  editStory(
    args: MethodParameters["editStory"],
  ): Promise<MethodsLibReturnType["editStory"]>;
  /** Deletes a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns True on success. */
  deleteStory(
    businessConnectionId: string,
    storyId: number,
  ): Promise<MethodsLibReturnType["deleteStory"]>;
  /** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
  getAvailableGifts(): Promise<MethodsLibReturnType["getAvailableGifts"]>;
  /** Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receive. Returns True on success. */
  sendGift(
    params: MethodParameters["sendGift"],
  ): Promise<MethodsLibReturnType["sendGift"]>;
  /** Gifts a Telegram Premium subscription to the given user. Returns True on success. */
  giftPremiumSubscription(
    args: MethodParameters["giftPremiumSubscription"],
  ): Promise<MethodsLibReturnType["giftPremiumSubscription"]>;
  /** Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right. Returns True on success. */
  transferBusinessAccountStars(
    businessConnectionId: string,
    starCount: number,
  ): Promise<MethodsLibReturnType["transferBusinessAccountStars"]>;
  /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
  deleteStickerSet(
    name: string,
  ): Promise<MethodsLibReturnType["deleteStickerSet"]>;
  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
   * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
   */
  answerInlineQuery(
    params: MethodParameters["answerInlineQuery"],
  ): Promise<MethodsLibReturnType["answerInlineQuery"]>;
  /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
  answerWebAppQuery(
    webAppQueryId: string,
    result: MethodParameters["answerWebAppQuery"]["result"],
  ): Promise<MethodsLibReturnType["answerWebAppQuery"]>;
  /** Stores a message that can be sent by a user of a Mini App. Returns a PreparedInlineMessage object. */
  savePreparedInlineMessage(
    params: MethodParameters["savePreparedInlineMessage"],
  ): Promise<MethodsLibReturnType["savePreparedInlineMessage"]>;
  /** Use this method to send invoices. On success, the sent Message is returned. */
  sendInvoice(
    params: MethodParameters["sendInvoice"],
  ): Promise<MethodsLibReturnType["sendInvoice"]>;
  /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
  createInvoiceLink(
    params: MethodParameters["createInvoiceLink"],
  ): Promise<MethodsLibReturnType["createInvoiceLink"]>;
  /** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns True on success. */
  editUserStarSubscription(
    params: MethodParameters["editUserStarSubscription"],
  ): Promise<MethodsLibReturnType["editUserStarSubscription"]>;
  /**
   * Verifies a user on behalf of the organization which is represented by the bot. Returns True on success.
   * @param userId - Unique identifier of the target user.
   * @param description - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   */
  verifyUser(
    userId: string | number,
    description?: string,
  ): Promise<MethodsLibReturnType["verifyUser"]>;
  /**
   * Verifies a chat on behalf of the organization which is represented by the bot. Returns True on success.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
   * @param description - Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
   */
  verifyChat(
    chatId: string | number,
    description?: string,
  ): Promise<MethodsLibReturnType["verifyChat"]>;
  /**
   * Removes verification from a user who is currently verified on behalf of the organization represented by the bot. Returns True on success.
   * @param userId - Unique identifier of the target user.
   */
  removeUserVerification(
    userId: number | string,
  ): Promise<MethodsLibReturnType["removeUserVerification"]>;
  /**
   * Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success.
   * @param chatId - Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   */
  removeChatVerification(
    chatId: number | string,
  ): Promise<MethodsLibReturnType["removeChatVerification"]>;
  /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
  answerShippingQuery(
    params: MethodParameters["answerShippingQuery"],
  ): Promise<MethodsLibReturnType["answerShippingQuery"]>;
  /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
  answerPreCheckoutQuery(
    params: MethodParameters["answerPreCheckoutQuery"],
  ): Promise<MethodsLibReturnType["answerPreCheckoutQuery"]>;
  /** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
  getStarTransactions(
    offset?: number,
    limit?: number,
  ): Promise<MethodsLibReturnType["getStarTransactions"]>;
  /** Refunds a successful payment in Telegram Stars. Returns True on success */
  refundStarPayment(
    userId: number | string,
    telegramPaymentChargeId: string,
  ): Promise<MethodsLibReturnType["refundStarPayment"]>;
  /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
  
	Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
  setPassportDataErrors(
    userId: number | string,
    errors: MethodParameters["setPassportDataErrors"]["errors"],
  ): Promise<MethodsLibReturnType["setPassportDataErrors"]>;
  /** Use this method to send a game. On success, the sent Message is returned. */
  sendGame(
    params: MethodParameters["sendGame"],
  ): Promise<MethodsLibReturnType["sendGame"]>;
  /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
  setGameScore(
    params: MethodParameters["setGameScore"],
  ): Promise<MethodsLibReturnType["setGameScore"]>;
  /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.
  
	This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
  getGameHighScores(
    params: MethodParameters["getGameHighScores"],
  ): Promise<MethodsLibReturnType["getGameHighScores"]>;
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
  deleteMessage(
    chatId: number | string,
    messageId: number | string,
  ): Promise<MethodsLibReturnType["deleteMessage"]>;
  /** Use this method to delete multiple messages simultaneously. Returns True on success. */
  deleteMessages(
    chatId: number | string,
    messageIds: (number | string)[],
  ): Promise<MethodsLibReturnType["deleteMessages"]>;
  /** Delete messages on behalf of a business account. Requires the can_delete_outgoing_messages business bot right to delete messages sent by the bot itself, or the can_delete_all_messages business bot right to delete any message. Returns True on success. */
  deleteBusinessMessages(
    businessConnectionId: string,
    messageIds: (number | string)[],
  ): Promise<MethodsLibReturnType["deleteBusinessMessages"]>;
}

/**
 * Represents a client for handling Telegram updates using long polling.
 */
export declare class PollingClient {
  readonly client: TelegramClient;
  /**
   * The offset used to keep track of the latest updates.
   */
  offset: number;
  /**
   * Indicates whether the polling client is closed.
   */
  isClosed: boolean;
  /**
   * Creates an instance of PollingClient.
   * @param client - The Telegram client instance.
   * @param offset - The initial offset for polling.
   */
  constructor(client: TelegramClient, offset?: number);
  /**
   * Starts the polling process to receive updates from Telegram.
   * @param options - The polling options.
   */
  startPolling(options?: ILoginOptions["polling"]): Promise<void>;
  /**
   * Polls for new updates from Telegram.
   * @param options - The polling options.
   */
  poll(options: ILoginOptions["polling"]): Promise<void>;
  /**
   * Handles errors that occur during polling or initialization.
   * @param err - The error object.
   */
  private handlerError;
  /**
   * Closes the polling client, stopping further updates.
   * @returns The closed state of the polling client.
   */
  close(): boolean;
}

/**
 * Represents a client for handling Telegram updates using webhooks.
 */
export declare class WebhookClient {
  readonly client: TelegramClient;
  /**
   * The offset used to keep track of the latest updates.
   */
  offset: number;
  /**
   * Indicates whether the webhook client is closed.
   */
  isClosed: boolean;
  /**
   * The HTTP or HTTPS server for handling webhook requests.
   */
  webhookServer: http.Server | https.Server | null;
  /**
   * Filters incoming webhook requests to verify their authenticity.
   * @param request - The incoming request.
   * @param options - The options for filtering the request.
   * @returns Whether the request is valid.
   */
  webhookFilter: (
    request: IncomingMessage & {
      body?: Update;
    },
    options: {
      path: string;
      token: string;
      secretToken?: string;
    },
  ) => boolean;
  /**
   * Creates an instance of WebhookClient.
   * @param client - The Telegram client instance.
   */
  constructor(client: TelegramClient);
  /**
   * Starts the webhook server to receive updates from Telegram.
   * @param path - The path for the webhook endpoint.
   * @param secretToken - The secret token for verifying webhook requests.
   * @param options - The options for the webhook server.
   */
  startWebhook(
    path?: string,
    secretToken?: string,
    options?: {
      tlsOptions?: TlsOptions;
      port?: number;
      host?: string;
      requestCallback?: RequestListener;
    },
  ): Promise<void>;
  /**
   * Creates a callback function for handling webhook requests.
   * @param requestCallback - The callback function to handle requests.
   * @param options - The options for creating the webhook callback.
   * @returns The created callback function.
   */
  createWebhookCallback(
    requestCallback?: RequestListener,
    {
      path,
      secretToken,
    }?: {
      path?: string;
      secretToken?: string;
    },
  ): Promise<
    | RequestListener
    | ((
        request: IncomingMessage & {
          body?: Update;
        },
        response: ServerResponse,
      ) => void)
  >;
  /**
   * Handles errors that occur during webhook processing.
   * @param err - The error object.
   */
  private handlerError;
  /**
   * Closes the webhook server.
   * @returns The closed state of the webhook client.
   */
  close(): boolean;
}

/**
 * Handles incoming updates from the Telegram API and routes them to the appropriate event handlers.
 */
export declare class WorketClient {
  readonly client: TelegramClient;
  /**
   * Creates an instance of WorketClient.
   * @param client - The Telegram client instance.
   */
  constructor(client: TelegramClient);
  /**
   * Processes an incoming update and emits the corresponding event.
   * @param data - The update data received from Telegram.
   */
  processUpdate(
    data: Update,
  ):
    | Message
    | BusinessConnection
    | BusinessMessagesDeleted
    | MessageReactionUpdated
    | MessageReactionCountUpdated
    | InlineQuery
    | ChosenInlineResult
    | CallbackQuery
    | ShippingQuery
    | PreCheckoutQuery
    | Poll
    | PollAnswer
    | ChatMemberUpdated
    | ChatJoinRequest
    | ChatBoostUpdated
    | ChatBoostRemoved
    | PaidMediaPurchased
    | undefined;
  /**
   * Handles new messages, channel posts, or business messages.
   * @param data - The message data.
   */
  onMessage(
    data:
      | Update["message"]
      | Update["channel_post"]
      | Update["business_message"],
  ): Message | undefined;
  /**
   * Handles new business connections.
   * @param data - The business connection data.
   */
  onBusinessConnection(
    data: Update["business_connection"],
  ): BusinessConnection | undefined;
  /**
   * Handles edited messages, channel posts, or business messages.
   * @param data - The edited message data.
   */
  onMessageEdit(
    data:
      | Update["edited_message"]
      | Update["edited_channel_post"]
      | Update["edited_business_message"],
  ): Message | undefined;
  /**
   * Handles deleted business messages.
   * @param data - The deleted business messages data.
   */
  onDeletedBusinessMessages(
    data: Update["deleted_business_messages"],
  ): BusinessMessagesDeleted | undefined;
  /**
   * Handles reactions to messages.
   * @param data - The message reaction data.
   */
  onMessageReaction(
    data: Update["message_reaction"],
  ): MessageReactionUpdated | undefined;
  /**
   * Handles updates to message reaction counts.
   * @param data - The message reaction count data.
   */
  onMessageReactionCount(
    data: Update["message_reaction_count"],
  ): MessageReactionCountUpdated | undefined;
  /**
   * Handles incoming inline queries.
   * @param data - The inline query data.
   */
  onInlineQuery(data: Update["inline_query"]): InlineQuery | undefined;
  /**
   * Handles chosen inline results.
   * @param data - The chosen inline result data.
   */
  onChosenInlineResult(
    data: Update["chosen_inline_result"],
  ): ChosenInlineResult | undefined;
  /**
   * Handles incoming callback queries.
   * @param data - The callback query data.
   */
  onCallbackQuery(data: Update["callback_query"]): CallbackQuery | undefined;
  /**
   * Handles incoming shipping queries.
   * @param data - The shipping query data.
   */
  onShippingQuery(data: Update["shipping_query"]): ShippingQuery | undefined;
  /**
   * Handles pre-checkout queries.
   * @param data - The pre-checkout query data.
   */
  onPreCheckoutQuery(
    data: Update["pre_checkout_query"],
  ): PreCheckoutQuery | undefined;
  /**
   * Handles new polls.
   * @param data - The poll data.
   */
  onPoll(data: Update["poll"]): Poll | undefined;
  /**
   * Handles new poll answers.
   * @param data - The poll answer data.
   */
  onPollAnswer(data: Update["poll_answer"]): PollAnswer | undefined;
  /**
   * Handles updates to the client's chat member status.
   * @param data - The chat member update data.
   */
  onMyChatMember(data: Update["my_chat_member"]): ChatMemberUpdated | undefined;
  /**
   * Handles updates to chat members.
   * @param data - The chat member update data.
   */
  onChatMember(data: Update["chat_member"]): ChatMemberUpdated | undefined;
  /**
   * Handles new chat members being added.
   * @param data - The message data containing new chat members.
   */
  onChatMemberAdd(data: Update["message"]): Message | undefined;
  /**
   * Handles chat members being removed.
   * @param data - The message data containing removed chat members.
   */
  onChatMemberRemove(data: Update["message"]): Message | undefined;
  /**
   * Handles chat join requests.
   * @param data - The chat join request data.
   */
  onChatJoinRequest(
    data: Update["chat_join_request"],
  ): ChatJoinRequest | undefined;
  /**
   * Handles updates to chat boosts.
   * @param data - The chat boost update data.
   */
  onChatBoost(data: Update["chat_boost"]): ChatBoostUpdated | undefined;
  /**
   * Handles removed chat boosts.
   * @param data - The removed chat boost data.
   */
  onRemovedChatBoost(
    data: Update["removed_chat_boost"],
  ): ChatBoostRemoved | undefined;
  /**
   * Handles purchased paid media.
   * @param data - The purchased paid media.
   */
  onPurchasedPaidMedia(
    data: Update["purchased_paid_media"],
  ): PaidMediaPurchased | undefined;
}

export declare class MenuButton {
  /**
   * @param data - Data about the interface describes the bot's menu button in a private chat
   */
  constructor(data: import("@telegram.ts/types").MenuButton);
  /** The text on the button */
  text?: string;
  /** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a t.me link to a Web App can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link */
  webApp?: {
    url: string;
  };

  isDefaultAndCmd(): this is this & {
    text?: undefined;
    webApp?: undefined;
  };

  isWebApp(): this is this & {
    text: string;
    webApp: WebAppInfo;
  };
}

export declare class PreparedInlineMessage {
  /**
   * @param data - Data about the inline message to be sent by a user of a Mini App.
   */
  constructor(data: import("@telegram.ts/types").PreparedInlineMessage);
  /** Unique identifier of the prepared message */
  id: string;
  /** Expiration date of the prepared message, in Unix time. Expired prepared messages can no longer be used */
  expirationUnixTime: number;
  /**
   * Return the timestamp prepared message, in milliseconds
   */
  get expirationTimestamp(): number | null;
  /**
   * Date the prepared message
   */
  get expirationAt(): Date | null;
}

export declare class ClientUser extends User {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a Telegram user or bot that was returned by `getMe`
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").UserFromGetMe,
  );
  /** Indicates if this user is a bot */
  isBot: true;
  /** The bot's or user's username */
  username: string;
  /** Indicates if the bot can be invited to groups */
  canJoinGroups: boolean;
  /** Indicates if privacy mode is disabled for the bot */
  canReadAllMessages: boolean;
  /** Indicates if the bot supports inline queries */
  inlineQueries: boolean;
  /** Indicates if the bot can be connected to a Telegram Business account */
  connectBusiness: boolean;
  /** Indicates if the bot has a main Web App */
  mainWebApp: boolean;
  /**
   * The authentication token for the Telegram bot
   */
  get token(): string;
  /**
   * Fetch about the client/bot
   * @param options - options for fetch client/bot
   */
  override fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo?: false },
  ): Promise<ClientUser>;
  /**
   * Fetch about the client/bot
   * @param options - options for fetch client/bot
   */
  override fetch(
    options?: Omit<IFetchOptions, "cache" | "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;
  /**
   * Fetch about the client/bot
   * @param options - options for fetch client/bot
   */
  override fetch(
    options?: Omit<IFetchOptions, "cache">,
  ): Promise<ClientUser | ChatFullInfo>;
  /**
   * Returns the bot's Telegram Star transactions in chronological order.
   * @param options - out parameters.
   * @returns On success, returns a StarTransactions object.
   */
  fetchStarTransactions(options?: {
    /** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
    limit?: number;
    /** Number of transactions to skip in the response */
    offset?: number;
  }): Promise<StarTransactions>;
  /**
   * Returns the list of gifts that can be sent by the bot to users. Requires no parameters.
   * @returns Returns a Gifts object.
   */
  fetchGifts(): Promise<Gifts>;
  /**
   * Use this method to change the list of the bot's commands. See https://core.telegram.org/bots/features#commands for more details about bot commands.
   * @param commands - A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified
   * @param options - Options for setting commands, including scope and language code
   * @returns Returns True on success.
   */
  setCommands(
    commands: readonly BotCommand[],
    options?: {
      /** A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified */
      cope?: BotCommandScope;
      /** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
      languageCode?: LanguageCode;
    },
  ): Promise<true>;
  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language.
   * @param score - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
   * @param language - A two-letter ISO 639-1 language code or an empty string
   * @returns Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned.
   */
  fetchCommands(
    score?: BotCommandScope,
    language?: LanguageCode,
  ): Promise<BotCommand[]>;
  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users.
   * @param score - An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault
   * @param language - A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
   * @returns Returns True on success.
   */
  deleteCommands(
    score?: BotCommandScope,
    language?: LanguageCode,
  ): Promise<true>;
  /**
   * Use this method to change the bot's name.
   * @param name - New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language
   * @param language - A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name
   * @returns Returns True on success.
   */
  setName(name?: string, language?: LanguageCode): Promise<true>;
  /**
   * Use this method to get the current bot name for the given user language.
   * @param language - A two-letter ISO 639-1 language code or an empty string
   * @returns Returns bot name on success
   */
  fetchName(language?: LanguageCode): Promise<string>;
  /**
   * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty.
   * @param description - New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language
   * @param language - A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description
   * @returns Returns True on success.
   */
  setDescription(description?: string, language?: LanguageCode): Promise<true>;
  /**
   * Use this method to get the current bot description for the given user language.
   * @param language - A two-letter ISO 639-1 language code or an empty string
   * @returns Returns bot description on success.
   */
  fetchDescription(language?: LanguageCode): Promise<string>;
  /**
   * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.
   * @param description - New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language
   * @param language - A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description
   * @returns Returns True on success.
   */
  setShortDescription(
    description?: string,
    language?: LanguageCode,
  ): Promise<true>;
  /**
   * Use this method to get the current bot short description for the given user language.
   * @param language - A two-letter ISO 639-1 language code or an empty string
   * @returns Returns bot short description on success
   */
  fetchShortDescription(language?: LanguageCode): Promise<string>;
  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   * @param chatId - Unique identifier for the target private chat. If not specified, default bot's menu button will be changed
   * @param menu - An object for the bot's new menu button. Defaults to MenuButtonDefault
   * @returns Returns True on success.
   */
  setMenuButton(chatId?: number, menu?: MenuButton): Promise<true>;
  /**
   * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button.
   * @param chatId - Unique identifier for the target private chat. If not specified, default bot's menu button will be returned
   * @returns Returns MenuButton on success.
   */
  fetchMenuButton(chatId?: number): Promise<MenuButton>;
  /**
   * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot.
   * @param rights - An object describing new default administrator rights. If not specified, the default administrator rights will be cleared
   * @param forChannels - Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed
   * @returns Returns True on success.
   */
  setAdministratorRights(
    rights?: ChatPermissionFlags,
    forChannels?: boolean,
  ): Promise<true>;
  /**
   * Use this method to get the current default administrator rights of the bot.
   * @param forChannels - Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
   * @returns Returns ChatAdministratorRights on success.
   */
  fetchAdministratorRigths(
    forChannels?: boolean,
  ): Promise<ChatAdministratorRights>;
  /**
   * Checks if this ClientUser is equal to another ClientUser.
   * @param other - The other object to compare with.
   * @returns True if both objects are instances of ClientUser and are equal based on key properties, otherwise false.
   */
  override equals(other: ClientUser): boolean;
}

/**
 * Interface representing options for logging in.
 */
export interface ILoginOptions {
  polling?: {
    offset?: number;
    limit?: number;
    timeout?: number;
    allowedUpdates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
    dropPendingUpdates?: boolean;
  };
  webhook?: {
    url: string;
    port?: number;
    host?: string;
    path?: string;
    certificate?: Buffer | ReadStream | string;
    ipAddress?: string;
    maxConnections?: number;
    tlsOptions?: TlsOptions;
    requestCallback?: RequestListener;
    allowedUpdates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
    dropPendingUpdates?: boolean;
    secretToken?: string;
  };
}

/**
 * Interface representing client options.
 */
export interface ClientOptions {
  offset?: number;
  restOptions?: IRestOptions;
  chatCacheMaxSize?: number;
  userCacheMaxSize?: number;
  userCacheFilter?: (user: User) => boolean;
  chatCacheFilter?: (chat: Chat) => boolean;
  pollingTimeout?: number;
}

/**
 * Represents a Telegram client for interacting with the Telegram API.
 */
export declare class TelegramClient extends BaseClient {
  readonly authToken: string;
  readonly options: ClientOptions;
  /**
   * The polling client for handling updates via long polling.
   */
  readonly polling: PollingClient;
  /**
   * The webhook client for handling updates via webhooks.
   */
  readonly webhook: WebhookClient;
  /**
   * The worket client for handling updates.
   */
  readonly worket: WorketClient;
  /**
   * The timestamp when the client became ready.
   */
  readyTimestamp: number | null;
  /**
   * The authenticated user associated with the client.
   */
  user: ClientUser | null;
  /**
   * Creates an instance of TelegramClient.
   * @param authToken - The authentication token for the Telegram bot.
   * @param options - Optional client parameters.
   * @throws {TelegramError} If the authentication token is not specified.
   */
  constructor(authToken: string, options?: ClientOptions);
  /**
   * Gets the client's uptime in milliseconds.
   * @returns The uptime in milliseconds, or null if the client is not ready.
   */
  get uptime(): number | null;
  /**
   * Fetch about the client/bot
   */
  fetchApplication(): Promise<ClientUser>;
  /**
   * Logs in to the Telegram API using the specified options.
   * @param options - The login options.
   * @throws {TelegramError} If invalid options are provided.
   */
  login(options?: ILoginOptions): Promise<void>;
  /**
   * Destroys the client, closing all connections.
   */
  destroy(): void;
  /**
   * Asynchronously disposes of the client, closing all connections.
   * Implements `Symbol.asyncDispose` by calling `destroy()`.
   */
  [Symbol.asyncDispose](): Promise<void>;
}

export declare class Base {
  /**
   * @public
   * @param client - The client that instantiated this
   */
  constructor(client: TelegramClient | BaseClient);
  /**
   * The client that instantiated this
   */
  get client(): TelegramClient;
  /**
   * Patches the current instance with new data
   * @param data - The data to patch the instance with
   * @returns The patched data
   * @protected
   */
  protected _patch(data: Record<string, any>): Record<string, any>;
  /**
   * Creates a clone of the current instance
   * @returns A clone of the current instance
   * @protected
   */
  protected _clone(): Base;
  /**
   * Updates the current instance with new data and returns a clone of the updated instance
   * @param data - The data to update the instance with
   * @returns A clone of the updated instance
   * @protected
   */
  protected _update(data: Record<string, any>): Base;
  /**
   * Flatten an object. Any properties that are collections will get converted to an array of keys.
   * @param propsRecursive Optional. If true, calls toJSON method on nested objects.
   * @param props Optional. Specific properties to include/exclude, or rename.
   * @returns Flattened object.
   */
  toJSON(
    propsRecursive?: boolean,
    ...props: Record<string, boolean | string>[]
  ): Record<string, any>;
  /** Returns the id instance Chat, User, ChatMember and other */
  valueOf(): string | null;
}

export declare class WebhookInfo extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes the current status of a webhook
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").WebhookInfo,
  );
  /** Webhook URL, may be empty if webhook is not set up */
  url?: string;
  /** True, if a custom certificate was provided for webhook certificate checks */
  customCertificate: boolean;
  /** Number of updates awaiting delivery */
  pendingCount: number;
  /** Currently used webhook IP address */
  ipAddress?: string;
  /** Unix time for the most recent error that happened when trying to deliver an update via webhook */
  lastedUnixTime?: number;
  /** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
  errorMessage?: string;
  /** Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
  synchronizatedUnixTime?: number;
  /** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
  connections?: number;
  /** A list of update types the bot is subscribed to. Defaults to all update types except chat_member */
  allowedUpdates: (
    | "chat_member"
    | "poll"
    | "message"
    | "edited_message"
    | "channel_post"
    | "edited_channel_post"
    | "business_connection"
    | "business_message"
    | "edited_business_message"
    | "deleted_business_messages"
    | "message_reaction"
    | "message_reaction_count"
    | "inline_query"
    | "chosen_inline_result"
    | "callback_query"
    | "shipping_query"
    | "pre_checkout_query"
    | "poll_answer"
    | "my_chat_member"
    | "chat_join_request"
    | "chat_boost"
    | "removed_chat_boost"
  )[];
  /**
   * Use this method to remove webhook integration if you decide to switch back to getUpdates.
   * @param dropPendingUpdates - Pass True to drop all pending updates
   * @returns Returns True on success.
   */
  delete(dropPendingUpdates?: boolean): Promise<true>;
  /**
   * Return the timestamp most recent error that happened when trying to deliver an update via webhook, in milliseconds
   */
  get lastedTimestamp(): Date | null;
  /**
   * Date for the most recent error that happened when trying to deliver an update via webhook
   */
  get lastedAt(): Date | null;
  /**
   * Return the timestamp most recent error that happened when trying to synchronize available updates with Telegram datacenters, in milliseconds
   */
  get synchronizatedTimestamp(): number | null;
  /**
   * Date of the most recent error that happened when trying to synchronize available updates with Telegram datacenters
   */
  get synchronizatedAt(): Date | null;
}

export declare class ChatFullInfo extends Chat {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the full information of a chat
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").ChatFullInfo,
  );
  /**
   * @param data - Data about the full information of a chat
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").ChatFullInfo,
  ): import("@telegram.ts/types").ChatFullInfo;
  /**
   * The accent color ID of the chat.
   */
  accentColorId?: number;
  /**
   * The maximum number of reactions allowed in the chat.
   */
  maxReactionCount?: number;
  /**
   * The photo of the chat.
   */
  photo: {
    smail: Photo;
    big: Photo;
  };
  /**
   * The active usernames of the chat.
   */
  activeUsernames?: string[];
  /**
   * The birthdate of the chat.
   */
  birthdate?: {
    day: number;
    month: number;
    year?: number;
  };
  /**
   * The business introduction of the chat.
   */
  businessIntro?: {
    title?: string;
    message?: string;
    sticker?: Sticker;
  };
  /**
   * The business location of the chat.
   */
  businessLocation?: {
    address: string;
    location?: Location;
  };
  /**
   * The business opening hours of the chat.
   */
  businessOpeningHours?: {
    timeZone: string;
    hours: {
      opening: number;
      closing: number;
    }[];
  };
  /**
   * The personal chat associated with this chat.
   */
  personalChat?: Chat;
  /**
   * The available reactions in the chat.
   */
  availableReactions?: ReactionType[];
  /**
   * The custom emoji ID for the chat background.
   */
  backgroundCustomEmojiId?: string;
  /**
   * The profile accent color ID of the chat.
   */
  profileAccentColorId?: number;
  /**
   * The custom emoji ID for the profile background.
   */
  profileBackgroundCustomEmojiId?: string;
  /**
   * The custom emoji ID for the emoji status.
   */
  emojiStatusCustomEmojiId?: string;
  /**
   * The expiration date for the emoji status.
   */
  emojiStatusExpirationDate?: number;
  /**
   * The bio of the chat.
   */
  bio?: string;
  /**
   * Whether the chat has private forwards.
   */
  privateForwards?: boolean;
  /**
   * Whether the chat has restricted voice and video messages.
   */
  restrictedMediaMessages?: boolean;
  /**
   * Whether users need to join to send messages in the chat.
   */
  joinToSendMessages?: boolean;
  /**
   * Whether users need to request to join the chat.
   */
  joinByRequest?: boolean;
  /**
   * The description of the chat.
   */
  description?: string;
  /**
   * The invite link for the chat.
   */
  inviteLink?: string;
  /**
   * The pinned message in the chat.
   */
  pinnedMessage?: Message;
  /**
   * The permissions in the chat.
   */
  permissions?: ChatPermissions;
  /**
   * Information about types of gifts that are accepted by the chat or by the corresponding user for private chats
   */
  acceptedGiftTypes?: {
    /** True, if unlimited regular gifts are accepted */
    unlimited: boolean;
    /** True, if limited regular gifts are accepted */
    limited: boolean;
    /** True, if unique gifts or gifts that can be upgraded to unique for free are accepted */
    unique: boolean;
    /** True, if a Telegram Premium subscription is accepted */
    premiumSubscription: boolean;
  };
  /**
   * The slow mode delay in the chat.
   */
  slowModeDelay?: number;
  /**
   * The unrestrict boost count of the chat.
   */
  unrestrictBoostCount?: number;
  /**
   * The message auto delete time in the chat.
   */
  messageAutoDeleteTime?: number;
  /**
   * Whether the chat has aggressive anti-spam enabled.
   */
  aggressiveAntiSpamEnabled?: boolean;
  /**
   * Whether the chat has hidden members.
   */
  hiddenMembers?: boolean;
  /**
   * Whether the chat has protected content.
   */
  protectedContent?: boolean;
  /**
   * Whether the chat has visible history.
   */
  visibleHistory?: boolean;
  /**
   * The name of the sticker set in the chat.
   */
  stickerSetName?: string;
  /**
   * Whether the chat can set a sticker set.
   */
  setStickeredSet?: boolean;
  /**
   * The name of the custom emoji sticker set in the chat.
   */
  customEmojiStickerSetName?: string;
  /**
   * The linked chat ID.
   */
  linkedId?: string;
  /**
   * The location of the chat.
   */
  location?: {
    location: Location;
    address: string;
  };
}

export declare class UserChatBoosts {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the user chat boosts
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").UserChatBoosts,
  );
  /**
   * The list of boosts added to the chat by the user
   */
  boosts: Collection<string, ChatBoost>;
  /**
   * The boost count added to the chat by the user
   */
  count: number;
  /**
   * Makes the class iterable, returning each `ChatBoost` object.
   */
  [Symbol.iterator](): IterableIterator<ChatBoost>;
}

export declare class StickerSet {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the represents a sticker
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").StickerSet,
  );
  /** Sticker set name */
  name: string;
  /** Sticker set title */
  title: string;
  /** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
  stickerType: "regular" | "custom_emoji" | "mask";
  /** List of all set stickers */
  stickers: Sticker[];
  /** Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
  thumbnail?: Photo;
}

export declare class RevenueWithdrawalState {
  /**
   * @param data - Data about the describes the state of a revenue withdrawal operation
   */
  constructor(data: import("@telegram.ts/types").RevenueWithdrawalState);
  /** Date the withdrawal was completed in Unix time */
  createdUnixTime?: number;
  /** An HTTPS URL that can be used to see transaction details */
  url?: string;
  /** Type of the state, always “failed” */
  failed?: boolean;
  /** Type of the state, always “pending” */
  pending?: boolean;
  /**
   * Return the timestamp withdrawal was completed, in milliseconds
   */
  get createdTimestamp(): number | null;
  /**
   * Date the withdrawal was completed
   */
  get createdAt(): Date | null;

  isSucceeded(): this is this & {
    createdTimestamp: number;
    url: string;
  };
}

export declare class TransactionPartner extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes the source of a transaction, or its recipient for outgoing transactions
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").TransactionPartner,
  );
  /** Type of the transaction partner */
  type:
    | "other"
    | "user"
    | "fragment"
    | "telegram_ads"
    | "telegram_api"
    | "affiliate_program";
  /** Type of the transaction, currently one of “invoice_payment” for payments via invoices, “paid_media_payment” for payments for paid media, “gift_purchase” for gifts sent by the bot, “premium_purchase” for Telegram Premium subscriptions gifted by the bot, “business_account_transfer” for direct transfers from managed business accounts */
  transactionType?:
    | "invoice_payment"
    | "paid_media_payment"
    | "gift_purchase"
    | "premium_purchase"
    | "business_account_transfer";
  /**
   * @param data - Data about the describes the source of a transaction, or its recipient for outgoing transactions
   * @override
   */
  override _patch(
    data: import("@telegram.ts/types").TransactionPartner,
  ): import("@telegram.ts/types").TransactionPartner;
  /**
   * State of the transaction if the transaction is outgoing
   */
  withdrawal?: RevenueWithdrawalState;
  /**
   * Information about the user
   */
  user?: User;
  /**
   * Information about the paid media bought by the user. Can be available only for “invoice_payment” transactions.
   */
  paidMedia?: PaidMedia[];
  /**
   * Bot-specified paid media payload. Can be available only for “invoice_payment” transactions.
   */
  paidMediaPayload?: string;
  /**
   * Bot-specified invoice payload. Can be available only for “invoice_payment” transactions.
   */
  payload?: string;
  /**
   * The duration of the paid subscription. Can be available only for “invoice_payment” transactions.
   */
  subscriptionPeriod?: number;
  /**
   * The number of successful requests that exceeded regular limits and were therefore billed.
   */
  requestCount?: number;
  /**
   * The gift sent to the user by the bot; for “gift_purchase” transactions only.
   */
  gift?: string;
  /**
   * Information about the chat.
   */
  chat?: Chat;
  /**
   * Information about the affiliate that received a commission via this transaction. Can be available only for “invoice_payment” and “paid_media_payment” transactions.
   */
  affiliate?: AffiliateInfo;
  /**
   * Information about the bot that sponsored the affiliate program.
   */
  sponsorUser?: User;
  /**
   * The number of Telegram Stars received by the bot for each 1000 Telegram Stars received by the affiliate program sponsor from referred users.
   */
  commissionRate?: number;
  /** Number of months the gifted Telegram Premium subscription will be active for; for “premium_purchase” transactions only */
  premiumSubscriptionDuration?: number;

  isUser(): this is this & {
    withdrawal?: undefined;
    user: User;
    paidMedia?: PaidMedia[];
    paidMediaPayload?: string;
    gift?: Gift;
    subscriptionPeriod?: number;
    requestCount?: undefined;
    affiliate?: AffiliateInfo;
    sponsorUser?: undefined;
    commissionRate?: undefined;
    chat?: undefined;
    premiumSubscriptionDuration?: number;
  };

  isChat(): this is this & {
    withdrawal?: undefined;
    user?: undefined;
    paidMedia?: undefined;
    paidMediaPayload?: string;
    gift?: Gift;
    subscriptionPeriod?: number;
    requestCount?: undefined;
    affiliate?: AffiliateInfo;
    sponsorUser?: undefined;
    commissionRate?: undefined;
    chat: Chat;
    premiumSubscriptionDuration?: undefined;
  };

  isFragment(): this is this & {
    withdrawal: RevenueWithdrawalState;
    user?: undefined;
    paidMedia?: undefined;
    paidMediaPayload?: undefined;
    gift?: undefined;
    subscriptionPeriod?: undefined;
    requestCount?: undefined;
    affiliate?: undefined;
    sponsorUser?: undefined;
    commissionRate?: undefined;
    chat?: undefined;
    premiumSubscriptionDuration?: undefined;
  };

  isTelegramApi(): this is this & {
    withdrawal?: undefined;
    user?: undefined;
    paidMedia?: undefined;
    paidMediaPayload?: undefined;
    gift?: undefined;
    subscriptionPeriod?: undefined;
    requestCount: number;
    affiliate?: undefined;
    sponsorUser?: undefined;
    commissionRate?: undefined;
    chat?: undefined;
    premiumSubscriptionDuration?: undefined;
  };

  isAffiliateProgram(): this is this & {
    withdrawal?: undefined;
    user?: undefined;
    paidMedia?: undefined;
    paidMediaPayload?: undefined;
    gift?: undefined;
    subscriptionPeriod?: undefined;
    requestCount: undefined;
    affiliate?: undefined;
    sponsorUser?: User;
    commissionRate?: number;
    chat?: undefined;
    premiumSubscriptionDuration?: undefined;
  };
}

export declare class StarTransaction extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the describes a Telegram Star transaction
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").StarTransaction,
  );
  /** Unique identifier of the transaction. Coincides with the identifer of the original transaction for refund transactions. Coincides with SuccessfulPayment.telegram_payment_charge_id for successful incoming payments from users. */
  id: string;
  /** Integer amount Telegram Stars transferred by the transaction */
  amount: number;
  /**
   * The number of 1/1000000000 shares of Telegram Stars transferred by the transaction; from 0 to 999999999
   */
  nanostarAmount?: number;
  /** Date the transaction was created in Unix time */
  createdUnixTime: number;
  /**
   * Source of an incoming transaction (e.g., a user purchasing goods or services, Fragment refunding a failed withdrawal). Only for incoming transactions
   */
  source?: TransactionPartner;
  /**
   * Receiver of an outgoing transaction (e.g., a user for a purchase refund, Fragment for a withdrawal). Only for outgoing transactions
   */
  receiver?: TransactionPartner;
  /**
   * Refunds a successful payment in Telegram Stars.
   * @param userId - Identifier of the user whose payment will be refunded
   * @returns Returns True on success.
   */
  refundStarPayment(userId: string | number): Promise<true>;
  /**
   * Return the timestamp transaction was created
   */
  get createdTimestamp(): number;
  /**
   * Date the transaction was created
   */
  get createdAt(): Date;
}

export class PaidMediaPurchased extends Base {
  /**
   * @param client - The client that instantiated this
   * @param data - information about a paid media purchase.
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").PaidMediaPurchased,
  );
  /** User who purchased the media */
  author: User;
  /** Bot-specified paid media payload */
  payload: string;
}

type ApiMethodParameters<T> = T extends (...args: infer P) => any ? P : never;

type MethodParameters<M = ApiMethods> = {
  [K in keyof M]: M[K] extends Function ? ApiMethodParameters<M[K]>[0] : never;
};

export type MethodsApiReturnType = {
  [M in keyof Methods]: ReturnType<Methods[M]>;
};

export type MethodsLibReturnType = {
  [M in keyof ApiMethods]: ReturnType<ApiMethods[M]>;
};

export type MsgWith<T, P extends keyof T> = Record<P, NonNullable<T[P]>>;

export interface IRequestFailt {
  ok: false;
  error_code: string | number;
  description: string;
  parameters?: {
    retry_after?: number;
    migrate_to_chat_id?: number;
  };
}

export interface IRequestSuccess<T> {
  ok: true;
  result: T;
}

export type Awaitable<V> = PromiseLike<V> | V;

export type PossiblyAsync<T> = T | Promise<T>;

/**
 * Represents an inline keyboard for Telegram bots.
 */
export declare class InlineKeyboardBuilder {
  readonly inline_keyboard: InlineKeyboardButton[][];
  /**
   * Creates an instance of InlineKeyboard.
   * @param inlineKeyboard - A 2D array of inline keyboard buttons.
   */
  constructor(inline_keyboard?: InlineKeyboardButton[][]);
  /**
   * Adds buttons to the last row of the inline keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  add(...buttons: InlineKeyboardButton[]): this;
  /**
   * Adds a new row of buttons to the inline keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  row(...buttons: InlineKeyboardButton[]): this;
  /**
   * Adds a URL button to the inline keyboard.
   * @param text - The button text.
   * @param url - The URL to be opened when the button is pressed.
   * @returns The current instance for chaining.
   */
  url(text: string, url: string): this;
  /**
   * Creates a URL button.
   * @param text - The button text.
   * @param url - The URL to be opened when the button is pressed.
   * @returns The created URL button.
   */
  static url(text: string, url: string): InlineKeyboardButton.UrlButton;
  /**
   * Adds a callback button to the inline keyboard.
   * @param text - The button text.
   * @param data - The callback data.
   * @returns The current instance for chaining.
   */
  text(text: string, data?: string): this;
  /**
   * Creates a callback button.
   * @param text - The button text.
   * @param data - The callback data.
   * @returns The created callback button.
   */
  static text(text: string, data?: string): InlineKeyboardButton.CallbackButton;
  /**
   * Adds a WebApp button to the inline keyboard.
   * @param text - The button text.
   * @param url - The URL to the WebApp.
   * @returns The current instance for chaining.
   */
  webApp(text: string, url: string): this;
  /**
   * Creates a WebApp button.
   * @param text - The button text.
   * @param url - The URL to the WebApp.
   * @returns The created WebApp button.
   */
  static webApp(text: string, url: string): InlineKeyboardButton.WebAppButton;
  /**
   * Adds a login button to the inline keyboard.
   * @param text - The button text.
   * @param loginUrl - The login URL or LoginUrl object.
   * @returns The current instance for chaining.
   */
  login(text: string, loginUrl: string | LoginUrl): this;
  /**
   * Creates a login button.
   * @param text - The button text.
   * @param loginUrl - The login URL or LoginUrl object.
   * @returns The created login button.
   */
  static login(
    text: string,
    loginUrl: string | LoginUrl,
  ): InlineKeyboardButton.LoginButton;
  /**
   * Adds a switch inline button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to.
   * @returns The current instance for chaining.
   */
  switchInline(text: string, query?: string): this;
  /**
   * Creates a switch inline button.
   * @param text - The button text.
   * @param query - The inline query to switch to.
   * @returns The created switch inline button.
   */
  static switchInline(
    text: string,
    query?: string,
  ): InlineKeyboardButton.SwitchInlineButton;
  /**
   * Adds a switch inline current chat button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to in the current chat.
   * @returns The current instance for chaining.
   */
  switchInlineCurrent(text: string, query?: string): this;
  /**
   * Creates a switch inline current chat button.
   * @param text - The button text.
   * @param query - The inline query to switch to in the current chat.
   * @returns The created switch inline current chat button.
   */
  static switchInlineCurrent(
    text: string,
    query?: string,
  ): InlineKeyboardButton.SwitchInlineCurrentChatButton;
  /**
   * Adds a switch inline chosen chat button to the inline keyboard.
   * @param text - The button text.
   * @param query - The inline query to switch to in the chosen chat.
   * @returns The current instance for chaining.
   */
  switchInlineChosen(text: string, query?: SwitchInlineQueryChosenChat): this;
  /**
   * Creates a switch inline chosen chat button.
   * @param text - The button text.
   * @param query - The inline query to switch to in the chosen chat.
   * @returns The created switch inline chosen chat button.
   */
  static switchInlineChosen(
    text: string,
    query?: SwitchInlineQueryChosenChat,
  ): InlineKeyboardButton.SwitchInlineChosenChatButton;
  /**
   * Adds a copy text button to the inline keyboard.
   * @param text - The button text.
   * @param copyText - The text copy or CopyTextButton object.
   * @returns The current instance for chaining.
   */
  copyText(text: string, copyText?: string | CopyTextButton): this;
  /**
   * Creates a copy text button.
   * @param text - The button text.
   * @param copyText - The text copy or CopyTextButton object.
   * @returns The created copy text button.
   */
  static copyText(
    text: string,
    copyText?: string | CopyTextButton,
  ): InlineKeyboardButton.CopyTextButtonButton;
  /**
   * Adds a game button to the inline keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  game(text: string): this;
  /**
   * Creates a game button.
   * @param text - The button text.
   * @returns The created game button.
   */
  static game(text: string): InlineKeyboardButton.GameButton;
  /**
   * Adds a pay button to the inline keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  pay(text: string): this;
  /**
   * Creates a pay button.
   * @param text - The button text.
   * @returns The created pay button.
   */
  static pay(text: string): InlineKeyboardButton.PayButton;
  /**
   * Creates a deep copy of the current InlineKeyboard instance.
   * @returns A new instance of InlineKeyboard with the same buttons.
   */
  clone(): InlineKeyboardBuilder;
  /**
   * Combines the current inline keyboard with another one.
   * @param other - The other InlineKeyboard instance to combine with.
   * @returns The current instance for chaining.
   */
  combine(
    other:
      | InlineKeyboardBuilder
      | InlineKeyboardButton[][]
      | { inline_keyboard: InlineKeyboardButton[][] }
      | { toJSON(): { inline_keyboard: InlineKeyboardButton[][] } },
  ): InlineKeyboardBuilder;
  /**
   * Creates an InlineKeyboard instance from another instance or a 2D array of buttons.
   * @param source - The source InlineKeyboard instance or 2D array of buttons.
   * @returns A new instance of InlineKeyboard.
   */
  static from(
    source: InlineKeyboardBuilder | InlineKeyboardButton[][],
  ): InlineKeyboardBuilder;
  /**
   * Checks if this inline keyboard is equal to another inline keyboard.
   * @param other - The other inline keyboard to compare with.
   * @returns True if both keyboards are equal based on their structure and button properties, otherwise false.
   */
  equals(
    other:
      | InlineKeyboardBuilder
      | { inline_keyboard: InlineKeyboardButton[][] },
  ): boolean;
  /**
   * Converts the inline keyboard to a JSON format suitable for Telegram API.
   * @returns An object representing the inline keyboard in JSON format.
   */
  toJSON(): { inline_keyboard: InlineKeyboardButton[][] };
}

/**
 * Represents a custom keyboard for Telegram bots.
 */
export declare class KeyboardBuilder {
  readonly keyboard: KeyboardButton[][];
  /**
   * Indicates whether the keyboard is persistent.
   */
  is_persistent?: boolean;
  /**
   * Indicates whether the keyboard is selective.
   */
  selective?: boolean;
  /**
   * Indicates whether the keyboard is a one-time keyboard.
   */
  one_time_keyboard?: boolean;
  /**
   * Indicates whether the keyboard should be resized.
   */
  resize_keyboard?: boolean;
  /**
   * The placeholder text for the input field.
   */
  input_field_placeholder?: string;
  /**
   * Creates an instance of Keyboard.
   * @param keyboard - A 2D array of keyboard buttons.
   */
  constructor(keyboard?: KeyboardButton[][]);
  /**
   * Adds buttons to the last row of the keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  add(...buttons: KeyboardButton[]): this;
  /**
   * Adds a new row of buttons to the keyboard.
   * @param buttons - The buttons to add.
   * @returns The current instance for chaining.
   */
  row(...buttons: KeyboardButton[]): this;
  /**
   * Adds a text button to the keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  text(text: string): this;
  /**
   * Creates a text button.
   * @param text - The button text.
   * @returns The created text button.
   */
  static text(text: string): KeyboardButton.CommonButton;
  /**
   * Adds a request users button to the keyboard.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The current instance for chaining.
   */
  requestUsers(
    text: string,
    requestId: number,
    options?: Omit<KeyboardButtonRequestUsers, "requestId">,
  ): this;
  /**
   * Creates a request users button.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The created request users button.
   */
  static requestUsers(
    text: string,
    requestId: number,
    options?: Omit<KeyboardButtonRequestUsers, "requestId">,
  ): KeyboardButton.RequestUsersButton;
  /**
   * Adds a request chat button to the keyboard.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The current instance for chaining.
   */
  requestChat(
    text: string,
    requestId: number,
    options?: Omit<KeyboardButtonRequestChat, "requestId">,
  ): this;
  /**
   * Creates a request chat button.
   * @param text - The button text.
   * @param requestId - The request ID.
   * @param options - Additional options for the button.
   * @returns The created request chat button.
   */
  static requestChat(
    text: string,
    requestId: number,
    options?: Omit<KeyboardButtonRequestChat, "requestId">,
  ): KeyboardButton.RequestChatButton;
  /**
   * Adds a request contact button to the keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  requestContact(text: string): this;
  /**
   * Creates a request contact button.
   * @param text - The button text.
   * @returns The created request contact button.
   */
  static requestContact(text: string): KeyboardButton.RequestContactButton;
  /**
   * Adds a request location button to the keyboard.
   * @param text - The button text.
   * @returns The current instance for chaining.
   */
  requestLocation(text: string): this;
  /**
   * Creates a request location button.
   * @param text - The button text.
   * @returns The created request location button.
   */
  static requestLocation(text: string): KeyboardButton.RequestLocationButton;
  /**
   * Adds a request poll button to the keyboard.
   * @param text - The button text.
   * @param type - The type of the poll button.
   * @returns The current instance for chaining.
   */
  requestPoll(text: string, type?: KeyboardButtonPollType["type"]): this;
  /**
   * Creates a request poll button.
   * @param text - The button text.
   * @param type - The type of the poll button.
   * @returns The created request poll button.
   */
  static requestPoll(
    text: string,
    type?: KeyboardButtonPollType["type"],
  ): KeyboardButton.RequestPollButton;
  /**
   * Adds a web app button to the keyboard.
   * @param text - The button text.
   * @param url - The URL of the web app.
   * @returns The current instance for chaining.
   */
  webApp(text: string, url: string): this;
  /**
   * Creates a web app button.
   * @param text - The button text.
   * @param url - The URL of the web app.
   * @returns The created web app button.
   */
  static webApp(text: string, url: string): KeyboardButton.WebAppButton;
  /**
   * Sets the keyboard as persistent or not.
   * @param isEnabled - Indicates whether the keyboard should be persistent.
   * @returns The current instance for chaining.
   */
  persistent(isEnabled?: boolean): this;
  /**
   * Sets the keyboard as selective or not.
   * @param isEnabled - Indicates whether the keyboard should be selective.
   * @returns The current instance for chaining.
   */
  selected(isEnabled?: boolean): this;
  /**
   * Sets the keyboard as a one-time keyboard or not.
   * @param isEnabled - Indicates whether the keyboard should be a one-time keyboard.
   * @returns The current instance for chaining.
   */
  oneTime(isEnabled?: boolean): this;
  /**
   * Sets the keyboard to be resized or not.
   * @param isEnabled - Indicates whether the keyboard should be resized.
   * @returns The current instance for chaining.
   */
  resized(isEnabled?: boolean): this;
  /**
   * Sets the placeholder text for the input field.
   * @param value - The placeholder text.
   * @returns The current instance for chaining.
   */
  placeholder(value: string): this;
  /**
   * Creates a deep copy of the current Keyboard instance.
   * @returns A new instance of Keyboard with the same buttons and properties.
   */
  clone(keyboard?: KeyboardButton[][]): KeyboardBuilder;
  /**
   * Builds the keyboard structure.
   * @returns The built keyboard structure.
   */
  build(): KeyboardButton[][];
  /**
   * Combines the current keyboard with another one.
   * @param other - The other Keyboard instance to combine with.
   * @returns The current instance for chaining.
   */
  combine(
    keyboard:
      | KeyboardBuilder
      | ReplyKeyboardMarkup
      | KeyboardButton[][]
      | { keyboard: KeyboardButton[][] }
      | {
          toJSON: () => ReplyKeyboardMarkup;
        },
  ): KeyboardBuilder;
  /**
   * Creates a Keyboard instance from another instance or a 2D array of buttons.
   * @param source - The source Keyboard instance or 2D array of buttons.
   * @returns A new instance of Keyboard.
   */
  static from(
    source: (string | KeyboardButton)[][] | KeyboardBuilder,
  ): KeyboardBuilder;
  /**
   * Checks if this keyboard is equal to another keyboard.
   * @param other - The other keyboard to compare with.
   * @returns True if both keyboards are equal based on their structure and properties, otherwise false.
   */
  equals(other: KeyboardBuilder | ReplyKeyboardMarkup): boolean;
  /**
   * Converts the keyboard to a JSON format suitable for Telegram API.
   * @returns An object representing the keyboard in JSON format.
   */
  toJSON(): ReplyKeyboardMarkup;
}

export declare class InlineQueryResultBuilder {
  /** Cached result of InlineQuery builder */
  static cached: typeof InlineQueryResultCachedBuilder;
  /**
   * Represents a link to an article or web page.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title of the result.
   * @param inputMessageContent - Content of the message to be sent.
   * @param options - out parameters.
   */
  static article(
    id: string,
    title: string,
    inputMessageContent: InputMessageContent,
    options?: Omit<
      InlineQueryResultArticle,
      "type" | "title" | "id" | "input_message_content"
    >,
  ): InlineQueryResultArticle;
  /**
   * Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title.
   * @param audioUrl - A valid URL for the audio file.
   * @param options - out parameters.
   */
  static audio(
    id: string,
    title: string,
    audioUrl: string,
    options?: Omit<
      InlineQueryResultAudio,
      "type" | "title" | "id" | "audio_url"
    >,
  ): InlineQueryResultAudio;
  /**
   * Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the contact.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param phoneNumber - Contact's phone number.
   * @param firstName - Contact's first name
   * @param options - out parameters.
   */
  static contact(
    id: string,
    phoneNumber: string,
    firstName: string,
    options?: Omit<
      InlineQueryResultContact,
      "type" | "phone_number" | "id" | "first_name"
    >,
  ): InlineQueryResultContact;
  /**
   * Represents a [Game](https://core.telegram.org/bots/api/#games).
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param gameShortName - Short name of the game.
   * @param replyMarkup - Inline keyboard attached to the message.
   */
  static game(
    id: string,
    gameShortName: string,
    replyMarkup?: InlineQueryResultGame["reply_markup"],
  ): InlineQueryResultGame;
  /**
   * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this method.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title for the result.
   * @param url - A valid URL for the file.
   * @param options - out parameters.
   */
  static documentPdf(
    id: string,
    title: string,
    url: string,
    options?: Omit<
      InlineQueryResultDocument,
      "type" | "mime_type" | "id" | "title" | "document_url"
    >,
  ): InlineQueryResultDocument;
  /**
   * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this method.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param title - Title for the result.
   * @param url - A valid URL for the file.
   * @param options - out parameters.
   */
  static documentZip(
    id: string,
    title: string,
    url: string,
    options?: Omit<
      InlineQueryResultDocument,
      "type" | "mime_type" | "id" | "title" | "document_url"
    >,
  ): InlineQueryResultDocument;
  /**
   * Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param gifUrl - A valid URL for the GIF file. File size must not exceed 1MB.
   * @param thumbnailUrl - URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result.
   * @param options - out parameters.
   */
  static gif(
    id: string,
    gifUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultGif,
      "type" | "gif_url" | "id" | "thumbnail_url"
    >,
  ): InlineQueryResultGif;
  /**
   * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the location.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param latitude - Location latitude in degrees.
   * @param longitude - Location longitude in degrees.
   * @param title - Location title.
   * @param options - out parameters
   */
  static location(
    id: string,
    latitude: number,
    longitude: number,
    title: string,
    options?: Omit<
      InlineQueryResultLocation,
      "type" | "latitude" | "id" | "longitude" | "title"
    >,
  ): InlineQueryResultLocation;
  /**
   * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param mpeg4Url - A valid URL for the MPEG4 file. File size must not exceed 1MB.
   * @param thumbnailUrl - URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result.
   * @param options - out parameters.
   */
  static mpeg4Gif(
    id: string,
    mpeg4Url: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultMpeg4Gif,
      "type" | "mpeg4_url" | "id" | "thumbnail_url"
    >,
  ): InlineQueryResultMpeg4Gif;
  /**
   * Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param photoUrl - A valid URL of the photo. Photo must be in jpeg format. Photo size must not exceed 5MB.
   * @param thumbnailUrl - URL of the thumbnail for the photo.
   * @param options - out parameters.
   */
  static photo(
    id: string,
    photoUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultPhoto,
      "type" | "photo_url" | "id" | "thumbnail_url"
    >,
  ): InlineQueryResultPhoto;
  /**
   * Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the venue.
   * @param id - Unique identifier for this result, 1-64 Bytes.
   * @param options - out parameters.
   */
  static venue(
    id: string,
    options: Omit<InlineQueryResultVenue, "type" | "id">,
  ): InlineQueryResultVenue;
  /**
   * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
   *
   * If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must** replace its content using *input\_message\_content*.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param videoUrl - A valid URL for the embedded video player or video file.
   * @param thumbnailUrl - URL of the thumbnail (JPEG only) for the video.
   * @param options - out parameters.
   */
  static videoHtml(
    id: string,
    title: string,
    videoUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultVideo,
      "type" | "video_url" | "id" | "thumbnail_url" | "mime_type" | "title"
    >,
  ): InlineQueryResultVideo;
  /**
   * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
   *
   * If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must** replace its content using *input\_message\_content*.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param videoUrl - A valid URL for the embedded video player or video file.
   * @param thumbnailUrl - URL of the thumbnail (JPEG only) for the video.
   * @param options - out parameters.
   */
  static videoMp4(
    id: string,
    title: string,
    videoUrl: string,
    thumbnailUrl: string,
    options?: Omit<
      InlineQueryResultVideo,
      "type" | "video_url" | "id" | "thumbnail_url" | "mime_type" | "title"
    >,
  ): InlineQueryResultVideo;
  /**
   * Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the the voice message.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Recording title.
   * @param url - A valid URL for the voice recording.
   * @param options - out parameters.
   */
  static voice(
    id: string,
    title: string,
    url: string,
    options?: Omit<
      InlineQueryResultVoice,
      "type" | "voice_url" | "id" | "title"
    >,
  ): InlineQueryResultVoice;
}

export declare class InlineQueryResultCachedBuilder {
  /**
   * Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier for the audio file.
   * @param options - out parameters.
   */
  static audio(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedAudio,
      "type" | "audio_file_id" | "id"
    >,
  ): InlineQueryResultCachedAudio;
  /**
   * Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param fileId - A valid file identifier for the file.
   * @param options - out parameters.
   */
  static document(
    id: string,
    title: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedDocument,
      "type" | "document_file_id" | "id" | "title"
    >,
  ): InlineQueryResultCachedDocument;
  /**
   * Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier for the GIF file.
   * @param options - out parameters.
   */
  static gif(
    id: string,
    fileId: string,
    options?: Omit<InlineQueryResultCachedGif, "type" | "gif_file_id" | "id">,
  ): InlineQueryResultCachedGif;
  /**
   * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier for the GIF file.
   * @param options - out parameters.
   */
  static mpeg4Gif(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedMpeg4Gif,
      "type" | "mpeg4_file_id" | "id"
    >,
  ): InlineQueryResultCachedMpeg4Gif;
  /**
   * Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier of the photo.
   * @param options - out parameters.
   */
  static photo(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedPhoto,
      "type" | "photo_file_id" | "id"
    >,
  ): InlineQueryResultCachedPhoto;
  /**
   * Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the sticker.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param fileId - A valid file identifier of the sticker.
   * @param options - out parameters.
   */
  static sticker(
    id: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedSticker,
      "type" | "sticker_file_id" | "id"
    >,
  ): InlineQueryResultCachedSticker;
  /**
   * Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Title for the result.
   * @param fileId - A valid file identifier for the video file.
   * @param options - out parameters.
   */
  static video(
    id: string,
    title: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedVideo,
      "type" | "video_file_id" | "id" | "title"
    >,
  ): InlineQueryResultCachedVideo;
  /**
   * Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the voice message.
   * @param id - Unique identifier for this result, 1-64 bytes.
   * @param title - Voice message title.
   * @param fileId - A valid file identifier for the voice message.
   * @param options - out parameters.
   */
  static voice(
    id: string,
    title: string,
    fileId: string,
    options?: Omit<
      InlineQueryResultCachedVoice,
      "type" | "voice_file_id" | "id" | "title"
    >,
  ): InlineQueryResultCachedVoice;
}

export declare class InputMessageContentBuilder {
  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a text message to be sent as the result of an inline query.
   * @param text - Text of the message to be sent, 1-4096 characters.
   * @param options - out parameters.
   */
  static text(
    text: InputTextMessageContent["message_text"],
    options?: Omit<InputTextMessageContent, "message_text">,
  ): InputTextMessageContent;
  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a location message to be sent as the result of an inline query.
   * @param latitude - Latitude of the location in degrees.
   * @param longitude - Longitude of the location in degrees.
   * @param options - out parameters.
   */
  static location(
    latitude: number,
    longitude: number,
    options?: Omit<InputLocationMessageContent, "latitude" | "longitude">,
  ): InputLocationMessageContent;
  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a venue message to be sent as the result of an inline query.
   * @param latitude - Latitude of the venue in degrees.
   * @param longitude - Longitude of the venue in degrees.
   * @param title - Name of the venue.
   * @param address - Address of the venue.
   * @param options - out parameters.
   */
  static venue(
    latitude: number,
    longitude: number,
    options?: Omit<InputVenueMessageContent, "latitude" | "longitude">,
  ): InputLocationMessageContent;
  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a contact message to be sent as the result of an inline query.
   * @param phoneNumber - Contact's phone number.
   * @param firstName - Contact's first name.
   * @param options - out parameters.
   */
  static contact(
    phoneNumber: string,
    firstName: string,
    options?: Omit<InputContactMessageContent, "phone_number" | "first_name">,
  ): InputContactMessageContent;
  /**
   * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of an invoice message to be sent as the result of an inline query.
   * @param options - out parameters.
   */
  static invoice(
    options: InputInvoiceMessageContent,
  ): InputInvoiceMessageContent;
}

export declare const DefaultPollingParameters: {
  readonly offset: 0;
  readonly limit: 100;
  readonly timeout: 30;
  readonly allowedUpdates: readonly [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "callback_query",
    "inline_query",
    "my_chat_member",
    "chat_member",
    "chat_join_request",
  ];
};

export declare const DefaultClientParameters: {
  readonly chatCacheMaxSize: -1;
  readonly userCacheMaxSize: -1;
  readonly pollingTimeout: 300;
  readonly restOptions: {
    readonly agent: Agent;
    readonly enableRateLimit: true;
  };
};

export declare const Events: {
  readonly Ready: "ready";
  readonly Error: "error";
  readonly Disconnect: "disconnect";
  readonly RawUpdate: "rawUpdate";
  readonly Message: "message";
  readonly ChannelPost: "message";
  readonly BusinessMessage: "message";
  readonly BusinessConnection: "businessConnection";
  readonly EditedMessage: "messageUpdate";
  readonly EditedChannelPost: "messageUpdate";
  readonly EditedBusinessMessage: "messageUpdate";
  readonly DeletedBusinessMessages: "deletedBusinessMessages";
  readonly MessageReaction: "messageReaction";
  readonly MessageReactionCount: "messageReactionCount";
  readonly InlineQuery: "inlineQuery";
  readonly ChosenInlineResult: "chosenInlineResult";
  readonly CallbackQuery: "callbackQuery";
  readonly ShippingQuery: "shippingQuery";
  readonly PreCheckoutQuery: "preCheckoutQuery";
  readonly Poll: "poll";
  readonly PollAnswer: "pollAnswer";
  readonly MyChatMember: "myChatMember";
  readonly ChatMember: "chatMember";
  readonly ChatCreate: "chatCreate";
  readonly ChatMemberAdd: "chatMemberAdd";
  readonly ChatDelete: "chatDelete";
  readonly ChatMemberRemove: "chatMemberRemove";
  readonly ChatJoinRequest: "chatJoinRequest";
  readonly ChatBoost: "chatBoost";
  readonly RemovedChatBoost: "removedChatBoost";
};

export declare const CollectorEvents: {
  readonly Collect: "collect";
  readonly Ignore: "ignore";
  readonly Dispose: "dispose";
  readonly End: "end";
};

export declare const ReactionCollectorEvents: {
  readonly Collect: "collect";
  readonly Ignore: "ignore";
  readonly Dispose: "dispose";
  readonly End: "end";
  readonly User: "user";
  readonly Create: "create";
};

export declare const RestEvents: {
  readonly RateLimit: "rateLimit";
  readonly ApiRequest: "apiRequest";
  readonly ApiResponse: "apiResponse";
};

/**
 * A map of API flags and their corresponding values.
 */
export declare const ApiPermissionsFlags: {
  readonly changeInfo: "can_change_info";
  readonly postMessages: "can_post_messages";
  readonly editMessages: "can_edit_messages";
  readonly deleteMessages: "can_delete_messages";
  readonly inviteUsers: "can_invite_users";
  readonly restrictMembers: "can_restrict_members";
  readonly pinMessages: "can_pin_messages";
  readonly promoteMembers: "can_promote_members";
  readonly sendMessages: "can_send_messages";
  readonly sendMediaMessages: "can_send_media_messages";
  readonly sendPolls: "can_send_polls";
  readonly sendOtherMessages: "can_send_other_messages";
  readonly addWebPagePreviews: "can_add_web_page_previews";
  readonly manageVoiceChats: "can_manage_voice_chats";
  readonly beEdited: "can_be_edited";
  readonly manageChat: "can_manage_chat";
  readonly postStories: "can_post_stories";
  readonly editStories: "can_edit_stories";
  readonly deleteStories: "can_delete_stories";
  readonly manageTopics: "can_manage_topics";
};

/**
 * Converts the permission object to the API format.
 * @param permission - The permission object to convert.
 * @returns The API-compatible permission object.
 */
export declare function toApiFormat(
  permission:
    | ChatPermissionFlags
    | UserPermissionFlags
    | Record<string, boolean>,
): Record<
  (typeof ApiPermissionsFlags)[keyof typeof ApiPermissionsFlags],
  boolean
>;

/**
 * Represents an HTTP response error received from Telegram API.
 * Extends the base `TelegramError` class to include specific details about the error response.
 */
export declare class HTTPResponseError extends Error {
  #private;
  description: string;
  code: string | number;
  parameters: IRequestFailt["parameters"];
  /**
   * @param response - The response data received from the Telegram API.
   * @param request - The original HTTP response object.
   */
  constructor(response: IRequestFailt, request?: Response);
  /**
   * The URL of the request that caused the error.
   * @returns The URL of the request, or null if not available.
   */
  get url(): string | null;
  /**
   * The HTTP status code of the response.
   * @returns The HTTP status code, or null if not available.
   */
  get status(): number | null;
  /**
   * The status text of the HTTP response.
   * @returns The status text, or null if not available.
   */
  get statusText(): string | null;
  /**
   * The headers of the HTTP response.
   * @returns The response headers, or null if not available.
   */
  get headers(): Headers | null;
}

export declare enum ErrorCodes {
  InvalidOptions = "INVALID_OPTIONS",
  MissingUrlParameter = "MISSING_URL_PARAMETER",
  MissingToken = "MISSING_TOKEN",
  WebhookServerCreationFailed = "WEBHOOK_SERVER_CREATION_FAILED",
  InvalidFilterFunction = "INVALID_FILTER_FUNCTION",
  UserIdNotAvailable = "USER_ID_NOT_AVAILABLE",
  MessageIdNotAvailable = "MESSAGE_ID_NOT_AVAILABLE",
  ChatIdNotAvailable = "CHAT_ID_NOT_AVAILABLE",
  FileRetrievalFailed = "FILE_RETRIEVAL_FAILED",
  FileDownloadFailed = "FILE_DOWNLOAD_FAILED",
  FileWriteInvalidType = "FILE_WRITE_INVALID_TYPE",
  InvalidUserId = "INVALID_USER_ID",
  InvalidChatId = "INVALID_CHAT_ID",
  InvalidClientId = "INVALID_CLIENT_ID",
  InvalidFileName = "INVALID_FILE_NAME",
}

export declare const ErrorMessages: {
  readonly INVALID_OPTIONS: "The provided options are invalid.";
  readonly MISSING_URL_PARAMETER: "The 'url' parameter is required but was not provided.";
  readonly MISSING_TOKEN: "A token must be specified to receive updates from Telegram.";
  readonly WEBHOOK_SERVER_CREATION_FAILED: "The webhook server could not be created.";
  readonly INVALID_FILTER_FUNCTION: "The provided 'options.filter' is not a function.";
  readonly USER_ID_NOT_AVAILABLE: "The user ID related to this message is not available.";
  readonly MESSAGE_ID_NOT_AVAILABLE: "The message ID related to this message is not available.";
  readonly CHAT_ID_NOT_AVAILABLE: "The chat ID related to this message is not available.";
  readonly FILE_RETRIEVAL_FAILED: "Failed to retrieve the file from the path: <file_path>.";
  readonly FILE_DOWNLOAD_FAILED: "Failed to download the file. Error: ${err}.";
  readonly FILE_WRITE_INVALID_TYPE: "Invalid file write type specified. Available types: 'stream' or 'promise'.";
  readonly INVALID_USER_ID: "The provided ID is invalid for retrieving user information; it does not correspond to a valid user ID.";
  readonly INVALID_CHAT_ID: "The provided ID is invalid for retrieving chat information; it does not correspond to a valid chat ID.";
  readonly INVALID_CLIENT_ID: "The bot ID is not available. Please check if the bot has been initialized";
  readonly INVALID_FILE_NAME: "The name file is not valid. Please open issue https://github.com/telegramsjs/Telegramsjs/issues";
};

/**
 * Flatten an object. Any properties that are collections will get converted to an array of keys.
 * @param obj The object to flatten.
 * @param propsRecursive Optional. If true, calls toJSON method on nested objects.
 * @param props Optional. Specific properties to include/exclude, or rename.
 * @returns Flattened object.
 */
export declare function flatten(
  obj: Record<string, any>,
  propsRecursive?: boolean,
  ...props: Record<string, boolean | string>[]
): Record<string, any>;

/**
 * Represents a generic error from the Telegram API.
 * This error class extends the standard `Error` object and includes additional properties for error code and description.
 */
export declare class TelegramError extends Error {
  code: ErrorCodes;
  description: string;
  /**
   * Creates an instance of TelegramError.
   * @param code - The error code from the enum ErrorCodes.
   * @param params - An object containing values to replace placeholders in the error message.
   */
  constructor(code: ErrorCodes, params?: Record<string, any>);
  /**
   * Returns a string representation of the error.
   * @returns The error code and message.
   */
  toString(): string;
}

export declare class StarTransactions {
  /**
   * @param client - The client that instantiated this
   * @param data - Data about the contains a list of Telegram Star transactions
   */
  constructor(
    client: TelegramClient | BaseClient,
    data: import("@telegram.ts/types").StarTransactions,
  );
  /** The list of transactions */
  transactions: Collection<string, StarTransaction>;
  /**
   * Makes the class iterable, returning each `StarTransaction` object.
   */
  [Symbol.iterator](): IterableIterator<StarTransaction>;
}

export declare const version: "4.9.0";

export * from "./telegram/index";
