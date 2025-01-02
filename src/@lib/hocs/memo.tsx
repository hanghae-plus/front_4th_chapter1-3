import { ComponentType, useState, useEffect } from "react";
import { shallowEquals } from "../equalities";
import { useRef, useMemo } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals,
): ComponentType<P> {
  return (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevProps = useRef<P>(props);
    const [renderTrigger, setRenderTrigger] = useState(0);

    // 2. props가 변경될 때만 prevProps 업데이트
    useEffect(() => {
      if (!equals(prevProps.current, props)) {
        prevProps.current = props;
        setRenderTrigger((prev) => prev + 1);
      }
    }, [props, equals]);

    // 3. 메모이제이션된 컴포넌트 생성
    const MemoizedComponent = useMemo(() => {
      return <Component {...props} />;
    }, [renderTrigger]);

    return MemoizedComponent;
  };
}
