import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks";

// props 비교를 한다
// props를 어떻게 가져오는데? 고차함수를 통해 인자로 받아오는 값을 통해.
// 바뀌었으면 리렌더링한다
// 안바뀌었으면 기존의 값을 리턴한다.
// 바뀌었다는 걸 어떻게 판단? by ref.
// 기존의 값: ref

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemorizedComponent = (props: P) => {
    const previousProps = useRef<P | null>(null);
    const result = useRef<JSX.Element | null>(null);

    if (!previousProps.current || !_equals(previousProps.current, props)) {
      previousProps.current = props;
      result.current = <Component {...props} />;
    }

    return result.current;
  };

  return MemorizedComponent;
}
