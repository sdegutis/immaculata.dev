# Immaculata.dev

*Node.js DX primitives* {.homesubheader}

```bash
npm i immaculata
```

### Developer experience (DX) primitives

* Use [Module reloading (HMR) hooks](#module-hot-reloading-in-nodejs) in Node.js's native module system

* Use [JSX module transpilation hooks](#native-jsx-in-nodejs) in Node.js's native module system

* Use [FileTree](api/filetree#filetree) to keep a recursive dir in memory

* Use [Pipeline](api/pipeline#pipeline) to map FileTree to front-end files

* Use [DevServer](api/dev-server#devserver) to serve PipeLine output

* Use [generateFiles](api/generate-files#generatefiles) to write PipeLine files to disk

### Module hot-reloading in Node.js

```ts
import { FileTree } from 'immaculata'

// keep an in-memory version of "./src" in memory
const tree = new FileTree('src', import.meta.url)

// invalidate modules under "src" when they change
registerHooks(tree.enableImportsModuleHook())

// keep it up to date
tree.watch({}, doStuff)
doStuff()

// importing modules under 'src' now re-executes them
async function doStuff() {
  const { stuff } = await import("src/dostuff.js")
  // "stuff" is never stale
}
```

Learn more about [enabling native HMR](guides/enabling-hmr#enabling-hmr-in-nodejs)

### Native JSX in Node.js

```ts
import { jsxRuntimeModuleHook, compileJsxTsxModuleHook } from 'immaculata'

// compile jsx using something like swc or tsc
registerHooks(compileJsxTsxModuleHook(compileJsxSomehow))

// remap "react-jsx/runtime" to any import you want (optional)
registerHooks(jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))

// you can now import tsx files!
const { template } = await import('./site/template.tsx')
```

Learn more about [enabling native JSX](guides/enabling-jsx#enabling-jsx-in-nodejs)

### Check out some recipes

* [Enabling HMR in Node.js](guides/enabling-hmr#enabling-hmr-in-nodejs)

* [Enabling JSX in Node.js](guides/enabling-jsx#enabling-jsx-in-nodejs)

* [Enabling TS/TSX in Node.js](guides/enabling-ts#enabling-tsx-in-nodejs)

* [Local development setup](guides/local-dev-setup#local-developer-setup)

* [Build tool example](guides/simple-build-tool#simple-build-tool)

* [Simple Markdown static site generator](guides/simple-md-ssg#simple-md-ssg)

* [Publishing to GitHub pages](guides/using-gh-pages#publishing-to-gh-pages)

### License

``` tsx eval
return <>
<pre><code>{env.license}</code></per>
</>
```

### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
