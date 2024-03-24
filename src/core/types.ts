import type { ApiMethods as Methods, Update } from "@telegram.ts/types";

type ApiMethodParameters<T> = T extends (...args: infer P) => any ? P : never;

type MethodParameters<M = Methods> = {
  [K in keyof M]: M[K] extends Function ? ApiMethodParameters<M[K]>[0] : never;
};

type ApiMethods = {
  [K in keyof Methods]: Methods[K] extends Function ? Methods[K] : never;
};

type MethodsReturnType = {
  [M in keyof Methods]: ReturnType<Methods[M]>;
};

type UpdateReturn = Omit<Update, "update_id">[keyof Omit<Update, "update_id">];

type UnionKeys<T> = T extends unknown ? keyof T : never;

type Awaitable<V> = PromiseLike<V> | V;

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

export {
  ApiMethods,
  MethodParameters,
  MethodsReturnType,
  UnionKeys,
  Awaitable,
  IRequestFailt,
  IRequestSuccess,
  UpdateReturn,
};
