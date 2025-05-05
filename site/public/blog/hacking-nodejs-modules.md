# (ab?)using Node module hooks to speed up development

I wanted a much faster way to develop the front-end of my site.

And I wanted to use JSX as the templating language but without React.

And I didn't want to be tied down to any one way of doing anything.

<br>

So I made a bunch of orthogonal stuff. Half evolved into [module hooks](../api/module-hooks.md#module-hooks).

<br>

One module loader transforms JSX to JS with the function you give it.

Now I can import and run JSX files natively in JSX.

<br>

Another remaps imports arbitrarily.

Now I can remap `react/jsx-runtime` to `./my-jsx-impl.js` for experimentation.

<br>

Another looks for `.{ts,tsx,jsx}` when `.js` isn't found.

Now I can import `foo.tsx` as `foo.js` which helps with client code sharing.

<br>

The final one works with [FileTree](../api/filetree.md#filetree).

It resolves to the latest version of a file using query string cache busting.

And it loads the latest one from the FileTree for speed and fewer disk reads.

This works because FileTree can (optionally) keep itself updated on disk changes.

<br>

I added `filesUpdated` events to the FileTree's EventEmitter.

Now I can rebuild my whole front-end whenever any file changes.

But I made sure to use module versioning to not discard unchanged state.

Modules are only invalidated and re-executed if they *or their deps* change.

This also allows me to keep persisted runtime state between site rebuilds.

<br>

I also added `moduleInvalidated` events and the `onModuleInvalidated` method.

This way, a module can run a callback when its being replaced by a newer version.

Now I can [properly dispose singletons](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/147c7aedf369e47b6b5155d147ea91dfe9d83d58/site/build/highlighter.ts#L19-L22)
instead of restarting the whole process.
