import type { ApiMethods as Methods, Update } from "@telegram.ts/types";

type ApiMethodParameters<T> = T extends (...args: infer P) => any ? P : never;

type MethodParameters = {
  [K in keyof Methods]: Methods[K] extends Function
    ? ApiMethodParameters<Methods[K]>[0]
    : never;
};

type ApiMethods = {
  [K in keyof Methods]: Methods[K] extends Function ? Methods[K] : never;
};

type MethodsReturnType = {
  [M in keyof Methods]: ReturnType<Methods[M]>;
};

type UpdateReturn = Omit<Update, "update_id">[keyof Omit<Update, "update_id">];

type UnionKeys<T> = T extends unknown ? keyof T : never;

interface RequestFailt {
  ok: false;
  error_code: number;
  description: string;
  parameters?: {
    retry_after?: number;
    migrate_to_chat_id?: number;
  };
}

interface RequestSuccess<T> {
  ok: true;
  result: T;
}

export {
  ApiMethods,
  MethodParameters,
  MethodsReturnType,
  UnionKeys,
  RequestFailt,
  RequestSuccess,
  UpdateReturn,
};
