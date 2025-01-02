import { isRecord } from "../../utils";

//    - 재귀적으로 각 속성에 대해 deepEquals 호출
export function deepEquals(objA: unknown, objB: unknown): boolean {
  if (objA === objB) {
    return true;
  }
  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 배열의 길이가 같은지 확인
  if (
    Array.isArray(objA) &&
    Array.isArray(objB) &&
    objA.length === objB.length
  ) {
    return objA.every((v, i) => deepEquals(v, objB[i]));
  }

  //    - 객체의 키 개수가 다른 경우 처리
  //    - 객체 null 인지 확인
  if (isRecord(objA) && isRecord(objB)) {
    // 3. 키 개수 비교
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }
    return Object.keys(objA).every((key) => deepEquals(objA[key], objB[key]));
  }

  return false;
}
