import {
  PrimitiveKeyValueObject,
  isPrimitiveKeyValueObject,
} from "./isKeyValueObject";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Array.isArray(objA) === true && Array.isArray(objB)) {
    const arrA = objA as Array<unknown>;
    const arrB = objB as Array<unknown>;

    if (arrA.length !== arrB.length) {
      return false;
    }

    for (let i = 0; i < arrA.length; i++) {
      if (arrA[i] !== arrB[i]) {
        return false;
      }
    }
    return true;
  }

  if (isPrimitiveKeyValueObject(objA) && isPrimitiveKeyValueObject(objB)) {
    const keyValueA = objA as PrimitiveKeyValueObject;
    const keyValueB = objB as PrimitiveKeyValueObject;
    const keys = Object.keys(keyValueA);

    for (const key of keys) {
      if (keyValueA[key] !== keyValueB[key]) {
        return false;
      }
    }
    return true;
  }

  return objA === objB;
}
