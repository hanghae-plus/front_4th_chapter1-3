export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 두 객체의 참조 레퍼런스 값이 같은 경우, 또는 기본 타입인데 같은 경우
  if (objA === objB) {
    return true;
  }

  // 두 객체 중 하나라도 객체가 아니거나 null인 경우
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 두 객체의 키 개수가 다른 경우
  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 모든 키에 대해서 얕은 비교 수행
  // general하게 사용되는 shallowEquals이므로, Object.prototype.hasOwnProperty를 사용 (call로 매핑해줌으로써, 예외상황을 처리)
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key] !== objB[key]
    ) {
      return false;
    }
  }

  return true;
}
