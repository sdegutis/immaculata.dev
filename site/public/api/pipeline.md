# Pipeline

The Pipeline API is a recent addition, somewhat experimental
and likely to change, though not that much, since I already
use it heavily in a few codebases.

## Rationale

Technically you don't need a pipeline object to transform
a `LiveTree.files` into a map compatible with `DevServer`
and `generateFiles`. You can just do this:

```ts
const tree = new LiveTree('site', import.meta.url)

let files = tree.files.values().toArray()

// now do your site processing
files = files.filter(/* ... */)
files = files.map(/* ... */)

const fileMap = new Map(files.map(f => [f.path, f.content]))
server.files = fileMap
generateFiles(fileMap)
```

But that gets very inconvenient very quickly:

* Every `file.content` is always a Buffer, but sometimes
  we want to lazily transform it to a string and use that

* Filtering files is almost always path-based,
  and would be much more convenient with regexes

* Adding and removing individual files or arrays of files
  is technically possible but *very* repetitious

So the `Pipeline` class was created as a convenience.

## API

```typescript
class Pipeline {

  static from(files: LiveTree['files']): Pipeline

  private constructor(files: MemFile[], filters: Filter[])

  // filter files for the next action
  with(regex: RegExp | string): Pipeline
  without(regex: RegExp | string): Pipeline

  // add/remove individual files
  add(path: string, content: string | Buffer | MemFile): void
  del(path: string): void

  // add/remove entire subtrees
  graft(prefix: string, files: Pipeline | LiveTree): void
  remove(): void

  // foreach conveniences
  do(fn: (file: MemFile) => void): void
  async doAsync(fn: (file: MemFile) => void | Promise<void>):
    Promise<void>

  // map conveniences
  all(): MemFile[]
  paths(): string[]

  // ill give you three guesses what this does
  copy(): Pipeline

  // return a map compatible with generateFiles and DevServer
  results(): Map<string, string|Buffer>

}

class MemFile {

  path: string
  content: Buffer

  constructor(path: string, content: string | Buffer)

  // return #text ??= content.toString('utf8')
  text: string

  // return text ?? content
  textOrContent() { return this.#text ?? this.content }

  copy(path = this.path): MemFile

}
```
