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
  const [isActive, toggleIsActive] = useToggleSearchParam("active", {
    caseSensitive: false,
    defaultValue: false,
  });

  return (
    <div>
      <p>The current state is: {isActive ? "Active" : "Inactive"}</p>
      <button onClick={() => toggleIsActive()}>Toggle</button>
      <button onClick={() => toggleIsActive(true)}>Set Active</button>
      <button onClick={() => toggleIsActive(false)}>Set Inactive</button>
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

### Example

```tsx
import { usePatchSearchParams } from "remix-search-param-hooks";

function PatchSearchParamsComponent() {
  const patchSearchParams = usePatchSearchParams();

  const handleAddParam = () => {
    patchSearchParams({ newParam: "value" });
  };

  const handleDeleteParam = () => {
    patchSearchParams({ newParam: null });
  };

  const handleComplexUpdate = () => {
    patchSearchParams((draft) => {
      // Draft is a mutable copy of the current search params. No need to clone it.
      draft.set("updatedParam", "newValue");
    });
  };

  return (
    <div>
      <button onClick={handleAddParam}>Add Parameter</button>
      <button onClick={handleDeleteParam}>Delete Parameter</button>
      <button onClick={handleComplexUpdate}>Update Parameter</button>
    </div>
  );
}

export default PatchSearchParamsComponent;
```