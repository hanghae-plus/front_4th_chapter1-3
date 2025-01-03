import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function (props: P) {
    // 1. 이전 props를 저장할 ref 생성
    const prevRef = useRef<{
      component: React.ReactElement;
      props: P;
    }>({
      component: createElement(Component, Component.defaultProps as P),
      props: Component.defaultProps as P,
    });

    // 2. 메모이제이션된 컴포넌트 생성
    const newComponent = createElement(Component, props);

    // 3. equals 함수를 사용하여 props 비교
    if (!_equals(prevRef.current?.props, props)) {
      prevRef.current.props = props;
      prevRef.current.component = newComponent;

      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      return prevRef.current.component;
    }
  };
}
