export function shallowEquals<T>(objA: T, objB: T): boolean {
  //1. 두 값이 정확히 같은 지 확인 (참조가 같은 경우)

  if (objA === objB) return true;

  //2. 두 값이 객체인지 확인
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  )
    return false;

  //3. objA, objB가 객체일 경우
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  //4. objA, objB의 key 개수가 다른 경우
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false;
    }
  }
  return true;
}
