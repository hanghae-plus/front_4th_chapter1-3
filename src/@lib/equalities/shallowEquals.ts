export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. null 체크를 먼저 수행
  if (objA === null || objB === null) {
    return false;
  }
  // 3. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  const keysA = Object.keys(objA as object) as (keyof T)[];
  const keysB = Object.keys(objB as object) as (keyof T)[];
  // 3. 객체의 키 개수가 다른 경우 처리
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  return keysA.every((key) => objA[key] === objB[key]);
}
