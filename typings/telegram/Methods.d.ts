import type { ReadStream } from "node:fs";
import type { Buffer, Blob } from "node:buffer";
import type { LanguageCode } from "./Language";
import type { PassportElementError } from "./Passport";
import type {
  AcceptedGiftTypes,
  BotCommand,
  MenuButton,
  BotCommandScope,
} from "./Bot";
import type {
  InlineQueryResult,
  InlineQueryResultsButton,
  LabeledPrice,
  ShippingOption,
} from "./Inline";
import type {
  MessageEntity,
  LinkPreviewOptions,
  MaskPosition,
  InputPollOption,
  ReplyParameters,
  ReactionType,
} from "./Message";
import type {
  InlineKeyboardMarkup,
  ForceReply,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
} from "./Markup";
import type { StoryArea } from "./Story";
import type { ParseMode, Update } from "@telegram.ts/types";

export type MediaDataParam =
  | Buffer
  | ReadStream
  | Blob
  | FormData
  | DataView
  | ArrayBuffer
  | Uint8Array
  | string
  | {
      source: {
        media:
          | Buffer
          | ReadStream
          | Blob
          | FormData
          | DataView
          | ArrayBuffer
          | Uint8Array
          | string;
        filename?: string;
      };
    };

/** Wrapper type to bundle all methods of the TelegramsJS */
export type ApiMethods = {
  /** Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects.

  Notes
  1. This method will not work if an outgoing webhook is set up.
  2. In order to avoid getting duplicate updates, recalculate offset after each server response. */
  getUpdates(args?: {
    /** Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue. All previous updates will be forgotten. */
    offset?: number;
    /** Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
    limit?: number;
    /** Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only. */
    timeout?: number;
    /** A list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member, message_reaction, and message_reaction_count (default). If not specified, the previous setting will be used.

    Please note that this parameter doesn't affect updates created before the call to getUpdates, so unwanted updates may be received for a short period of time. */
    allowedUpdates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
  }): Update[];

  /** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request (a request with response HTTP status code different from 2XY), we will repeat the request  and give up after a reasonable amount of attempts. Returns True on success.

  If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secretToken. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.

  Notes
  1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
  2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
  3. Ports currently supported for Webhooks: 443, 80, 88, 8443.

  If you're having any trouble setting up webhooks, please check out this amazing guide to webhooks. */
  setWebhook(args: {
    /** HTTPS URL to send updates to. Use an empty string to remove webhook integration */
    url: string;
    /** Upload your public key certificate so that the root certificate in use can be checked. See our self-signed guide for details. */
    certificate?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS */
    ipAddress?: string;
    /** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput. */
    maxConnections?: number;
    /** A list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member, message_reaction, and message_reaction_count (default). If not specified, the previous setting will be used.

    Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time. */
    allowedUpdates?: ReadonlyArray<Exclude<keyof Update, "update_id">>;
    /** Pass True to drop all pending updates */
    dropPendingUpdates?: boolean;
    /** A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that the request comes from a webhook set by you. */
    secretToken?: string;
  }): true;

  /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
  deleteWebhook(args?: {
    /** Pass True to drop all pending updates */
    dropPendingUpdates?: boolean;
  }): true;

  /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
  getWebhookInfo(): import("../index").WebhookInfo;

  /** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
  getMe(): import("../index").ClientUser;

  /** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
  logOut(): true;

  /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
  close(): true;

  /** Use this method to send text messages. On success, the sent Message is returned. */
  sendMessage(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Text of the message to be sent, 1-4096 characters after entities parsing */
    text: string;
    /** Mode for parsing entities in the message text. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in message text, which can be specified instead of parseMode */
    entities?: MessageEntity[];
    /** Link preview generation options for the message */
    linkPreviewOptions?: LinkPreviewOptions;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & { content: string };

  /** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
  forwardMessage(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
    fromChatId: number | string;
    /** New start timestamp for the copied video in the message */
    videoStartTimestamp?: number;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the forwarded message from forwarding and saving */
    protectContent?: boolean;
    /** Message identifier in the chat specified in fromChatId */
    messageId: string | number;
  }): import("../index").Message;

  /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
  forwardMessages(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Unique identifier for the chat where the original messages were sent (or channel username in the format @channelusername) */
    fromChatId: number | string;
    /** A list of 1-100 identifiers of messages in the chat fromChatId to forward. The identifiers must be specified in a strictly increasing order. */
    messageIds: (string | number)[];
    /** Sends the messages silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the forwarded messages from forwarding and saving */
    protectContent?: boolean;
  }): number[];

  /** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correctOptionId is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
  copyMessage(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
    fromChatId: number | string;
    /** New start timestamp for the copied video in the message */
    videoStartTimestamp?: number;
    /** Message identifier in the chat specified in fromChatId */
    messageId: string | number;
    /** New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept */
    caption?: string;
    /** Mode for parsing entities in the new caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the new caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Pass True, if the caption must be shown above the message media. Ignored if a new caption isn't specified. */
    showCaptionAboveMedia?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): number;

  /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages,  and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correctOptionId is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
  copyMessages(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Unique identifier for the chat where the original messages were sent (or channel username in the format @channelusername) */
    fromChatId: number | string;
    /** A list of 1-100 identifiers of messages in the chat fromChatId to copy. The identifiers must be specified in a strictly increasing order. */
    messageIds: (string | number)[];
    /** Sends the messages silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent messages from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to copy the messages without their captions */
    removeCaption?: boolean;
  }): number[];

  /** Use this method to send photos. On success, the sent Message is returned. */
  sendPhoto(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Photo to send. Pass a fileId as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. */
    photo: MediaDataParam;
    /** Photo caption (may also be used when resending photos by fileId), 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the photo caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Pass True, if the caption must be shown above the message media */
    showCaptionAboveMedia?: boolean;
    /** Pass True if the photo needs to be covered with a spoiler animation */
    hasSpoiler?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    photo: import("../index").Photo;
  };

  /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.

  For sending voice messages, use the sendVoice method instead. */
  sendAudio(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Audio file to send. Pass a fileId as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. */
    audio: MediaDataParam;
    /** Audio caption, 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the audio caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Duration of the audio in seconds */
    duration?: number;
    /** Performer */
    performer?: string;
    /** Track name */
    title?: string;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
    thumbnail?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    audio: import("../index").Audio;
  };

  /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
  sendDocument(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** File to send. Pass a fileId as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
    document: MediaDataParam;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
    thumbnail?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** Document caption (may also be used when resending documents by fileId), 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the document caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always true, if the document is sent as part of an album. */
    disableContentTypeDetection?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    document: import("../index").Document;
  };

  /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
  sendVideo(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Video to send. Pass a fileId as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. */
    video: MediaDataParam;
    /** Duration of sent video in seconds */
    duration?: number;
    /** Video width */
    width?: number;
    /** Video height */
    height?: number;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
    thumbnail?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
    cover?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** Start timestamp for the video in the message */
    startTimestamp?: number;
    /** Video caption (may also be used when resending videos by fileId), 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the video caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Pass True, if the caption must be shown above the message media */
    showCaptionAboveMedia?: boolean;
    /** Pass True if the video needs to be covered with a spoiler animation */
    hasSpoiler?: boolean;
    /** Pass True if the uploaded video is suitable for streaming */
    supportsStreaming?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    video: import("../index").Video;
  };

  /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
  sendAnimation(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Animation to send. Pass a fileId as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. */
    animation: MediaDataParam;
    /** Duration of sent animation in seconds */
    duration?: number;
    /** Animation width */
    width?: number;
    /** Animation height */
    height?: number;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
    thumbnail?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** Animation caption (may also be used when resending animation by fileId), 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the animation caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Pass True, if the caption must be shown above the message media */
    showCaptionAboveMedia?: boolean;
    /** Pass True if the animation needs to be covered with a spoiler animation */
    hasSpoiler?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    animation: import("../index").Animation;
  };

  /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
  sendVoice(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Audio file to send. Pass a fileId as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
    voice: MediaDataParam;
    /** Voice message caption, 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the voice message caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Duration of the voice message in seconds */
    duration?: number;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    voice: import("../index").Voice;
  };

  /** Use this method to send video messages. On success, the sent Message is returned.
  As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
  sendVideoNote(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Video note to send. Pass a fileId as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported */
    videoNote: MediaDataParam;
    /** Duration of sent video in seconds */
    duration?: number;
    /** Video width and height, i.e. diameter of the video message */
    length?: number;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
    thumbnail?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    videoNote: import("../index").VideoNote;
  };

  /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
  sendMediaGroup(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** An array describing messages to be sent, must include 2-10 items */
    media: ReadonlyArray<
      InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo
    >;
    /** Sends the messages silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent messages from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
  }): Array<
    | (import("../index").Message & {
        audio: import("../index").Audio;
      })
    | (import("../index").Message & {
        document: import("../index").Document;
      })
    | (import("../index").Message & {
        photo: import("../index").Photo;
      })
    | (import("../index").Message & {
        video: import("../index").Video;
      })
  >;

  /** Use this method to send point on the map. On success, the sent Message is returned. */
  sendLocation(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Latitude of the location */
    latitude: number;
    /** Longitude of the location */
    longitude: number;
    /** The radius of uncertainty for the location, measured in meters; 0-1500 */
    horizontalAccuracy?: number;
    /** Period in seconds during which the location will be updated (see Live Locations, should be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely. */
    livePeriod?: number;
    /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
    heading?: number;
    /** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
    proximityAlertRadius?: number;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    location: import("../index").Location;
  };

  /** Use this method to edit live location messages. A location can be edited until its livePeriod expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
  editMessageLiveLocation(args: {
    /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
    businessConnectionId?: string;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId?: number | string;
    /** Required if inlineMessageId is not specified. Identifier of the message to edit */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string | number;
    /** Latitude of new location */
    latitude: number;
    /** Longitude of new location */
    longitude: number;
    /** New period in seconds during which the location can be updated, starting from the message send date. If 0x7FFFFFFF is specified, then the location can be updated forever. Otherwise, the new value must not exceed the current livePeriod by more than a day, and the live location expiration date must remain within the next 90 days. If not specified, then livePeriod remains unchanged */
    livePeriod?: number;
    /** The radius of uncertainty for the location, measured in meters; 0-1500 */
    horizontalAccuracy?: number;
    /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
    heading?: number;
    /** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
    proximityAlertRadius?: number;
    /** An object for a new inline keyboard. */
    replyMarkup?: InlineKeyboardMarkup;
  }):
    | (import("../index").Message & {
        location: import("../index").Location;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
    | true;

  /** Use this method to stop updating a live location message before livePeriod expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
  stopMessageLiveLocation(args: {
    /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
    businessConnectionId?: string;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId?: number | string;
    /** Required if inlineMessageId is not specified. Identifier of the message with live location to stop */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string;
    /** An object for a new inline keyboard. */
    replyMarkup?: InlineKeyboardMarkup;
  }):
    | (import("../index").Message & {
        location: import("../index").Location;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
    | true;

  /** Use this method to send paid media to channel chats. On success, the sent Message is returned. */
  sendPaidMedia(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`). If the chat is a channel, all Telegram Star proceeds from this media will be credited to the chat's balance. Otherwise, they will be credited to the bot's balance */
    chatId: number | string;
    /** The number of Telegram Stars that must be paid to buy access to the media; 1-2500 */
    starCount: number;
    /** An array describing the media to be sent; up to 10 items */
    media: InputPaidMedia[];
    /** Bot-defined paid media payload, 0-128 bytes. This will not be displayed to the user, use it for your internal processes. */
    payload?: string;
    /** Media caption, 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the media caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Pass True, if the caption must be shown above the message media */
    showCaptionAboveMedia?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    paidMedia: import("../index").PaidMedia;
  };

  /** Use this method to send information about a venue. On success, the sent Message is returned. */
  sendVenue(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Latitude of the venue */
    latitude: number;
    /** Longitude of the venue */
    longitude: number;
    /** Name of the venue */
    title: string;
    /** Address of the venue */
    address: string;
    /** Foursquare identifier of the venue */
    foursquareId?: string;
    /** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
    foursquareType?: string;
    /** Google Places identifier of the venue */
    googlePlaceId?: string;
    /** Google Places type of the venue. (See supported types.) */
    googlePlaceType?: string;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    venue: import("../index").Venue;
  };

  /** Use this method to send phone contacts. On success, the sent Message is returned. */
  sendContact(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Contact's phone number */
    phoneNumber: string;
    /** Contact's first name */
    firstName: string;
    /** Contact's last name */
    lastName?: string;
    /** Additional data about the contact in the form of a vCard, 0-2048 bytes */
    vcard?: string;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    contact: import("../index").Contact;
  };

  /** Use this method to send a native poll. On success, the sent Message is returned. */
  sendPoll(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Poll question, 1-300 characters */
    question: string;
    /** Mode for parsing entities in the question. See formatting options for more details. Currently, only custom emoji entities are allowed */
    questionParseMode?: ParseMode;
    /** A list of special entities that appear in the poll question. It can be specified instead of questionParseMode */
    questionEntities?: MessageEntity[];
    /** A list of 2-10 answer options */
    options: InputPollOption[];
    /** True, if the poll needs to be anonymous, defaults to True */
    isAnonymous?: boolean;
    /** Poll type, “quiz” or “regular”, defaults to “regular” */
    type?: "quiz" | "regular";
    /** True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False */
    allowsMultipleAnswers?: boolean;
    /** 0-based identifier of the correct answer option, required for polls in quiz mode */
    correctOptionId?: number;
    /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing */
    explanation?: string;
    /** Mode for parsing entities in the explanation. See formatting options for more details. */
    explanationParseMode?: ParseMode;
    /** A list of special entities that appear in the poll explanation. It can be specified instead of explanationParseMode */
    explanationEntities?: MessageEntity[];
    /** Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with closeDate. */
    openPeriod?: number;
    /** Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with openPeriod. */
    closeDate?: number;
    /** Pass True if the poll needs to be immediately closed. This can be useful for poll preview. */
    isClosed?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    poll: import("../index").Poll;
  };

  /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
  sendDice(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰". Defaults to "🎲" */
    emoji?: string;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    dice: import("../index").Dice;
  };

  /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.

  Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.

  We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
  sendChatAction(args: {
    /** Unique identifier of the business connection on behalf of which the action will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes. */
    action:
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
      | "upload_video_note";
    /** Unique identifier for the target message thread; for supergroups only */
    messageThreadId?: string | number;
  }): true;

  /** Marks incoming message as read on behalf of a business account. Requires the can_read_messages business bot right. Returns True on success. */
  readBusinessMessage(args: {
    /** Unique identifier of the business connection on behalf of which to read the message */
    businessConnectionId: string;
    /** Unique identifier of the chat in which the message was received. The chat must have been active in the last 24 hours. */
    chatId: string | number;
    /** Unique identifier of the message to mark as read */
    messageId: string | number;
  }): true;

  /** Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. In albums, bots must react to the first message. Returns True on success. */
  setMessageReaction(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Identifier of the target message */
    messageId: string | number;
    /** A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots. */
    reaction?: ReactionType[];
    /** Pass True to set the reaction with a big animation */
    isBig?: boolean;
  }): true;

  /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
  getUserProfilePhotos(args: {
    /** Unique identifier of the target user */
    userId: string | number;
    /** Sequential number of the first photo to be returned. By default, all photos are returned. */
    offset?: number;
    /** Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
    limit?: number;
  }): import("../index").UserProfilePhotos;

  /** Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess. Returns True on success. */
  setUserEmojiStatus(args: {
    /** Unique identifier of the target user */
    userId: string | number;
    /** Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status. */
    emojiStatusCustomEmojiId?: string;
    /** Expiration date of the emoji status, if any */
    emojiStatusExpirationDate?: number;
  }): true;

  /** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.

  Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
  getFile(args: {
    /** File identifier to get information about */
    fileId: string;
  }): import("../index").InputFile;

  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  kickChatMember: ApiMethods["banChatMember"];

  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  banChatMember(args: {
    /** Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
    /** Date when the user will be unbanned; Unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only. */
    untilDate?: number;
    /** Pass True to delete all messages from the chat for the user that is being removed. If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels. */
    revokeMessages?: boolean;
  }): true;

  /** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter onlyIfBanned. Returns True on success. */
  unbanChatMember(args: {
    /** Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
    /** Do nothing if the user is not banned */
    onlyIfBanned?: boolean;
  }): true;

  /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
  restrictChatMember(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
    /** An object for new user permissions */
    permissions: import("../index").ChatPermissionFlags;
    /** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
    useIndependentChatPermissions?: boolean;
    /** Date when restrictions will be lifted for the user; Unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever */
    untilDate?: number;
  }): true;

  /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
  promoteChatMember(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
    /** Pass True if the administrator's presence in the chat is hidden */
    isAnonymous?: boolean;
    /** An object for new user permissions */
    permissions: import("../index").ChatPermissionFlags;
  }): true;

  /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
  setChatAdministratorCustomTitle(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
    /** New custom title for the administrator; 0-16 characters, emoji are not allowed */
    customTitle: string;
  }): true;

  /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
  banChatSenderChat(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target sender chat */
    senderChatId: string | number;
  }): true;

  /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
  unbanChatSenderChat(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target sender chat */
    senderChatId: string | number;
  }): true;

  /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
  setChatPermissions(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** An object for new default chat permissions */
    permissions: import("../index").ChatPermissionFlags;
    /** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
    useIndependentChatPermissions?: boolean;
  }): true;

  /** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.

  Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
  exportChatInviteLink(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
  }): string;

  /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
  createChatInviteLink(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Invite link name; 0-32 characters */
    name?: string;
    /** Point in time (Unix timestamp) when the link will expire */
    expireDate?: number;
    /** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
    memberLimit?: number;
    /** True, if users joining the chat via the link need to be approved by chat administrators. If True, memberLimit can't be specified */
    createsJoinRequest?: boolean;
  }): import("../index").ChatInviteLink;

  /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  editChatInviteLink(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** The invite link to edit */
    inviteLink: string;
    /** Invite link name; 0-32 characters */
    name?: string;
    /** Point in time (Unix timestamp) when the link will expire */
    expireDate?: number;
    /** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
    memberLimit?: number;
    /** True, if users joining the chat via the link need to be approved by chat administrators. If True, memberLimit can't be specified */
    createsJoinRequest?: boolean;
  }): import("../index").ChatInviteLink;

  /** Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink. Returns the new invite link as a ChatInviteLink object. */
  createChatSubscriptionInviteLink(args: {
    /** Unique identifier for the target channel chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Invite link name; 0-32 characters */
    name?: string;
    /** The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days) */
    subscriptionPeriod: number;
    /** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-2500 */
    subscriptionPrice: number;
  }): import("../index").ChatInviteLink;

  /** Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights. Returns the edited invite link as a ChatInviteLink object. */
  editChatSubscriptionInviteLink(args: {
    /** Unique identifier for the target channel chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** The invite link to edit */
    inviteLink: string;
    /** Invite link name; 0-32 characters */
    name?: string;
  }): import("../index").ChatInviteLink;

  /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
  revokeChatInviteLink(args: {
    /** Unique identifier of the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** The invite link to revoke */
    inviteLink: string;
  }): import("../index").ChatInviteLink;

  /** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  approveChatJoinRequest(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
  }): true;

  /** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
  declineChatJoinRequest(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
  }): true;

  /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  setChatPhoto(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** New chat photo, uploaded using multipart/form-data */
    photo: MediaDataParam;
  }): true;

  /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  deleteChatPhoto(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
  }): true;

  /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  setChatTitle(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** New chat title, 1-128 characters */
    title: string;
  }): true;

  /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
  setChatDescription(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** New chat description, 0-255 characters */
    description?: string;
  }): true;

  /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  pinChatMessage(args: {
    /** Unique identifier of the business connection on behalf of which the message will be pinned */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Identifier of a message to pin */
    messageId: string | number;
    /** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats. */
    disableNotification?: boolean;
  }): true;

  /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  unpinChatMessage(args: {
    /** Unique identifier of the business connection on behalf of which the message will be unpinned */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be pinned. */
    messageId?: string | number;
  }): true;

  /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
  unpinAllChatMessages(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
  }): true;

  /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
  leaveChat(args: {
    /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
    chatId: number | string;
  }): true;

  /** Use this method to get up-to-date information about the chat. Returns a ChatFullInfo object on success. */
  getChat(args: {
    /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
    chatId: number | string;
  }): import("../index").ChatFullInfo;

  /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
  getChatAdministrators(args: {
    /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
    chatId: number | string;
  }): Array<import("../index").ChatAdministratorRights>;

  /** Use this method to get the number of members in a chat. Returns Int on success. */
  getChatMemberCount(args: {
    /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
    chatId: number | string;
  }): number;

  /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
  getChatMember(args: {
    /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
  }): import("../index").ChatMember;

  /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  setChatStickerSet(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Name of the sticker set to be set as the group sticker set */
    stickerSetName: string;
  }): true;

  /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
  deleteChatStickerSet(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
  }): true;

  /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
  getForumTopicIconStickers(): import("../index").Sticker[];
  /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
  createForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Topic name, 1-128 characters */
    name: string;
    /** Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F) */
    iconColor?: 0x6fb9f0 | 0xffd67e | 0xcb86db | 0x8eee98 | 0xff93b2 | 0xfb6f5f;
    /** Unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. */
    iconCustomEmojiId?: string;
  }): import("../index").ForumTopic;

  /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  editForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread of the forum topic */
    messageThreadId: string | number;
    /** New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept */
    name?: string;
    /** New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept */
    iconCustomEmojiId?: string;
  }): true;

  /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  closeForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread of the forum topic */
    messageThreadId: string | number;
  }): true;

  /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
  reopenForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread of the forum topic */
    messageThreadId: string | number;
  }): true;

  /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
  deleteForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread of the forum topic */
    messageThreadId: string | number;
  }): true;

  /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
  unpinAllForumTopicMessages(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread of the forum topic */
    messageThreadId: string | number;
  }): true;

  /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
  editGeneralForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
    /** New topic name, 1-128 characters */
    name: string;
  }): true;

  /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  closeGeneralForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
  }): true;

  /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
  reopenGeneralForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
  }): true;

  /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
  hideGeneralForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
  }): true;

  /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
  unhideGeneralForumTopic(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
  }): true;

  /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
  unpinAllGeneralForumTopicMessages(args: {
    /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
    chatId: number | string;
  }): true;

  /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  answerCallbackQuery(args: {
    /** Unique identifier for the query to be answered */
    callbackQueryId: string;
    /** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters */
    text?: string;
    /** If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false. */
    showAlert?: boolean;
    /** URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button.

    Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    url?: string;
    /** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0. */
    cacheTime?: number;
  }): true;

  /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
  getUserChatBoosts(args: {
    /** Unique identifier for the chat or username of the channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier of the target user */
    userId: string | number;
  }): import("../index").UserChatBoosts;

  /** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
  getBusinessConnection(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
  }): import("../index").BusinessConnection;

  /** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots/features#commands for more details about bot commands. Returns True on success. */
  setMyCommands(args: {
    /** A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified. */
    commands: readonly BotCommand[];
    /** An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
    scope?: BotCommandScope;
    /** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
    languageCode?: LanguageCode;
  }): true;

  /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
  deleteMyCommands(args: {
    /** An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
    scope?: BotCommandScope;
    /** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
    languageCode?: LanguageCode;
  }): true;

  /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
  getMyCommands(args: {
    /** An object, describing scope of users. Defaults to BotCommandScopeDefault. */
    scope?: BotCommandScope;
    /** A two-letter ISO 639-1 language code or an empty string */
    languageCode?: LanguageCode;
  }): BotCommand[];

  /** Use this method to change the bot's name. Returns True on success. */
  setMyName(args: {
    /** New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language. */
    name?: string;
    /** A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name. */
    languageCode?: LanguageCode;
  }): true;

  /** Use this method to get the current bot name for the given user language. Returns BotName on success. */
  getMyName(args: {
    /** A two-letter ISO 639-1 language code or an empty string */
    languageCode?: LanguageCode;
  }): string;

  /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
  setMyDescription(args: {
    /** New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language. */
    description?: string;
    /** A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description. */
    languageCode?: LanguageCode;
  }): true;

  /** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
  getMyDescription(args: {
    /** A two-letter ISO 639-1 language code or an empty string */
    languageCode?: LanguageCode;
  }): string;

  /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
  setMyShortDescription(args: {
    /** New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language. */
    shortDescription?: string;
    /** A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description. */
    languageCode?: LanguageCode;
  }): true;

  /** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
  getMyShortDescription(args: {
    /** A two-letter ISO 639-1 language code or an empty string */
    languageCode?: LanguageCode;
  }): string;

  /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
  setChatMenuButton(args: {
    /** Unique identifier for the target private chat. If not specified, default bot's menu button will be changed */
    chatId?: string | number;
    /** An object for the bot's new menu button. Defaults to MenuButtonDefault */
    menuButton?: MenuButton;
  }): true;

  /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
  getChatMenuButton(args: {
    /** Unique identifier for the target private chat. If not specified, default bot's menu button will be returned */
    chatId?: string | number;
  }): import("../index").MenuButton;

  /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
  setMyDefaultAdministratorRights(args: {
    /** An object describing new default administrator rights. If not specified, the default administrator rights will be cleared. */
    rights?: import("../index").ChatPermissionFlags;
    /** Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed. */
    forChannels?: boolean;
  }): true;

  /** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
  getMyDefaultAdministratorRights(args: {
    /** Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned. */
    forChannels?: boolean;
  }): import("../index").ChatAdministratorRights;

  /** Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success. */
  setBusinessAccountName(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** The new value of the first name for the business account; 1-64 characters */
    firstName: string;
    /** The new value of the last name for the business account; 0-64 characters */
    lastName?: string;
  }): true;

  /** Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success. */
  setBusinessAccountUsername(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** The new value of the username for the business account; 0-32 characters */
    username?: string;
  }): true;

  /** Changes the bio of a managed business account. Requires the can_change_bio business bot right. Returns True on success. */
  setBusinessAccountBio(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** The new value of the bio for the business account; 0-140 characters */
    bio?: string;
  }): true;

  /** Changes the profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
  setBusinessAccountProfilePhoto(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** The new profile photo to set */
    photo: InputProfilePhoto;
    /** Pass True to set the public photo, which will be visible even if the main photo is hidden by the business account's privacy settings. An account can have only one public photo. */
    isPublic?: boolean;
  }): true;

  /** Removes the current profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
  removeBusinessAccountProfilePhoto(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Pass True to remove the public photo, which is visible even if the main photo is hidden by the business account's privacy settings. After the main photo is removed, the previous profile photo (if present) becomes the main photo. */
    isPublic?: boolean;
  }): true;

  /** Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the can_change_gift_settings business bot right. Returns True on success. */
  setBusinessAccountGiftSettings(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Pass True, if a button for sending a gift to the user or by the business account must always be shown in the input field */
    showGiftButton: boolean;
    /** Types of gifts accepted by the business account */
    acceptedGiftTypes: AcceptedGiftTypes;
  }): true;

  /** Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns StarAmount on success. */
  getBusinessAccountStarBalance(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
  }): import("../index").StarAmount;

  /** Returns the gifts received and owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns OwnedGifts on success. */
  getBusinessAccountGifts(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Pass True to exclude gifts that aren't saved to the account's profile page */
    excludeUnsaved?: boolean;
    /** Pass True to exclude gifts that are saved to the account's profile page */
    excludeSaved?: boolean;
    /** Pass True to exclude gifts that can be purchased an unlimited number of times */
    excludeUnlimited?: boolean;
    /** Pass True to exclude gifts that can be purchased a limited number of times */
    excludeLimited?: boolean;
    /** Pass True to exclude unique gifts */
    excludeUnique?: boolean;
    /** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
    sortByPrice?: boolean;
    /** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
    offset?: string;
    /** The maximum number of gifts to be returned; 1-100. Defaults to 100 */
    limit?: number;
  }): import("../index").OwnedGifts;

  /** Converts a given regular gift to Telegram Stars. Requires the can_convert_gifts_to_stars business bot right. Returns True on success. */
  convertGiftToStars(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Unique identifier of the regular gift that should be converted to Telegram Stars */
    ownedGiftId: string;
  }): true;

  /** Upgrades a given regular gift to a unique gift. Requires the can_transfer_and_upgrade_gifts business bot right. Additionally requires the can_transfer_stars business bot right if the upgrade is paid. Returns True on success. */
  upgradeGift(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Unique identifier of the regular gift that should be upgraded to a unique one */
    ownedGiftId: string;
    /** Pass True to keep the original gift text, sender and receiver in the upgraded gift */
    keepOriginalDetails?: boolean;
    /** The amount of Telegram Stars that will be paid for the upgrade from the business account balance. If gift.prepaid_upgrade_star_count > 0, then pass 0, otherwise, the can_transfer_stars business bot right is required and gift.upgrade_star_count must be passed. */
    sttrCount?: number;
  }): true;

  /** Transfers an owned unique gift to another user. Requires the can_transfer_and_upgrade_gifts business bot right. Requires can_transfer_stars business bot right if the transfer is paid. Returns True on success. */
  transferGift(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Unique identifier of the regular gift that should be transferred */
    ownedGiftId: string;
    /** Unique identifier of the chat which will own the gift. The chat must be active in the last 24 hours. */
    newOwnerChatId: number;
    /** The amount of Telegram Stars that will be paid for the transfer from the business account balance. If positive, then the can_transfer_stars business bot right is required. */
    starCount: number;
  }): true;

  /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageText(args: {
    /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
    businessConnectionId?: string;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId?: number | string;
    /** Required if inlineMessageId is not specified. Identifier of the message to edit */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string | number;
    /** New text of the message, 1-4096 characters after entities parsing */
    text: string;
    /** Mode for parsing entities in the message text. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in message text, which can be specified instead of parseMode */
    entities?: MessageEntity[];
    /** Link preview generation options for the message */
    linkPreviewOptions?: LinkPreviewOptions;
    /** An object for an inline keyboard. */
    replyMarkup?: InlineKeyboardMarkup;
  }):
    | (import("../index").Message & {
        content: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
    | true;

  /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageCaption(args: {
    /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
    businessConnectionId?: string;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId?: number | string;
    /** Required if inlineMessageId is not specified. Identifier of the message to edit */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string | number;
    /** New caption of the message, 0-1024 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the message caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parseMode */
    captionEntities?: MessageEntity[];
    /** Pass True, if the caption must be shown above the message media. Supported only for animation, photo and video messages. */
    showCaptionAboveMedia?: boolean;
    /** An object for an inline keyboard. */
    replyMarkup?: InlineKeyboardMarkup;
  }):
    | (import("../index").Message & {
        caption?: string;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
    | true;

  /** Use this method to edit animation, audio, document, photo, video messages or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its fileId or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageMedia(args: {
    /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
    businessConnectionId?: string;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId?: number | string;
    /** Required if inlineMessageId is not specified. Identifier of the message to edit */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string | number;
    /** An object for a new media content of the message */
    media: InputMedia;
    /** An object for a new inline keyboard. */
    replyMarkup?: InlineKeyboardMarkup;
  }):
    | (import("../index").Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
    | true;

  /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
  editMessageReplyMarkup(args: {
    /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
    businessConnectionId?: string;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId?: number | string;
    /** Required if inlineMessageId is not specified. Identifier of the message to edit */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string | number;
    /** An object for an inline keyboard. */
    replyMarkup?: InlineKeyboardMarkup;
  }):
    | (import("../index").Message & {
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
    | true;

  /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
  stopPoll(args: {
    /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Identifier of the original message with the poll */
    messageId: string | number;
    /** An object for a new message inline keyboard. */
    replyMarkup?: InlineKeyboardMarkup;
  }): Omit<import("../index").Poll, "close">;

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
  deleteMessage(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Identifier of the message to delete */
    messageId: string | number;
  }): true;

  /** Use this method to delete multiple messages simultaneously. Returns True on success. */
  deleteMessages(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** A list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted */
    messageIds: (string | number)[];
  }): true;

  /** Delete messages on behalf of a business account. Requires the can_delete_outgoing_messages business bot right to delete messages sent by the bot itself, or the can_delete_all_messages business bot right to delete any message. Returns True on success. */
  deleteBusinessMessages(args: {
    /** Unique identifier of the business connection on behalf of which to delete the messages */
    businessConnectionId: string;
    /** A list of 1-100 identifiers of messages to delete. All messages must be from the same chat. See deleteMessage for limitations on which messages can be deleted */
    messageIds: number[];
  }): true;

  /** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
  sendSticker(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Sticker to send. Pass a fileId as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. Video and animated stickers can't be sent via an HTTP URL. */
    sticker: MediaDataParam;
    /** Emoji associated with the sticker; only for just uploaded stickers */
    emoji?: string;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
    replyMarkup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
  }): import("../index").Message & {
    sticker: import("../index").Sticker;
  };

  /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
  getStickerSet(args: {
    /** Name of the sticker set */
    name: string;
  }): import("../index").StickerSet;

  /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
  getCustomEmojiStickers(args: {
    /** A list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified. */
    customEmojiIds: string[];
  }): import("../index").Sticker[];

  /** Use this method to upload a file with a sticker for later use in the createNewStickerSet, addStickerToSet, or replaceStickerInSet methods (the file can be used multiple times). Returns the uploaded File on success. */
  uploadStickerFile(args: {
    /** User identifier of sticker file owner */
    userId: string | number;
    /** Format of the sticker, must be one of “static”, “animated”, “video” */
    stickerFormat: "static" | "animated" | "video";
    /** A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format. See https://core.telegram.org/stickers for technical requirements. */
    sticker: MediaDataParam;
  }): import("../index").InputFile;

  /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
  createNewStickerSet(args: {
    /** User identifier of created sticker set owner */
    userId: string | number;
    /** Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in "_by_<bot_username>". <bot_username> is case insensitive. 1-64 characters. */
    name: string;
    /** Sticker set title, 1-64 characters */
    title: string;
    /** A list of 1-50 initial stickers to be added to the sticker set */
    stickers: InputSticker[];
    /** Type of stickers in the set, pass “regular”, “mask”, or “custom_emoji”. By default, a regular sticker set is created. */
    stickerType?: "regular" | "mask" | "custom_emoji";
    /** Pass True if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only */
    needsRepainting?: boolean;
  }): true;

  /** Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns True on success. */
  addStickerToSet(args: {
    /** User identifier of sticker set owner */
    userId: string | number;
    /** Sticker set name */
    name: string;
    /** An object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set isn't changed. */
    sticker: InputSticker;
  }): true;

  /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
  setStickerPositionInSet(args: {
    /** File identifier of the sticker */
    sticker: string;
    /** New sticker position in the set, zero-based */
    position: number;
  }): true;

  /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
  deleteStickerFromSet(args: {
    /** File identifier of the sticker */
    sticker: string;
  }): true;

  /** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
  replaceStickerInSet(args: {
    /** User identifier of the sticker set owner */
    userId: string | number;
    /** Sticker set name */
    name: string;
    /** File identifier of the replaced sticker */
    oldSticker: string;
    /** An object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set remains unchanged.:x */
    sticker: InputSticker;
  }): true;

  /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  setStickerEmojiList(args: {
    /** File identifier of the sticker */
    sticker: string;
    /** A list of 1-20 emoji associated with the sticker */
    emojiList: string[];
  }): true;

  /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
  setStickerKeywords(args: {
    /** File identifier of the sticker */
    sticker: string;
    /** A list of 0-20 search keywords for the sticker with total length of up to 64 characters */
    keywords?: string[];
  }): true;

  /** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
  setStickerMaskPosition(args: {
    /** File identifier of the sticker */
    sticker: string;
    /** An object with the position where the mask should be placed on faces. Omit the parameter to remove the mask position. */
    maskPosition?: MaskPosition;
  }): true;

  /** Use this method to set the title of a created sticker set. Returns True on success. */
  setStickerSetTitle(args: {
    /** Sticker set name */
    name: string;
    /** Sticker set title, 1-64 characters */
    title: string;
  }): true;

  /** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
  deleteStickerSet(args: {
    /** Sticker set name */
    name: string;
  }): true;

  /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
  setStickerSetThumbnail(args: {
    /** Sticker set name */
    name: string;
    /** User identifier of the sticker set owner */
    userId: string | number;
    /** A .WEBP or .PNG image with the thumbnail, must be up to 128 kilobytes in size and have a width and height of exactly 100px, or a .TGS animation with a thumbnail up to 32 kilobytes in size (see https://core.telegram.org/stickers#animation-requirements for animated sticker technical requirements), or a .WEBM video with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#video-requirements for video sticker technical requirements. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files ». Animated and video sticker set thumbnails can't be uploaded via HTTP URL. If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail. */
    thumbnail?:
      | Buffer
      | ReadStream
      | Blob
      | FormData
      | DataView
      | ArrayBuffer
      | Uint8Array
      | string;
    /** Format of the thumbnail, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, or “video” for a .WEBM video */
    format: "static" | "animated" | "video";
  }): true;

  /** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
  setCustomEmojiStickerSetThumbnail(args: {
    /** Sticker set name */
    name: string;
    /** Custom emoji identifier of a sticker from the sticker set; pass an empty string to drop the thumbnail and use the first sticker as the thumbnail. */
    customEmojiId?: string;
  }): true;

  /** Posts a story on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
  postStory(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Content of the story */
    content: InputStoryContent;
    /** Period after which the story is moved to the archive, in seconds; must be one of 6 * 3600, 12 * 3600, 86400, or 2 * 86400 */
    activePeriod: number;
    /** Caption of the story, 0-2048 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the story caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
    captionEntities?: MessageEntity[];
    /** A list of clickable areas to be shown on the story */
    areas?: StoryArea[];
    /** Pass True to keep the story accessible after it expires */
    postToChatPage?: boolean;
    /** Pass True if the content of the story must be protected from forwarding and screenshotting */
    protectContent?: boolean;
  }): import("../index").Story;

  /** Edits a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
  editStory(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Unique identifier of the story to edit */
    storyId: number;
    /** Content of the story */
    content: InputStoryContent;
    /** Caption of the story, 0-2048 characters after entities parsing */
    caption?: string;
    /** Mode for parsing entities in the story caption. See formatting options for more details. */
    parseMode?: ParseMode;
    /** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
    captionEntities?: MessageEntity[];
    /** A list of clickable areas to be shown on the story */
    areas?: StoryArea;
  }): import("../index").Story;

  /** Deletes a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns True on success. */
  deleteStory(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Unique identifier of the story to delete */
    storyId: number;
  }): true;

  /** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
  getAvailableGifts(): import("../index").Gifts;

  /** Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receive. Returns True on success. */
  sendGift(args: {
    /** Required if chat_id is not specified. Unique identifier of the target user who will receive the gift. */
    userId?: number | string;
    /** Required if user_id is not specified. Unique identifier for the chat or username of the channel (in the format @channelusername) that will receive the gift. */
    chatId?: number | string;
    /** Identifier of the gift */
    giftId: string;
    /** Pass True to pay for the gift upgrade from the bot's balance, thereby making the upgrade free for the receiver */
    payForUpgrade?: boolean;
    /** Text that will be shown along with the gift; 0-255 characters */
    text?: string;
    /** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
    textParseMode?: ParseMode;
    /** A list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
    textEntities?: MessageEntity[];
  }): true;

  /** Gifts a Telegram Premium subscription to the given user. Returns True on success. */
  giftPremiumSubscription(args: {
    /** Unique identifier of the target user who will receive a Telegram Premium subscription */
    userId: string | number;
    /** Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12 */
    monthCount: 3 | 6 | 12;
    /** Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months */
    starCount: 1000 | 1500 | 2500;
    /** Text that will be shown along with the service message about the subscription; 0-128 characters */
    text?: string;
    /** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
    textParseMode?: ParseMode;
    /** A list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
    textEntities?: MessageEntity[];
  }): true;

  /** Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right. Returns True on success. */
  transferBusinessAccountStars(args: {
    /** Unique identifier of the business connection */
    businessConnectionId: string;
    /** Number of Telegram Stars to transfer; 1-10000 */
    starCount: number;
  }): true;

  /** Use this method to send answers to an inline query. On success, True is returned.
  No more than 50 results per query are allowed.

  Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities. */
  answerInlineQuery(args: {
    /** Unique identifier for the answered query */
    inlineQueryId: string;
    /** An array of results for the inline query */
    results: readonly InlineQueryResult[];
    /** The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300. */
    cacheTime?: number;
    /** Pass True if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query. */
    isPersonal?: boolean;
    /** Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes. */
    nextOffset?: string;
    /** An object describing a button to be shown above inline query results */
    button?: InlineQueryResultsButton;
  }): true;

  /** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
  answerWebAppQuery(args: {
    /** Unique identifier for the query to be answered */
    webAppQueryId: string;
    /** An object describing the message to be sent */
    result: InlineQueryResult;
  }): string;

  /** Stores a message that can be sent by a user of a Mini App. Returns a PreparedInlineMessage object. */
  savePreparedInlineMessage(args: {
    /** Unique identifier of the target user that can use the prepared message */
    userId: string | number;
    /** An object describing the message to be sent */
    result: InlineQueryResult;
    /** Pass True if the message can be sent to private chats with users */
    allowUserChats?: boolean;
    /** Pass True if the message can be sent to private chats with bots */
    allowBotChats?: boolean;
    /** Pass True if the message can be sent to group and supergroup chats */
    allowGroupChats?: boolean;
    /** Pass True if the message can be sent to channel chats */
    allowChannelChats?: boolean;
  }): import("../index").PreparedInlineMessage;

  /** Use this method to send invoices. On success, the sent Message is returned. */
  sendInvoice(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Product name, 1-32 characters */
    title: string;
    /** Product description, 1-255 characters */
    description: string;
    /** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. */
    payload: string;
    /** Payment provider token, obtained via BotFather. Pass an empty string for payments in Telegram Stars. */
    providerToken?: string;
    /** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
    currency: string;
    /** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
    prices: readonly LabeledPrice[];
    /** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass maxTipAmount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
    maxTipAmount?: number;
    /** An array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed maxTipAmount. */
    suggestedTipAmounts?: number[];
    /** Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter */
    startParameter?: string;
    /** Data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
    providerData?: string;
    /** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. */
    photoUrl?: string;
    /** Photo size in bytes */
    photoSize?: number;
    /** Photo width */
    photoWidth?: number;
    /** Photo height */
    photoHeight?: number;
    /** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
    needName?: boolean;
    /** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
    needPhoneNumber?: boolean;
    /** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
    needEmail?: boolean;
    /** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
    needShippingAddress?: boolean;
    /** Pass True if the user's phone number should be sent to provider. Ignored for payments in Telegram Stars. */
    sendPhoneNumberToProvider?: boolean;
    /** Pass True if the user's email address should be sent to provider. Ignored for payments in Telegram Stars. */
    sendEmailToProvider?: boolean;
    /** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
    isFlexible?: boolean;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** An object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button. */
    replyMarkup?: InlineKeyboardMarkup;
  }): import("../index").Message & {
    invoice: import("../index").Invoice;
  };

  /** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
  createInvoiceLink(args: {
    /** Unique identifier of the business connection on behalf of which the link will be created */
    businessConnectionId?: string;
    /** Product name, 1-32 characters */
    title: string;
    /** Product description, 1-255 characters */
    description: string;
    /** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. */
    payload: string;
    /** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
    providerToken?: string;
    /** Three-letter ISO 4217 currency code, see more on currencies */
    currency: string;
    /** Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.) */
    prices: LabeledPrice[];
    /** The number of seconds the subscription will be active for before the next payment. The currency must be set to “XTR” (Telegram Stars) if the parameter is used. Currently, it must always be 2592000 (30 days) if specified. */
    subscriptionPeriod?: number;
    /** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass maxTipAmount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0 */
    maxTipAmount?: number;
    /** An array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed maxTipAmount. */
    suggestedTipAmounts?: number[];
    /** Data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
    providerData?: string;
    /** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
    photoUrl?: string;
    /** Photo size in bytes */
    photoSize?: number;
    /** Photo width */
    photoWidth?: number;
    /** Photo height */
    photoHeight?: number;
    /** Pass True if you require the user's full name to complete the order */
    needName?: boolean;
    /** Pass True if you require the user's phone number to complete the order */
    needPhoneNumber?: boolean;
    /** Pass True if you require the user's email address to complete the order */
    needEmail?: boolean;
    /** Pass True if you require the user's shipping address to complete the order */
    needShippingAddress?: boolean;
    /** Pass True if the user's phone number should be sent to the provider */
    sendPhoneNumberToProvider?: boolean;
    /** Pass True if the user's email address should be sent to the provider */
    sendEmailToProvider?: boolean;
    /** Pass True if the final price depends on the shipping method */
    isFlexible?: boolean;
  }): string;

  /** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns True on success. */
  editUserStarSubscription(args: {
    /** Identifier of the user whose subscription will be edited */
    userId: string | number;
    /** Telegram payment identifier for the subscription */
    telegramPaymentChargeId: string;
    /** Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot. */
    isCanceled: boolean;
  }): true;

  /** Verifies a user on behalf of the organization which is represented by the bot. Returns True on success. */
  verifyUser(args: {
    /** Unique identifier of the target user */
    userId: string | number;
    /** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
    customDescription?: string;
  }): true;

  /** Verifies a chat on behalf of the organization which is represented by the bot. Returns True on success. */
  verifyChat(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
    /** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
    customDescription?: string;
  }): true;

  /** Removes verification from a user who is currently verified on behalf of the organization represented by the bot. Returns True on success. */
  removeUserVerification(args: {
    /** Unique identifier of the target user */
    userId: string | number;
  }): true;

  /** Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success. */
  removeChatVerification(args: {
    /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
    chatId: number | string;
  }): true;

  /** If you sent an invoice requesting a shipping address and the parameter isFlexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
  answerShippingQuery(args: {
    /** Unique identifier for the query to be answered */
    shippingQueryId: string;
    /** Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible) */
    ok: boolean;
    /** Required if ok is True. An array of available shipping options. */
    shippingOptions?: readonly ShippingOption[];
    /** Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user. */
    errorMessage?: string;
  }): true;

  /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
  answerPreCheckoutQuery(args: {
    /** Unique identifier for the query to be answered */
    preCheckoutQueryId: string;
    /** Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems. */
    ok: boolean;
    /** Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. */
    errorMessage?: string;
  }): true;

  /** Refunds a successful payment in Telegram Stars. Returns True on success. */
  refundStarPayment(args: {
    /** Identifier of the user whose payment will be refunded */
    userId: string | number;
    /** Telegram payment identifier */
    telegramPaymentChargeId: string;
  }): true;

  /** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
  getStarTransactions(args: {
    /** Number of transactions to skip in the response */
    offset?: number;
    /** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
    limit?: number;
  }): import("../index").StarTransactions;

  /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.

  Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
  setPassportDataErrors(args: {
    /** User identifier */
    userId: string | number;
    /** An array describing the errors */
    errors: readonly PassportElementError[];
  }): true;

  /** Use this method to send a game. On success, the sent Message is returned. */
  sendGame(args: {
    /** Unique identifier of the business connection on behalf of which the message will be sent */
    businessConnectionId?: string;
    /** Unique identifier for the target chat */
    chatId: string | number;
    /** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
    messageThreadId?: string | number;
    /** Short name of the game, serves as the unique identifier for the game. Set up your games via BotFather. */
    gameShortName: string;
    /** Sends the message silently. Users will receive a notification with no sound. */
    disableNotification?: boolean;
    /** Protects the contents of the sent message from forwarding and saving */
    protectContent?: boolean;
    /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
    allowPaidBroadcast?: boolean;
    /** Unique identifier of the message effect to be added to the message; for private chats only */
    messageEffectId?: string;
    /** Description of the message to reply to */
    replyParameters?: ReplyParameters;
    /** An object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game. */
    replyMarkup?: InlineKeyboardMarkup;
  }): import("../index").Message & {
    game: import("../index").Game;
  };

  /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
  setGameScore(args: {
    /** User identifier */
    userId: string | number;
    /** New score, must be non-negative */
    score: number;
    /** Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters */
    force?: boolean;
    /** Pass True if the game message should not be automatically edited to include the current scoreboard */
    disableEditMessage?: boolean;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat */
    chatId?: string | number;
    /** Required if inlineMessageId is not specified. Identifier of the sent message */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string;
  }):
    | (import("../index").Message & {
        game: import("../index").Game;
        editedUnixTime: number;
        editedTimestamp: number;
        editedAt: Date;
      })
    | true;

  /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.

  This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
  getGameHighScores(args: {
    /** Target user id */
    userId: string | number;
    /** Required if inlineMessageId is not specified. Unique identifier for the target chat */
    chatId?: string | number;
    /** Required if inlineMessageId is not specified. Identifier of the sent message */
    messageId?: string | number;
    /** Required if chatId and messageId are not specified. Identifier of the inline message */
    inlineMessageId?: string;
  }): import("../index").GameHighScore[];
};

/** This object describes a sticker to be added to a sticker set. */
export interface InputSticker {
  /** The added sticker. Pass a fileId as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. Animated and video stickers can't be uploaded via HTTP URL. */
  sticker: MediaDataParam;
  /** Format of the added sticker, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, “video” for a .WEBM video */
  format: "static" | "animated" | "video";
  /** List of 1-20 emoji associated with the sticker */
  emoji_list: string[];
  /** Position where the mask should be placed on faces. For “mask” stickers only. */
  mask_position?: MaskPosition;
  /** List of 0-20 search keywords for the sticker with total length of up to 64 characters. For “regular” and “custom_emoji” stickers only. */
  keywords?: string[];
}

/** This object represents the content of a media message to be sent. It should be one of
  - InputMediaAnimation
  - InputMediaDocument
  - InputMediaAudio
  - InputMediaPhoto
  - InputMediaVideo */
export type InputMedia =
  | InputMediaAnimation
  | InputMediaDocument
  | InputMediaAudio
  | InputMediaPhoto
  | InputMediaVideo;

/** Represents a photo to be sent. */
export interface InputMediaPhoto {
  /** Type of the result, must be photo */
  type: "photo";
  /** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. */
  media: MediaDataParam;
  /** Caption of the photo to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** Pass True, if the caption must be shown above the message media */
  show_caption_above_media?: boolean;
  /** Mode for parsing entities in the photo caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** List of special entities that appear in the caption, which can be specified instead of parseMode */
  caption_entities?: MessageEntity[];
  /** Pass True if the photo needs to be covered with a spoiler animation */
  has_spoiler?: boolean;
}

/** Represents a video to be sent. */
export interface InputMediaVideo {
  /** Type of the result, must be video */
  type: "video";
  /** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. */
  media: MediaDataParam;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
  thumbnail?:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
  cover?:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Start timestamp for the video in the message */
  start_timestamp?: number;
  /** Caption of the video to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** Pass True, if the caption must be shown above the message media */
  show_caption_above_media?: boolean;
  /** Mode for parsing entities in the video caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** List of special entities that appear in the caption, which can be specified instead of parseMode */
  caption_entities?: MessageEntity[];
  /** Video width */
  width?: number;
  /** Video height */
  height?: number;
  /** Video duration in seconds */
  duration?: number;
  /** Pass True if the uploaded video is suitable for streaming */
  supports_streaming?: boolean;
  /** Pass True if the photo needs to be covered with a spoiler animation */
  has_spoiler?: boolean;
}

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export interface InputMediaAnimation {
  /** Type of the result, must be animation */
  type: "animation";
  /** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. */
  media: MediaDataParam;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
  thumbnail?:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Caption of the animation to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** Pass True, if the caption must be shown above the message media */
  show_caption_above_media?: boolean;
  /** Mode for parsing entities in the animation caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** List of special entities that appear in the caption, which can be specified instead of parseMode */
  caption_entities?: MessageEntity[];
  /** Animation width */
  width?: number;
  /** Animation height */
  height?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Pass True if the photo needs to be covered with a spoiler animation */
  has_spoiler?: boolean;
}

/** Represents an audio file to be treated as music to be sent. */
export interface InputMediaAudio {
  /** Type of the result, must be audio */
  type: "audio";
  /** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. */
  media: MediaDataParam;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
  thumbnail?:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Caption of the audio to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** Mode for parsing entities in the audio caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** List of special entities that appear in the caption, which can be specified instead of parseMode */
  caption_entities?: MessageEntity[];
  /** Duration of the audio in seconds */
  duration?: number;
  /** Performer of the audio */
  performer?: string;
  /** Title of the audio */
  title?: string;
}

/** Represents a general file to be sent. */
export interface InputMediaDocument {
  /** Type of the result, must be document */
  type: "document";
  /** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. */
  media: MediaDataParam;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
  thumbnail?:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Caption of the document to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** Mode for parsing entities in the document caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** List of special entities that appear in the caption, which can be specified instead of parseMode */
  caption_entities?: MessageEntity[];
  /** Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always true, if the document is sent as part of an album. */
  disable_content_type_detection?: boolean;
}

/** This object describes the paid media to be sent. Currently, it can be one of
- InputPaidMediaPhoto
- InputPaidMediaVideo */
export type InputPaidMedia = InputMediaPhoto | InputPaidMediaVideo;

/** The paid media to send is a photo. */
export interface InputPaidMediaPhoto {
  /** Type of the media, must be photo */
  type: "photo";
  /** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  media: MediaDataParam;
}

/** The paid media to send is a video. */
export interface InputPaidMediaVideo {
  /** Type of the media, must be video */
  type: "video";
  /** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  media: MediaDataParam;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  thumbnail?:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
  cover?:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Start timestamp for the video in the message */
  start_timestamp?: number;
  /** Video width */
  width?: number;
  /** Video height */
  height?: number;
  /** Video duration in seconds */
  duration?: number;
  /** Pass True if the uploaded video is suitable for streaming */
  supports_streaming?: boolean;
}

/** This object describes a profile photo to set. Currently, it can be one of
- InputProfilePhotoStatic
- InputProfilePhotoAnimated */
export type InputProfilePhoto =
  | InputProfilePhotoStatic
  | InputProfilePhotoAnimated;

/** A static profile photo in the .JPG format. */
export interface InputProfilePhotoStatic {
  /** Type of the profile photo, must be “static” */
  type: "static";
  /** The static profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  photo:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
}

/** An animated profile photo in the MPEG4 format. */
export interface InputProfilePhotoAnimated {
  /** Type of the profile photo, must be “animated” */
  type: "animated";
  /** The animated profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  animation:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Timestamp in seconds of the frame that will be used as the static profile photo. Defaults to 0.0. */
  main_frame_timestamp?: number;
}

/** This object describes the content of a story to post. Currently, it can be one of
- InputStoryContentPhoto
- InputStoryContentVideo */
export type InputStoryContent = InputStoryContentPhoto | InputStoryContentVideo;

/** Describes a photo to post as a story. */
export interface InputStoryContentPhoto {
  /** Type of the content, must be “photo” */
  type: "photo";
  /** The photo to post as a story. The photo must be of the size 1080x1920 and must not exceed 10 MB. The photo can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  photo:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
}

/** Describes a video to post as a story. */
export interface InputStoryContentVideo {
  /** Type of the content, must be “video” */
  type: "video";
  /** The video to post as a story. The video must be of the size 720x1280, streamable, encoded with H.265 codec, with key frames added each second in the MPEG4 format, and must not exceed 30 MB. The video can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the video was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  video:
    | Buffer
    | ReadStream
    | Blob
    | FormData
    | DataView
    | ArrayBuffer
    | Uint8Array
    | string;
  /** Precise duration of the video in seconds; 0-60 */
  duration?: number;
  /** Timestamp in seconds of the frame that will be used as the static cover for the story. Defaults to 0.0. */
  cover_frame_timestamp?: number;
  /** Pass True if the video has no sound */
  is_animation?: boolean;
}
