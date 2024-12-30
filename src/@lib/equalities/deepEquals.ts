// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

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

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (const key of objAKeys) {
    // 재귀적으로 각 속성에 대해 deepEquals 호출
    if (!deepEquals(objA[key as keyof T], objB[key as keyof T])) {
      return false;
    }
  }

  return true;
}
