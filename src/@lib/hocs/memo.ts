/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from '../equalities';
import { ComponentType, createElement } from 'react';
import { useMemo, useRef } from '../hooks';

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  // React.memo를 직접 구현해보세요.
  const MemoComponent: ComponentType<P> = (props: P) => {
    // 얘가 실제 Props 변경을 감지하는 역할을 합니다.
    const propsRef = useRef<P>(props);

    if (!_equals(propsRef.current, props)) {
      propsRef.current = props;
    }
    return useMemo(
      () => createElement(Component, propsRef.current),
      [propsRef.current]
    );
  };
  return MemoComponent;
}
