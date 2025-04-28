# Announcing Immaculata

## Rationale

Years ago, I got tired of using frameworks.
They're all opinionated, even if they don't say so.

But
[*nobody*](https://github.com/prettier/prettier/issues/5948)
[*thinks*](https://www.reddit.com/r/Zig/comments/ooknzg/lament_for_the_unused_parameter/)
[*the*](https://world.hey.com/dhh/turbo-8-is-dropping-typescript-70165c01)
[*same*](https://www.reddit.com/r/linux/comments/1ikt1fq/can_anyone_eli5_the_general_rust_in_linux_kernel/)
[*way*](https://go.dev/blog/loopvar-preview).

The best framework for web apps is probably
Node's `http` module with static files.

You may say that React or Vue add so much convenience.

Really? Look at [Vitepress's source code](https://github.com/vuejs/vitepress/tree/main/src).
Where is the code for the "on this page" plugin? Can you find it?
How long is it? Can you follow it?

Now look at how this very website does it,
both [at build time](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/main/site/build/toc.ts)
and [in the browser](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/main/site/public/script/toc.ts).

"But that's unreadable, unlike Vue." *All code* is unreadable until you try, *including* Vue.

This code is pure and simple engineering:

* The build-time script (52 loc) exports `generateToc(md: MarkdownIt)` and ` tocToHtml(toc: Toc)`
* The client-side script (39 loc) uses `IntersectionObserver` to highlight the nearest link

But more importantly, it's *not a framework*.
This site template is meant to be *cloned*, not *installed*.
So if it doesn't work the way you want, the code is *right there* for you to edit.

This site's code is the perfect showcase of immaculata's strengths:
instead of providing features, it provides DX primitives
that make those features as trivial as possible to implement.

## HMR in Node.js

At the heart of the development cycle is
*discarding as little runtime state as possible*.
The less we have to re-run, the faster we can code.

We already have SSE for HMR in the browser.
And recently Node.js added `--watch` which
restarts the *entire process*. But that's too slow.

Immaculata provides three primitives to help with this:

1. [LiveTree](../api/live-tree.md#livetree), an in-memory representation of a given directory recursively
2. [Livetree.watch](../api/live-tree.md#livetreewatch) which keeps the tree up to date with minimal fs-reads
3. [LiveTree.enableImportsModuleHook](../api/live-tree.md#livetreeenableimportsmodulehook) which invalidates stale modules

In [just a dozen or two lines of code](http://localhost:8585/guides/simple-build-tool.html),
you can use these to create a workflow where saving any file
will re-execute any modules that depend on it, and *only* those modules.

[Learn more about HMR in Node.js](../guides/enabling-hmr.md#enabling-hmr-in-nodejs)

## JSX in Node.js

Producing HTML from a server is just string building.
When writing a website, JSX can be *very* convenient
as a very clean and straightforward way to do so.

>  &mdash; Sun Tzu {style="float:right;"}
> 
> "Every sufficiently complex program develops code generation."

With Immaculata, you can import and use `.jsx` and `.tsx`
files at runtime using Node's native module system,
complete with working source maps for debugging.

```tsx
import * as immaculata from 'immaculata'
import ts from 'typescript'

registerHooks(immaculata.compileJsxTsxModuleHook((src, url) =>
  compileTsx(src, fileURLToPath(url)).outputText))

function compileTsx(str: string, filename: string) {
  return ts.transpileModule(str, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      sourceMap: true,
      inlineSourceMap: true,
      inlineSources: true,
    }
  })
}

const mod = await import('./path/to/file.tsx')
```

The above example implicitly uses `react/jsx-runtime` as usual.
But supposing you want to use anything else? Trivial.

```ts
import * as immaculata from 'immaculata'

// efficient string builder
registerHooks(immaculata.jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))

// or use another module
registerHooks(immaculata.jsxRuntimeModuleHook('another-jsx-lib/jsx.js'))

// or bring your own impl
export const tree = new immaculata.LiveTree('site', import.meta.url)
registerHooks(immaculata.jsxRuntimeModuleHook(tree.root + '/myjsx.js'))
```

[Learn more about JSX/TSX in Node.js](../guides/enabling-jsx.md#enabling-jsx-in-nodejs)

## Innovative solutions

Because immaculata doesn't force any way of thinking,
and instead only provides orthogonal primitives,
we have freedom to come up with innovative solutions.

For example, you might want to use JSX string building
directly after parsing Markdown:

```tsx
import { license, tree } from '../../static.ts'
import { Head, Html, Main, Navbar, Sidebar } from "../template/core.tsx"
import { md, type Env } from "./markdown.ts"
import { tocToHtml } from './toc.ts'

// ...

const env: Env = {}
const result = md.render(f.text, env)
f.text = <Html>
  <Head />
  <body>
    <Navbar pages={pages} />
    <Main content={result} />
    <Sidebar toc={tocToHtml(env.toc!)} />
  </body>
</Html>

// ...
```

This example was taken from
[processSite](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/main/site/build/process.tsx)
as used to build this website.
