/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  let prevProps: P | null = null;
  let prevResult: React.ReactElement | null = null;

  const MemoizedComponent = (props: P) => {
    if (!prevProps || !_equals(prevProps, props)) {
      prevProps = props;
      prevResult = React.createElement(Component, props);
    }
    return prevResult;
  };
  return MemoizedComponent;
}
