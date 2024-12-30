export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 두값이 정확히 같은지 확인인
  if (objA === objB) return true;

  // 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 객체의 키 개수가 다른경우 처리
  if (keysA.length !== keysB.length) return false;

  // 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key] !== objB[key]
    ) {
      return false;
    }
  }
  /* for (let key of keysA) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false;
    }
  } */

  return true;
}
