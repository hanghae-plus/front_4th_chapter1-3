import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  function MemoizedComponent(props: P): ReactElement {
    // 이전props 저장 ref
    const previousPropsRef = useRef<P | null>(null);

    // 이전렌더링 결과 저장 ref
    const previousRenderResultRef = useRef<ReactElement | null>(null);

    // 이전props와 현재props를 비교하여 렌더링 여부 결정
    if (
      !previousPropsRef.current ||
      !_equals(previousPropsRef.current, props)
    ) {
      // props가 변경된 경우 새로운 렌더링만들기
      previousRenderResultRef.current = createElement(Component, props);
      previousPropsRef.current = props;
    }

    // 이전 렌더링 결과 반환
    return previousRenderResultRef.current!;
  }

  return MemoizedComponent;
}
