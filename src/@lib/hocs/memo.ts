import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const CachedComponent: React.FC<P> = (props: P) => {
    const oldPropsRef = useRef<P | null>(null);
    const oldComponentRef = useRef<ReactElement | null>(null);

    if (!oldPropsRef.current || !_equals(oldPropsRef.current, props)) {
      const result = createElement(Component, props);

      oldComponentRef.current = result;
      oldPropsRef.current = props;

      return result;
    }

    return oldComponentRef.current;
  };

  return CachedComponent;
}
