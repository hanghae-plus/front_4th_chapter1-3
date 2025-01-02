import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let previousProps: P | undefined;
  let previousComponent: ReactElement | undefined;

  const memoizedComponent = (props: P) => {
    if (!previousProps || !_equals(previousProps, props)) {
      previousProps = props;
      previousComponent = createElement(Component, props);
    }

    return previousComponent;
  };

  return memoizedComponent;
}
