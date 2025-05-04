# FileTree



## `constructor`

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


## `fileTree.root`

```ts
public root: string
```

The full file URL of the tree's root based on constructor's `path` and `importMetaUrl`.

Never includes a trailing `'/'`



## `fileTree.files`

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




## `fileTree.watch`

```typescript
watch(
  opts?: { debounceMs?: number },
  onChanges?: (changes: FileTreeChange[]) => void
): FSWatcher

type FileTreeChange = { path: string, change: 'add' | 'dif' | 'rem' }
```

Begins watching the path recursively for changes,
and updates the contents of `files`. Uses `fs.watch`
internally, defaults to `100ms` debouncing.

```ts
const tree = new FileTree('site', import.meta.url)
tree.watch()
```


## `fileTree.addDependency`

```ts
addDependency(requiredBy: string, requiring: string)
```

Makes changes to file at `requiring` invalidate module at `requiredBy`.
