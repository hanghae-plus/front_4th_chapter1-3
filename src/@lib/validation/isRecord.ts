/**
 * 값이 Record<string, unknown> 타입인지 확인하는 타입 가드
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
