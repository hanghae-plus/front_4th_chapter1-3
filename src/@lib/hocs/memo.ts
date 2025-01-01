import React, { ComponentType } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  const MemoizedComponent = (props: P) => {
    const previousProps = useRef<P>(props);
    const elementRef = useRef<React.ReactElement | null>(null);

    if (!_equals(previousProps.current, props)) {
      // props가 변경되었을 때만 새로운 엘리먼트 생성
      previousProps.current = props;
      elementRef.current = React.createElement(Component, props);
    } else if (!elementRef.current) {
      // 초기 렌더링시에만 엘리먼트 생성
      elementRef.current = React.createElement(
        Component,
        previousProps.current
      );
    }

    // 저장된 엘리먼트 반환
    return elementRef.current;
  };

  MemoizedComponent.displayName = `Memo(${
    Component.displayName || Component.name || "Component"
  })`;

  return MemoizedComponent;
}
