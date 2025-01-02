import { isNonNullObject } from "../../util/typeGuards";

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 또는 null 처리
  if (!isNonNullObject(objA) || !isNonNullObject(objB)) {
    return objA === objB;
  }

  // 배열 처리
  if (Array.isArray(objA) || Array.isArray(objB)) {
    return deepEqualsArray(objA, objB);
  }

  //모두 객체인 경우
  return deepEqualsObject(objA, objB);
}

function deepEqualsArray<T>(arrA: T, arrB: T): boolean {
  if (!Array.isArray(arrA) || !Array.isArray(arrB)) return false;
  if (arrA.length !== arrB.length) return false;

  return arrA.every((item, index) => deepEquals(item, arrB[index]));
}

function deepEqualsObject<T extends object>(objA: T, objB: T): boolean {
  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (!deepEquals(objA[key], objB[key])) return false;
  }
  return true;
}
