# Simple MD SSG

In the manner of the time honored tradition
of writing every site in markdown, this code
implements `processSite` as referenced by the
[Simple build tool](simple-build-tool.md#simple-build-tool) guide.

```ts
import * as immaculata from 'immaculata'
import { md } from "./markdown.ts"
import { template } from "./template.tsx"

export async function processSite(tree: immaculata.LiveTree) {
  return tree.processFiles(async (files) => {

    // make `site/public/` be the file tree
    files.without('/public/').remove()
    files.do(f => f.path = f.path.slice('/public'.length))

    // find all .md files and render in a jsx template
    files.with(/\.md$/).do(f => {
      f.path = f.path.replace('.md', '.html')
      f.text = template(md.render(f.text))
    })

  })
}
```
