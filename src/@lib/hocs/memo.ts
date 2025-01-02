import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

/**
 * memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
 * HOC 란?
 * Higher-Order Component
 * 기본 컴포넌트에 기능 추가하여 업그레이드된 컴포넌트를 만들수 있다.
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals,
) {
  // 2. 메모이제이션된 컴포넌트 생성
  const MemoizedComponent = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const propsRef = useRef<P | null>(null);
    const componentRef = useRef<React.ReactElement | null>(null);

    // 3. equals 함수를 사용하여 props 비교
    if (propsRef.current === null || !equals(props, propsRef.current)) {
      propsRef.current = props;
      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      componentRef.current = createElement(Component, props);
    }

    return componentRef.current;
  };

  return MemoizedComponent;
}
