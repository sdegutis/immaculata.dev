# Change log

## 1.0.1

Removed `tree.processFiles` as too trivial. To upgrade:

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
