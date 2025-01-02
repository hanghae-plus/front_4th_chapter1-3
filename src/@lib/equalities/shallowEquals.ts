import { areKeysEqual, isPrimitiveEqual } from "@/@lib";

export const shallowEquals = <T>(objA: T, objB: T): boolean => {
  const primitiveCheck = isPrimitiveEqual(objA, objB);
  if (primitiveCheck !== null) {
    return primitiveCheck;
  }

  if (!areKeysEqual(objA, objB)) {
    return false;
  }

  const keysA = Object.keys(objA as object);
  return keysA.every(
    (key) =>
      (objA as Record<string, unknown>)[key] ===
      (objB as Record<string, unknown>)[key],
  );
};
