export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 참조가 같은 경우 바로 true 반환
  if (objA === objB) return true;

  // 2. 둘 중 하나라도 null이거나 객체가 아닌 경우 처리
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  // 3. 객체의 키 목록을 가져오기
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 4. 키 개수가 다른 경우 false 반환
  if (keysA.length !== keysB.length) return false;

  // 5. 키와 값을 모두 비교 (얕은 비교)
  for (const key of keysA) {
    const objAValue = (objA as Record<string, T>)[key];
    const objBValue = (objB as Record<string, T>)[key];

    if (objAValue !== objBValue) return false;
  }

  // 6. 모든 조건을 통과하면 true 반환
  return true;
}
