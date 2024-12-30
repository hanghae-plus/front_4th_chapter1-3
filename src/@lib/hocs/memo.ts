import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.

export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals
) {
  // HOC 패턴으로 새로운 컴포넌트를 반환, 고차함수 패턴
  return function MemoizedComponent(props: P) {
    // 1. 필요한 ref를 설정
    const prevPropsRef = useRef<P>(props);

    // props 저장
    const MemoComponent = useRef<ComponentType<P>>(Component);

    const prevResultRef = useRef<React.ReactElement | null>(null); // 이전 렌더링 결과를 저장

    // 2. props 비교 및 업데이트
    const shouldUpdate = !equals(prevPropsRef.current, props);
    prevPropsRef.current = props; // 항상 최신 props로 업데이트 한다

    // 3. 메모이제이션 로직
    if (!shouldUpdate && prevResultRef.current) {
      return prevResultRef.current;
    }

    // 4. 새로운 렌더링: 새로운 렌더링이 필요할 때만 createElement를 실행
    const result = createElement(MemoComponent.current, props);
    prevResultRef.current = result;
    return result;

    // // 3. equals 함수를 사용하여 props 비교
    // if (equals(prevPropsRef.current, props)) {
    //   // props가 같은 경우에만 이전 props로 렌더링
    //   return createElement(MemoComponent.current, prevPropsRef.current);
    // }

    // // 4. props가 변경된 경우에만 새로운 렌더링 수행
    // prevPropsRef.current = props;
    // return createElement(MemoComponent.current, props);
  };
}
