import { describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { useHasSomeSearchParam } from "./use-has-some-search-param";
import { renderHook } from "@testing-library/react";
import { useSearchParams } from "@remix-run/react";

vi.mock("@remix-run/react");

const mockedUseSearchParams = useSearchParams as Mock;

mockedUseSearchParams.mockReturnValue([
  new URLSearchParams({
    price: "100",
    size: "xs",
    discounted: "true",
  }),
]);

describe("useHasSomeSearchParam", () => {
  it("should return true if passed a string that exist in search params", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current("size");
    expect(resultValue).toBe(true);
  });

  it("should return false if passed a string that does not exist in search params", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current("gender");
    expect(resultValue).toBe(false);
  });

  it("should return true if passed an array of strings where at least one exist in search params", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current([
      "price",
      "size",
      "discounted",
      "gender",
    ]);
    expect(resultValue).toBe(true);
  });

  it("should return false if passed an array of strings where none exist in search params", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current(["gender", "color"]);
    expect(resultValue).toBe(false);
  });

  it("should return true if passed a record where at least one pair exist in search params", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current({
      price: 100,
      color: "blue",
      gender: "female",
    });
    expect(resultValue).toBe(true);
  });

  it("should return false if passed a record where no pair exist in search params", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current({
      color: "blue",
      gender: "female",
    });
    expect(resultValue).toBe(false);
  });

  it("should return true if predicate fn returns true for at least one pair", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current((key) => {
      return key === "size"
    });
    expect(resultValue).toBe(true);
  });

  it("should return false if predicate fn returns false all pairs", () => {
    const { result } = renderHook(() => useHasSomeSearchParam());
    const resultValue = result.current((key) => {
      return key === "gender"
    });
    expect(resultValue).toBe(false);
  });
});
