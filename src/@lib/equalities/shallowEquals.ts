export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (!objA || typeof objA !== "object" || !objB || typeof objB !== "object") {
    return false;
  }

  const keyListOfA = Object.keys(objA as object) as Array<keyof T>;
  const keyListOfB = Object.keys(objB as object) as Array<keyof T>;

  if (keyListOfA.length !== keyListOfB.length) {
    return false;
  }

  for (let i = 0; i < keyListOfA.length; i++) {
    const currentKeyOfA = keyListOfA[i];

    if (
      !Object.hasOwnProperty.call(objB, currentKeyOfA) ||
      !Object.is(objA[currentKeyOfA], objB[currentKeyOfA])
    ) {
      return false;
    }
  }

  return true;
}
