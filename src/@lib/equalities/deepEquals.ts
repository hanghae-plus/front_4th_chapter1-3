import { compareObjects } from "./compareObjects";

export function deepEquals<T>(objA: T, objB: T): boolean {
  return compareObjects(objA, objB, true);
}
