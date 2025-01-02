/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import React, { ComponentType, ReactNode } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  // ref에 대한 의문, hooks가 아닌데, ref를 사용하는게 맞는가? -> hooks라는 전제를 깔자.
  // TODO : 이거 관련해서 다시 한번 깊게 탐구해보기.  Ref가 진짜로 필요한가? 그리고, 만약 클로져로 처리했을 때 리랜더링이 안일어나나?
  // let preProps = useRef<P | null>(null);
  let preProps: P | null = null;
  let memoizedComponent: ReactNode | null = null;

  return function (props: P) {
    if (preProps === null || !_equals(preProps, props)) {
      preProps = props;
      // jsx 였으면, 컴포넌트 생성해도 좋았겠지만, 결국 이것도 오버헤드일 것 같기에 createElement로 진행
      memoizedComponent = React.createElement(Component, props);
    }
    return memoizedComponent;
  };
}
