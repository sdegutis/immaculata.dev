# (ab?)using Node module hooks to speed up development

I wanted a much faster way to develop the front-end of my site.

And I didn't want to be tied down to any one way of doing anything.

So I made a bunch of orthogonal stuff. Half evolved into [module hooks](../api/module-hooks.md#module-hooks).

<br>

I wanted to import and run JSX files natively in Node.js.

So I made a [compileJsx](../api/module-hooks.md#compilejsx) module loader that transforms JSX to JS with the function you give it.

<br>

I wanted to remap `react/jsx-runtime` to `./my-jsx-impl.js` for experimentation.

So I made a [mapImport](../api/module-hooks.md#mapimport) module resolver hook that remaps imports by name.

<br>

I wanted to be able to import `foo.{ts,tsx,jsx}` with its real file extension.

So I made a [tryAltExts](../api/module-hooks.md#tryaltexts) module hook that looks for `.{ts,tsx,jsx}` when `.js` isn't found.

<br>

I wanted to reduce disk reads when reading files.

So I made [FileTree](../api/filetree.md#filetree) to load a file tree into memory
and optionally keep it updated with [.watch](../api/filetree.md#watch).

<br>

I wanted to develop modules and re-execute them without restarting the whole process.

So I created the [useTree](../api/module-hooks.md#usetree) module hook that invalidates re-saved module files using cache busters.

<br>



I wanted to [properly dispose singletons](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/147c7aedf369e47b6b5155d147ea91dfe9d83d58/site/build/highlighter.ts#L19-L22)
instead of restarting the whole process.

So I made [onModuleInvalidated](../api/filetree.md#onmoduleinvalidated) to run code when its being replaced with a newer version.
