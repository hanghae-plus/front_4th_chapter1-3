export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return objA === objB;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (const key of Object.keys(objA)) {
    const keyA = Reflect.get(objA, key);
    const keyB = Reflect.get(objB, key);
    if (keyA !== keyB) {
      return false;
    }
  }

  return true;
}
