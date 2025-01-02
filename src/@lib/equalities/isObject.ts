export default function isObject(
  value: unknown,
  key: string,
): value is Record<string, unknown> {
  return Object.prototype.hasOwnProperty.call(value, key);
}
