import { Collection } from "@telegram.ts/collection";

/**
 * Checks if a given string follows camelCase naming convention, is completely lowercase, or contains only digits.
 * @param str - The string to check.
 * @returns Returns `true` if the string is in camelCase format or completely lowercase, otherwise `false`.
 */
function isCamelCase(str: string) {
  const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/;
  const lowercasePattern = /^[a-z]+$/;
  const digitPattern = /^\d+$/;
  return (
    camelCasePattern.test(str) ||
    lowercasePattern.test(str) ||
    digitPattern.test(str)
  );
}

const isObject = (obj: any): obj is Record<string, any> =>
  !!obj && obj !== null && typeof obj === "object";

/**
 * Flatten an object. Any properties that are collections will get converted to an array of keys.
 * @param obj The object to flatten.
 * @param propsRecursive Optional. If true, calls toJSON method on nested objects.
 * @param props Optional. Specific properties to include/exclude, or rename.
 * @returns Flattened object.
 */
function flatten(
  obj: Record<string, any>,
  propsRecursive: boolean = false,
  ...props: Record<string, boolean | string>[]
): Record<string, any> {
  if (!isObject(obj)) return obj;

  const mergedProps: Record<string, boolean | string> = Object.assign(
    {},
    ...props,
  );

  const defaultProps: Record<string, boolean> = Object.keys(obj)
    .filter((key) => !key.startsWith("_"))
    .reduce((acc, key) => ({ ...acc, [key]: true }), {});

  const finalProps = { ...defaultProps, ...mergedProps };

  const out: Record<string, any> = {};

  function format(value: any): any {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value;
    } else if (value instanceof Collection) {
      return [...value.values()];
    } else if (Array.isArray(value)) {
      return value.map(format);
    } else if (isObject(value)) {
      if (typeof value.toJSON === "function") {
        return value.toJSON(propsRecursive, finalProps);
      }
      return flatten(value, propsRecursive, finalProps);
    } else {
      return null;
    }
  }

  for (const [key, value] of Object.entries(obj)) {
    const propValue = finalProps[key];
    if (propValue === false) continue;
    if (propValue === true || propValue === undefined) {
      out[key] = format(value);
    } else {
      out[propValue] = format(value);
    }
  }

  return out;
}

export { isCamelCase, flatten };
