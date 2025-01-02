/**
 * 값이 null이거나 primitive 타입인지 검사하는 함수
 * @param value 검사할 값
 * @returns {boolean}
 */
export function isNullOrPrimitive(value: unknown): boolean {
  return value == null || typeof value !== "object";
}
