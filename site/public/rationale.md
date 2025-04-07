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

To keep its files up to date, use `tree.watch`, which uses Chokidar and takes its options mandatorily.

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

To import files within the given tree, use `tree.enableModules`.

This is useful for code sharing at build time and in the browser.

```typescript
//@noErrors
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
tree.enableModules()
const exports = await import('./site/foo.ts') as any
```

### Module invalidation

Using `tree.enableModules()` also invalidates modules that have changed and any modules that depended on them, so that importing them again will re-run their code:

```typescript
// @filename: test.js
import("./site/foo.js")
// change & save site/foo.js
// then import again:
import("./site/foo.js")

// @filename: site/foo.js
import "./bar.js"
console.log('in foo') // prints twice

// @filename: site/bar.js
console.log('in bar') // prints twice
```


So if you import `site/foo.ts` which imports `site/bar.ts`, and change `site/bar.ts` in your editor, importing `site/foo.ts` will re-eval both modules.

This can be very useful for speeding up development time of large codebases by only reloading a portion of them when they change.

This module invalidation is done through Node's official module hooks, which means it works natively within Node's module system.

### JSX at build time

This optionally takes a JSX/TSX transformer so that you can use .jsx/.tsx files at build time. Helpers are provided for convenience.

```typescript
//@noErrors
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

const exports = await import('./site/foo.tsx') as any
```

This *could* be useful for code sharing, depending on your setup.

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

### Real world example

[This website's source](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/website/main.ts) is a good example, since it uses markdown, complex syntax highlighting, and HTML injection.

### License

Standard MIT

### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
