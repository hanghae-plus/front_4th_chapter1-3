/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, useRef, useMemo, createElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return (props: P) => {
    // 1. 이전 props와 컴포넌트를 저장할 ref 생성
    const prevCompsRef = useRef<JSX.Element | null>(null);
    const prevPropsRef = useRef<P | null>(null);
    
    // 2. useMemo를 사용하여 props 변경 시, 메모이제이션 컴포넌트 생성
    const MemoizedComponent = useMemo(() => {
      return createElement(Component, props);
    }, [props]);

    // 3. equals 함수를 사용하여 props 비교
    const shouldUpdate = prevPropsRef.current === null || !_equals(prevPropsRef.current, props);
    
    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (shouldUpdate) { 
      prevPropsRef.current = props;
      prevCompsRef.current = MemoizedComponent;
    }

    return shouldUpdate ? MemoizedComponent : prevCompsRef.current;
  };
}
