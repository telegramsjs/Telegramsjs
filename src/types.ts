import type { ApiMethods } from "./client/interfaces/Methods";
import type { ApiMethods as Methods } from "@telegram.ts/types";

type ApiMethodParameters<T> = T extends (...args: infer P) => any ? P : never;

type MethodParameters<M = ApiMethods> = {
  [K in keyof M]: M[K] extends Function ? ApiMethodParameters<M[K]>[0] : never;
};

type MethodsApiReturnType = {
  [M in keyof Methods]: ReturnType<Methods[M]>;
};

type MethodsLibReturnType = {
  [M in keyof ApiMethods]: ReturnType<ApiMethods[M]>;
};

type MsgWith<T, P extends keyof T> = Record<P, NonNullable<T[P]>>;

interface IRequestFailt {
  ok: false;
  error_code: string | number;
  description: string;
  parameters?: {
    retry_after?: number;
    migrate_to_chat_id?: number;
  };
}

interface IRequestSuccess<T> {
  ok: true;
  result: T;
}

type Awaitable<V> = PromiseLike<V> | V;

type PossiblyAsync<T> = T | Promise<T>;

export {
  type MsgWith,
  type MethodsApiReturnType,
  type MethodsLibReturnType,
  type MethodParameters,
  type IRequestFailt,
  type IRequestSuccess,
  type Awaitable,
  type PossiblyAsync,
};
