export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  )
    return false;
  const keyB = Object.keys(objB) as (keyof T)[];
  const keyA = Object.keys(objA) as (keyof T)[];
  if (keyB.length !== keyA.length) return false;
  for (const key of keyA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key] !== objB[key]
    )
      return false;
  }
  return true;
}
