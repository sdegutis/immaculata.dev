import * as immaculata from 'immaculata'
import { md } from "./markdown.ts"
import { template } from "./template.tsx"

let reloader = ''
if (process.argv[2] === 'dev') reloader = `
<script>new EventSource('/reload').onmessage = () => location.reload()</script>
`

export async function processSite(tree: immaculata.LiveTree) {
  return tree.processFiles(async (files) => {

    files.without('/public/').remove()
    files.do(f => f.path = f.path.slice('/public'.length))

    files.with(/\.md$/).do(f => {
      f.path = f.path.replace('.md', '.html')
      f.text = template(reloader + md.render(f.text))
    })

  })
}
