import { Api } from "./api.js";
import { Combined, type ResponseApi } from "./core/Combined.js";
import { AllowedUpdates, ApiOptions, MediaPayload } from "./core/ApiClient.js";
import {
  MessageCollector,
  MessageFilter,
  TextCaptionContextMessage,
} from "./collection/MessageCollector.js";
import {
  Message,
  Chat,
  User,
  InlineQuery,
  ChosenInlineResult,
  CallbackQuery,
  ShippingQuery,
  PreCheckoutQuery,
  Poll,
  PollAnswer,
  ChatMemberUpdated,
  ChatJoinRequest,
  Update,
  InlineQueryResult,
  InlineQueryResultsButton,
  BotCommand,
  ChatAdministratorRights,
  ChatFromGetChat,
  ChatInviteLink,
  ChatMember,
  ChatMemberAdministrator,
  ChatMemberOwner,
  ChatPermissions,
  File,
  ForumTopic,
  UserFromGetMe,
  UserProfilePhotos,
  WebhookInfo,
  ForceReply,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  GameHighScore,
  MaskPosition,
  MessageEntity,
  MessageId,
  ParseMode,
  SentWebAppMessage,
  Sticker,
  StickerSet,
  PassportElementError,
  LabeledPrice,
  ShippingOption,
  BotCommandScope,
  BotDescription,
  BotName,
  BotShortDescription,
  MenuButton,
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  InputMedia,
  InputSticker,
} from "@telegram.ts/types";
import util, { filter } from "./util.js";
import { Context } from "./context.js";
import isRegex from "is-regex";

interface MessageTypeMap {
  [key: string]: {
    event: string;
    textEvent?: string;
    captionEvent?: string;
    properties?: { name: string; event: string }[];
  };
}

const messageTypeMap: MessageTypeMap = {
  message: {
    event: "message",
    properties: [
      {
        name: "text",
        event: "message:text",
      },
      {
        name: "caption",
        event: "message:caption",
      },
    ],
  },
  edited_message: {
    event: "edited_message",
    properties: [
      {
        name: "text",
        event: "edited_message:text",
      },
      {
        name: "caption",
        event: "edited_message:caption",
      },
    ],
  },
  channel_post: {
    event: "channel_post",
    properties: [
      {
        name: "text",
        event: "channel_post:text",
      },
      {
        name: "caption",
        event: "channel_post:caption",
      },
    ],
  },
  edited_channel_post: {
    event: "edited_channel_post",
    properties: [
      {
        name: "text",
        event: "edited_channel_post:text",
      },
      {
        name: "caption",
        event: "edited_channel_post:caption",
      },
    ],
  },
  inline_query: {
    event: "inline_query",
  },
  chosen_inline_result: {
    event: "chosen_inline_result",
  },
  callback_query: {
    event: "callback_query",
    properties: [
      {
        name: "data",
        event: "callback_query:data",
      },
      {
        name: "game_short_name",
        event: "callback_query:game_short_name",
      },
    ],
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

class TelegramBot<F = Buffer> extends Api<F> {
  // @ts-ignore
  offset: number | null;
  // @ts-ignore
  options: {
    limit?: number;
    timeout?: number;
    allowed_updates?: AllowedUpdates;
    session?: unknown;
  } = {};
  session: unknown = {};
  #disconnect: boolean = false;
  #getMe: UserFromGetMe = {} as UserFromGetMe;
  last_object?: Update;
  update_id?: number;
  /**
   * Constructs a new TelegramBot object.
   * @param {string} token - The API token for the bot.
   * @param {number} [options.limit=100] - Limits the number of updates to be retrieved. Values between 1-100 are accepted.
   * @param {number} [options.timeout=0] - Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only.
   * @param {AllowedUpdates} [options.allowed_updates=AllowedUpdates] - The types of updates the bot is interested in.
   * @param {unknown} [session=object] - The session object to be used by the bot
   */
  constructor(
    token: string,
    options: {
      limit?: number;
      timeout?: number;
      allowed_updates?: AllowedUpdates;
      session?: unknown;
      api?: ApiOptions;
    } = {},
  ) {
    super(token, options);
    this.offset = null;
    this.options = options;
  }
  /**
   * Defines a command handler.
   * ```ts
   * // Register a command handler for the "/like" command
   * bot.command("like", (message, args) => {
   *   const username = message.from.first_name;
   *   message.reply(`${username}, wrote like ❤️`);
   * });
   *
   * // Register a command handler for multiple commands: "/like" and "/dislike"
   * bot.command(["like", "dislike"], (message, args) => {
   *   const username = message.from.first_name;
   *   if (args[0] === "like") {
   *     message.reply(`${username}, wrote like ❤️`);
   *   } else if (args[0] === "dislike") {
   *     message.reply(`${username}, wrote on dislike 🫠`);
   *   }
   * });
   *
   * // Register a command handler for the "/dislike" command with interactive answer
   * bot.command("dislike", (message, args) => {
   *   const username = message.from.first_name;
   *   message.reply(`${username}, wrote on dislike 🫠`);
   * });
   * ```
   * @param {string | string[] | RegExp} command - The command string or an array of command strings.
   * @param {(message: (Message.TextMessage & Context<F>), args: string[]) => void} callback - The callback function to handle the command.
   * @param {string | boolean} [typeChannel=false] - In what type of channels to watch command
   */
  command(
    command: string | string[] | RegExp,
    callback: (
      message: Message.TextMessage & Context<F>,
      args: string[],
    ) => void,
    typeChannel: "private" | "group" | "supergroup" | "channel" | false = false,
  ): this {
    this.on("message:text", async (message) => {
      if (typeChannel === message.chat.type || typeChannel === false) {
        const args = message.text.split(/\s+/);
        const text = message.text;

        if (
          (typeof command === "string" &&
            (args[0] === `/${command}` ||
              args[0] === `/${command}@${this.#getMe?.username}`)) ||
          (Array.isArray(command) &&
            command.some(
              (cmd) =>
                args[0] === `/${cmd}` ||
                args[0] === `/${cmd}@${this.#getMe?.username}`,
            )) ||
          (isRegex(command) && command.test(text))
        ) {
          await callback(message, args);
        }
      }
    });
    return this;
  }

  /**
   * Defines an action handler.
   * ```ts
   * // Action allows you to track button click events 'callback_data'
   * bot.action("like", (ctx) => {
   *   const username = ctx.first_name;
   *   ctx.reply(`${username}, clicked like ❤️`);
   * });
   *
   * // Action can track, not only one interaction, but several at once
   * bot.action(["like", "dislike"], (ctx) => {
   *   const username = ctx.first_name;
   *   if (ctx.data === "like") {
   *   ctx.reply(`${username}, clicked like ❤️`);
   *   } else {
   *   ctx.reply(`${username}, clicked on dislike 🫠`);
   *   }
   * });
   *
   * // To answer interactively use the third argument 'answer'
   * bot.action("dislike", (ctx) => {
   *   const username = ctx.first_name;
   *   ctx.reply(`${username}, clicked on dislike 🫠`);
   * }, true);
   * ```
   * @param {string | string[] | RegExp} data - The action data string or an array of action data strings.
   * @param {(callbackQuery: (CallbackQuery & { data: string; } & Context<F>)) => void} callback - The callback function to handle the action.
   * @param {boolean} [answer=false] - Whether to answer the action.
   */
  action(
    data: string | string[] | RegExp,
    callback: (
      callbackQuery: CallbackQuery & { data: string } & Context<F>,
    ) => void,
    answer: boolean = false,
  ): this {
    this.on("callback_query:data", async (ctx) => {
      if (
        (typeof data === "string" && ctx.data === data) ||
        (Array.isArray(data) && data.some((d) => d === ctx.data)) ||
        (isRegex(data) && data.test(ctx.data))
      ) {
        if (answer) {
          ctx.answerCallbackQuery().catch(() => console.log);
        }
        await callback(ctx);
      }
    });
    return this;
  }

  /**
   * Registers a callback function to be executed when a message is received
   * that includes the specified text.
   * ```ts
   * bot.hears('hi', (ctx) => ctx.reply('hi!'));
   *
   * bot.hears(['help', 'start'], (ctx) => ctx.reply('helpers!'));
   *
   * bot.hears(/marmok/, (ctx) => ctx.reply("Hi marmok!"));
   * ```
   * @param {string | string[] | RegExp} text - The text to match in the received messages.
   * @param {(message: (Message & Context<F>, args: string[])) => void} callback - The callback function to be executed when a matching message is received.
   * @param {boolean} [caption=false] - track, text only?
   * It receives the matched message object as a parameter.
   * @returns void
   */
  hears(
    text: string | string[] | RegExp,
    callback: (message: Message & Context<F>, args: string[]) => void,
    caption: boolean = false,
  ): this {
    this.on("message", async (message) => {
      if (!caption && message.caption) return;
      const content = (message.text || message.caption) as string;

      if (
        (typeof text === "string" && content.includes(text)) ||
        (Array.isArray(text) && text.some((d) => content.includes(d))) ||
        (isRegex(text) && text.test(content))
      ) {
        const args = content.split(/\s+/);
        await callback(message, args);
      }
    });
    return this;
  }

  /**
   * Registers a callback function to be executed when a message is received containing a 'game' object.
   * ```ts
   * bot.gameQuery("telegramsjs", (ctx) => {
   *  ctx.answerCallbackQuery({ url: "link_game" });
   * });
   *
   * bot.gameQuery(["telegramsjs", "marmok"], (ctx) => {
   *  ctx.answerCallbackQuery({ url: "link_game" });
   * });
   *
   * bot.gameQuery(/telegram/, (ctx) => {
   *  ctx.answerCallbackQuery({ url: "link_game" });
   * });
   * ```
   * @param {string | string[] | RegExp} game - The game data string or an array of game data strings.
   * @param {(gameQuery: (CallbackQuery & { game_short_name: string; } & Context<F>)) => void} callback - The callback function to handle the action.
   */
  gameQuery(
    game: string | string[] | RegExp,
    callback: (
      gameQuery: CallbackQuery & { game_short_name: string } & Context<F>,
    ) => void,
  ): this {
    this.on("callback_query:game_short_name", async (ctx) => {
      if (
        (typeof game === "string" && game === ctx.game_short_name) ||
        (Array.isArray(game) && game.some((g) => g === ctx.game_short_name)) ||
        (isRegex(game) && game.test(ctx.game_short_name))
      ) {
        await callback(ctx);
      }
    });
    return this;
  }

  /**
   * Registers a callback function to be executed when an inline query matches the specified text.
   * ```ts
   * // Example usage for matching a single text
   * bot.inlineQuery('search', (ctx) => {
   *   // Your callback logic here
   * });
   *
   * // Example usage for matching multiple texts using an array
   * bot.inlineQuery(['help', 'info'], (ctx) => {
   *   // Your callback logic here
   * });
   *
   * // Example usage for matching using a regular expression
   * bot.inlineQuery(/^start/, async (ctx) => {
   *   const query = ctx.query;
   *
   * // Your logic to generate results based on the query
   * const results = [
   *  {
   *     type: 'article',
   *     id: '1',
   *     title: 'Result 1',
   *    input_message_content: {
   *       message_text: 'This is result 1'
   *     }
   *   },
   *   // Add more results as needed
   * ];
   *
   * await ctx.answerInlineQuery({ results: results });
   * });
   * ```
   * @param {string | string[] | RegExp} text - The text or patterns to match in the inline query.
   * @param {(inlineQuery: InlineQuery & Context<F>) => void} callback - The callback function to be executed when a matching inline query is received.
   * It receives the matched inline query object as a parameter.
   */
  inlineQuery(
    text: string | string[] | RegExp,
    callback: (inlineQuery: InlineQuery & Context<F>) => void,
  ): this {
    this.on("inline_query", async (ctx) => {
      if (
        (typeof text === "string" && ctx.query === text) ||
        (Array.isArray(text) && text.some((d) => d === ctx.query)) ||
        (isRegex(text) && text.test(ctx.query))
      ) {
        await callback(ctx);
      }
    });
    return this;
  }

  /**
   * Use this function to set a session for the Telegram bot. The "use"
   * function assigns the provided session object to the bot instance,
   * allowing you to use session data and manage user interactions across different requests.
   * @param {session} [session=object] - The session object to be used by the bot
   * @param {combine} [combine=false] - this parameter is responsible for combining previous sessions
   */
  use<T>(session: T, combine: boolean = false): void {
    if (combine) {
      this.session = {
        ...(this.session as T),
        ...session,
      };
      return;
    }
    this.session = session || {};
  }

  /**
   * stop the process of receiving from the Telegram server
   * ```ts
   * process.once('SIGINT', () => bot.disconnect())
   * process.once('SIGTERM', () => bot.disconnect())
   * ```
   */
  disconnect() {
    if (this.#disconnect) this.#disconnect = false;
    else this.#disconnect = true;
  }

  /**
   * The function that starts the whole process.
   * ```ts
   * import { TelegramBot } from "telegramsjs";
   *
   * const bot = new TelegramBot('BOT_TOKEN');
   *
   * bot.on('ready', (user) => {
   *  console.log(`Bot ${user.username}`)
   * })
   *
   * bot.login()
   * ```
   */
  async login() {
    const response = await this.getMe();
    this.#getMe = response;
    this.emit("ready", response);
    while (true) {
      if (this.#disconnect) break;
      try {
        const response = await this.getUpdates();
        if (response?.length > 0) {
          for (const update of response) {
            this.last_object = update;
            this.update_id = update.update_id;
            for (const [type, options] of Object.entries(messageTypeMap)) {
              const updateProperty: any = (update as ResponseApi)[
                type as keyof ResponseApi
              ];
              if (updateProperty) {
                const combined = new Combined<F>(this, updateProperty);
                const message: Context<F> = {
                  ...updateProperty,
                  telegram: this,
                  util: util,
                  filter: (filterPath: string) =>
                    filter(combined.updates, filterPath),
                  send: (
                    text: string,
                    args?: {
                      message_thread_id?: number;
                      parse_mode?: ParseMode;
                      entities?: MessageEntity[];
                      disable_web_page_preview?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.send(text, args),
                  reply: (
                    text: string,
                    args?: {
                      message_thread_id?: number;
                      parse_mode?: ParseMode;
                      entities?: MessageEntity[];
                      disable_web_page_preview?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.reply(text, args),
                  answerInlineQuery: (args: {
                    results: readonly InlineQueryResult[];
                    cache_time?: number;
                    is_personal?: boolean;
                    next_offset?: string;
                    button?: InlineQueryResultsButton;
                  }) => combined.answerInlineQuery(args),
                  answerCallbackQuery: (args?: {
                    text?: string;
                    show_alert?: boolean;
                    url?: string;
                    cache_time?: number;
                  }) => combined.answerCallbackQuery(args),
                  answerShippingQuery: (args: {
                    ok: boolean;
                    shipping_options?: readonly ShippingOption[];
                    error_message?: string;
                  }) => combined.answerShippingQuery(args),
                  answerPreCheckoutQuery: (args: {
                    ok: boolean;
                    error_message?: string;
                  }) => combined.answerPreCheckoutQuery(args),
                  editMessageText: (
                    text: string,
                    args?: {
                      message_id?: number;
                      parse_mode?: ParseMode;
                      entities?: MessageEntity[];
                      disable_web_page_preview?: boolean;
                      reply_markup?: InlineKeyboardMarkup;
                    },
                  ) => combined.editMessageText(text, args),
                  editMessageCaption: (
                    caption?: string,
                    args?: {
                      parse_mode?: ParseMode;
                      caption_entities?: MessageEntity[];
                      reply_markup?: InlineKeyboardMarkup;
                    },
                  ) => combined.editMessageCaption(caption, args),
                  editMessageMedia: (
                    media: InputMedia<F> & MediaPayload,
                    reply_markup?: InlineKeyboardMarkup,
                  ) => combined.editMessageMedia(media, reply_markup),
                  editMessageReplyMarkup: (markup?: InlineKeyboardMarkup) =>
                    combined.editMessageReplyMarkup(markup),
                  editMessageLiveLocation: (
                    replyMarkup?: InlineKeyboardMarkup,
                  ) => combined.editMessageLiveLocation(replyMarkup),
                  stopMessageLiveLocation: (
                    latitude: number,
                    longitude: number,
                    args?: {
                      horizontal_accuracy?: number;
                      heading?: number;
                      proximity_alert_radius?: number;
                      reply_markup?: InlineKeyboardMarkup;
                    },
                  ) =>
                    combined.stopMessageLiveLocation(latitude, longitude, args),
                  sendMessage: (
                    text: string,
                    args?: {
                      parse_mode?: ParseMode;
                      entities?: MessageEntity[];
                      disable_web_page_preview?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendMessage(text, args),
                  getChat: () => combined.getChat(),
                  exportChatInviteLink: () => combined.exportChatInviteLink(),
                  createChatInviteLink: (args?: {
                    name?: string;
                    expire_date?: number;
                    member_limit?: number;
                    creates_join_request?: boolean;
                  }) => combined.createChatInviteLink(args),
                  editChatInviteLink: (args: {
                    invite_link: string;
                    name?: string;
                    expire_date?: number;
                    member_limit?: number;
                    creates_join_request?: boolean;
                  }) => combined.editChatInviteLink(args),
                  revokeChatInviteLink: (invite_link: string) =>
                    combined.revokeChatInviteLink(invite_link),
                  banChatMember: (
                    userId: number,
                    args?: {
                      until_date?: number;
                      revoke_messages?: boolean;
                    },
                  ) => combined.banChatMember(userId, args),
                  unbanChatMember: (userId: number, onlyIfBanned?: boolean) =>
                    combined.unbanChatMember(userId, onlyIfBanned),
                  restrictChatMember: (args: {
                    user_id: number;
                    permissions: ChatPermissions;
                    use_independent_chat_permissions?: boolean;
                    until_date?: number;
                  }) => combined.restrictChatMember(args),
                  promoteChatMember: (
                    userId: number,
                    args?: {
                      is_anonymous?: boolean;
                      can_manage_chat?: boolean;
                      can_post_messages?: boolean;
                      can_post_stories?: boolean;
                      can_edit_messages?: boolean;
                      can_edit_stories?: boolean;
                      can_delete_messages?: boolean;
                      can_delete_stories?: boolean;
                      can_manage_video_chats?: boolean;
                      can_restrict_members?: boolean;
                      can_promote_members?: boolean;
                      can_change_info?: boolean;
                      can_invite_users?: boolean;
                      can_pin_messages?: boolean;
                      can_manage_topics?: boolean;
                    },
                  ) => combined.promoteChatMember(userId, args),
                  setChatAdministratorCustomTitle: (args: {
                    user_id: number;
                    custom_title: string;
                  }) => combined.setChatAdministratorCustomTitle(args),
                  setChatPhoto: (photo: MediaPayload) =>
                    combined.setChatPhoto(photo),
                  deleteChatPhoto: () => combined.deleteChatPhoto(),
                  setChatTitle: (title: string) => combined.setChatTitle(title),
                  setChatDescription: (description: string) =>
                    combined.setChatDescription(description),
                  pinChatMessage: (
                    messageId: number,
                    disableNotification?: boolean,
                  ) => combined.pinChatMessage(messageId, disableNotification),
                  unpinChatMessage: (messageId: number) =>
                    combined.unpinChatMessage(messageId),
                  unpinAllChatMessages: () => combined.unpinAllChatMessages(),
                  leaveChat: () => combined.leaveChat(),
                  setChatPermissions: (
                    permissions: ChatPermissions,
                    use_independent_chat_permissions?: boolean,
                  ) =>
                    combined.setChatPermissions(
                      permissions,
                      use_independent_chat_permissions,
                    ),
                  getChatAdministrators: () => combined.getChatAdministrators(),
                  getChatMember: (userId: number) =>
                    combined.getChatMember(userId),
                  getChatMembersCount: () => combined.getChatMembersCount(),
                  setPassportDataErrors: (
                    errors: readonly PassportElementError[],
                  ) => combined.setPassportDataErrors(errors),
                  sendPhoto: (
                    photo: MediaPayload | string,
                    args?: {
                      caption?: string;
                      parse_mode?: ParseMode;
                      caption_entities?: MessageEntity[];
                      has_spoiler?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendPhoto(photo, args),
                  sendMediaGroup: (
                    media: ReadonlyArray<
                      (
                        | InputMediaAudio<F>
                        | InputMediaDocument<F>
                        | InputMediaPhoto<F>
                        | InputMediaVideo<F>
                      ) &
                        MediaPayload
                    >,
                    args?: {
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                    },
                  ) => combined.sendMediaGroup(media, args),
                  sendAudio: (
                    audio: MediaPayload | string,
                    args?: {
                      caption?: string;
                      parse_mode?: ParseMode;
                      caption_entities?: MessageEntity[];
                      duration?: number;
                      performer?: string;
                      title?: string;
                      thumbnail?: MediaPayload;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendAudio(audio, args),
                  sendDice: (args?: {
                    emoji?: string;
                    disable_notification?: boolean;
                    protect_content?: boolean;
                    reply_to_message_id?: number;
                    allow_sending_without_reply?: boolean;
                    reply_markup?:
                      | InlineKeyboardMarkup
                      | ReplyKeyboardMarkup
                      | ReplyKeyboardRemove
                      | ForceReply;
                  }) => combined.sendDice(args),
                  sendDocument: (
                    document: MediaPayload | string,
                    args?: {
                      thumbnail?: MediaPayload;
                      caption?: string;
                      parse_mode?: ParseMode;
                      caption_entities?: MessageEntity[];
                      disable_content_type_detection?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendDocument(document, args),
                  sendSticker: (
                    sticker: MediaPayload | string,
                    args?: {
                      emoji?: string;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendSticker(sticker, args),
                  sendVideo: (
                    video: MediaPayload | string,
                    args?: {
                      duration?: number;
                      length?: number;
                      thumbnail?: MediaPayload;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendVideo(video, args),
                  sendAnimation: (
                    animation: MediaPayload | string,
                    args?: {
                      duration?: number;
                      width?: number;
                      height?: number;
                      thumbnail?: MediaPayload;
                      caption?: string;
                      parse_mode?: ParseMode;
                      caption_entities?: MessageEntity[];
                      has_spoiler?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendAnimation(animation, args),
                  sendVideoNote: (
                    videoNote: MediaPayload | string,
                    args?: {
                      duration?: number;
                      length?: number;
                      thumbnail?: MediaPayload;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendVideoNote(videoNote, args),
                  sendInvoice: (args: {
                    title: string;
                    description: string;
                    payload: string;
                    provider_token: string;
                    currency: string;
                    prices: readonly LabeledPrice[];
                    max_tip_amount?: number;
                    suggested_tip_amounts?: number[];
                    start_parameter?: string;
                    provider_data?: string;
                    photo_url?: string;
                    photo_size?: number;
                    photo_width?: number;
                    photo_height?: number;
                    need_name?: boolean;
                    need_phone_number?: boolean;
                    need_email?: boolean;
                    need_shipping_address?: boolean;
                    send_phone_number_to_provider?: boolean;
                    send_email_to_provider?: boolean;
                    is_flexible?: boolean;
                    disable_notification?: boolean;
                    protect_content?: boolean;
                    reply_to_message_id?: number;
                    allow_sending_without_reply?: boolean;
                    reply_markup?: InlineKeyboardMarkup;
                  }) => combined.sendInvoice(args),
                  sendGame: (
                    gameShortName: string,
                    args?: {
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?: InlineKeyboardMarkup;
                    },
                  ) => combined.sendGame(gameShortName, args),
                  sendVoice: (
                    voice: MediaPayload | string,
                    args?: {
                      caption?: string;
                      parse_mode?: ParseMode;
                      caption_entities?: MessageEntity[];
                      duration?: number;
                      performer?: string;
                      title?: string;
                      thumbnail?: MediaPayload;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendVoice(voice, args),
                  sendPoll: (
                    options: readonly string[],
                    args: {
                      question: string;
                      is_anonymous?: boolean;
                      type?: "quiz" | "regular";
                      allows_multiple_answers?: boolean;
                      correct_option_id?: number;
                      explanation?: string;
                      explanation_parse_mode?: ParseMode;
                      explanation_entities?: MessageEntity[];
                      open_period?: number;
                      close_date?: number;
                      is_closed?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendPoll(options, args),
                  stopPoll: (args: {
                    message_id: number;
                    reply_markup?: InlineKeyboardMarkup;
                  }) => combined.stopPoll(args),
                  sendLocation: (
                    latitude: number,
                    longitude: number,
                    args?: {
                      message_thread_id?: number;
                      horizontal_accuracy?: number;
                      live_period?: number;
                      heading?: number;
                      proximity_alert_radius?: number;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendLocation(latitude, longitude, args),
                  sendVenue: (
                    latitude: number,
                    longitude: number,
                    title: string,
                    address: string,
                    args?: {
                      foursquare_id?: string;
                      foursquare_type?: string;
                      google_place_id?: string;
                      google_place_type?: string;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) =>
                    combined.sendVenue(
                      latitude,
                      longitude,
                      title,
                      address,
                      args,
                    ),
                  sendContact: (
                    phoneNumber: string,
                    firstName: string,
                    args?: {
                      last_name?: string;
                      vcard?: string;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.sendContact(phoneNumber, firstName, args),
                  getStickerSet: (name: string) => combined.getStickerSet(name),
                  setChatStickerSet: (stickerSetName: string) =>
                    combined.setChatStickerSet(stickerSetName),
                  deleteChatStickerSet: () => combined.deleteChatStickerSet(),
                  createForumTopic: (args: {
                    name: string;
                    icon_color?:
                      | 0x6fb9f0
                      | 0xffd67e
                      | 0xcb86db
                      | 0x8eee98
                      | 0xff93b2
                      | 0xfb6f5f;
                    icon_custom_emoji_id?: string;
                  }) => combined.createForumTopic(args),
                  editForumTopic: (args?: {
                    name?: string;
                    icon_custom_emoji_id?: string;
                  }) => combined.editForumTopic(args),
                  closeForumTopic: () => combined.closeForumTopic(),
                  reopenForumTopic: () => combined.reopenForumTopic(),
                  deleteForumTopic: () => combined.deleteForumTopic(),
                  unpinAllForumTopicMessages: () =>
                    combined.unpinAllForumTopicMessages(),
                  editGeneralForumTopic: (name: string) =>
                    combined.editGeneralForumTopic(name),
                  closeGeneralForumTopic: () =>
                    combined.closeGeneralForumTopic(),
                  reopenGeneralForumTopic: () =>
                    combined.reopenGeneralForumTopic(),
                  hideGeneralForumTopic: () => combined.hideGeneralForumTopic(),
                  unhideGeneralForumTopic: () =>
                    combined.unhideGeneralForumTopic(),
                  unpinAllGeneralForumTopicMessages: () =>
                    combined.unpinAllGeneralForumTopicMessages(),
                  setStickerPositionInSet: (
                    sticker: string,
                    position: number,
                  ) => combined.setStickerPositionInSet(sticker, position),
                  setStickerSetThumbnail: (args: {
                    name: string;
                    user_id: number;
                    thumbnail?: MediaPayload;
                  }) => combined.setStickerSetThumbnail(args),
                  deleteStickerFromSet: (sticker: string) =>
                    combined.deleteStickerFromSet(sticker),
                  uploadStickerFile: (args: {
                    sticker_format: "static" | "animated" | "video";
                    sticker: MediaPayload;
                  }) => combined.uploadStickerFile(args),
                  createNewStickerSet: (args: {
                    name: string;
                    title: string;
                    stickers: (InputSticker<F> & MediaPayload)[];
                    sticker_format: "static" | "animated" | "video";
                    sticker_type?: "regular" | "mask" | "custom_emoji";
                    needs_repainting?: boolean;
                  }) => combined.createNewStickerSet(args),
                  addStickerToSet: (args: {
                    name: string;
                    sticker: InputSticker<F> & MediaPayload;
                  }) => combined.addStickerToSet(args),
                  getMyCommands: () => combined.getMyCommands(),
                  setMyCommands: (commands: readonly BotCommand[]) =>
                    combined.setMyCommands(commands),
                  setMyDescription: (description: string) =>
                    combined.setMyDescription(description),
                  getMyDescription: () => combined.getMyDescription(),
                  setMyShortDescription: (shortDescription: string) =>
                    combined.setMyShortDescription(shortDescription),
                  setMyName: (name: string) => combined.setMyName(name),
                  getMyName: () => combined.getMyName(),
                  replyWithMarkdown: (
                    text: string,
                    args?: {
                      message_thread_id?: number;
                      entities?: MessageEntity[];
                      disable_web_page_preview?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.replyWithMarkdown(text, args),
                  replyWithMarkdownV2: (
                    text: string,
                    args?: {
                      message_thread_id?: number;
                      entities?: MessageEntity[];
                      disable_web_page_preview?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.replyWithMarkdownV2(text, args),
                  replyWithHTML: (
                    text: string,
                    args?: {
                      message_thread_id?: number;
                      entities?: MessageEntity[];
                      disable_web_page_preview?: boolean;
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.replyWithHTML(text, args),
                  deleteMessage: (messageId?: number) =>
                    combined.deleteMessage(messageId),
                  forwardMessage: (
                    chatId: string | number,
                    args: {
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      message_id: number;
                    },
                  ) => combined.forwardMessage(chatId, args),
                  copyMessage: (
                    chatId: string | number,
                    args: {
                      message_id: number;
                      caption?: string;
                      parse_mode?: string;
                      caption_entities?: MessageEntity[];
                      disable_notification?: boolean;
                      protect_content?: boolean;
                      reply_to_message_id?: number;
                      allow_sending_without_reply?: boolean;
                      reply_markup?:
                        | InlineKeyboardMarkup
                        | ReplyKeyboardMarkup
                        | ReplyKeyboardRemove
                        | ForceReply;
                    },
                  ) => combined.copyMessage(chatId, args),
                  approveChatJoinRequest: (userId: number) =>
                    combined.approveChatJoinRequest(userId),
                  declineChatJoinRequest: (userId: number) =>
                    combined.declineChatJoinRequest(userId),
                  banChatSenderChat: (senderChatId: number) =>
                    combined.banChatSenderChat(senderChatId),
                  unbanChatSenderChat: (senderChatId: number) =>
                    combined.unbanChatSenderChat(senderChatId),
                  setChatMenuButton: (menuButton?: MenuButton) =>
                    combined.setChatMenuButton(menuButton),
                  getChatMenuButton: () => combined.getChatMenuButton(),
                  setGameScore: (
                    userId: number,
                    score: number,
                    args?: {
                      force?: boolean;
                      disable_edit_message?: boolean;
                      chat_id?: number;
                      message_id?: number;
                      inline_message_id?: string;
                    },
                  ) => combined.setGameScore(userId, score, args),
                  getGameHighScores: (
                    userId: number,
                    args?: {
                      chat_id?: number;
                      message_id?: number;
                      inline_message_id?: string;
                    },
                  ) => combined.getGameHighScores(userId, args),
                  messageCollector: (
                    filter?: MessageFilter<F>,
                    time?: number,
                    max?: number,
                  ) => combined.messageCollector(filter, time, max),
                };
                this.emit("update", update);
                this.emit(options.event, message);
                const optionEvent = options.properties
                  ? options.properties
                  : [];
                for (const properties of optionEvent) {
                  if (properties.event && updateProperty?.[properties.name]) {
                    this.emit(properties.event, message);
                  }
                }

                if (
                  type === "message" &&
                  (updateProperty?.reply_to_message ||
                    updateProperty?.message?.reply_to_message)
                ) {
                  this.emit("reply_message", message);
                }
                this.offset = response[response.length - 1].update_id + 1;
                break;
              }
            }
          }
        }
      } catch (error) {
        throw error;
      }
    }
  }

  async getUpdates() {
    return await this.callApi("getUpdates", {
      offset: this.offset,
      ...this.options,
    });
  }
}

export { TelegramBot };
