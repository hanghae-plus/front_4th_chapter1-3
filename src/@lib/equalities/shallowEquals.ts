export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 기본타입일 때 비교 처리
  if (Object.is(objA, objB)) {
    return true;
  }

  // 객체가 아닌 것들을 걸러냄
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  //객체(배열)의 키(index) 개수 췍
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  //객체(배열)의 개수가 같으니 값이 같은지 비교
  for (const key of keysA) {
    if (
      objA[key as Extract<keyof T, string>] !==
      objB[key as Extract<keyof T, string>]
    )
      return false;
    // (objA[key] !== objB[key]) 이렇게 했을때 타입 선언 안하고 에러 없앨 수는 없는가...? => 없는듯
  }

  return true;
}
