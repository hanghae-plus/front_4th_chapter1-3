export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  const aArray = Array.isArray(objA);
  const bArray = Array.isArray(objB);

  if (aArray && bArray) {
    if (objA.length !== objB.length) return false;
    return objA.every((obj, idx) => deepEquals(obj, objB[idx]));
  } else if (aArray !== bArray) return false;

  if (
    typeof objA === "object" &&
    objA !== null &&
    typeof objB === "object" &&
    objB !== null
  ) {
    const aKeys = Object.keys(objA);
    const bKeys = Object.keys(objB);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(
      (key) =>
        bKeys.includes(key) &&
        deepEquals(objA[key as keyof T], objB[key as keyof T]),
    );
  }
  return false;
}
