/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import {ComponentType, createElement, ReactNode, useEffect} from "react";
import {useRef} from "../hooks";


export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return (props) => {
    // 렌더링이 되어도 기존 데이터(prev)를 가지고 있어야 하기 때문에 ref 사용
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReactNode | null>(null);
    
    if (!prevPropsRef.current || !_equals(prevPropsRef.current, props)) {
      prevResultRef.current = createElement(Component, props);
    }
    prevPropsRef.current = props;
    return prevResultRef.current;
  }
}
