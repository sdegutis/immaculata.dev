# (ab?)using Node module hooks to speed up development

I wanted a much faster way to develop the front-end of my site.

And I didn't want to be tied down to any one way of doing anything.

So I made a bunch of orthogonal stuff. Half evolved into [module hooks](../api/module-hooks.md#module-hooks).

<br>

I wanted to import and run JSX files natively in Node.js.

So I made a [compileJsx](../api/module-hooks.md#compilejsx) module loader that transforms JSX to JS with the function you give it.

```ts
import { hooks } from 'immaculata'
import { registerHooks } from 'module'

registerHooks(hooks.compileJsx((src, url) => /* ... use swc/ts/etc ... */))
```

<br>

I wanted to remap `react/jsx-runtime` to `./my-jsx-impl.js` for experimentation.

So I made a [mapImport](../api/module-hooks.md#mapimport) module resolver hook that remaps imports by name.

```ts
import { hooks } from 'immaculata'
import { registerHooks } from 'module'

registerHooks(hooks.mapImport('react/jsx-runtime', 'immaculata/jsx-strings.js'))
```

<br>

I wanted to be able to import `foo.{ts,tsx,jsx}` but using the `.js` file extension.

So I made a [tryAltExts](../api/module-hooks.md#tryaltexts) module hook that looks for `.{ts,tsx,jsx}` when `.js` isn't found.

```ts
import { hooks } from 'immaculata'
import { registerHooks } from 'module'

registerHooks(hooks.tryAltExts)
import('./foo.js') // now works even though only foo.tsx actually exists
```

<br>

I wanted to reduce disk reads when reading files.

So I made [FileTree](../api/filetree.md#filetree) to load a file tree into memory
and optionally keep it updated with [tree.watch](../api/filetree.md#watch).

```ts
import { FileTree } from 'immaculata'

export const tree = new FileTree('site', import.meta.url)
tree.watch().on('filesUpdated',      async changes => /* ... */)
tree.watch().on('moduleInvalidated', async path    => /* ... */)
```

<br>

I wanted to develop modules and re-execute them without restarting the whole process.

So I created the [useTree](../api/module-hooks.md#usetree) module hook that invalidates re-saved module files using cache busters.

```ts
import { FileTree, hooks } from 'immaculata'
import { registerHooks } from 'module'

export const tree = new FileTree('site', import.meta.url)
registerHooks(hooks.useTree(tree))

tree.watch().on('filesUpdated', dostuff)
dostuff()
```

<br>



I wanted to [properly dispose singletons](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/147c7aedf369e47b6b5155d147ea91dfe9d83d58/site/build/highlighter.ts#L19-L22)
instead of restarting the whole process.

So I made [onModuleInvalidated](../api/filetree.md#onmoduleinvalidated) to run code when its being replaced with a newer version.

```ts
import * as ShikiMd from '@shikijs/markdown-it'
import type MarkdownIt from 'markdown-it'
import * as Shiki from 'shiki'
import { tree } from '../../static.ts'

const highlighter = await Shiki.createHighlighter({
  themes: ['dark-plus'],
  langs: ['tsx', 'typescript', 'json', 'yaml', 'bash'],
})

export function highlightCode(md: MarkdownIt) {
  md.use(ShikiMd.fromHighlighter(highlighter, { theme: 'dark-plus' }))
}

tree.onModuleInvalidated(import.meta.url, () => {
  highlighter.dispose()
})
```
