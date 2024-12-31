/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let oldProps = null;
  let prevResult = null;
  return (props) => {
    if (!oldProps || !_equals(oldProps, props)) {
      prevResult = Component(props);
    }
    
    // 현재 props를 이전 props로 저장
    oldProps = props;
    
    // 메모이제이션된 결과 반환
    return prevResult;
  }
}
