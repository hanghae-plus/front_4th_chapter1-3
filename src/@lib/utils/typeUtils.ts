export const isObject = <T>(obj: T) => {
  if (obj === null) return false;
  return typeof obj === "object";
};
