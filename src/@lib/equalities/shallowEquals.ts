import isObject from "./isObject.ts";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (
    objA === null ||
    objB === null ||
    objA === undefined ||
    objB === undefined
  ) {
    return objA === objB;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    return (
      objA.length === objB.length &&
      objA.every((value, index) => value === objB[index])
    );
  }

  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return Object.keys(objA).every(
      (key) =>
        isObject(objA, key) && isObject(objB, key) && objA[key] === objB[key],
    );
  }

  return objA === objB;
}
