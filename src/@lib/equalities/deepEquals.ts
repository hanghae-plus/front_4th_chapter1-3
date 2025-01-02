import { hasSameKey } from "./utils/hasSameKey";
import { isValidObjects } from "./utils/isValidObjects";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (!isValidObjects(objA, objB)) {
    return false;
  }

  if (!hasSameKey(objA, objB)) {
    return false;
  }

  const objAKeys = Object.keys(objA || {});
  for (const key of objAKeys) {
    if (!deepEquals(objA[key as keyof T], objB[key as keyof T])) {
      return false;
    }
  }

  return true;
}
