/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks";
import React from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  const memoComponent = (props: P) => {
    const prevElement = useRef<P | null>(null);
    if (prevElement.current === null || !_equals(prevElement.current, props)) {
      prevElement.current = props;
      return React.createElement(Component, prevElement.current);
    }
  };
  return memoComponent;
}
