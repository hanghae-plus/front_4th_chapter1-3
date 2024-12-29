/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  let prevProps = null;

  // 2. 메모이제이션된 컴포넌트 생성
  let memoizedResult = null;

  // 3. equals 함수를 사용하여 props 비교
  return function(props) {
    if (prevProps === null || !_equals(prevProps, props)) {
      console.log("Props changed, re-rendering");
      memoizedResult = Component(props);
    }
    else {
      console.log("Props unchanged, using memoized result");
    }
    prevProps = props;
    return memoizedResult;
  }

  // 4. props가 변경된 경우에만 새로운 렌더링 수행


  return Component;
}
