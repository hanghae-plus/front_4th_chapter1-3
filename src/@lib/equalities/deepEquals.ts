export function deepEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 정확히 같은 경우 true 반환
  if (objA === objB) return true;

  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === null || objB === null || typeof objA !== 'object' || typeof objB !== 'object') {
    return false;
  }

  // 2. 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 배열 길이가 다르면 바로 false
    if (objA.length !== objB.length) return false;

    // 배열의 각 요소를 재귀적으로 비교
    return objA.every((v, k) => deepEquals(v, objB[k]));
  }

  // 3. 객체 비교
  if (!Array.isArray(objA) && !Array.isArray(objB)) {
    const objAKeys = Object.keys(objA);
    const objBKeys = Object.keys(objB);

    // 객체의 키 개수가 다르면 바로 false
    if (objAKeys.length !== objBKeys.length) return false;

    // 재귀적으로 각 속성에 대해 deepEquals 호출
    return objAKeys.every(key =>
      deepEquals((objA as Record<string, any>)[key], (objB as Record<string, any>)[key])
    );
  }
  return false;
}
