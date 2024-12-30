/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, useRef, useMemo, createElement, useEffect } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);
    
    // 2. useMemo를 사용하여 props 변경 시, 메모이제이션 컴포넌트 생성
    const MemoizedComponent = useMemo(() => {
      // React.메서드 문법을 사용함으로써 jsx 문법을 적용하지 않고도 컴포넌트를 생성할 수 있다
      // 2주차에 배웠던 createElement 즉, 가상DOM 생성 기술 사용
      return createElement(Component, props);
    }, [props]);

    // 3. equals 함수를 사용하여 props 비교
    const shouldUpdate = prevPropsRef.current === null || !_equals(prevPropsRef.current, props);
    
    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    useEffect (() => {
      if (shouldUpdate) { 
        prevPropsRef.current = props;
      }
    }, [props, shouldUpdate])

    return shouldUpdate ? MemoizedComponent : null;
  };
}

