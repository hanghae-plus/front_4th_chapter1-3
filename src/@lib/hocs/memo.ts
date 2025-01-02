import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement, useRef } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
): ComponentType<P> {
  const MemoizedComponent: ComponentType<P> = (props: P) => {
    const previousPropsRef = useRef<P | null>(null);
    const cachedElementRef = useRef<ReactElement | null>(null);

    const hasPropsChanged =
      previousPropsRef.current === null ||
      !_equals(props, previousPropsRef.current);

    if (hasPropsChanged) {
      previousPropsRef.current = props;
      cachedElementRef.current = createElement(Component, props);
    }

    return cachedElementRef.current!;
  };

  return MemoizedComponent;
}
