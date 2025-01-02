import { isRecord } from "../../utils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    Array.isArray(objA) &&
    Array.isArray(objB) &&
    objA.length === objB.length
  ) {
    return objA.every((v, i) => v === objB[i]);
  }

  // 4. 모든 키에 대해 얕은 비교
  if (isRecord(objA) && isRecord(objB)) {
    // 3. 키 개수 비교
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }
    return Object.keys(objA).every((key) => objA[key] === objB[key]);
  }

  return false;
}
