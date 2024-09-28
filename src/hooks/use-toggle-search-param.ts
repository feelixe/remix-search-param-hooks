import { useCallback, useMemo } from "react";
import { useSearchParams } from "@remix-run/react";
import { usePatchSearchParams } from "./use-patch-search-params";
import type { NavigateOptions } from "react-router-dom";

export type useToggleSearchParamOptions = {
  caseSensitive?: boolean;
  defaultValue?: boolean;
};

export function useToggleSearchParam(
  key: string,
  options?: useToggleSearchParamOptions
) {
  const { caseSensitive = false, defaultValue = false } = options ?? {};
  const [searchParams] = useSearchParams();
  const patchSearchParams = usePatchSearchParams();

  const value = useMemo(() => {
    if (!searchParams.has(key)) {
      return defaultValue;
    }
    if (caseSensitive) {
      return searchParams.get(key) === "true";
    }
    return searchParams.get(key)?.toLowerCase() === "true";
  }, [searchParams, defaultValue, key, caseSensitive]);

  const toggle = useCallback(
    (toggleValue?: boolean, options?: NavigateOptions) => {
      const newValue = toggleValue !== undefined ? toggleValue : !value;
      patchSearchParams({ [key]: newValue }, options);
    },
    [value]
  );

  return [value, toggle] as const;
}
