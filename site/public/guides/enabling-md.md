# Enabling Markdown in Node.js

Using `immaculata`, you can make Node.js recognize `.md` files
and be able to import them using ordinary ESM syntax.

This requires using the [HMR hooks](/guides/enabling-hmr.html),
which has the added benefit that any modules that require
a Markdown file will automatically be invalidated when it changes.

```ts
import * as immaculata from "immaculata"

const tree = new immaculata.LiveTree('site', import.meta.url)
registerHooks(tree.enableImportsModuleHook())
registerHooks(immaculata.exportAsStringModuleHook({ bareExt: 'md' }))

import('./somefile.md').then((text: string) => {
  console.log(text)
})
```

## VS Code support

To make VS Code recognize Markdown files,
both to stop it from throwing errors,
and to get its default export typed properly,
add this to a `.d.ts` file:

```ts
declare module "*.md" {
  const text: string
  export default text
}
```
