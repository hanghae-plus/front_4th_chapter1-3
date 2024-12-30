/* import React from "react"; */
/* import React, { ComponentType } from "react"; */
import * as React from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

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
    const renderPropsRef = useRef<React.ReactElement | null>(null);

    if (prevPropsRef.current || _equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      renderPropsRef.current = React.createElement(Component, props);
    }

    return renderPropsRef.current;
  };

  return MemoizedComponent;
}
