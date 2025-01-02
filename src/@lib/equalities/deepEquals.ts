import { assertObject } from "../../utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (typeof objA !== "object" && typeof objB !== "object") {
    return objA === objB;
  }

  if (objA == null && objB == null) {
    return objA === objB;
  }

  assertObject(objA);
  assertObject(objB);

  if (Array.isArray(objA) !== Array.isArray(objB)) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (const key in objA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    if (!deepEquals(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
