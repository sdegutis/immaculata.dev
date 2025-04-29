# File generator

```typescript
function generateFiles(
  out: Map<string, Buffer | string>,
  dry = false,
  outDir = 'docs'
): void
```

Creates dirs and files on disk at the given
subroot based on the given file map.

The map has the same path format as
that of `FileTree.files`, where the
absolute root is relative to the tree.

```typescript
import * as immaculata from 'immaculata'

immaculata.generateFiles(new Map([
  ['/index.html', 'hello world'],
  ['/about.html', 'about my site'],
  ['/css/main.css', 'body{...}'],
]))

// writefile: docs/index.html
// writefile: docs/about.html
// mkdir: docs/css
// writefile: docs/css/main.css
```
