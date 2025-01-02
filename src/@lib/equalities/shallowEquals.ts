import { isNullOrPrimitive } from "../validation/isNullOrPrimitive";
import { isRecord } from "../validation/isRecord";

/**
 * 두 값의 얕은 비교를 수행하는 함수
 * @param objA
 * @param objB
 * @returns {boolean}
 */
export function shallowEquals<T, G>(objA: T, objB: G): boolean {
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
    return objA.every((item, index) => item === objB[index]);
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

  return keysA.every((key) => objA[key] === objB[key]);
}
