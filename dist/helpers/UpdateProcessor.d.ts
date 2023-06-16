import { BaseClient } from "../BaseClient";
import { TelegramBot } from "../TelegramBot";
type ResponseApi = {
  update_id?: number;
  message_id?: number;
  message?: object;
  chat?: object;
  from?: object;
  edited_message?: object;
  channel_post?: object;
  edited_channel_post?: object;
  inline_query?: object;
  chosen_inline_result?: object;
  callback_query?: object;
  shipping_query?: object;
  pre_checkout_query?: object;
  poll?: object;
  poll_answer?: object;
  my_chat_member?: object;
  chat_member?: object;
  chat_join_request?: object;
  pinned_message?: object;
};
type SendOptions = {
  chatId?: number | string;
  messageId?: number;
  text?: string;
  replyMarkup?: string;
  allowReply?: boolean;
  notification?: boolean;
  replyToMessageId?: number;
  content?: boolean;
  threadId?: number;
  parseMode?: string;
};
type Defaults = {
  text?: string;
  chatId?: number | string;
  messageId?: number;
  replyMarkup?: string;
  allowReply?: boolean;
  notification?: boolean;
  replyToMessageId?: number;
  content?: boolean;
  threadId?: number;
  parseMode?: string;
};
export declare class UpdateProcessor {
  bot: TelegramBot;
  updates: ResponseApi;
  functions: BaseClient;
  constructor(bot: TelegramBot);
  processUpdate(updates?: ResponseApi): Promise<void>;
  reply(options: SendOptions, defaults?: Defaults): Promise<object | undefined>;
  send(options: SendOptions, defaults?: Defaults): Promise<object | undefined>;
  leave(chatId?: number | string): Promise<object | undefined>;
  isCommand(checkAllEntities?: boolean): boolean;
}
export {};
