export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (typeof objA !== "object" || typeof objB !== "object") return false;
  if (objA === null || objB === null) return false;

  // keys는 string[]을 반환 이를 (keyof T)[]로 변환하여 타입 안정성 향상
  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }

  return true;
}
