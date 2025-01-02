// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리

  if (objA === null || objB === null) return false; //null이면 객체 X
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  // 3. 객체의 키 개수가 다른 경우 처리
  const countObjectA = Object.keys(objA);
  const countObjectB = Object.keys(objB);
  if (countObjectA.length !== countObjectB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행

  for (let i = 0; i < countObjectA.length; i++) {
    const currentKey = countObjectA[i];
    if (
      !Object.hasOwnProperty.call(objB, currentKey) ||
      !Object.is(objA[currentKey as keyof T], objB[currentKey as keyof T])
    ) {
      return false;
    }
  }
  return true;
}
