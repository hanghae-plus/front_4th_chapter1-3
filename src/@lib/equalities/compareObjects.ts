export function compareObjects<T>(
  objA: T,
  objB: T,
  deep: boolean = false,
): boolean {
  if (objA === objB) {
    return true;
  }

  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((itemA, index) =>
      deep ? compareObjects(itemA, objB[index], true) : itemA === objB[index],
    );
  }

  if (!Array.isArray(objA) && !Array.isArray(objB)) {
    const keysA = Object.keys(objA) as string[];
    const keysB = Object.keys(objB) as string[];

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) =>
      deep
        ? compareObjects(
            (objA as Record<string, unknown>)[key],
            (objB as Record<string, unknown>)[key],
            true,
          )
        : (objA as Record<string, unknown>)[key] ===
          (objB as Record<string, unknown>)[key],
    );
  }

  return false;
}
