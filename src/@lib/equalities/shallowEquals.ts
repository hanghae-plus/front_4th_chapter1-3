export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Array.isArray(objA) === true && Array.isArray(objB)) {
    const arrA = objA as Array<unknown>;
    const arrB = objB as Array<unknown>;

    if (arrA.length !== arrB.length) {
      return false;
    }

    for (let i = 0; i < arrA.length; i++) {
      if (arrA[i] !== arrB[i]) {
        return false;
      }
    }
    return true;
  }
  return objA === objB;
}
