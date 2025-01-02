import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let prevProps: P | null = null;
  let memoizedResult: ReactElement<P> | null = null;

  return function (props: P) {
    if (prevProps === null || !_equals(prevProps, props)) {
      memoizedResult = createElement<P>(Component, props);
    }
    prevProps = props;
    return memoizedResult;
  };
}
