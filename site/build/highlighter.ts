import * as ShikiMd from '@shikijs/markdown-it'
import type MarkdownIt from 'markdown-it'
import * as Shiki from 'shiki'
import { tree } from '../../static.ts'

const highlighter = await Shiki.createHighlighter({
  themes: ['dark-plus'],
  langs: ['tsx', 'typescript', 'json', 'yaml', 'bash'],
})

export function highlightCode(md: MarkdownIt) {
  md.use(ShikiMd.fromHighlighter(highlighter, { theme: 'dark-plus' }))
}

tree.onModuleInvalidated(import.meta.url, () => {
  highlighter.dispose()
})
