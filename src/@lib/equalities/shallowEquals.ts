// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
// shallowEquals은 1뎁스까지만 비교한다.

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (Object.is(objA, objB)) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  // - typeof null -> object 이기 떄문에 null check
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const objAKeys = Object.keys(objA || {});
  const objBKeys = Object.keys(objB || {});

  // 3. 객체의 키 개수가 다른 경우 처리
  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of objAKeys) {
    if (!Object.is(objA[key as keyof T], objB[key as keyof T])) {
      return false;
    }
  }

  // 모든 조건 통과하면 true 리턴
  return true;
}
