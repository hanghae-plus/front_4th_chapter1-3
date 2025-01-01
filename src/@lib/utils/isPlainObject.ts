import { isNil } from "./isNil";

type AnyObject = { [key: PropertyKey]: unknown };

export function isPlainObject(value: unknown): value is AnyObject {
  if (isNil(value)) return false;
  return typeof value === "object" && !Array.isArray(value);
}
