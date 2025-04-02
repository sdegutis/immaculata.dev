import ShikiMarkdownIt from '@shikijs/markdown-it'
import { transformerTwoslash } from '@shikijs/twoslash'
import { readFileSync } from "fs"
import * as immaculata from 'immaculata'
import MarkdownIt from "markdown-it"

console.log('Loading syntax highlighter stuff...')

const md = new MarkdownIt()

md.use(await ShikiMarkdownIt({
  theme: 'dark-plus',
  transformers: [
    transformerTwoslash(),
  ],
}))

console.log('Done.')

const twoslashStyle = readFileSync('node_modules/@shikijs/twoslash/style-rich.css')

const tree = new immaculata.LiveTree('site', import.meta.url)

if (process.argv[2] === 'dev') {
  const server = new immaculata.DevServer(8080)
  server.files = await processSite()

  tree.watch({
    ignored: (str) => str.endsWith('/site/api.d.ts')
  }, async (paths) => {
    console.log('paths changed')
    try { server.files = await processSite() }
    catch (e) { console.error(e) }
    server.reload()
  })
}
else {
  immaculata.generateFiles(await processSite())
}

async function processSite() {
  return tree.processFiles(async (files) => {

    files.add("/twoslash.css", twoslashStyle)

    const content = files.with('^/rationale.md$').all()[0]?.text!
    files.del('/rationale.md')

    files.with('^/index.html$').do(f => f.text = f.text.replace('<!-- CONTENT -->', md.render(content)))

  })
}
