import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    // 1. 이전 props를 저장할 ref 생성
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prevPropsRef = useRef<P | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const memorizedResultRef = useRef<React.ReactElement | null>(null);

    // 3. equals 함수를 사용하여 props 비교
    if (
      prevPropsRef.current === null ||
      !_equals(prevPropsRef.current, props)
    ) {
      memorizedResultRef.current = React.createElement(Component, props);
    }

    prevPropsRef.current = props;
    return memorizedResultRef.current;
  };
}
