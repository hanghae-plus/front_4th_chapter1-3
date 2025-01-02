import { DependencyList } from "react";

export function shallowEquals<T>(
  objA: T | DependencyList,
  objB: T | DependencyList,
): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 둘 중 하나라도 null이거나 객체/배열이 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  // 3. 배열인 경우 처리
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return !objA.some((item, index) => item !== objB[index]);
  }

  // 4. 배열이 아닌 경우 객체로 간주하고 처리
  if (!Array.isArray(objA) && !Array.isArray(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(
      (key) =>
        (objA as Record<string, unknown>)[key] ===
        (objB as Record<string, unknown>)[key],
    );
  }

  // 5. 한쪽이 배열이고 한쪽이 객체인 경우
  return false;
}
