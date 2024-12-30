export function deepEquals<T>(objA: T, objB: T): boolean {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (
    objA === null ||
    objB === null ||
    objA === undefined ||
    objB === undefined
  ) {
    return objA === objB;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    return (
      objA.length === objB.length &&
      objA.every((value, index) => deepEquals(value, objB[index]))
    );
  }

  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return Object.keys(objA).every((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return deepEquals(objA[key], objB[key]);
    });
  }

  return objA === objB;
}
