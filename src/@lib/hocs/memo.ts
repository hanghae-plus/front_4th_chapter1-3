/* import React from "react"; */
/* import React, { ComponentType } from "react"; */
import { createElement, ReactElement } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: React.ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  // 3. equals 함수를 사용하여 props 비교
  // 4. props가 변경된 경우에만 새로운 렌더링 수행

  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const renderPropsRef = useRef<ReactElement | null>(null);

    if (!prevPropsRef.current || _equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      renderPropsRef.current = createElement(Component, props);

      return createElement(Component, props);
    }

    return renderPropsRef.current;
  };

  /* 
  //이전 코드드
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const renderPropsRef = useRef<React.ReactElement | null>(null);

    if (!prevPropsRef.current || _equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      renderPropsRef.current = React.createElement(Component, props);
    }

    return React.createElement(Component, props);
  }; 
  */

  return MemoizedComponent;
}
