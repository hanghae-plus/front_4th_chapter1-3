/* import React from "react"; */
/* import React, { ComponentType } from "react"; */
import * as React from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function Memo<P extends object>(
  Component: React.ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  const prevPropsRef = useRef<P | null>(null);

  // 2. 메모이제이션된 컴포넌트 생성
  const MemoizedComponent = (props: P) => {
    // 3. equals 함수를 사용하여 props 비교
    if (prevPropsRef.current && _equals(prevPropsRef.current, props)) {
      // 이전 props와 동일하면 렌더링을 건너뜀
      return null;
    }

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    prevPropsRef.current = props; // 현재 props를 저장
    return React.createElement(Component, props);
  };

  return MemoizedComponent;
}
