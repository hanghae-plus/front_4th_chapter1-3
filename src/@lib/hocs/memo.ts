import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    const prevPropRef = useRef<P | null>(null);
    const prevComponentRef = useRef<ReactElement<P> | null>(null);

    const shouldUpdate =
      prevPropRef.current === null || !_equals(prevPropRef.current, props);

    prevPropRef.current = props;
    if (shouldUpdate) {
      prevComponentRef.current = createElement(Component, props);
    }

    return prevComponentRef.current;
  };
  return MemoizedComponent;
}
