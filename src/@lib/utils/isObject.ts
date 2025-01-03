export function isObject(target: unknown): target is Record<string, unknown> {
  return typeof target === "object";
}
