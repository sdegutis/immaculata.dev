import ShikiMarkdownIt from '@shikijs/markdown-it'

console.log('Loading syntax highlighter stuff...')
export const shiki = await ShikiMarkdownIt({ theme: 'dark-plus', })
console.log('Done.')
