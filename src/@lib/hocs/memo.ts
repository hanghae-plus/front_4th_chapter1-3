import { shallowEquals } from "@/@lib/equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "@/@lib/hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals: (prevProps: P, nextProps: P) => boolean = shallowEquals,
): ComponentType<P> {
  const MemoizedComponent: ComponentType<P> = (props) => {
    const memoizedProps = useRef<P | null>(null);

    if (
      memoizedProps.current === null ||
      !_equals(memoizedProps.current, props)
    ) {
      memoizedProps.current = props;
      return createElement(Component, props);
    }
  };

  return MemoizedComponent;
}
