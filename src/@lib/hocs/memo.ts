import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = function (props: P) {
    const ref = useRef<null | {
      component: ReactElement;
      props: P;
    }>(null);

    const createNewComponent = () => {
      const newComponent = {
        component: createElement(Component, props),
        props,
      };
      ref.current = newComponent;
      return newComponent.component;
    };

    if (ref.current === null || !_equals(ref.current.props, props)) {
      return createNewComponent();
    }

    return ref.current.component;
  };

  return MemoizedComponent;
}
