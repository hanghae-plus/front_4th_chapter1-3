import { hasSameKey } from "./utils/hasSameKey";
import { isValidObjects } from "./utils/isValidObjects";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (!isValidObjects(objA, objB)) {
    return false;
  }

  const objAKeys = Object.keys(objA || {});

  if (!hasSameKey(objA, objB)) {
    return false;
  }

  for (const key of objAKeys) {
    if (!Object.is(objA[key as keyof T], objB[key as keyof T])) {
      return false;
    }
  }

  return true;
}
