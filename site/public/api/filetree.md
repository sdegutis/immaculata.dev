# FileTree



## `constructor`

```ts
constructor(path: string, importMetaUrl: string, opts?: {
  exclude?: (path: string, stat: fs.Stats) => any,
})
```

Loads the tree from disk into memory immediately.

```ts
const tree = new FileTree('site', import.meta.url)
```



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



## `fileTree.enableImportsModuleHook`

```typescript
enableImportsModuleHook(): ModuleHook
```

Returns a hook for [module.registerHooks](https://nodejs.org/api/module.html#moduleregisterhooksoptions)
that hooks into Node.js's built in `import` and `require`
and returns the contents from `tree.files` instead of
loading from disk.

A query string including the current version of the file
is appended to the import path to enable cache busting,
so that when a file changes under the tree, it can be
imported again, and will be re-run.

This cache invalidation also extends to any file that
has required the file that has changed, so that there
are never stale modules.

```ts
import module from 'node:module'

const tree = new FileTree('site', import.meta.url)

module.registerHooks(tree.enableImportsModuleHook)

import('site/myfile.js')
```
