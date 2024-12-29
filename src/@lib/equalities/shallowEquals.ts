export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 3. 키 개수 비교
  const keys1 = Object.keys(objA);
  const keys2 = Object.keys(objB);
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교
  for (const key of keys1) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}
