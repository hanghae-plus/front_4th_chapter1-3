function nullGuard<T>(value: T | null): value is T {
  return value !== null;
}

export default nullGuard;
