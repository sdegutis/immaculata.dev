## DevServer

### API

```typescript
class DevServer {

  // list of files to serve
  files: Map<string, Buffer | string> | undefined

  // optional not-found handler
  notFound?: (path: string) => string

  // call this to reload pages via SSE/HMR
  reload(): void

  // onRequest takes a res (which includes req)
  // and can optionally clsoe (end) the res itself
  constructor(port: number, opts?: {
    hmrPath?: string,
    onRequest?: (res: http.ServerResponse) => 'handled' | void,
  })

}
```

### Usage

```typescript
import * as immaculata from 'immaculata'

const server = new immaculata.DevServer(8080)
server.files = myFileMapGenerator()

whenMySiteCodeChanges(() => {
  server.files = myFileMapGenerator()
  server.reload()
})
```
