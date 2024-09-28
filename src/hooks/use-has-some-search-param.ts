import { useCallback } from "react";
import { useSearchParams } from "@remix-run/react";
import { SearchParamQueryArgs } from "../types";
import { normalizeSearchParamQuery } from "../utils/normalize-params";



export function useHasSomeSearchParam() {
  const [searchParams] = useSearchParams();

  return useCallback(
    (query: SearchParamQueryArgs) => {
      if(typeof query === "function") {
        const pairs = Array.from(searchParams.entries());
        return pairs.some(pair => query(pair[0], pair[1]));
      }

      let searchParamQuery = normalizeSearchParamQuery(query)

      return searchParamQuery.some((entry) => {
        if(typeof entry === "string") {
          return searchParams.has(entry);
        }
        const searchParamValue = searchParams.get(entry[0]);
        return searchParamValue === entry[1];
      });
    },
    [searchParams]
  );
}
