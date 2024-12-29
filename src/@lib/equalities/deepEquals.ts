import { validObject } from "./utils/validObject.ts";

export function deepEquals<T extends object>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  const validChecks = validObject(objA, objB);
  if (validChecks !== null) return validChecks;

  // 2. 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    // 배열을 Map으로 변환하여 비교
    const mapA = new Map(objA.map((v, i) => [i, v]));
    const mapB = new Map(objB.map((v, i) => [i, v]));

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(mapA.get(i), mapB.get(i))) {
        return false;
      }
    }
    return true;
  }

  // 3. 객체인 경우
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 객체를 Map으로 변환하여 비교
  const mapA = new Map(
    Object.entries(objA).map(([key, value]) => [key, value]),
  );
  const mapB = new Map(
    Object.entries(objB).map(([key, value]) => [key, value]),
  );
  for (const key of keysA) {
    if (!mapB.has(key) || !deepEquals(mapA.get(key), mapB.get(key))) {
      return false;
    }
  }

  return true;
}
