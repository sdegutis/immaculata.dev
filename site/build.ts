import { readFileSync } from "fs"
import * as immaculata from 'immaculata'
import { md } from "./highlight.ts"

const twoslashStyle = readFileSync('node_modules/@shikijs/twoslash/style-rich.css')

let reloader = ''
if (process.argv[2] === 'dev') reloader = `<script>new EventSource('/reload').onmessage = () => location.reload()</script>`

export async function processSite(tree: immaculata.LiveTree) {
  return tree.processFiles(async (files) => {

    files.without('/public/').remove()
    files.do(f => f.path = f.path.slice('/public'.length))

    files.add("/twoslash.css", twoslashStyle)

    const content = files.with('^/rationale.md$').all()[0]?.text!
    files.del('^/rationale.md$')

    files.with('^/index.html$').do(f => f.text = f.text.replace('<!-- CONTENT -->', reloader + md.render(content)))

    console.log(files.paths())

  })
}
