export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  if (objA === null || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => objA[key] === objB[key]);
}
