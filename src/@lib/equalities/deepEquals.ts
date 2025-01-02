export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (objA === null || objB === null) {
    return objA === objB;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return objA === objB;
  }

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) return false;

  for (const key of objAKeys) {
    const valueA = objA[key as keyof typeof objA];
    const valueB = objB[key as keyof typeof objB];

    // HERE : 근백님 로직 이해 후, 적용
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      !deepEquals(valueA, valueB)
    ) {
      return false;
    }
  }
  return true;
}
