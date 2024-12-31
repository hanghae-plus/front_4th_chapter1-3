import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    const memoizedProps = useRef<P | null>(null);

    if (memoizedProps.current === null) {
      memoizedProps.current = props;
      return React.createElement(Component, props);
    }

    if (!_equals(memoizedProps.current, props)) {
      memoizedProps.current = props;
      return React.createElement(Component, props);
    }
  };

  return MemoizedComponent;
}
