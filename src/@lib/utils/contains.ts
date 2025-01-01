export function contains<T extends string>(
  list: readonly T[],
  value: string,
): value is T {
  return list.includes(value as T);
}
