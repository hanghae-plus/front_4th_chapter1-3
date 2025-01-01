import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// NOTE: 학습메이트(최기환)님 꿀팁 듣고 다시 짠 로직
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const memoized = useRef<{ value: T; deps: DependencyList }>();

  if (!memoized.current || !_equals(_deps, memoized.current.deps)) {
    memoized.current = {
      value: factory(),
      deps: _deps,
    };
  }

  return memoized.current.value;
}

// NOTE: 이전 작업물
// * 타이밍 이슈가 생기지 않을까 고민하다가 학습메이트(최기환)님에게 상담
// * useRef만 사용하는 개선된 로직을 제안받음
// export function useMemo<T>(
//   factory: () => T,
//   _deps: DependencyList,
//   _equals = shallowEquals,
// ): T {
//   // 직접 작성한 useRef를 통해서 만들어보세요.
//   const factoryRef = useRef(factory);
//   const equalsRef = useRef(_equals);
//   const prevDepsRef = useRef(_deps);

//   const [state, setState] = useState(factoryRef.current);

//   useEffect(() => {
//     if (equalsRef.current(_deps, prevDepsRef.current)) return;
//     setState(factoryRef.current());
//     prevDepsRef.current = _deps;
//   }, [_deps]);

//   return state;
// }
