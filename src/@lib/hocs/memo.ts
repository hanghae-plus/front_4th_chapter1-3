import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    //이전 props 저장할 ref
    const prevProps = useRef<P | null>(null);

    //첫랜더링 || 이전 props와 비교해서 다른 경우
    if (prevProps.current === null || !_equals(prevProps.current, props)) {
      prevProps.current = props;
      return createElement(Component, prevProps.current);
    }
  };
  return MemoizedComponent;
}
