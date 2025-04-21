# Enabling JSX in Node.js

```ts
import * as immaculata from "immaculata"
import ts from 'typescript'

const tree = new immaculata.LiveTree('site', import.meta.url)

// only needed if you want importing .js to look for .jsx/tsx files
registerHooks(immaculata.tryTsTsxJsxModuleHook)

// tells Node.js where to look for `react/jsx-runtime` module
registerHooks(immaculata.jsxRuntimeModuleHook(myJsxModuleSpecifier))

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

## Simple JSX string-builder

The module `'immaculata/dist/jsx-strings.js'` provides React-compatible
exports that are implemented as a highly efficient HTML string builder.

```ts
registerHooks(immaculata.jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))
```

## Using a file

To use a JSX implementation within a `LiveTree`, use prepend its root:

```ts
registerHooks(immaculata.jsxRuntimeModuleHook(tree.root + '/my-jsx.js'))
```

## Using React.js

Since the path just needs to be a valid module that Node.js knows
how to find, you can probably use React.js SSR here if you want I guess.
But where's the fun in that?
