# Enabling JSX in Node.js

By default, the native Node.js module system:

* Refuses to consider `.jsx` or `.tsx` files to be importable modules
* Doesn't know how to transpile JSX syntax into JavaScript

Using `immaculata`, you can:

* Make Node.js recognize `.jsx` and `.tsx` files as valid modules
* Tell Node.js how to transform JSX/TSX into valid JavaScript
* Remap the default `react/jsx-runtime` to another module

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

## Using your own JSX implementation

To use a JSX implementation within a `LiveTree`, use prepend its root:

```ts
registerHooks(immaculata.jsxRuntimeModuleHook(tree.root + '/my-jsx.js'))
```

## VS Code support

If you're not using a library that provides JSX types,
you'll need to add your own. Here's a basic starter:

```ts
declare namespace JSX {

  type IntrinsicElements = Record<string, any>

  interface ElementChildrenAttribute {
    children: any
  }

}
```

## Using React.js

Since the path just needs to be a valid module that Node.js knows
how to find, you can probably use React.js SSR here if you want I guess.
But where's the fun in that?
