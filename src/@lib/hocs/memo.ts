import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactNode } from "react";
import { useRef } from "../hooks";

// 클래스형 컴포넌트로 구현해야하나?
/**
 * GPT: 함수형 컴포넌트는 “렌더링 스킵”을 할 수 있는 shouldComponentUpdate나 생명주기 메서드가 없기 때문에, 클래스형 HOC처럼 완전히 “리렌더링을 막는” 방식은 구현하기 어렵습니다.
 *
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoWrapper(props: P) {
    const propsRef = useRef<P | null>(null);
    const jsxRef = useRef<ReactNode | null>(null);

    // 이전 props와 현재 props가 같으면 이전 렌더링 결과를 반환
    if (propsRef.current !== null && _equals(propsRef.current, props)) {
      return jsxRef.current;
    }

    const newRender = createElement(Component, props);

    // 이번 렌더 결과와 props를 ref에 저장
    propsRef.current = props;
    jsxRef.current = newRender;

    // 새 JSX 반환
    return newRender;
  };
}
