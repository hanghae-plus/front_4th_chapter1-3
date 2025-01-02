import { ComponentType, createElement } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const renderRef = useRef<React.ReactElement | null>(null);

    if (!prevPropsRef.current || !_equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      renderRef.current = createElement(Component, props);
    }
    return renderRef.current;
  };
}
