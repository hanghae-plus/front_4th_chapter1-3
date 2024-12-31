// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.

import { hasSameKey } from "./utils/hasSameKey";
import { isValidObjects } from "./utils/isValidObjects";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (!isValidObjects(objA, objB)) {
    return false;
  }

  if (!hasSameKey(objA, objB)) {
    return false;
  }

  const objAKeys = Object.keys(objA || {});
  for (const key of objAKeys) {
    // 재귀적으로 각 속성에 대해 deepEquals 호출
    if (!deepEquals(objA[key as keyof T], objB[key as keyof T])) {
      return false;
    }
  }

  return true;
}
