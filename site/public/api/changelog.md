# Change log

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
