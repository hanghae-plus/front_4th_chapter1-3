export function deepEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 정확히 같은 경우 true 반환
  if (objA === objB) {
    return true;
  }

  // 1. 기본 타입이거나 null인 경우 처리
  if (typeof objA !== 'object' || objA === null || objB === null || objB === undefined) return false

  // 2. 둘 다 객체인 경우:
  if (typeof objA === 'object' && typeof objB === 'object') {
    // 배열인지 확인
    if (Array.isArray(objA) && Array.isArray(objB)) {
      return objA.every((v, k) => deepEquals(v, objB[k]));
    }

    const objAKeys = Object.keys(objA)
    const objBKeys = Object.keys(objB)

    // 객체의 키 개수가 다른 경우 처리
    if (objAKeys.length !== objBKeys.length) return false;

    // 재귀적으로 각 속성에 대해 deepEquals 호출
    return objAKeys.every(key => deepEquals((objA as Record<string, any>)[key], (objB as Record<string, any>)[key]));
  }
  return false
}
