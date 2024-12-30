import { isNullOrPrimitive } from "../validation/isNullOrPrimitive";
import { isRecord } from "../validation/isRecord";

/**
 * 두 값의 얕은 비교를 수행하는 함수
 * @param objA
 * @param objB
 * @returns {boolean}
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (isNullOrPrimitive(objA) || isNullOrPrimitive(objB)) {
    return false;
  }

  // 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) {
        return false;
      }
    }
    return true;
  }

  // 객체 비교
  if (!isRecord(objA) || !isRecord(objB)) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (
    keysA.length !== keysB.length ||
    keysA.some((key) => !keysB.includes(key))
  ) {
    return false;
  }
  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}
