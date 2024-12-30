import { isObject } from "../utils/typeUtils.ts";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    return _shallowEqualArray(objA, objB);
  }

  if (isObject(objA) && isObject(objB)) {
    return _shallowEqualObject(
      objA as Record<string, unknown>,
      objB as Record<string, unknown>,
    );
  }

  return false;
}

function _shallowEqualArray<T>(arrA: Array<T>, arrB: Array<T>): boolean {
  if (arrA.length !== arrB.length) return false;
  return arrA.every((item, index) => item === arrB[index]);
}

function _shallowEqualObject(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean {
  if (objA === objB) return true;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key] !== objB[key]
    )
      return false;
  }
  return true;
}
