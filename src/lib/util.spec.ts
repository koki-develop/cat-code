import { describe, expect, test } from "bun:test";
import { indent } from "./util";

describe("indent", () => {
  test("should indent all lines except first by default", () => {
    const input = "first line\nsecond line\nthird line";
    const expected = "first line\n  second line\n  third line";
    expect(indent(input)).toBe(expected);
  });

  test("should indent all lines when skipFirstLine is false", () => {
    const input = "first line\nsecond line\nthird line";
    const expected = "  first line\n  second line\n  third line";
    expect(indent(input, { skipFirstLine: false })).toBe(expected);
  });

  test("should handle single line text", () => {
    const input = "single line";
    const expected = "single line";
    expect(indent(input)).toBe(expected);
  });

  test("should handle empty string", () => {
    const input = "";
    const expected = "";
    expect(indent(input)).toBe(expected);
  });

  test("should handle empty lines", () => {
    const input = "first line\n\nthird line";
    const expected = "first line\n  \n  third line";
    expect(indent(input)).toBe(expected);
  });

  test("should work with empty options", () => {
    const input = "first line\nsecond line";
    const expected = "first line\n  second line";
    expect(indent(input, {})).toBe(expected);
  });
});
