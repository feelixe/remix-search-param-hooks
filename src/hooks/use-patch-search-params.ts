import { useCallback } from "react";
import { useSearchParams } from "@remix-run/react";
import type { NavigateOptions } from "react-router-dom"
import { SearchParamMutationArgs } from "../types";

export function usePatchSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  return useCallback(
    (args: SearchParamMutationArgs, options?: NavigateOptions) => {
      let newSearchParams = new URLSearchParams(searchParams);

      if (typeof args === "function") {
        const result = args(newSearchParams);
        if(result) {
          newSearchParams = result;
        }
      } else {
        const entries = Object.entries(args);
        for (const [key, value] of entries) {
          if (value === undefined) {
            continue;
          }
          if(value === null) {
            newSearchParams.delete(key);
            continue
          }
          newSearchParams.set(key, String(value));
        }
      }

      setSearchParams(newSearchParams, options);
      return newSearchParams;


    },
    [searchParams]
  );
}
