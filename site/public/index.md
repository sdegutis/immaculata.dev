# Immaculata.dev

## TypeScript DX primitives

```bash
npm i immaculata
```

### Features

* [Enable JSX](/guides/enabling-jsx.html) in Node.js's native module system
* [Enable HMR](/guides/enabling-hmr.html) in Node.js's native module system
* Small (~420 loc) highly readable [source code](https://github.com/thesoftwarephilosopher/immaculata.dev)
* Almost no dependencies (just `mime-types`)

### Example

```ts
// main.ts

import * as immaculata from 'immaculata'
import { registerHooks } from 'module'
import ts from 'typescript'
import MarkdownIt from "markdown-it"

export const md = new MarkdownIt()

// load all files under 'site' into memory
const tree = new immaculata.LiveTree('site', import.meta.url)

// enable HMR in Node.js for all modules under 'site'
registerHooks(tree.enableImportsModuleHook())

// enable JSX inside Node.js and make it become a string-builder
registerHooks(immaculata.jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))
registerHooks(immaculata.compileJsxTsxModuleHook(compileJsx))

// get template function
const { template } = await import('./site/template.tsx')

if (process.argv[2] === 'dev') {
  // start a dev server and update its files when files change
  const server = new immaculata.DevServer(8080, { hmrPath: '/reload' })
  server.files = await processSite()

  // watch all files under 'site' for changes
  // the options arg takes an `ignored(path)` fn
  tree.watch({}, async (paths) => {

    // reprocess the files and give to server
    try { server.files = await processSite() }
    catch (e) { console.error(e) }

    // trigger HMR/SSE
    server.reload()

  })
}
else {
  // generate files for publishing
  immaculata.generateFiles(await processSite())
}

async function processSite() {
  return tree.processFiles(async (files) => {

    // make 'site/public/' be the site's root
    files.without('/public/').remove()
    files.do(f => f.path = f.path.slice('/public'.length))

    // transform all markdown files into html with template
    files.with(/\.md$/).do(f => {
      f.path = f.path.replace('.md', '.html')
      f.text = template(md.render(f.text))
    })

  })
}

// use typescript's built-in transpiler
function compileJsx(str: string) {
  return ts.transpileModule(str, {
    compilerOptions: {
      inlineSourceMap: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
    }
  }).outputText
}
```

```tsx
// site/template.tsx

export function template(content: string) {
  return <>
    {'<!DOCTYPE html>'}
    <html lang="en">
      <Head />
      <body>
        <NavBar />
        <main>
          {content}
        </main>
      </body>
    </html>
  </>
}

function NavBar() {
  return <nav>
    <h3>About</h3>
    <a href='/'>My site</a>
  </nav>
}

function Head() {
  return <head>
    <meta name="color-scheme" content="light dark" />
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
}
```

### Real-world example

[This website](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/website/main.ts)
was generated using `immaculata`, and in fact most of the guides here
were adapted from this site's source code, including the above example.

### License

Standard MIT

### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
