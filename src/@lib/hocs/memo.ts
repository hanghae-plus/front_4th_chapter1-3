import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return (props: P) => {
    const memoizedProps = useRef<P>(props);
    const memoizedComponent = useRef<ReactElement<P>>();

    if (!memoizedComponent.current) {
      memoizedComponent.current = createElement<P>(Component, props);
    }

    if (!_equals(memoizedProps.current, props)) {
      memoizedProps.current = props;
      memoizedComponent.current = createElement<P>(Component, props);
    }

    return memoizedComponent.current;
  };
}
