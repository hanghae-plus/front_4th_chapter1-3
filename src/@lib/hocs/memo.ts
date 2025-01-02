import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactNode } from "react";
import { useRef } from "../hooks";

/**
 * 전달된 React Component를 메모이제이션하는 고차 함수.
 * props가 변경된 경우에만 컴포넌트를 다시 렌더링합니다.
 *
 * @param {ComponentType<P>} Component - 메모이제이션할 React Component.
 * @param _equals props의 변경 여부를 비교하는 함수. 기본값은 `shallowEquals`
 * @returns  메모이제이션된 Component
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevMemorized = useRef<ReactNode | null>(null);

    if (!_equals(props, prevPropsRef.current)) {
      prevPropsRef.current = props;
      prevMemorized.current = createElement(Component, props);
    }
    return prevMemorized.current;
  };
}
