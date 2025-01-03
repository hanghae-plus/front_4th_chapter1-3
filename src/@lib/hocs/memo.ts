import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  equals: (prev: P, next: P) => boolean = shallowEquals,
) {
  const MemorizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<React.ReactElement | null>(null);

    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      prevResultRef.current = createElement(Component, props);
    }

    prevPropsRef.current = props;

    return prevResultRef.current;
  };

  return MemorizedComponent;
}
