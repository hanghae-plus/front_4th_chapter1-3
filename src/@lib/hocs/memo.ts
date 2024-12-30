/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ComponentType } from "react";
import { useRef } from "../hooks/useRef";
import { shallowEquals } from "../equalities";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null); // 이전 props 저장
    const prevElement = useRef<React.ReactElement | null>(null); 

    // 3. equals 함수를 사용하여 props 비교
    
    if (prevPropsRef.current === null || !_equals(prevPropsRef.current, props)
    ) {
      prevPropsRef.current = props;
      prevElement.current = React.createElement(Component, props);
    }
    return prevElement.current;
  }  
  return MemoizedComponent;
}
