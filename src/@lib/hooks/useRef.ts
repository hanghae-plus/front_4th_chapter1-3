import React from "react";

export function useRef<T>(initialValue?: T): { current?: T } {
  const [ref] = React.useState<{ current?: T }>({ current: initialValue });
  return ref;
}
