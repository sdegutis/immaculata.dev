## Module hooks

### API

```typescript
// enables Node.js to try .ts, .tsx, and .jsx extensions
// when importing a path with .js fails
const tryTsTsxJsxModuleHook: ModuleHook

// .tsx and .jsx files to be transpiled with a given fn
function compileJsxTsxModuleHook(
  fn: (src: string, url: string) => string
): ModuleHook

// remap "react/jsx-runtime" to a given module specifier
function jsxRuntimeModuleHook(jsx: string): ModuleHook
```

### Usage

```typescript
import * as immaculata from 'immaculata'
import { registerHooks } from 'module'

// enable looking for foo.ts when importing foo.js
registerHooks(immaculata.tryTsTsxJsxModuleHook)

// transform jsx/tsx to javascript via myCompileJsx
registerHooks(immaculata.compileJsxTsxModuleHook(myCompileJsx)

// make jsx files import the impl from module named "foo"
registerHooks(immaculata.jsxRuntimeModuleHook('foo'))

// make JSX use become a simple string-builder inside Node.js
registerHooks(immaculata.jsxRuntimeModuleHook(
  'immaculata/dist/jsx-strings.js'
))
```
