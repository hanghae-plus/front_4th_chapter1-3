export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (typeof objA !== "object" || typeof objB !== "object") return false;
  if (objA === null || objB === null) return false;

  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];
  if (keysA.length !== keysB.length) return false;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  for (const key of keysA) {
    if (!deepEquals(objA[key], objB[key])) return false;
  }

  return true;
}
