import { ComponentType, createElement } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

/**
 * 컴포넌트를 메모이제이션하는 함수
 * @param Component
 * @param _equals
 * @returns
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const renderRef = useRef<React.ReactElement | null>(null);

    // 현재 props와 이전 props를 비교하여 변경 여부를 확인
    if (!prevPropsRef.current || !_equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      renderRef.current = createElement(Component, props); // 새로 렌더링
    }

    return renderRef.current;
  };

  return MemoizedComponent;
}
