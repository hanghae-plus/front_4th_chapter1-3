export function deepEquals(objA: unknown, objB: unknown): boolean {
  // 1. 기본 타입이거나 null인 경우 처리

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출

  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  )
    return false;

  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) return false;

  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) return false;

    return objA.every((Value, index) => deepEquals(Value, objB[index]));
  }

  const keysA = Object.keys(objA);
  const KeysB = Object.keys(objB);

  if (keysA.length !== KeysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;

    if (
      !deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      )
    )
      return false;
  }

  return true;
}
