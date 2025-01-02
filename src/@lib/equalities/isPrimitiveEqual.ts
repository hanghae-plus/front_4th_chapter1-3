export const isPrimitiveEqual = <T>(objA: T, objB: T): boolean | null => {
  if (objA === objB) {
    return true; // 동일한 참조 또는 값이면 true
  }

  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false; // 하나가 null이거나 기본 타입이 다르면 false
  }

  return null; // 비교를 진행해야 함
};
