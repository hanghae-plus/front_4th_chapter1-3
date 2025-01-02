export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;
  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object")
    return false;

  //obj 비교
  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  return (
    keysA.length === keysB.length &&
    keysA.every((key) => key in objB && deepEquals(objA[key], objB[key]))
  );
}
