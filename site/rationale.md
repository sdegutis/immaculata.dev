*Web build tool for serious engineers.*

```bash
npm i immaculata
```

Rather than brute forcing solutions, Immaculata provides carefully thought out functions and classes with orthogonal behavior, aiming to reach the perfect blend of convenience and flexibility.

### In memory file tree

At the core is `LiveTree`, which loads a given directory into memory.

```typescript
import * as immaculata from 'immaculata'

const tree = new immaculata.LiveTree('site', import.meta.url)

console.log(tree.files.get('/index.html')?.content)
```

### Hot reloading

For hot reloading, just use `tree.watch`.

```typescript
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
tree.watch({}, (paths) => {
  console.log('changed paths:', paths)
  // maybe do something
})
```

### Importing live modules

To import files within the given tree, use `tree.enableModules`, which also invalidates modules that have changed and any modules that depended on them, using Node's loader hooks.

```typescript
//@noErrors
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
tree.enableModules()
import('./site/foo.ts')
```

### JSX at build time

This optionally takes a JSX/TSX transformer so that you can use .jsx/.tsx files at build time. Helpers are provided for convenience.

```typescript
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
// just stringifies JSX
tree.enableModules(immaculata.transformModuleJsxToStrings)

// defers to your code at <tree.root>/jsx-node.ts
tree.enableModules(immaculata.transformModuleJsxToRootJsx)

// point it to whatever import-path you want
tree.enableModules(immaculata.makeModuleJsxTransformer(
  (treeRoot, path, src, isTs) => treeRoot + '/my/jsx/impl.ts')
)
```

### File preprocessors

Before using as a website, preprocessing of a tree is useful:

```typescript
const addCopyright = (s:string) => s
const precompileJsx = (s:string) => s
const minifyCss = (s:string) => s
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
const outfiles = await tree.processFiles(files => {

  files.with(/\.d\.ts$/).remove()

  files.with(/\.tsx?$/).do(f => {
    f.path = f.path.replace(/\.tsx?$/, '.js')
    f.text = precompileJsx(f.text)
  })

  files.with(/\.css$/).do(f => f.text = minifyCss(f.text))

  files.with(/\.html$/).do(f => f.text = addCopyright(f.text))
  files.with(/\.js$/).do(f => f.text = addCopyright(f.text))

})
```

### Writing output to disk

When publishing to e.g. GitHub Pages:

```typescript
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
const outfiles = await tree.processFiles(files => {
  // ...
})
immaculata.generateFiles(outfiles)
```

### Running a dev server

For local development:

```typescript
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
async function process() {
  return tree.processFiles(files => {
    // ...
  })
}

const server = new immaculata.DevServer(8080, '/reload')
server.files = await process()

tree.watch({}, async () => {
  server.files = await process()
  server.reload() // invokes SSE at "/reload" per arg above
})
```

It could be useful to inject an SSE reloading script into HTML files using the preprocessor you define.

### License

Standard MIT

### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
