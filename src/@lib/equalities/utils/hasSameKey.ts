export const hasSameKey = <T>(objA: T, objB: T) => {
  const objAKeys = Object.keys(objA || {});
  const objBKeys = Object.keys(objB || {});

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  return true;
};
