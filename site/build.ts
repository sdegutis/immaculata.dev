import { readFileSync } from "fs"
import * as immaculata from 'immaculata'
import { md } from "./highlight.ts"
import { mainPage } from "./index.html.tsx"

const twoslashStyle = readFileSync('node_modules/@shikijs/twoslash/style-rich.css')

let reloader = ''
if (process.argv[2] === 'dev') reloader = `<script>new EventSource('/reload').onmessage = () => location.reload()</script>`

export async function processSite(tree: immaculata.LiveTree) {
  return tree.processFiles(async (files) => {

    files.without('/public/').remove()
    files.do(f => f.path = f.path.slice('/public'.length))

    files.add("/twoslash.css", twoslashStyle)

    const content = tree.files.get('/rationale.md')!.content.toString()
    files.add('/index.html', mainPage(reloader + md.render(content)))

  })
}
