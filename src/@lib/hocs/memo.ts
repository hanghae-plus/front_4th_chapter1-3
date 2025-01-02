import { createElement, ReactNode } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: React.FC<P>,
  equals = shallowEquals,
): React.FC<P> {
  const MemoizedComponent: React.FC<P> = (props) => {
    const prevPropsRef = useRef<P | null>(null);
    const renderedRef = useRef<ReactNode>(null);

    if (
      prevPropsRef.current === null ||
      !equals(prevPropsRef.current, props) ||
      renderedRef.current === null
    ) {
      prevPropsRef.current = props;
      renderedRef.current = createElement(Component, props);
    }

    return renderedRef.current as ReactNode;
  };

  return MemoizedComponent;
}
