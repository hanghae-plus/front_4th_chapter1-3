import { Equatable } from "./types";

export function shallowEquals<T extends Equatable>(objA: T, objB: T): boolean {
  if (objA === null || objB === null) {
    return objA === objB;
  }

  if (objA === objB) return true;
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((_, index) => objA[index] === objB[index]);
  }

  const objARecord = objA as Record<string, unknown>;
  const objBRecord = objB as Record<string, unknown>;

  const keysA = Object.keys(objARecord);
  const keysB = Object.keys(objBRecord);

  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => objARecord[key] === objBRecord[key]);
}
