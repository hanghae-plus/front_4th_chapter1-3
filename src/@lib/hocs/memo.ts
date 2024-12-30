import { shallowEquals } from "../equalities";
import React, { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  // HOC 패턴으로 새로운 컴포넌트를 반환, 고차함수 패턴
  return function MemoizedComponent(props: P) {
    // 1. 필요한 ref를 저장
    const ref = useRef<null | {
      component: React.ReactElement;
      props: P;
    }>(null);

    // 2. props 비교 및 업데이트
    // 2-1. 저장된 객체가 없다면 새롭게 등록한다
    if (ref.current == null) {
      ref.current = {
        component: createElement(Component, props),
        props,
      };
      return ref.current.component;
    }
    // 2-2. 저장된 객체가 있는 경우
    // 2-2-1. props가 같은 경우
    if (_equals(ref.current.props, props)) {
      return ref.current.component;
    }

    // 2-2-2. props가 같지 않은 경우
    ref.current = {
      component: createElement(Component, props),
      props,
    };
    return ref.current.component;
  };
}
