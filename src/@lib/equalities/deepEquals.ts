export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (!objA || typeof objA !== "object" || !objB || typeof objB !== "object") {
    return false;
  }
  const isObjAArray = Array.isArray(objA);
  const isObjBArray = Array.isArray(objB);

  if (isObjAArray || isObjBArray) {
    if (isObjAArray && isObjBArray && objA.length === objB.length) {
      return !objA.some((value, index) => !deepEquals(value, objB[index]));
    }

    return false;
  }

  const keyListOfA = Object.keys(objA as object) as Array<keyof T>;
  const keyListOfB = Object.keys(objB as object) as Array<keyof T>;

  if (keyListOfA.length !== keyListOfB.length) {
    return false;
  }

  return !keyListOfA.some(
    (keyOfA) =>
      !Object.hasOwnProperty.call(objB, keyOfA) ||
      // eslint-disable-next-line prettier/prettier
      !deepEquals(objA[keyOfA], objB[keyOfA])
  );

  return true;
}
