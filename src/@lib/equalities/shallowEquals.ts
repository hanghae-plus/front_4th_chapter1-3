// NOTE: 함수 명 앞에 <T>는 TypeScript의 제네릭 타입 표기법
// NOTE: 타입을 파라미터처럼 사용할 수 있게 해주는 기능.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  // 3. 객체의 키 개수가 다른 경우
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    // NOTE: key as keyof T 는 타입 단언 문법
    // NOTE: keyof T는 T 타입의 가능한 모든 키들의 유니온 타입을 의미
    if (objA[key as keyof T] !== objB[key as keyof T]) {
      return false;
    }
  }

  return true;
}
