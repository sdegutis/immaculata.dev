import ShikiMarkdownIt from '@shikijs/markdown-it'
import MarkdownIt from "markdown-it"

console.log('Loading syntax highlighter stuff...')

export const md = new MarkdownIt()

md.use(await ShikiMarkdownIt({ theme: 'dark-plus', }))

console.log('Done.')
