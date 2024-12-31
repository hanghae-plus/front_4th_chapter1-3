import objectTypeGuard from '../type/utils/objectTypeGuard';

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 원시 타입의 경우 값만 비교합니다.
  // 비교와 동시에 타입을 좁혀주는 타입 가드를 사용합니다.
  if (!objectTypeGuard(objA) || !objectTypeGuard(objB)) {
    return objA === objB;
  }

  // 속성의 개수가 다르면 다른 객체입니다.
  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  // 모든 속성이 같은지 확인합니다.
  for (const key in objA) {
    if (!deepEquals(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
