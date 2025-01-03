import { useState } from "react";

interface MutableRefObject<T> {
  current: T;
}

// useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
export function useRef<T = undefined>(): MutableRefObject<T | undefined>;
export function useRef<T>(initialValue: T): MutableRefObject<T>;
export function useRef<T>(initialValue?: T): MutableRefObject<T | undefined> {
  const [ref] = useState<MutableRefObject<T | undefined>>({
    current: initialValue,
  });

  return ref;
}
