export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입 값들을 정확히 비교해야 한다
  if (objA === objB) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);

  // 3. 객체의 키 개수가 다른 경우 처리
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행

  // 1) for ...in
  // 객체의 각 속성들을 하나씩 순회하고 객체의 key값을 가져올 수 있다.
  // 객체의 프로퍼티를 직접 순회하여 타입스크립트가 객체의 키가 유효한지를 보장할 수 있다.
  for (const key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  // 2) for ...of
  // 반복 가능한(iterable) 데이터 구조의 값들을 순회한다.
  // 별도의 배열을 순회하므로 타입스크립트는 키가 실제로 객체의 유효한지 보장할 수 없다.
  // for (const key of aKeys) {
  //   if (objA[key as keyof T] !== objB[key as keyof T]) {
  //     return false;
  //   }
  // }

  return true;
}
