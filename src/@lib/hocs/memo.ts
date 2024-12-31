import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let memoizedProps: P | null = null;
  let memoizedComponent: ReactElement<P> | null = null;

  return (props: P) => {
    if (!memoizedProps) {
      memoizedProps = props;
      memoizedComponent = createElement<P>(Component, props);
    }

    if (!_equals(memoizedProps, props)) {
      memoizedProps = props;
      memoizedComponent = createElement<P>(Component, props);
    }

    return memoizedComponent;
  };
}
