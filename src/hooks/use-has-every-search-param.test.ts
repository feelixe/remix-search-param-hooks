import { describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { useHasEverySearchParam } from "./use-has-every-search-param.js";
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

describe("useHasEverySearchParam", () => {
  it("should return true if passed a string that exist in search params", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current("size");
    expect(resultValue).toBe(true);
  });

  it("should return false if passed a string that does not exist in search params", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current("gender");
    expect(resultValue).toBe(false);
  });

  it("should return true if passed an array of strings where all exist in search params", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current(["price", "size", "discounted"]);
    expect(resultValue).toBe(true);
  });

  it("should return false if passed an array of strings where at least one does not exist in search params", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current([
      "price",
      "size",
      "discounted",
      "gender",
    ]);
    expect(resultValue).toBe(false);
  });

  it("should return true if passed a record where all pairs exist in search params", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current({
      price: 100,
      size: "xs",
      discounted: true,
    });
    expect(resultValue).toBe(true);
  });

  it("should return false if passed a record where at least one pair does not exist in search params", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current({
      price: 100,
      size: "xs",
      discounted: true,
      gender: "male",
    });
    expect(resultValue).toBe(false);
  });

  it("should return true if predicate fn returns true for every pair", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current((key) => {
      return ["size", "price", "discounted"].includes(key);
    });
    expect(resultValue).toBe(true);
  });

  it("should return false if predicate fn returns false for at least one pair", () => {
    const { result } = renderHook(() => useHasEverySearchParam());
    const resultValue = result.current((key) => {
      return ["size", "price"].includes(key);
    });
    expect(resultValue).toBe(false);
  });
});
