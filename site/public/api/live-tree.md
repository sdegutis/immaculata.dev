## LiveTree

### API

```typescript
class LiveTree {

  // a live list of files at the given path
  files = new Map<string, LiveFile>();

  // loads the tree from disk into memory
  constructor(path: string, importMetaUrl: string)

  // allows transforming a tree for site processing
  // returns a map compatible with generateFiles and DevServer
  async processFiles(
    fn: (pipeline: Pipeline) => void | Promise<void>
  ): Promise<Map<string, string|Buffer>>

  // begins watching the path recursively for changes
  watch(
    opts?: { ignored?: (path: string) => boolean },
    onchange?: (paths: Set<string>) => void
  ): FSWatcher

  // returns a hook that allows this 
  enableImportsModuleHook(): ModuleHook

}

type LiveFile = {
  path: string,    // always the same as its key in the map
  content: Buffer, // always a buffer (see Pipeline)
  version: number, // increments with changes for decaching
  requiredBy: (requiredBy: string) => void, // invalidation
}
```

### Usage

```typescript
TODO
```
