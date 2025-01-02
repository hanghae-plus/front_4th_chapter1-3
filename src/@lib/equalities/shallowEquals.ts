export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object")
    return false;

  //둘다 obj인 경우
  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  return (
    keysA.length === keysB.length &&
    keysA.every((key) => key in objB && objA[key] === objB[key])
  );
}
