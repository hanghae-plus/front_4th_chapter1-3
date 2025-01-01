export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return objA === objB;
  }

  //둘다 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  //하나만 배열
  if (Array.isArray(objA) || Array.isArray(objB)) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const k of keysA) {
    if (
      !(k in objB) ||
      !deepEquals(
        (objA as Record<string, unknown>)[k],
        (objB as Record<string, unknown>)[k],
      )
    ) {
      return false;
    }
  }

  return true;
}
