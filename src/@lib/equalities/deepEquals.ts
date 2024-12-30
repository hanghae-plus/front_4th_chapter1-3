export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (const key of objAKeys) {
    const valueA = Reflect.get(objA, key);
    const valueB = Reflect.get(objB, key);
    if (!deepEquals(valueA, valueB)) {
      return false;
    }
  }

  return true;
}
