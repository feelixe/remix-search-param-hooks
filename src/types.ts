export type SearchParamQueryArgs =
  | Record<string, string | number | boolean | null | undefined>
  | string
  | string[]
  | ((key: string, value: string) => boolean);

export type NormalizedSearchParamQuery = [string, string] | string;

export type SearchParamMutationArgs =
  | Record<string, string | number | boolean | null | undefined>
  | ((searchParams: URLSearchParams) => URLSearchParams | void);

