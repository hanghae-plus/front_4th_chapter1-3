import { ComponentType, createElement, ReactNode } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals,
): ComponentType<P> {
  function MemoizedComponent(props: P) {
    // 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);
    const renderedRef = useRef<ReactNode>(null);

    // props 비교
    if (
      prevPropsRef.current === null ||
      !equals(prevPropsRef.current, props) ||
      renderedRef.current === null
    ) {
      prevPropsRef.current = props;
      renderedRef.current = createElement(Component, props);
    }

    return renderedRef.current;
  }

  return MemoizedComponent;
}
