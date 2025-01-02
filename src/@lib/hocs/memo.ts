import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    return createElement(Component, props);
  };

  MemoizedComponent.displayName = `Memo(${Component.displayName || Component.name})`;

  let prevProps: P | undefined;
  let prevElement: React.ReactElement | null = null;

  return Object.assign(
    (props: P) => {
      if (!prevProps || !_equals(prevProps, props)) {
        prevElement = createElement(MemoizedComponent, props);
        prevProps = props;
      }
      return prevElement;
    },
    { displayName: MemoizedComponent.displayName },
  );
}
