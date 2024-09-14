import { BaseManager } from "./BaseManager";
import { User } from "../structures/misc/User";
import type { MethodsApiReturnType } from "../types";
import type { User as ApiUser } from "@telegram.ts/types";
import { Message } from "../structures/message/Message";
import { ChatMember } from "../structures/chat/ChatMember";
import { TelegramError } from "../errors/TelegramError";
import { ErrorCodes } from "../errors/ErrorCodes";
import type { TelegramClient } from "../client/TelegramClient";
import type { BaseClient } from "../client/BaseClient";

class UserManager extends BaseManager<User, ApiUser> {
  /**
   * @param client - The client instance.
   * @param iterable - Data iterable.
   * @param cacheSize - The maximum size of the cache. Default is unlimited.
   */
  constructor(
    client: TelegramClient | BaseClient,
    iterable?: ApiUser[],
    cacheSize: number = -1,
  ) {
    super(client, User, iterable, cacheSize);
  }

  /**
   * Resolves a user from a ChatMember, Message, or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved User instance or null if not found.
   */
  override resolve(user: ChatMember | Message | string): User | null {
    if (user instanceof ChatMember && user.user) {
      return user.user;
    }
    if (user instanceof Message && user.author) {
      return user.author;
    }
    return super.resolve(user);
  }

  /**
   * Resolves the user ID from a ChatMember, Message, or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved user ID or null if not found.
   */
  override resolveId(user: ChatMember | Message | string): string | null {
    if (user instanceof ChatMember && user.id) {
      return user.id;
    }
    if (user instanceof Message && user.author) {
      return user.author.id;
    }
    return super.resolveId(user);
  }

  /**
   * Fetches a user by ID, optionally caching the result.
   * @param user - The ChatMember, Message, or user ID to fetch.
   * @param options - Options for fetching.
   * @returns The fetched User instance.
   */
  async fetch(
    user: ChatMember | Message | string,
    { cache = true, force = false }: { cache?: boolean; force?: boolean } = {},
  ): Promise<User> {
    const id = this.resolveId(user);

    if (!force) {
      const existing = this.cache.get(String(id));
      if (existing) return existing;
    }

    const data = await this.client.apiRequest.get<
      MethodsApiReturnType["getChat"]
    >("getChat", {
      chatId: id,
    });

    if (data?.type !== "private") {
      throw new TelegramError(ErrorCodes.InvalidUserID);
    }

    // @ts-ignore
    return this._add(data, cache);
  }
}

export { UserManager };
