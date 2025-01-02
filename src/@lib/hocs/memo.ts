import React from "react";
import { shallowEquals } from "../equalities";
import { ComponentType, useRef } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  function MemoComponent(props: P) {
    const prevProps = useRef<P | null>(null);

    if (prevProps.current === null || !_equals(prevProps.current, props)) {
      prevProps.current = props;
      return React.createElement(Component, props);
    }
  }

  return MemoComponent;
}
