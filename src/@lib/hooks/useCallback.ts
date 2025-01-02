// import { DependencyList } from "react";

// export function useCallback<T extends Function>(
//   factory: T,
//   _deps: DependencyList,
// ) {
//   // 직접 작성한 useMemo를 통해서 만들어보세요.
//   return factory as T;
// }

import { DependencyList } from 'react';
import { useMemo } from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallback<T extends (...args: any[]) => any>(
	factory: T,
	_deps: DependencyList
): T {
	// 직접 작성한 useMemo를 통해서 만들어보세요.
	// return ((...args) => factory(...args)) as T;
	return useMemo(() => factory, _deps) as T;
}
