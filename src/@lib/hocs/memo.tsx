import { shallowEquals } from "../equalities";
import { ComponentType } from "react";

interface Memoized<P extends object, R> {
  prevProps?: P;
  memoizedResult?: R;
}

export function memo<P extends object, R>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
): (props: P) => R {
  const memoized: Memoized<P, R> = {};

  return (props: P) => {
    if (!_equals(props, memoized.prevProps)) {
      memoized.prevProps = props;
      memoized.memoizedResult = (<Component {...props} />) as R;
    }

    return memoized.memoizedResult!;
  };
}
