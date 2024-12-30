import { useRef } from "./useRef";
import { useSyncExternalStore } from "react";
import { shallowEquals } from "../equalities";
import { Store } from "../../storeUtils";

export const useStore = <T, S>(store: Store<T>, selector: (store: T) => S) => {
  const prevRef = useRef<S | null>(null);

  return useSyncExternalStore(store.subscribe, () => {
    const next = selector(store.getState());
    if (prevRef.current === null || !shallowEquals(prevRef.current!, next)) {
      prevRef.current = next;
    }
    return prevRef.current;
  });
};
