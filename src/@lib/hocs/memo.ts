/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals,
): ComponentType<P> {
  return (props: P) => {
    const ref = useRef<{ component: ReactElement; props: P } | null>(null);

    if (ref.current === null) {
      ref.current = {
        component: createElement(Component, props),
        props,
      };

      return ref.current.component;
    }

    if (!equals(ref.current.props, props)) {
      ref.current = {
        component: createElement(Component, props),
        props,
      };
    }

    return ref.current.component;
  };
}
