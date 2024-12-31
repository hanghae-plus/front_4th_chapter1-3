// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== typeof objB) return false;

  // 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== 'object' || objA === null || objB === null || objB === undefined) return false

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  // 객체의 키 개수가 다른 경우 처리
  if (objAKeys.length !== objBKeys.length) return false;

  // 모든 키에 대해 얕은 비교 수행
  for (let i = 0; i < objAKeys.length; i++) {
    const currentKey = objAKeys[i];
    if (!Object.hasOwnProperty.call(objB, currentKey) || !Object.is((objA as any)[currentKey], (objB as any)[currentKey])) {
      return false;
    }
  }

  return true;
}
