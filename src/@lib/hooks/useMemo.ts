/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList, useState } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// useMemo 의 조건
// 1. useMemo 가 호출되었을 때는 factory를 실행하여 값을 반환한다.
// 2. 이후에 _deps 가 변경되었을 때는 factory 를 재실행하여 업데이트를 한 값을 반환한다.

// 테스트 코드의 updateDeps 가 실행되어도 useMemo 의 내부로직은 무조건 실행된다.
// 따라서 useMemo 내부에서 factory() 를 실행하게 되면 _deps 와 상관없이 factory 가 실행되어서
// 테스트에 통과하지 못한다.

// 음... useRef 를 통해서 위 조건과 테스트 코드를 만족할 수 있는 코드를 어떻게 구성할 수 있을까?
// 일단 factory 를 통해 얻어낸 값을 저장할 수 있는 store 가 필요하다.
// 그리고 factory 의 실행을 조절해야 하니까 함수 형태로 구현해야 할 거 같다.

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
) {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const stateRef = useRef<{ deps: DependencyList; value: T }>(() => {
    return {
      deps: _deps,
      value: factory(),
    };
  });

  if (_equals(stateRef.current.deps, _deps)) {
    return stateRef.current.value;
  }

  stateRef.current.deps = _deps;
  stateRef.current.value = factory();

  return stateRef.current.value;
}

// 아래 코드는 테스트가 통과가 되지 않아 주석처리 해두었습니다.
// export function useMemo<T>(
//   factory: () => T,
//   _deps: DependencyList,
//   _equals = shallowEquals
// ): T {

//   const depsRef = useRef<DependencyList>(_deps);
//   const [value, setValue] = useState<T>(() => factory());

//   if (_equals(depsRef.current, _deps)) {
//     return value;
//   }
//   const newValue = factory();

//   setValue(newValue);
//   depsRef.current = _deps;

//   return newValue;
// }
