# Change log

## 2.0.0

### Export changes

Changed export paths to not use `/dist/`, e.g.:

* `'immaculata/dist/jsx-strings.js'` => `'immaculata/jsx-strings.js'`
* `'immaculata/dist/*.js'` => `'immaculata/*.js'`

### FileTree changes

* Changed `fileTree.watch` to not take `fn` anymore
* Changed `fileTree.watch` to return `EventEmitter` with `filesUpdated` event
* Changed `fileTree.watch` to take `debounce` instead of `opts: { debounceMs }`
* Added `fileTree.onModuleInvalidated` to be called *inside* modules
* Added `fileTree.addDependency` for module invalidation
* Added `moduleInvalidated` event to `fileTree.watch()` events

### Hook changes

* Put all hooks under `hooks` namespace from main export
  * Also exported individually from `'immaculata/hooks.js'`
* Moved `FileTree.enableImportsModuleHook` to `hooks.useTree`
* Removed `jsxRuntimeModuleHook` as too specific
* Added `hooks.mapImport` to replace `jsxRuntimeModuleHook`
* Renamed `exportAsStringModuleHook` => `hooks.exportAsString`
* Renamed `tryTsTsxJsxModuleHook` => `hooks.tryAltExts`
* Renamed `compileJsxTsxModuleHook` => `hooks.compileJsx`


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

Removed `tree.processFiles` as being too trivial and restrictive.

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

(In fact, that's literally all the method originally did.)

[Full Changelog](https://github.com/thesoftwarephilosopher/immaculata/compare/1.0.0...1.1.0)
