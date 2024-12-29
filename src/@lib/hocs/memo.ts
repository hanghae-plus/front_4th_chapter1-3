import { shallowEquals } from "../equalities";
import React, { ComponentType, ReactNode } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let memoizedComponent: ReactNode | null = null;
  let memoizedProps: P | null = null;
  return (props: P) => {
    if (!_equals(memoizedProps, props)) {
      memoizedProps = props;
      memoizedComponent = React.createElement(Component, props);
    }
    return memoizedComponent;
  };
}
