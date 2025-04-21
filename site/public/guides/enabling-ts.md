# Enabling TS/TSX in Node.js

By default, the native Node.js module system requires a module
be imported with `.js`, and disallows `.ts`, `.tsx`, and `.jsx`.
Even in new versions, while `.ts` allowed, `.tsx` and `.jsx` aren't.

On top of that, many code bases import `.js` files in code,
expecting the file to exist, but on disk the file exists with
another extension (`.{ts,tsx,jsx}`).

Using `immaculata`, you can hook into Node.js's module system
and tell it to look for `.{ts,tsx,jsx}` when `.js` isn't found:

```ts
import * as immaculata from "immaculata"
import ts from 'typescript'

const tree = new immaculata.LiveTree('site', import.meta.url)

// to use .js to import .jsx or .tsx files:
registerHooks(immaculata.tryTsTsxJsxModuleHook)

// transpiles tsx into javascript when Node.js loads it
registerHooks(immaculata.compileJsxTsxModuleHook(str =>
  ts.transpileModule(str, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
    }
  }).outputText
))

import('site/foo.js')
// tries:
//   site/foo.js (built-in behavior)
//   site/foo.ts
//   site/foo.tsx
//   site/foo.jsx
```

*Note:* This doesn't strictly require the JSX/TSX hook,
as it's still useful when importing `.ts` files using
the extension `.js`. But `compileJsxTsxModuleHook` is
included above since it's a very common use-case.
