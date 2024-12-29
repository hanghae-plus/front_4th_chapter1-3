import { shallowEquals } from './shallowEquals';

/**
 * 두 객체가 깊은 의미에서 같은지 비교하는 함수
 * @param objA 비교할 첫 번째 객체
 * @param objB 비교할 두 번째 객체
 * @returns 두 객체가 같으면 true, 그렇지 않으면 false
 */
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 참조 비교
  if (objA === objB) {
    return true;
  }

  // 객체 타입 및 null 체크
  if (!objA || !objB || typeof objA !== 'object' || typeof objB !== 'object') {
    return false;
  }

  // 배열인지 객체인지 체크
  if (Array.isArray(objA) !== Array.isArray(objB)) {
    return false;
  }

  // 키 개수 및 값 비교
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }

  // 중첩된 객체를 직접 비교하기 전에 얕은 비교를 먼저 시도
  return keysA.every(key => {
    const valA = (objA as Record<string, unknown>)[key];
    const valB = (objB as Record<string, unknown>)[key];

    // 중첩된 객체일 경우에는 shallowEquals로 먼저 확인
    if (typeof valA === 'object' && typeof valB === 'object') {
      return shallowEquals(valA, valB) || deepEquals(valA, valB);
    }

    // 기본적으로 얕은 비교
    return shallowEquals(valA, valB);
  });
}
