import React from 'react';

// 이것저것 수정해서 구현해보려다 실패
type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<T> = (action: SetStateAction<T>) => void;

const states: unknown[] = [];
let currentStateIndex = 0;

export function useState<T>(initialValue: T): [T, Dispatch<T>] {
  const index = currentStateIndex;
  
  if (states[index] === undefined) {
    states[index] = initialValue;
  }
  
  const setState = (newValue: SetStateAction<T>) => {
    const value = typeof newValue === 'function'
      ? (newValue as (prevState: T) => T)(states[index] as T)
      : newValue;
    
    if (states[index] !== value) {
      states[index] = value;
      React.Component.prototype.forceUpdate.call(this);
    }
  };
  
  currentStateIndex++;
  
  React.useEffect(() => {
    return () => {
      currentStateIndex = 0;
    };
  });
  
  return [states[index] as T, setState];
}