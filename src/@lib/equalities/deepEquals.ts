import { isObject } from "../utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    return _deepEqualArray(objA, objB);
  }

  if (isObject(objA) && isObject(objB)) {
    return _deepEqualObject(
      objA as Record<string | number | symbol, unknown>,
      objB as Record<string | number | symbol, unknown>,
    );
  }

  return objA === objB;
}

function _deepEqualArray<T>(arrA: Array<T>, arrB: Array<T>): boolean {
  if (arrA.length !== arrB.length) return false;
  return arrA.every((item, index) => deepEquals(item, arrB[index]));
}

function _deepEqualObject<T extends string | number | symbol>(
  objA: Record<T, unknown>,
  objB: Record<T, unknown>,
): boolean {
  if (objA === objB) return true;

  const keysA = Object.keys(objA) as T[];
  const keysB = Object.keys(objB) as T[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every(
    (key) => keysB.includes(key) && deepEquals(objA[key], objB[key]),
  );
}
