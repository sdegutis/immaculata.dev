## Pipeline

### API

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
