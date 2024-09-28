import { NormalizedSearchParamQuery, SearchParamQueryArgs } from "../types";

export function normalizeSearchParamQuery(
  query: SearchParamQueryArgs
): NormalizedSearchParamQuery[] {
  if (typeof query === "string") {
    return [query];
  }
  
  if (Array.isArray(query)) {
    return query;
  }

  let out: NormalizedSearchParamQuery[] = [];
  const entries = Object.entries(query);
  for (const [key, value] of entries) {
    if (value !== undefined && value !== null) {
      out.push([key, String(value)]);
    }
  }
  return out;
}
