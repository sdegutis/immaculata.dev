# Enabling HMR in Node.js

By default, the native Node.js module system caches module exports.
The new `--watch` and `--watch-paths` CLI param allows reloading
the entire runtime when the given paths change. This workflow is
sufficient for simple scripts.

But for more complex programs, or when some portion of the program
takes a while to load (e.g. [shiki](https://shiki.matsu.io/)),
or some operations are resource-expensive (e.g. loading files from
disk) and to be done as few times as possible, we need better.

Using `immaculata`, you can:

* Load a file tree into memory and keep it updated
* Transpile JSX/TSX modules using any code you need
* Tell the Node.js module system to load from this tree
* Invalidate modules when changed for re-execution
* Invalidate modules when their dependencies change

A simple example of enabling HMR in Node.js:

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
