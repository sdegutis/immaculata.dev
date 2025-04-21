# Enabling TS/TSX in Node.js

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
```
