export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  if (objA === null || objB === null) {
    return false;
  }

  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) {
    return false;
  }

  if (isArrayA && isArrayB) {
    if ((objA as unknown[]).length !== (objB as unknown[]).length) {
      return false;
    }

    return (objA as unknown[]).every((item, index) =>
      deepEquals(item, (objB as unknown[])[index]),
    );
  }

  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => deepEquals(objA[key], objB[key]));
}
