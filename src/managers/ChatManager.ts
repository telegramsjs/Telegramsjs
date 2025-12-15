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

<<<<<<< HEAD
=======
type ChatResolvable = ChatMember | Message | Chat | string;

>>>>>>> v4
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
<<<<<<< HEAD
   * @param chat - The chat instance, chat member, message, or ID.
   * @returns - The resolved chat object or null if not found.
   */
  override resolve(chat: Chat | ChatMember | Message | string): Chat | null {
=======
   * @param chat - The The ChatMember, Message, Chat or chat ID.
   * @returns - The resolved chat object or null if not found.
   */
  override resolve(chat: ChatResolvable): Chat | null {
>>>>>>> v4
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
<<<<<<< HEAD
   * @param chat - The chat instance or ID.
=======
   * @param chat - The ChatMember, Message, Chat or chat ID for fetch.
>>>>>>> v4
   * @param options - Additional options.
   * @returns The fetched chat object.
   */
  fetch(
<<<<<<< HEAD
    user: Chat | string,
=======
    chat: ChatResolvable,
>>>>>>> v4
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo?: false },
  ): Promise<Chat>;

  /**
   * Fetches a chat object from the API.
<<<<<<< HEAD
   * @param chat - The chat instance or ID.
=======
   * @param chat - The ChatMember, Message, Chat or chat ID for fetch.
>>>>>>> v4
   * @param options - Additional options.
   * @returns The fetched ChatFullInfo object.
   */
  fetch(
<<<<<<< HEAD
    user: Chat | string,
=======
    chat: ChatResolvable,
>>>>>>> v4
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;

  /**
   * Fetches a chat object from the API.
<<<<<<< HEAD
   * @param chat - The chat instance or ID.
=======
   * @param chat - The ChatMember, Message, Chat or chat ID for fetch.
>>>>>>> v4
   * @param options - Additional options.
   * @returns The fetched chat or full chat info object.
   */
  fetch(
<<<<<<< HEAD
    user: Chat | string,
=======
    chat: ChatResolvable,
>>>>>>> v4
    options?: IFetchOptions,
  ): Promise<Chat | ChatFullInfo>;

  /**
   * Fetches a chat object from the API.
<<<<<<< HEAD
   * @param chat - The chat instance or ID.
=======
   * @param chat - The ChatMember, Message, Chat or chat ID for fetch.
>>>>>>> v4
   * @param options - Additional options.
   * @returns The fetched chat or full chat info object.
   */
  async fetch(
<<<<<<< HEAD
    chat: Chat | string,
    { cache = true, force = false, fullInfo }: IFetchOptions = {},
  ): Promise<Chat | ChatFullInfo> {
    const id = this.resolveId(chat);
=======
    chat: ChatResolvable,
    { cache = true, force = false, fullInfo }: IFetchOptions = {},
  ): Promise<Chat | ChatFullInfo> {
    const id = this.resolveId(this.resolve(chat));
>>>>>>> v4

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
<<<<<<< HEAD
}

export { ChatManager };
=======

  /**
   * Fetches multiple chats at once.
   * @param chats - Array of chats to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched chats (nulls for failed fetches).
   */
  fetchMany(
    chats: ChatResolvable[],
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo?: false },
  ): Promise<(Chat | null)[]>;

  /**
   * Fetches multiple chats at once.
   * @param chats - Array of chats to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched chats (nulls for failed fetches).
   */
  fetchMany(
    chats: ChatResolvable[],
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo: true },
  ): Promise<(ChatFullInfo | null)[]>;

  /**
   * Fetches multiple chats at once.
   * @param chats - Array of chats to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched chats (nulls for failed fetches).
   */
  fetchMany(
    chats: ChatResolvable[],
    options?: IFetchOptions,
  ): Promise<(Chat | ChatFullInfo | null)[]>;

  /**
   * Fetches multiple chats at once.
   * @param chats - Array of chats to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched chats (nulls for failed fetches).
   */
  async fetchMany(
    chats: ChatResolvable[],
    { cache = true, force = false, fullInfo }: IFetchOptions = {},
  ): Promise<(Chat | ChatFullInfo | null)[]> {
    const results = await Promise.allSettled(
      chats.map((chat) =>
        this.fetch(chat, { cache, force, ...(fullInfo && { fullInfo }) }),
      ),
    );

    return results.map((result) =>
      result.status === "fulfilled" ? result.value : null,
    );
  }
}

export { ChatManager, type ChatResolvable };
>>>>>>> v4
