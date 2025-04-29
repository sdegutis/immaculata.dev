# Immaculata.dev

*TypeScript DX primitives* {.homesubheader}

```bash
npm i immaculata
```

### Features

* [Enable JSX](guides/enabling-jsx.md#enabling-jsx-in-nodejs) in Node.js's native module system

* [Enable HMR](guides/enabling-hmr.md#enabling-hmr-in-nodejs) in Node.js's native module system

* Small (~420 loc) highly readable [source code](https://github.com/thesoftwarephilosopher/immaculata/tree/main/src)

* Almost no dependencies (just `mime-types`)

### Module hot-reloading in Node.js

```ts
const tree = new immaculata.LiveTree('site', import.meta.url)
tree.watch()
registerHooks(tree.enableImportsModuleHook())

// importing modules under 'site' now re-executes them if they change
```

### Native JSX in Node.js

```ts
// enable JSX inside Node.js and make it become a string-builder
registerHooks(immaculata.jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))

// compile jsx using something like swc or tsc
registerHooks(immaculata.compileJsxTsxModuleHook(compileJsx))

// you can now import tsx files!
const { template } = await import('./site/template.tsx')
```

### Check out some recipes

* [Enabling HMR in Node.js](guides/enabling-hmr.md#enabling-hmr-in-nodejs)

* [Enabling JSX in Node.js](guides/enabling-jsx.md#enabling-jsx-in-nodejs)

* [Enabling TS/TSX in Node.js](guides/enabling-ts.md#enabling-tsx-in-nodejs)

* [Local development setup](guides/local-dev-setup.md#local-developer-setup)

* [Build tool example](guides/simple-build-tool.md#simple-build-tool)

* [Simple Markdown static site generator](guides/simple-md-ssg.md#simple-md-ssg)

* [Publishing to GitHub pages](guides/using-gh-pages.md#publishing-to-gh-pages)

### License

``` tsx eval
return <>
<pre><code>{env.license}</code></per>
</>
```

### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
