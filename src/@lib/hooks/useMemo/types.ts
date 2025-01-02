import { DependencyList } from "react";
import { Equatable } from "../../equalities/types";

export type EqualityFn = (a: Equatable, b: Equatable) => boolean;

export interface MemoRef<T> {
  value: T | undefined;
  deps: DependencyList | undefined;
}
