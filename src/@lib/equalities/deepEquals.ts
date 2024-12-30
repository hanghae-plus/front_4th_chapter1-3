export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  if (Array.isArray(objA) || Array.isArray(objB)) {
    return false;
  }

  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEquals(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
