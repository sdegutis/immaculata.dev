*TypeScript DX primitives*

```bash
npm i immaculata
```

*NOTE: Docs are halfway cleaned up as of Easter 2025.
API pages are accurate, but this page mentions some outdated APIs.
The concepts are the same though.*

### In memory file tree

At the core is `LiveTree`, which loads a given directory into memory.

### Hot reloading

To keep its files up to date, use `tree.watch`, which uses Chokidar and takes its options mandatorily.

### Importing live modules

To import files within the given tree, use `tree.enableModules`.

This is useful for code sharing at build time and in the browser.

### Module invalidation

Using `tree.enableModules()` also invalidates modules that have changed and any modules that depended on them, so that importing them again will re-run their code:

So if you import `site/foo.ts` which imports `site/bar.ts`, and change `site/bar.ts` in your editor, importing `site/foo.ts` will re-eval both modules.

This can be very useful for speeding up development time of large codebases by only reloading a portion of them when they change.

This module invalidation is done through Node's official module hooks, which means it works natively within Node's module system.

### JSX at build time

This optionally takes a JSX/TSX transformer so that you can use .jsx/.tsx files at build time. Helpers are provided for convenience.

This *could* be useful for code sharing, depending on your setup.

### File preprocessors

Before using as a website, preprocessing of a tree is useful:

### Writing output to disk

When publishing to e.g. GitHub Pages:

### Running a dev server

For local development:

It could be useful to inject an SSE reloading script into HTML files using the preprocessor you define.

### Real world example

[This website's source](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/website/main.ts) is a good example, since it uses markdown, complex syntax highlighting, and HTML injection.

### License

Standard MIT

### Special thanks

This project was made possible by Jesus, Mary, and Joseph.
