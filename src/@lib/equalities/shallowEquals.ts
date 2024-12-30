export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입 값들을 정확히 비교해야 한다
  if (objA === objB) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);

  // 3. 객체의 키 개수가 다른 경우 처리
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return aKeys.every((v, i) => objA[i] === objB[i]);
  }

  if (!Array.isArray(objA) && !Array.isArray(objB)) {
    return aKeys.every((v) => objA[v as keyof T] === objB[v as keyof T]);
  }

  return true;
}
