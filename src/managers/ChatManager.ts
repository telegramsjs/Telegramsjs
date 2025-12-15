import {
  BaseManager,
  type IFetchOptions,
  type ICachedOptions,
} from "./BaseManager";
import { Chat } from "../structures/chat/Chat";
import { ChatFullInfo } from "../structures/chat/ChatFullInfo";
import type { MethodsApiReturnType } from "../types";
import type { Chat as ApiChat } from "@telegram.ts/types";
import { Message } from "../structures/message/Message";
import { ChatMember } from "../structures/chat/ChatMember";
import { TelegramError } from "../errors/TelegramError";
import { ErrorCodes } from "../errors/ErrorCodes";
import type { TelegramClient } from "../client/TelegramClient";
import type { BaseClient } from "../client/BaseClient";

type ChatResolvable = ChatMember | Message | Chat | string;

class ChatManager extends BaseManager<Chat, ApiChat> {
  /**
   * @param client - The client instance.
   * @param iterable - Data iterable.
   * @param options - Options for save cached.
   */
  constructor(
    client: TelegramClient | BaseClient,
    iterable: ApiChat[],
    options: ICachedOptions<Chat> = {},
  ) {
    super(client, Chat, iterable, options);
  }

  /**
   * Resolves a chat object.
   * @param chat - The chat instance, ChatMember, Message, Chat or ID.
   * @returns - The resolved chat object or null if not found.
   */
  override resolve(chat: ChatResolvable): Chat | null {
    if (chat instanceof ChatMember) {
      return super.resolve(chat.chatId);
    }
    if (chat instanceof Message && chat.chat) {
      return chat.chat;
    }
    return super.resolve(chat);
  }

  /**
   * Fetches a chat object from the API.
   * @param chat - The chat instance or ID.
   * @param options - Additional options.
   * @returns The fetched chat object.
   */
  fetch(
    chat: Chat | string,
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo?: false },
  ): Promise<Chat>;

  /**
   * Fetches a chat object from the API.
   * @param chat - The chat instance or ID.
   * @param options - Additional options.
   * @returns The fetched ChatFullInfo object.
   */
  fetch(
    chat: Chat | string,
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;

  /**
   * Fetches a chat object from the API.
   * @param chat - The chat instance or ID.
   * @param options - Additional options.
   * @returns The fetched chat or full chat info object.
   */
  fetch(
    chat: Chat | string,
    options?: IFetchOptions,
  ): Promise<Chat | ChatFullInfo>;

  /**
   * Fetches a chat object from the API.
   * @param chat - The chat instance or ID.
   * @param options - Additional options.
   * @returns The fetched chat or full chat info object.
   */
  async fetch(
    chat: Chat | string,
    { cache = true, force = false, fullInfo }: IFetchOptions = {},
  ): Promise<Chat | ChatFullInfo> {
    const id = this.resolveId(chat);

    if (!force) {
      const existing = this.cache.get(String(id));
      if (existing) return existing;
    }

    const data = await this.client.rest.request<
      MethodsApiReturnType["getChat"]
    >("getChat", {
      chat_id: id,
    });

    if (data?.type === "private") {
      throw new TelegramError(ErrorCodes.InvalidChatId);
    }

    if (fullInfo) {
      // @ts-ignore
      this._add(data, cache);
      return new ChatFullInfo(this.client, data);
    }

    // @ts-ignore
    return this._add(data, cache);
  }
}

export { ChatManager, type ChatResolvable };
