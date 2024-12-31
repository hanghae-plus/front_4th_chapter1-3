import { shallowEquals } from "../equalities";
import { ComponentType, ReactElement, createElement, useRef } from "react";

// 🎯 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    // 1. 이전 props를 저장할 ref 생성
    const memoizedProps = useRef<P | null>(null);

    // 2. 메모이제이션된 컴포넌트(=이전 렌더링 결과(ReactElement)) 생성
    const memoizedComponent = useRef<ReactElement | null>(null);

    // 3. equals 함수를 사용하여 props 비교
    if (!_equals(memoizedProps.current, props)) {
      // 4. props가 변경된 경우에만 새로운 "렌더링" 수행
      memoizedProps.current = props;
      memoizedComponent.current = createElement(Component, props);
    }

    return memoizedComponent.current; // ReactElement 반환.
  };
}
