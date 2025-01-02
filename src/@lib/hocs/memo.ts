import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevProps = useRef<P | null>(null);

    // 2. 메모이제이션된 컴포넌트 생성
    // 3. equals 함수를 사용하여 props 비교
    if (prevProps.current === null || !_equals(prevProps.current, props)) {
      prevProps.current = props;
      return React.createElement(Component, prevProps.current);
    }
  };
  // 4. props가 변경된 경우에만 새로운 렌더링 수행

  return MemoizedComponent;
}
