import { contains } from "./contains";

// prettier-ignore
const primitiveTypes = ["bigint", "boolean", "null", "number", "string", "symbol", "undefined"] as const;

type PrimitiveType = (typeof primitiveTypes)[number];

export function isPrimitive(value: unknown): value is PrimitiveType {
  return contains(primitiveTypes, typeof value) || value === null;
}
