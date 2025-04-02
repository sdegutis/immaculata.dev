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

### Module invalidation

To import files within the given tree, use `tree.enableModules`, which also invalidates modules that have changed and any modules that depended on them, using Node's loader hooks.

```typescript
import * as immaculata from 'immaculata'
const tree = new immaculata.LiveTree('site', import.meta.url)
// ---cut---
tree.enableModules()
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

// point it to whatever file you want
tree.enableModules(immaculata.makeModuleJsxTransformer(
  (treeRoot, path, src, isTs) => treeRoot + '/my/jsx/impl.ts')
)
```


### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
