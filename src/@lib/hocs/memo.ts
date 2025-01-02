/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";
import { Equatable } from "../equalities/types";

export function memo<P extends object & Equatable>(
  Component: ComponentType<P>,
  equals = shallowEquals
) {
  return (props: P) => {
    const previousProps = useRef<P | null>(null);
    const previousComponent = useRef<ReactElement<P> | null>(null);

    const shouldUpdate = !equals(previousProps.current, props); // 같지않으니 리렌더링 발생

    if (shouldUpdate) {
      previousComponent.current = createElement(Component, props);
      previousProps.current = props;
    }

    return previousComponent.current;
  };
}
