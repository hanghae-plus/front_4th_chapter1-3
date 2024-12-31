export function baseEquals<T>(
  objA: T,
  objB: T,
  compareValue: (valueA: unknown, valueB: unknown) => boolean,
): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
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
    if (!compareValue(valueA, valueB)) {
      return false;
    }
  }

  return true;
}
