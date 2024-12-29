import { ComponentType, createElement } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

type StaticComponentProperties =
  | "propTypes"
  | "contextTypes"
  | "defaultProps"
  | "displayName";

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
  const MemoizedComponent = ((props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const renderRef = useRef<React.ReactElement | null>(null);

    // 현재 props와 이전 props를 비교하여 변경 여부를 확인
    if (!prevPropsRef.current || !_equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      renderRef.current = createElement(Component, props); // 새로 렌더링
    }

    return renderRef.current;
  }) as typeof Component;

  (Object.keys(Component) as Array<keyof typeof Component>)
    .filter((key): key is StaticComponentProperties =>
      ["propTypes", "contextTypes", "defaultProps", "displayName"].includes(
        key,
      ),
    )
    .forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(Component, key);
      if (descriptor) {
        Object.defineProperty(MemoizedComponent, key, descriptor);
      }
    });

  return MemoizedComponent;
}
