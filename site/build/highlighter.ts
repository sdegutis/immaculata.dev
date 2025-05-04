import * as ShikiMd from '@shikijs/markdown-it'
import type MarkdownIt from 'markdown-it'
import * as Shiki from 'shiki'
import { tree } from '../../static.ts'

// In it's own file since it takes forever to load

console.log('Creating shiki highlighter')
const highlighter = await Shiki.createHighlighter({
  themes: ['dark-plus'],
  langs: Object.keys(Shiki.bundledLanguages),
})
console.log('Done creating shiki highlighter')

export function highlightCode(md: MarkdownIt) {
  md.use(ShikiMd.fromHighlighter(highlighter, { theme: 'dark-plus' }))
}

tree.onModuleInvalidated(import.meta.url, () => {
  console.log('Disposing shiki highlighter')
  highlighter.dispose()
})
