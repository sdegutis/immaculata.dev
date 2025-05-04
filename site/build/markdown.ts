import type { Options } from "markdown-it"
import MarkdownIt from "markdown-it"
import anchors from 'markdown-it-anchor'
import inlineAttrs from 'markdown-it-attrs'
import containers from 'markdown-it-container'
import type { Renderer, Token } from "markdown-it/index.js"
import { evalCode } from "./eval.ts"
import { highlightCode } from "./highlighter.ts"
import { generateToc } from "./toc.ts"

export interface Env { }

export const md = new MarkdownIt({ html: true })
md.use(renameMarkdownLinks)
md.use(evalCode)
md.use(inlineAttrs)
md.use(generateToc)
md.use(highlightCode)
md.use(addHeaderPermalinks)
md.use(sectionMacro)

function renameMarkdownLinks(md: MarkdownIt) {
  const linkopen = md.renderer.rules["link_open"] ?? defaultRender
  md.renderer.rules["link_open"] = (tokens, idx, opts, env, self) => {
    let href = tokens[idx].attrGet('href')!
    let hash = ''
    const hashi = href.indexOf('#')
    if (hashi !== -1) {
      hash = href.slice(hashi)
      href = href.slice(0, hashi)
    }

    href = href.replace(/\.md$/, '.html')
    href += hash

    tokens[idx].attrSet('href', href)

    return linkopen(tokens, idx, opts, env, self)
  }
}

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
