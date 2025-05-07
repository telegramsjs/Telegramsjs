// @ts-expect-error This is a polyfill, so it's fine to write
Symbol.dispose ??= Symbol("Symbol.dispose");
// @ts-expect-error Same as above
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");

export * from "./types";
export * from "./util/collector/Collector";
export * from "./util/collector/MessageCollector";
export * from "./util/collector/InlineKeyboardCollector";
export * from "./util/inline/InlineQueryResultBuilder";
export * from "./util/inline/InlineQueryResultCachedBuilder";
export * from "./util/inline/InputMessageContentBuilder";
export * from "./util/markup/InlineKeyboardBuilder";
export * from "./util/markup/KeyboardBuilder";
export * from "./util/permission/ChatPermissions";
export * from "./util/permission/UserPermissions";
export * from "./util/permission/BusinessPermissions";
export * from "./util/Constants";
export { flatten } from "./util/Utils";
export * from "./util/permission/ApiPermissions";
export * from "./managers/BaseManager";
export * from "./managers/ChatManager";
export * from "./managers/UserManager";
export * from "./client/BaseClient";
export * from "./client/PollingClient";
export * from "./client/TelegramClient";
export * from "./client/WebhookClient";
export * from "./client/WorkerClient";
export * from "./errors/HTTPResponseError";
export * from "./errors/TelegramError";
export * from "./errors/ErrorCodes";
export * from "./rest/Rest";
export * from "./rest/MediaData";
export * from "./rest/MultipartStream";
export * from "./structures/index";
export { version } from "../package.json";
