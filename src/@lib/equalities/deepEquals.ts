import { isObject } from "../utils/isObject";

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) {
    return true;
  }

  // null과 undefined 체크
  if (objA == null || objB == null) {
    return objA === objB;
  }

  // 기본 타입인 경우 이미 위에서 처리됨
  if (typeof objA !== "object" || typeof objB !== "object") {
    return objA === objB;
  }

  // 2. 배열 타입 체크 및 처리

  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  // 3. 객체 비교
  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every(
    (key) =>
      Object.is(objB[key], objB[key]) && deepEquals(objA[key], objB[key]),
  );
}
