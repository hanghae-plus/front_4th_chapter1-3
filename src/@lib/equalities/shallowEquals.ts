import { compareObjects } from "./compareObjects";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  return compareObjects(objA, objB, false);
}
