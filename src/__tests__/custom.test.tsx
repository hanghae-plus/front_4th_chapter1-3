/**
 * 커스텀 유틸함수 테스트
 */

import { describe, expect, it } from "vitest";
import { isNonNullObject } from "../util/typeGuards";
describe("유틸함수 테스트 > ", () => {
  describe("isNonNullObject 함수", () => {
    it("객체인 경우 true를 반환해야 한다", () => {
      expect(isNonNullObject({})).toBe(true);
      expect(isNonNullObject({ key: "value" })).toBe(true);
      expect(isNonNullObject([])).toBe(true);
    });
    it("null인 경우 false를 반환해야 한다", () => {
      expect(isNonNullObject(null)).toBe(false);
    });
    it("객체가 아닌 값에 대해 false를 반환해야 한다", () => {
      expect(isNonNullObject("문자열")).toBe(false);
      expect(isNonNullObject(123)).toBe(false);
      expect(isNonNullObject(true)).toBe(false);
    });
  });
});
