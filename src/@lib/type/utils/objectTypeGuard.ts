function objectTypeGuard(obj: unknown): obj is object {
  return obj !== null && typeof obj === 'object';
}

export default objectTypeGuard;
