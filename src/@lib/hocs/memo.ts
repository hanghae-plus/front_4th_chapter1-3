/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import React, { ComponentType, ReactElement } from "react";
import { useRef } from "../hooks";

// 1. 이전 props를 저장할 ref 생성
// 2. 메모이제이션된 컴포넌트 생성
// 3. equals 함수를 사용하여 props 비교
// 4. props가 변경된 경우에만 새로운 렌더링 수행

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const memoizationComponent = (props: P) => {
    //재렌더링 방지
    const prevPropsRef = useRef<P | null>(null);
    const prevRender = useRef<ReactElement | null>(null);

    const shouldRender =
      !prevPropsRef.current || !_equals(prevPropsRef.current, props);

    if (shouldRender) {
      prevPropsRef.current = props; // 업데이트된 props 저장
      prevRender.current = React.createElement(Component, props); // 새로 렌더링
    }

    return prevRender.current;
  };

  return memoizationComponent;
}
