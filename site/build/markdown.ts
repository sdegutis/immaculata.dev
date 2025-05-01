import type { Options, Renderer, Token } from "markdown-it"
import MarkdownIt from "markdown-it"
import anchors from 'markdown-it-anchor'
import inlineAttrs from 'markdown-it-attrs'
import containers from 'markdown-it-container'
import { evalCode } from "./eval.ts"
import { highlightCode } from "./highlighter.ts"
import { generateToc } from "./toc.ts"

export interface Env { }

export const md = new MarkdownIt({ html: true })
md.use(evalCode)
md.use(inlineAttrs)
md.use(generateToc)
md.use(highlightCode)
md.use(addHeaderPermalinks)
md.use(sectionMacro)

function addHeaderPermalinks(md: MarkdownIt) {
  anchors(md, {
    permalink: anchors.permalink.linkInsideHeader({
      placement: 'before',
    }),
    slugify,
  })
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/ +/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function sectionMacro(md: MarkdownIt) {
  containers(md, 'section', {
    render: (tokens, i) => {
      const tok = tokens[i]
      const classes = tok.info.match(/^ *section +(.+)$/)?.[1]
      return tok.nesting === 1
        ? `<section class='${classes}'>\n`
        : `</section>\n`
    }
  })
}

export function defaultRender(tokens: Token[], idx: number, opts: Options, env: any, self: Renderer) {
  return self.renderToken(tokens, idx, opts)
}
