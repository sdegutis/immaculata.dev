## generateFiles

### API

```typescript
function generateFiles(
  out: Map<string, Buffer | string>,
  dry = false,
  outDir = 'docs'
): void
```

### Usage

```typescript
import * as immaculata from 'immaculata'

immaculata.generateFiles(myFileMapGenerator())
```
