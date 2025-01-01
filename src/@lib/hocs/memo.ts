/* eslint-disable @typescript-eslint/no-unused-vars */

import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
// NOTE: ComponentType은 React에서 제공하는 타입으로, 함수형 컴포넌트와 클래스형 컴포넌트 모두를 포함하는 타입

// NOTE: 메모이제이션(Memoization)은 이전에 계산한 값을 저장해두고 재사용하는 최적화 기법이다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals
) {
  // const MemoizedComponent = (props: P) => {
  //   // 1. 이전 props를 저장할 ref 생성
  //   const prevPropsRef = useRef<P | null>(null);

  //   // 3. equals 함수를 사용하여 props 비교
  //   const isPropsChanged =
  //     !prevPropsRef.current || !equals(prevPropsRef.current, props);

  //   // 4. props가 변경된 경우에만 새로운 렌더링 수행
  //   if (isPropsChanged) {
  //     prevPropsRef.current = {
  //       props: { ...props },  // props 복사
  //       result: React.createElement(Component, props)  // 결과 저장
  //     };
  //   }

  //   return React.createElement(
  //     Component,
  //     isPropsChanged ? props : prevPropsRef.current,
  //   );
  // };
  // NOTE: 위 코드는 prevPropsRef.current = props 부분에서 참조만 저장하여 매 랜더링마다 새로운 createElement를 생성하여 컴포넌트 결과를 캐시하지 않는 문제가 있음

  // NOTE: 이전 props와 렌더링 결과를 클로저 변수로 저장
  // NOTE: 초기에 memo를 useRef로 만들었더니 재사용 시 초기값이 유지되는 문제가 있어서 클로저 변수로 만듬
  let prevProps: P | null = null;
  let prevResult: React.ReactElement | null = null;

  // 2. 메모이제이션된 컴포넌트 생성
  const MemoizedComponent = (props: P) => {
    // NOTE: 초기 렌더링이거나 props가 변경된 경우 props를 저장하고 새로운 렌더링 결과를 생성 및 저장
    if (!prevProps || !equals(prevProps, props)) {
      prevProps = props;
      prevResult = React.createElement(Component, props);
    }
    return prevResult;
  };

  // 메모이제이션된 컴포넌트 반환
  return MemoizedComponent;
}
