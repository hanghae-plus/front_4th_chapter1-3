import { deepEquals } from "../equalities";
import { memo } from "./memo.ts";

export function deepMemo(Component: React.FC) {
  return memo(Component, deepEquals);
}
