/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  return function MemoizedComponent(props: P) {
    const renderedElementRef = useRef<React.ReactElement | null>(null);
    const prevPropsRef = useRef<P | null>(null);

    if (
      renderedElementRef.current === null ||
      !_equals(prevPropsRef.current, props)
    ) {
      prevPropsRef.current = props;
      renderedElementRef.current = createElement(Component, props);
    }

    return renderedElementRef.current;
  };
}
