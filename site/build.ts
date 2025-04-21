import * as immaculata from 'immaculata'
import { mainPage } from "./index.html.tsx"
import { md } from "./markdown.ts"

let reloader = ''
if (process.argv[2] === 'dev') reloader = `<script>new EventSource('/reload').onmessage = () => location.reload()</script>`

export async function processSite(tree: immaculata.LiveTree) {
  return tree.processFiles(async (files) => {

    files.without('/public/').remove()
    files.do(f => f.path = f.path.slice('/public'.length))

    const content = tree.files.get('/rationale.md')!.content.toString()
    files.add('/index.html', mainPage(reloader + md.render(content)))

  })
}
