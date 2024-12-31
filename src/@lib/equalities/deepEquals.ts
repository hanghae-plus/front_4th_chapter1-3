export function deepEquals(objA: unknown, objB: unknown): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) =>
    deepEquals(
      (objA as Record<string, unknown>)[key],
      (objB as Record<string, unknown>)[key],
    ),
  );
}
// unknown 타입은 Record<string, unknown>보다 더 넓은(wider) 타입입니다
// unknown은 모든 타입이 될 수 있는 가능성을 의미합니다
// Record<string, unknown>은 특정 구조(객체)를 가진 타입입니다
// 5. 따라서 타입스크립트는 "더 넓은 타입(unknown)을 더 좁은 타입(Record<string, unknown>)에 할당할 수 없다"고 판단합니다
