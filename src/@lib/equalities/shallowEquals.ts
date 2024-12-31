import { baseEquals } from "./baseEquals";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  return baseEquals(objA, objB, Object.is);
}
