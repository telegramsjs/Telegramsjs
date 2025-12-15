import {
  BaseManager,
  type IFetchOptions,
  type ICachedOptions,
} from "./BaseManager";
import { User } from "../structures/misc/User";
import { ChatFullInfo } from "../structures/chat/ChatFullInfo";
import type { MethodsApiReturnType } from "../types";
import type { User as ApiUser } from "@telegram.ts/types";
import { Message } from "../structures/message/Message";
import { ChatMember } from "../structures/chat/ChatMember";
import { TelegramError } from "../errors/TelegramError";
import { ErrorCodes } from "../errors/ErrorCodes";
import type { TelegramClient } from "../client/TelegramClient";
import type { BaseClient } from "../client/BaseClient";

<<<<<<< HEAD
=======
type UserResolvable = ChatMember | Message | User | string;

>>>>>>> v4
class UserManager extends BaseManager<User, ApiUser> {
  /**
   * @param client - The client instance.
   * @param iterable - Data iterable.
   * @param options - Options for save cached.
   */
  constructor(
    client: TelegramClient | BaseClient,
    iterable: ApiUser[],
    options: ICachedOptions<User> = {},
  ) {
    super(client, User, iterable, options);
  }

  /**
<<<<<<< HEAD
   * Resolves a user from a ChatMember, Message, or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved User instance or null if not found.
   */
  override resolve(user: ChatMember | Message | string): User | null {
=======
   * Resolves a user from a ChatMember, Message, User or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved User instance or null if not found.
   */
  override resolve(user: UserResolvable): User | null {
>>>>>>> v4
    if (user instanceof ChatMember && user.user) {
      return user.user;
    }
    if (user instanceof Message && user.author) {
      return user.author;
    }
    return super.resolve(user);
  }

  /**
<<<<<<< HEAD
   * Resolves the user ID from a ChatMember, Message, or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved user ID or null if not found.
   */
  override resolveId(user: ChatMember | Message | string): string | null {
=======
   * Resolves the user ID from a ChatMember, Message, User or user ID.
   * @param user - The ChatMember, Message, or user ID to resolve.
   * @returns The resolved user ID or null if not found.
   */
  override resolveId(user: any): string | null {
>>>>>>> v4
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
<<<<<<< HEAD
   * @param user - The ChatMember, Message, or user ID to fetch.
=======
   * @param user - The ChatMember, Message, User or user ID to fetch.
>>>>>>> v4
   * @param options - Options for fetching.
   * @returns The fetched User instance.
   */
  fetch(
<<<<<<< HEAD
    user: ChatMember | Message | string,
=======
    user: UserResolvable,
>>>>>>> v4
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo?: false },
  ): Promise<User>;

  /**
   * Fetches a user by ID, optionally caching the result.
<<<<<<< HEAD
   * @param user - The ChatMember, Message, or user ID to fetch.
=======
   * @param user - The ChatMember, Message, User or user ID to fetch.
>>>>>>> v4
   * @param options - Options for fetching.
   * @returns The fetched ChatFullInfo instance.
   */
  fetch(
<<<<<<< HEAD
    user: ChatMember | Message | string,
=======
    user: UserResolvable,
>>>>>>> v4
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo: true },
  ): Promise<ChatFullInfo>;

  /**
   * Fetches a user by ID, optionally caching the result.
<<<<<<< HEAD
   * @param user - The ChatMember, Message, or user ID to fetch.
=======
   * @param user - The ChatMember, Message, User or user ID to fetch.
>>>>>>> v4
   * @param options - Options for fetching.
   * @returns The fetched User or ChatFullInfo instance.
   */
  fetch(
<<<<<<< HEAD
    user: ChatMember | Message | string,
=======
    user: UserResolvable,
>>>>>>> v4
    options?: IFetchOptions,
  ): Promise<User | ChatFullInfo>;

  /**
   * Fetches a user by ID, optionally caching the result.
<<<<<<< HEAD
   * @param user - The ChatMember, Message, or user ID to fetch.
=======
   * @param user - The ChatMember, Message, User or user ID to fetch.
>>>>>>> v4
   * @param options - Options for fetching.
   * @returns The fetched User or ChatFullInfo instance.
   */
  async fetch(
<<<<<<< HEAD
    user: ChatMember | Message | string,
    { cache = true, force = false, fullInfo }: IFetchOptions = {},
  ): Promise<User | ChatFullInfo> {
    const id = this.resolveId(user);
=======
    user: UserResolvable,
    { cache = true, force = false, fullInfo }: IFetchOptions = {},
  ): Promise<User | ChatFullInfo> {
    const id = this.resolveId(this.resolve(user));
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

    if (data?.type !== "private") {
      throw new TelegramError(ErrorCodes.InvalidUserId);
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

export { UserManager };
=======

  /**
   * Fetches multiple users at once.
   * @param users - Array of users to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched users (nulls for failed fetches).
   */
  fetchMany(
    users: UserResolvable[],
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo?: false },
  ): Promise<(User | null)[]>;

  /**
   * Fetches multiple users at once.
   * @param users - Array of users to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched users (nulls for failed fetches).
   */
  fetchMany(
    users: UserResolvable[],
    options?: Omit<IFetchOptions, "fullInfo"> & { fullInfo: true },
  ): Promise<(ChatFullInfo | null)[]>;

  /**
   * Fetches multiple users at once.
   * @param users - Array of users to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched users (nulls for failed fetches).
   */
  fetchMany(
    users: UserResolvable[],
    options?: IFetchOptions,
  ): Promise<(User | ChatFullInfo | null)[]>;

  /**
   * Fetches multiple users at once.
   * @param users - Array of users to fetch.
   * @param options - Options for fetching.
   * @returns Array of fetched users (nulls for failed fetches).
   */
  async fetchMany(
    users: UserResolvable[],
    { cache = true, force = false, fullInfo }: IFetchOptions = {},
  ): Promise<(User | ChatFullInfo | null)[]> {
    const results = await Promise.allSettled(
      users.map((user) =>
        this.fetch(user, { cache, force, ...(fullInfo && { fullInfo }) }),
      ),
    );

    return results.map((result) =>
      result.status === "fulfilled" ? result.value : null,
    );
  }
}

export { UserManager, type UserResolvable };
>>>>>>> v4
