// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.

import { isNonNullObject } from "../../util/typeGuards";

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (!isNonNullObject(objA) || !isNonNullObject(objB)) {
    return objA === objB;
  }

  // 2. 둘 다 객체인 경우:
  if (Array.isArray(objA) || Array.isArray(objB)) {
    return deepEqualsArray(objA, objB);
  }

  //  - 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  for (const key in objA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (!deepEquals(objA[key], objB[key])) return false;
  }

  return true;
}

function deepEqualsArray<T>(objA: T, objB: T): boolean {
  if (!Array.isArray(objA) || !Array.isArray(objB)) return false;
  if (objA.length !== objB.length) return false;

  for (let i = 0; i < objA.length; i++) {
    if (!deepEquals(objA[i], objB[i])) return false;
  }

  return true;
}
