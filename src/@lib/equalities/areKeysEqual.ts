export const areKeysEqual = <T>(objA: T, objB: T): boolean => {
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => keysB.includes(key));
};
