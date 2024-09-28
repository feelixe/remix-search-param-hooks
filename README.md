# Remix Search Param Hooks
`remix-search-param-hooks` is a lightweight collection of React hooks designed to simplify the management of URL search parameters in Remix and React Router applications. These hooks provide intuitive ways to read, update, and toggle search parameters, making it easier to keep your application's state synchronized with the URL for enhanced routing and shareability. Ideal for building dynamic, URL-driven interfaces with minimal boilerplate.


## useToggleSearchParam
A custom React hook for toggling a boolean URL search parameter. It allows you to easily manage boolean states synced with the URL.

### Parameters
- `key` (string): The search parameter key to toggle.
- `options` (optional):
  - `caseSensitive` (boolean): If `true`, the comparison will be case-sensitive. Defaults to false.
  - `defaultValue` (boolean): The initial value if the search parameter is not present. Defaults to `false`.

### Example
```tsx
import { useToggleSearchParam } from "remix-search-param-hooks";

function ToggleComponent() {
  const [isOpen, toggleIsOpen] = useToggleSearchParam("open", {
    caseSensitive: false,
    defaultValue: false,
  });

  return (
    <div>
      <button onClick={() => toggleIsOpen()}>Toggle</button>
      <button onClick={() => toggleIsOpen(true)}>Open</button>
      <button onClick={() => toggleIsOpen(false)}>Close</button>
      {isOpen && <div>content</div>}
    </div>
  );
}

```

## usePatchSearchParams
A custom React hook that provides a convenient way to update URL search parameters in Remix and React Router applications. This hook allows you to modify search parameters dynamically, using either a function or an object of key-value pairs.

### Parameters
- `args` (`SearchParamMutationArgs`):
  - Can be a function that receives the current `URLSearchParams` and returns a modified instance.
  - Or an object where keys are the search parameter names, and values are the desired values:
    - `string | number | boolean`: Sets the value for the key.
    - `null`: Deletes the parameter.
    - `undefined`: Skips the key without changes.
- `options` (optional `NavigateOptions`): Options for navigation after updating the parameters.

### Examples
Updating a search param value.
```tsx
const patchSearchParams = usePatchSearchParams();
const handler = () => {
  patchSearchParams({ city: "gothenburg" });
};
```

Deleting a search param.
```tsx
const patchSearchParams = usePatchSearchParams();
const handler = () => {
  patchSearchParams({ city: null });
};
```
Updating and deleting.
```tsx
const patchSearchParams = usePatchSearchParams();
const handler = () => {
  patchSearchParams({ city: null, country: "sweden" });
};
```
Complex update.
```tsx
const patchSearchParams = usePatchSearchParams();
patchSearchParams((draft) => {
  // Draft is a mutable copy of the current search params. No need to clone it.
  draft.set("updatedParam", "newValue");
});
```

## useHasEverySearchParam
A custom React hook that checks if all specified search parameters are present and match the provided conditions in Remix applications. It provides an easy way to validate multiple search parameters in the URL.

### Parameters
- `query` (`SearchParamQueryArgs`): This can be one of the following types:
  - `Record<string, string | number | boolean | null | undefined>`: Checks if the specified key-value pairs exist in the search parameters.
  - `string`: Checks if the search parameter exists.
  - `string[]`: Checks if any of the listed parameters exist.
  - `(key: string, value: string) => boolean`: A function that receives each key-value pair of search parameters and returns a boolean.

### Examples
Checking for a single param key.
```tsx
const hasEverySearchParam = useHasEverySearchParam();
const hasSearchPhrase = hasEverySearchParam("search");
```
Checking for multiple param keys.
```tsx
const hasEverySearchParam = useHasEverySearchParam();
const hasDetailedFilter = hasEverySearchParam(["address", "city"]);
```
Checking for key value pairs.
```tsx
const hasEverySearchParam = useHasEverySearchParam();
const hasExactFilter = hasEverySearchParam({
  today: true,
  city: "stockholm",
});
```

## useHasSomeSearchParam
A custom React hook that checks if any of the specified search parameters are present and match the provided conditions in Remix applications. It provides an easy way to validate the presence of one or more search parameters in the URL.

### Parameters
- `query` (`SearchParamQueryArgs`): This can be one of the following types:
  - `Record<string, string | number | boolean | null | undefined>`: Checks if the specified key-value pairs exist in the search parameters.
  - `string`: Checks if the search parameter exists.
  - `string[]`: Checks if any of the listed parameters exist.
  - `(key: string, value: string) => boolean`: A function that receives each key-value pair of search parameters and returns a boolean.



### Examples
Checking for a single parameter key.
```tsx
const hasSomeSearchParam = useHasSomeSearchParam();
const hasSearchPhrase = hasSomeSearchParam("search");
```

Checking for at least one parameter key.
```tsx
const hasSomeSearchParam = useHasSomeSearchParam();
const hasAnyFilter = hasSomeSearchParam(["address", "city"]);
```

Checking for at least one key-value pair.

```tsx
const hasSomeSearchParam = useHasSomeSearchParam();
const hasPartialFilter = hasSomeSearchParam({
  today: true,
  city: "stockholm",
});
```