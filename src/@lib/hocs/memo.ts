/* import React from "react"; */
/* import React, { ComponentType } from "react"; */
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";
import { createElement, ReactElement } from "react";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: React.ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  // 3. equals 함수를 사용하여 props 비교
  // 4. props가 변경된 경우에만 새로운 렌더링 수행

  const MemoizedComponent = function (props: P) {
    const ref = useRef<null | {
      component: ReactElement;
      props: P;
    }>(null);

    // 초기 current가 비어있는 경우
    if (ref.current === null) {
      ref.current = {
        component: createElement(Component, props),
        props,
      };

      return ref.current.component;
    }

    // props가 같을 경우
    if (_equals(ref.current?.props, props)) {
      return ref.current?.component;
    }

    // props가 같지 않을 경우
    ref.current = {
      component: createElement(Component, props),
      props,
    };

    return ref.current.component;
  };

  return MemoizedComponent;
}
