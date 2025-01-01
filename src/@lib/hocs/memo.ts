import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let prevProps: P | null = null;
  let memoizedComponent: ReactElement<P> | null = null;

  return (props: P) => {
    if (!prevProps || !_equals(prevProps, props)) {
      prevProps = props;
      memoizedComponent = createElement<P>(Component, props);
    }

    return memoizedComponent;
  };
}
