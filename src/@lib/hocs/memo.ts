import React, { ComponentType, ReactNode } from "react";
import { shallowEquals } from "../equalities";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 변수 생성
  let prevProps: P | null = null;

  // 2. 메모이제이션된 컴포넌트 생성
  let memoizedComponent: ReactNode | null = null;

  return (props: P) => {
    // 3. equals 함수를 사용하여 props 비교
    if (!(prevProps !== null && _equals(prevProps, props))) {
      // 4. 첫 렌더링이거나 props가 변경된 경우에만 새로운 렌더링 수행
      prevProps = props;
      memoizedComponent = React.createElement(Component, props);
    }

    return memoizedComponent;
  };
}
