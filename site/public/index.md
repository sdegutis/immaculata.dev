# Immaculata.dev

*Node.js DX primitives* {.homesubheader}

```bash
npm i immaculata
```

::: section box note
### Note
Docs are not yet updated for 2.0.0 released this morning.

See the [2.0.0 changelog](http://localhost:8585/api/changelog.html#200) along with docs/samples.
:::


### Developer experience (DX) primitives

* Use [Module reloading (HMR) hooks](#module-hot-reloading-in-nodejs) in Node.js's native module system

* Use [JSX module transpilation hooks](#native-jsx-in-nodejs) in Node.js's native module system

* Use [FileTree](api/filetree.md#filetree) to keep a recursive dir in memory

* Use [Pipeline](api/pipeline.md#pipeline) to map FileTree to front-end files

* Use [DevServer](api/dev-server.md#devserver) to serve Pipeline output

* Use [generateFiles](api/generate-files.md#generatefiles) to write Pipeline files to disk


### Module hot-reloading in Node.js

```ts
import { FileTree, hooks } from 'immaculata'
import { registerHooks } from 'module'

// keep an in-memory version of "./src" in memory
const tree = new FileTree('src', import.meta.url)

// invalidate modules under "src" when they change
registerHooks(hooks.useTree(tree))

// keep it up to date
tree.watch().on('filesUpdated', doStuff)
doStuff()

// importing modules under 'src' now re-executes them
async function doStuff() {
  const { stuff } = await import("src/dostuff.js")
  // "stuff" is never stale
}
```

Learn more about [enabling native HMR](guides/enabling-hmr.md#enabling-hmr-in-nodejs)


### Native JSX in Node.js

```ts
import { hooks } from 'immaculata'
import { registerHooks } from 'module'

// compile jsx using something like swc or tsc
registerHooks(hooks.compileJsx(compileJsxSomehow))

// remap "react-jsx/runtime" to any import you want (optional)
registerHooks(hooks.mapImport('react/jsx-runtime', 'immaculata/jsx-strings.js'))

// you can now import tsx files!
const { template } = await import('./site/template.tsx')
```

Learn more about [enabling native JSX](guides/enabling-jsx.md#enabling-jsx-in-nodejs)


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
