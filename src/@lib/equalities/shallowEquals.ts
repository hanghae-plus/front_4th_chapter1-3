import { validObject } from "./utils/validObject.ts";

export function shallowEquals<T extends object>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  const validChecks = validObject(objA, objB);
  if (validChecks !== null) return validChecks;

  // 3. objA, objB가 객체일 경우
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 4. objA, objB의 key 개수가 다른 경우
  if (keysA.length !== keysB.length) return false;

  // 5. Map을 사용하여 키와 값을 비교
  const mapA = new Map(
    Object.entries(objA).map(([key, value]) => [key, value]),
  );
  const mapB = new Map(
    Object.entries(objB).map(([key, value]) => [key, value]),
  );
  // 6. objA와 objB의 각 키와 값이 동일한지 확인
  for (const key of keysA) {
    if (!mapB.has(key) || mapA.get(key) !== mapB.get(key)) {
      return false;
    }
  }
  return true;
}
