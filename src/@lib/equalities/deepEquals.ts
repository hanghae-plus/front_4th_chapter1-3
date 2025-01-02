export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) return true;

  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;
  //    - 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  for (const key of keysA) {
    const objAValue = (objA as Record<string, T>)[key];
    const objBValue = (objB as Record<string, T>)[key];

    if (!deepEquals(objAValue, objBValue)) return false;
  }
  return true;
}
