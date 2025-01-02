export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) return true;
  if (objA === null || objB === null) return false;
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  // 2. 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  // 3. 객체인 경우
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      ),
  );
}
