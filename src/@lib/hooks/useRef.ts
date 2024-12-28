// 🎯 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성.
// 🎯 React의 useState를 이용해서 만들어보세요. useRef를 구현하지 않으면 다른 hook을 구현할 수 없습니다.
export function useRef<T>(initialValue: T): { current: T } {
  return { current: initialValue };
}
