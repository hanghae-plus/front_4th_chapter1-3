// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  // 배열인지 확인
  if (Array.isArray(objA) !== Array.isArray(objB)) {
    return false;
  }

  // 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) return false;

  // 재귀적으로 각 속성에 대해 deepEquals 호출
  for (const key of keysA) {
    if (!deepEquals(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
