/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, createElement, useRef } from "react";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  // 3. equals 함수를 사용하여 props 비교
  // 4. props가 변경된 경우에만 새로운 렌더링 수행
  
  return function(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    const memoizedResultRef = useRef<JSX.Element | null>(null);

    if (prevPropsRef.current === null || !_equals(prevPropsRef.current, props)) {
      console.log("Props changed, re-rendering");
      memoizedResultRef.current = createElement(Component, props);
    } else {
      console.log("Props unchanged, using memoized result");
    }

    prevPropsRef.current = props;
    
    return memoizedResultRef.current!;
  };
}
