import { isPlainObject, isPrimitive } from "../utils";

export function shallowEquals<T>(first: T, second: T): boolean {
  if (isPrimitive(first) || isPrimitive(second)) {
    return first === second;
  }

  if (Array.isArray(first) && Array.isArray(second)) {
    if (first.length !== second.length) return false;
    return first.every((item, i) => item === second[i]);
  }

  if (isPlainObject(first) && isPlainObject(second)) {
    const firstKeys = Object.keys(first);
    const secondKeys = Object.keys(second);

    if (firstKeys.length !== secondKeys.length) return false;

    return firstKeys.every((key) => first[key] === second[key]);
  }

  return false;
}
