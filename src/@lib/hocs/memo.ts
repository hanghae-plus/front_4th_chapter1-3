import { shallowEquals } from "../equalities";
import React, { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

// memo: 컴포넌트 자체를 메모이제이션하는 고차 컴포넌트
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // HOC 패턴으로 새로운 컴포넌트를 반환, 고차함수 패턴
  return function MemoizedComponent(props: P) {
    // 1. 필요한 ref를 저장
    const ref = useRef<null | {
      component: React.ReactElement;
      props: P;
    }>(null);

    // 2. props 비교 및 업데이트
    // 첫 렌더링(저장된 객체가 없을 때)이거나 props가 변경된 경우에만 새로운 컴포넌트를 생성, cf. 아닌 경우 반환x
    if (ref.current == null || !_equals(props, ref.current.props)) {
      ref.current = {
        component: createElement(Component, props),
        props,
      };
      return ref.current.component;
    }
  };
}
