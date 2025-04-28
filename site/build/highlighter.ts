import Shiki from '@shikijs/markdown-it'
import type MarkdownIt from 'markdown-it'

// In it's own file since it must be a long-lived singleton
const shiki = await Shiki({ theme: 'dark-plus' })

export const highlightCode = (md: MarkdownIt) => {
  md.use(shiki)
}
