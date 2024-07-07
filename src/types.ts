import type { ApiMethods as Methods } from "@telegram.ts/types";

type ApiMethodParameters<T> = T extends (...args: infer P) => any ? P : never;

type MethodParameters<M = Methods> = {
  [K in keyof M]: M[K] extends Function ? ApiMethodParameters<M[K]>[0] : never;
};

type MethodsReturnType = {
  [M in keyof Methods]: ReturnType<Methods[M]>;
};

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

export { MethodsReturnType, MethodParameters, IRequestFailt, IRequestSuccess };
