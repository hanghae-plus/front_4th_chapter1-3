import { useState } from "react";

/**
 * 초기값을 받아서 초기값을 가지는 ref를 반환하는 훅
 * @param initialValue 초기값
 * @returns ref
 */
// 초기값 없이 호출
export function useRef<T = undefined>(): { current: T | undefined };

// 초기값과 함께 호출
export function useRef<T>(initialValue: T): { current: T };

// 모든 오버로드 케이스 처리
export function useRef<T>(initialValue?: T) {
  const [ref] = useState<{ current: T | undefined }>(() => ({
    current: initialValue,
  }));
  return ref;
}

// ref.current += 1;
// 객체의 속성만 변경하기 때문에 리렌더링이 발생하지 않는다.

// 리렌더링 시 참조값이 유지되는 이유
// useState로 생성된 객체는 클로저에 의해 보존.
// 리렌더링 시 이전에 생성된 동일한 객체가 반환된다.
