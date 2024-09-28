import { afterEach, describe, it, type Mock, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useToggleSearchParam } from "./use-toggle-search-param";
import { useSearchParams } from "@remix-run/react";

vi.mock("@remix-run/react");

const mockedUseSearchParams = useSearchParams as Mock;

const mockedSetSearchParams = vi.fn();

describe("useSearchParamToggle", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("toggles search param", () => {
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockedSetSearchParams,
    ]);

    const { result } = renderHook(() => useToggleSearchParam("discounted"));
    const [, toggle] = result.current;

    console.log(mockedSetSearchParams.mock.calls[0])

    toggle();
  });
});
