export function deepEquals<T>(objA: T, objB: T): boolean {
  // 참조 비교
  if (objA === objB) return true;

  // 타입 체크
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  // null 체크
  if (objA === null || objB === null) return false;

  // 원시 타입이면 값 비교
  if (typeof objA !== "object") return objA === objB;

  // 배열 처리
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 길이가 다르면 false
    if (objA.length !== objB.length) return false;

    // 모든 요소 비교 -> 재귀 호출
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  // 일반 객체 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 키 개수가 다르면 false
  if (keysA.length !== keysB.length) return false;

  // 각 키 비교 -> 재귀 호출
  return keysA.every(
    (key) =>
      // objB에 키가 없으면 false
      Object.prototype.hasOwnProperty.call(objB, key) &&
      // 각 키의 값 비교 -> 재귀 호출
      deepEquals(objA[key as keyof T], objB[key as keyof T])
  );
}

// JSON(JavaScript Object Notation)을 이용하는 방법

// 장점:
// - JSON.stringify() : 객체를 문자열 변환 -> JSON.parse() : 문자열을 객체로 변환
//    -> 원본 객체와 복사본 객체가 서로 독립적. 따라서 복사본 객체를 수정해도 원본 객체에 영향을 미치지 않음.
// - JSON을 이용한 깊은 복사는 다른 깊은 복사 방법에 비해 코드가 간결, 쉬운 이해 가능.

// 단점:
// - JSON을 이용한 깊은 복사는 원본 객체가 가지고 있는 모든 정보를 복사하지 않는다. ex) 함수, undefined와 같은 속성 값 복사되지 않음
// - JSON.stringify() 함수는 순환 참조(Recursive Reference)를 지원하지 않는다.
//    -> 따라서 객체 안에 객체가 중첩되어 있는 경우, 복사 불가.
