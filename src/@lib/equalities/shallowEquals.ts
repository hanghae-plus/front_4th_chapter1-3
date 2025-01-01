/**
 * 두 객체가 완전히 동일한지 비교하는 함수 (얕은 비교)
 * 객체의 첫 번째 레벨에 있는 속성들만 비교.
 * 중첩된 객체는 비교하지 않고, 참조만 비교함.
 * @param objA 비교할 첫 번째 객체
 * @param objB 비교할 두 번째 객체
 * @returns 두 객체가 완전히 동일하면 true, 그렇지 않으면 false
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 참조 비교
  if (objA === objB) return true;

  // 타입 체크
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  // null 체크
  if (objA === null || objB === null) return false;

  // 객체 키 개수 비교
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // 두 객체의 키 개수가 같으면 비교
  for (const key of keysA) {
    // 두 객체에 키가 없거나 키의 값이 다르면 비교하지 않음
    if (
      // obj.hasOwnProperty(key) 보다 안전한 방법
      // 객체가 특정 프로퍼티를 가지고 있는지 확인
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key as keyof typeof objA] !== objB[key as keyof typeof objB]
    ) {
      return false;
    }
  }

  return true;
}

// 테스트 케이스 (claude)
// const objA = { name: "김철수", age: 25 };
// const objB = { name: "김철수", age: 25 };
// const objC = { name: "김철수" };

// // 케이스 1: 모든 키와 값이 같은 경우
// for (const key of ["name", "age"]) {
//   // name과 age 모두 존재하고 값도 같음
//   Object.prototype.hasOwnProperty.call(objB, key) // true
//   objA[key] === objB[key] // true
// }
// // 결과: true 반환

// // 케이스 2: objC와 비교 (키가 없는 경우)
// for (const key of ["name", "age"]) {
//   // age 키가 objC에 없음
//   Object.prototype.hasOwnProperty.call(objC, "age") // false
//   // 여기서 즉시 false 반환
// }
// // 결과: false 반환
