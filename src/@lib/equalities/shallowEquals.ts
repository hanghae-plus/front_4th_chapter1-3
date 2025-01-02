// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.

import { hasOwnKey, isNonNullObject } from "../../util/typeGuards";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (!isNonNullObject(objA) || !isNonNullObject(objB)) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!hasOwnKey(objB, key) || !hasOwnKey(objA, key)) return false;
    if (objA[key] !== objB[key]) return false;
  }

  return true;
}
