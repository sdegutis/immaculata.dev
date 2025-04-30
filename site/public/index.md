# Immaculata.dev

*Node.js DX primitives* {.homesubheader}

```bash
npm i immaculata
```

### Developer experience (DX) primitives

* Use [JSX hooks](guides/enabling-jsx.md#enabling-jsx-in-nodejs) with Node.js's native module system

* Use [HMR hooks](guides/enabling-hmr.md#enabling-hmr-in-nodejs) with Node.js's native module system

* Use [FileTree](api/filetree.md#filetree) to keep a recursive dir in memory

* Use [Pipeline](api/pipeline.md#pipeline) to map FileTree to front-end files

* Use [DevServer](api/dev-server.md#devserver) to serve PipeLine output

* Use [generateFiles](api/generate-files.md#generatefiles) to write PipeLine files to disk

### Module hot-reloading in Node.js

```ts
import { FileTree } from 'immaculata'

// keep an in-memory version of "./site" in memory
const tree = new FileTree('site', import.meta.url)

// keep it up to date
tree.watch({}, reload)

// invalidate modules under "site" when they change
registerHooks(tree.enableImportsModuleHook())

// importing modules under 'site' now re-executes them
async function reload() {
  const { something } = await import("site/dostuff.js")
  // "something" is never stale
}
```

### Native JSX in Node.js

```ts
import { jsxRuntimeModuleHook, compileJsxTsxModuleHook } from 'immaculata'

// remap "react-jsx/runtime" to any import you want
registerHooks(jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))

// compile jsx using something like swc or tsc
registerHooks(compileJsxTsxModuleHook(compileJsxSomehow))

// you can now import tsx files!
const { template } = await import('./site/template.tsx')
```

### Check out some recipes

* [Enabling HMR in Node.js](guides/enabling-hmr.md#enabling-hmr-in-nodejs)

* [Enabling JSX in Node.js](guides/enabling-jsx.md#enabling-jsx-in-nodejs)

* [Enabling TS/TSX in Node.js](guides/enabling-ts.md#enabling-tsx-in-nodejs)

* [Local development setup](guides/local-dev-setup.md#local-developer-setup)

* [Build tool example](guides/simple-build-tool.md#simple-build-tool)

* [Simple Markdown static site generator](guides/simple-md-ssg.md#simple-md-ssg)

* [Publishing to GitHub pages](guides/using-gh-pages.md#publishing-to-gh-pages)

### License

``` tsx eval
return <>
<pre><code>{env.license}</code></per>
</>
```

### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
