export const isValidObjects = <T>(objA: T, objB: T) => {
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  return true;
};
