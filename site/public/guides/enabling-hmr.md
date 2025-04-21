# Enabling HMR in Node.js

```ts
import * as immaculata from "immaculata"
import { registerHooks } from 'module'
import ts from 'typescript'

const tree = new immaculata.LiveTree('site', import.meta.url)
registerHooks(tree.enableImportsModuleHook())

const myModule = await import('site/myModule.js')
// site/myModule.js is executed

const myModule2 = await import('site/myModule.js')
// site/myModule.js is NOT executed

tree.watch({}, async () => {
  const myModule = await import('site/myModule.js')
  // site/myModule.js IS executed again if invalidated
})
```

Now any time you save `site/myModule.js`, or any
module that it imports (recursively), the code
in this file will be *re-executed* (via cache
invalidation). This provides efficient HMR in Node.js
using its native module system.

Note that it also works with `require` if the project
is in `ESM` mode (via package.json's `type` key).
But `module.createRequire` will not (yet) respect
the cache invalidation feature due to
[node#57696](https://github.com/nodejs/node/issues/57696).
