import { MutableRefObject, RefObject } from "react";
import React from "react";

export function useRef<T>(initialValue: T): MutableRefObject<T>;
export function useRef<T>(initialValue: T | null): RefObject<T>;
export function useRef<T = undefined>(): MutableRefObject<T | undefined>;

export function useRef<T>(initialValue?: T) {
  const [ref] = React.useState<{ current?: T }>({
    current: initialValue,
  });
  return ref;
}
