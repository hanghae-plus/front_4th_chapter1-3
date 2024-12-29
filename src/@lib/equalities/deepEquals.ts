import { validObject } from "./utils/validObject.ts";

export function deepEquals<T extends object>(objA: T, objB: T): boolean {
  //1. 기본 타입이거나 null인 경우 처리
  const objectTypeCheck = validObject(objA, objB);
  if (objectTypeCheck !== null) return objectTypeCheck;

  //2. 둘 다 객체인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }
    return true;
  }

  const objAMap = new Map(Object.entries(objA));
  const objBMap = new Map(Object.entries(objB));
  if (objAMap.size !== objBMap.size) return false;
  for (const [key, valueA] of objAMap) {
    const valueB = objBMap.get(key);
    if (!valueB || !deepEquals(valueA, valueB)) {
      return false;
    }
  }
  return true;
}
