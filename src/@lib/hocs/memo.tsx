import { shallowEquals } from "../equalities";
import { ComponentType, JSX } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // memo를 직접 작성해보세요.
  return function MemoComponent(props: P) {
    const componentRef = useRef<JSX.Element | null>(null);
    const propsRef = useRef<P | null>(null);

    if (!propsRef.current || !_equals(propsRef.current, props)) {
      propsRef.current = props;
      componentRef.current = <Component {...props} />;
    }

    return componentRef.current;
  };
}
