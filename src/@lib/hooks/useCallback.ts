/* eslint-disable @typescript-eslint/no-unused-vars */
// import { DependencyList } from "react";

// export function useCallback<T extends Function>(
//   factory: T,
//   _deps: DependencyList,
// ) {
//   // 직접 작성한 useMemo를 통해서 만들어보세요.
//   return factory as T;
// }

import { DependencyList } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallback<T extends (...args: any[]) => any>(
	factory: T,
	_deps: DependencyList
): T {
	// 직접 작성한 useMemo를 통해서 만들어보세요.
	return ((...args) => factory(...args)) as T;
}
