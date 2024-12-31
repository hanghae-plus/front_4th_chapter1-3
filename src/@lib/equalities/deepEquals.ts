// export function deepEquals<T>(objA: T, objB: T): boolean {
//   if (typeof objA === "object" && typeof objB === "object") {
//     if (objA == null && objB == null) {
//       return true;
//     }
//     if (Object.keys(objA).length === Object.keys(objB).length) {
//       for (const key of Object.keys(objA)) {
//         if (typeof objA[key] === "object" && typeof objB[key] === "object") {
//           return deepEquals(objA[key], objB[key]);
//         }
//         if (objA[key] !== objB[key]) {
//           return false;
//         }
//       }
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     return objA === objB;
//   }
// }

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입이거나 null/undefined인 경우
  if (objA === objB) {
    return true;
  }
  
  // null/undefined 체크
  if (objA == null || objB == null) {
    return false;
  }
  
  // 배열 체크
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }
    return true;
  }
  
  // 객체 체크
  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    
    if (keysA.length !== keysB.length) {
      return false;
    }
    
    for (const key of keysA) {
      if (!keysB.includes(key)) {
        return false;
      }
      if (!deepEquals(objA[key], objB[key])) {
        return false;
      }
    }
    return true;
  }
  
  return false;
}