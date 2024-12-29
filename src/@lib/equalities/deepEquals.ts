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
  const objAkeys = new Map(
    Object.entries(objA).map(([key, value]) => [key, value]),
  );
  const objBkeys = new Map(
    Object.entries(objA).map(([key, value]) => [key, value]),
  );

  if (objAkeys.size !== objBkeys.size) {
    return false;
  }

  for (const [key, valueA] of objAkeys) {
    const valueB = objBkeys.get(key);
    if (!valueB || !deepEquals(valueA, valueB)) {
      return false;
    }
  }
  return true;
}
