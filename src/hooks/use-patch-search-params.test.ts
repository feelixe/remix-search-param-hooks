import { afterEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePatchSearchParams } from "./use-patch-search-params";
import { useSearchParams } from "@remix-run/react";

vi.mock("@remix-run/react");
const mockedUseSearchParams = useSearchParams as Mock;

const mockedSetSearchParams = vi.fn();


describe("useUpdateSearchParams", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("patches search params correctly when passed a function", () => {
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({
        price: "100",
        size: "xs",
        discounted: "true",
      }),
      mockedSetSearchParams,
    ]);

    const { result } = renderHook(() => usePatchSearchParams());
    const returnValue = result.current((search) => {
      search.set("color", "blue");
    });
    const returnValueRecord = Object.fromEntries(returnValue.entries());

    expect(mockedSetSearchParams).toHaveBeenCalledOnce();
    const calledWith: URLSearchParams = mockedSetSearchParams.mock.calls[0][0];
    const searchParamsRecord = Object.fromEntries(calledWith.entries());

    const expectedResult = {
      price: "100",
      size: "xs",
      discounted: "true",
      color: "blue",
    }

    expect(searchParamsRecord).toEqual(expectedResult);
    expect(returnValueRecord).toEqual(expectedResult);
  });

  it("patches search params correctly when passed a record", () => {
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({
        price: "100",
        size: "xs",
        discounted: "true",
        gender: "female"
      }),
      mockedSetSearchParams,
    ]);

    const { result } = renderHook(() => usePatchSearchParams());
    const returnValue = result.current({
      price: 200,
      discounted: false,
      color: "blue",
      size: null,
      gender: undefined,
    });
    const returnValueRecord = Object.fromEntries(returnValue.entries());

    expect(mockedSetSearchParams).toHaveBeenCalledOnce();
    const calledWith: URLSearchParams = mockedSetSearchParams.mock.calls[0][0];
    const searchParamsRecord = Object.fromEntries(calledWith.entries());

    const expectedResult = {
      price: "200",
      discounted: "false",
      color: "blue",
      gender: "female"
    }

    expect(searchParamsRecord).toEqual(expectedResult);
    expect(returnValueRecord).toEqual(expectedResult);
  });
});
