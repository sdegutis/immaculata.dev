# Change log

## 1.1.0

Removed `tree.processFiles` as too trivial and restrictive. To upgrade:

```ts
// replace:

const result = tree.processFiles(files => {
  // ...
})

// with:

const files = Pipeline.from(tree.files)
// ...
return files.results()
```
