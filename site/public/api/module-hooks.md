# Module hooks



## `tryTsTsxJsxModuleHook`

```ts
const tryTsTsxJsxModuleHook: ModuleHook
```

Resolver hook for `module.registerHooks` that looks for
`.{ts,tsx,jsx}` when `.js` is not found.



## `compileJsxTsxModuleHook`

```ts
function compileJsxTsxModuleHook(
  fn: (src: string, url: string) => string
): ModuleHook
```

Loader hook for JSX/JSX files which just passes the
source code and file URL to your function to compile.



## `jsxRuntimeModuleHook`

```ts
function jsxRuntimeModuleHook(jsx: string): ModuleHook
```

Remaps the `react/jsx-runtime` import to the given module specifier.



## `liveTree.enableImportsModuleHook`

Docs for this are on the [LiveTree](live-tree.md#livetreeenableimportsmodulehook) page.
