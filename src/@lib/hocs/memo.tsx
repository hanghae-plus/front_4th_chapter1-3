/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, FunctionComponent, ReactNode } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  if (!isFunctionalComponent<P>(Component)) {
    throw new Error("Component passed to memo should be a function.");
  }

  return (props: P) => {
    // 의문: 여기는 함수형 컴포넌트 내부가 아니고, 내부에서 호출되는 hook도 아닌데 useRef를 사용해도 괜찮을까? (일단.. 돌아는 감)
    const prevProps = useRef<P | null>(null);
    const memoizedComponent = useRef<ReactNode | null>(null);

    if (!memoizedComponent.current || !_equals(props, prevProps.current)) {
      prevProps.current = props;
      memoizedComponent.current = <Component {...props} />;
    }

    return memoizedComponent.current;
  };
}
const isFunctionalComponent = <P,>(
  Component: ComponentType<P>,
): Component is FunctionComponent<P> => typeof Component === "function";
