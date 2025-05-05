# FileTree



## constructor

```ts
constructor(
  path: string, // e.g. "site" or "."
  importMetaUrl: string,
  opts?: {
    exclude?: (path: string, stat: fs.Stats) => any,
  }
)
```

Loads the tree from disk into memory immediately.

```ts
const tree = new FileTree('site', import.meta.url)
```


## root

```ts
public root: string
```

The full file URL of the tree's root based on constructor's `path` and `importMetaUrl`.

Never includes a trailing `'/'`



## files

```typescript
files: Map<string, TreeFile>
```

```ts
type TreeFile = {
  path: string,    // always the same as its key in the map
  content: Buffer, // always a buffer (see Pipeline)
  version: number, // increments with changes for decaching
  requiredBy: (requiredBy: string) => void, // for invalidation
}
```

A list of all files (recursively) at the given path.

```ts
const tree = new FileTree('site', import.meta.url)

// if cwd contains:
//   ./site/index.html
//   ./site/about.html
//   ./site/pages/welcome.md
//   ./site/styles/main.css

assertMatches(tree.files, {
  '/index.html':       { path: '/index.html',       content: Buffer },
  '/about.html':       { path: '/about.html',       content: Buffer },
  '/pages/welcome.md': { path: '/pages/welcome.md', content: Buffer },
  '/styles/main.css':  { path: '/styles/main.css',  content: Buffer },
})
```



## watch

```typescript
watch(debounce?: number): EventEmitter<FileTreeEvents>

type FileTreeEvents = {
  filesUpdated: [changes: FileTreeChange[]],
  moduleInvalidated: [path: string],
}

type FileTreeChange = { path: string, change: 'add' | 'dif' | 'rem' }
```

Begins watching the path recursively for changes,
and updates the contents of `files`. Uses `fs.watch`
internally, defaults to `100ms` debouncing.

```ts
const tree = new FileTree('site', import.meta.url)
tree.watch()
```


## onModuleInvalidated

```ts
onModuleInvalidated(importMetaUrl: string, fn: () => void): void
```

Calls `fn` once when the module is invalidated, directly or indirectly.

* Requires [hooks.useTree](module-hooks.md#usetree) to be called first.
* Must be called *from within module*, passing `import.meta.url`.



## addDependency

```ts
addDependency(requiredBy: string, requiring: string)
```

Makes changes to file at `requiring` invalidate module at `requiredBy`.
