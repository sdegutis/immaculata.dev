# Change log

## 1.2.0

The `ignore` option of `.watch(...)` was from when it just forwarded options to `chokidar`.
But we usually also want to exclude files with given paths from the tree *itself*.
So the option has been removed in favor of a new `exclude` option in the constructor.

And since we already keep a in-memory file tree (that's the whole *point* of `FileTree`),
it turned out to be very easy to give a highly detailed report of what actually changed.
So the `onChange` callback to `.watch(...)` now receives `FileTreeChange[]` where:

```ts
export type FileTreeChange = { path: string, change: 'add' | 'dif' | 'rem' }
```

* Added `opts?: { exclude: (path: string, stat: fs.Stats) => any }` to `FileTree` constructor
* Added `debounceMs` option to `FileTree.watch`
* Added `FileTree.addDependency` method
* Removed `ignore` option from `FileTree.watch`
* Changed `onChange` callback parameter type of `FileTree.watch`
* The `onChange` callback is no longer called when a file is saved but unchanged

[Full Changelog](https://github.com/thesoftwarephilosopher/immaculata/compare/1.1.0...1.2.0)


## 1.1.0

### Removed `tree.processFiles`

It was too trivial and restrictive.

To upgrade, replace:

```ts
const result = tree.processFiles(files => {
  // ...
})
```

with:

```ts
const files = Pipeline.from(tree.files)
// ...
return files.results()
```
