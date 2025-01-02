import { deepEquals } from "../equalities";
import { ComponentType } from "react";
import { memo } from "./memo.tsx";

export function deepMemo<P extends object, R>(Component: ComponentType<P>) {
  return memo<P, R>(Component, deepEquals);
}
