import { areKeysEqual, isPrimitiveEqual } from "@/@lib";

export const deepEquals = <T>(objA: T, objB: T): boolean => {
  const primitiveCheck = isPrimitiveEqual(objA, objB);
  if (primitiveCheck !== null) {
    return primitiveCheck;
  }

  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) {
    return false; // 하나만 배열인 경우 다르다고 간주
  }

  if (isArrayA && isArrayB) {
    const arrayA = objA as unknown as Array<unknown>;
    const arrayB = objB as unknown as Array<unknown>;

    if (arrayA.length !== arrayB.length) {
      return false;
    }

    return arrayA.every((item, index) => deepEquals(item, arrayB[index])); // 재귀적으로 비교
  }

  if (!areKeysEqual(objA, objB)) {
    return false; // 키가 동일하지 않으면 false
  }

  const keysA = Object.keys(objA as object);
  return keysA.every((key) =>
    deepEquals(
      (objA as Record<string, unknown>)[key],
      (objB as Record<string, unknown>)[key],
    ),
  );
};
