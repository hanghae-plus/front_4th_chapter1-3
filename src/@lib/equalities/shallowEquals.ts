import { validObject } from "./utils/validObject.ts";

export function shallowEquals<T extends object>(objA: T, objB: T): boolean {
  //1. 두 값이 정확히 같은 지 확인 (참조가 같은 경우)
  const objectTypeCheck = validObject(objA, objB);
  if (objectTypeCheck !== null) return objectTypeCheck;

  //3. objA, objB가 객체일 경우
  const objAMap = new Map(Object.entries(objA));
  const objBMap = new Map(Object.entries(objB));

  //4. objA, objB의 key 개수가 다른 경우
  if (objAMap.size !== objBMap.size) return false;
  for (const [key, valueA] of objAMap) {
    const valueB = objBMap.get(key);
    if (!valueB || valueA !== valueB) {
      return false;
    }
  }
  return true;
}
