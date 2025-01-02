/**
 * 커스텀 유틸함수 테스트
 */

import { describe, expect, it } from "vitest";
import { hasOwnKey, isNonNullObject } from "../util/typeGuards";
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
  describe("hasOwnKey 함수", () => {
    const parent = { parentKey: "value" };
    const child = Object.create(parent);
    child.childKey = "value";

    it("객체에 키가 존재하면 true를 반환해야 한다", () => {
      expect(hasOwnKey(child, "childKey")).toBe(true);
    });
    it("객체에 키가 존재하지 않으면 false를 반환해야 한다", () => {
      expect(hasOwnKey(child, "testKey")).toBe(false);
    });
    it("상속된 속성에 대해서는 false를 반환해야 한다", () => {
      expect(hasOwnKey(child, "parentKey")).toBe(false);
    });
    it("객체가 null이나 undefined이면 false를 반환해야 한다", () => {
      expect(hasOwnKey(null, "key")).toBe(false);
      expect(hasOwnKey(undefined, "key")).toBe(false);
    });
  });
});
