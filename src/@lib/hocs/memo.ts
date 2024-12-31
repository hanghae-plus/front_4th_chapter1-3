import { ComponentType, createElement } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 메모이제이션된 컴포넌트
  const MemoizedComponent = (props: P) => {
    // 이전 props를 저장할 ref 생성
    const prevProps = useRef<P | null>(null);

    // 비교 후 재렌더링
    if (prevProps.current === null || !_equals(prevProps.current, props)) {
      prevProps.current = props;
      return createElement(Component, prevProps.current);
    }

    // props가 동일하면 기존 컴포넌트 반환 (재렌더링 방지)
    return null;
  };

  return MemoizedComponent;
}
