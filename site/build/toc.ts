import type MarkdownIt from "markdown-it"
import { defaultRender, type Env } from "./markdown.ts"

declare module "./markdown.ts" {
  interface Env {
    toc?: Toc
  }
}

type Toc = { level: number, id: string, text: string }[]

export function generateToc(md: MarkdownIt) {
  const heading_open = md.renderer.rules['heading_open'] ?? defaultRender
  md.renderer.rules['heading_open'] = (tokens, idx, opts, env: Env, self) => {
    const toc = env.toc ??= []
    const tok = tokens[idx]
    const level = tok.markup.length
    const id = tok.attrGet('id')!
    const text = md.renderInline(tokens[idx + 1].content, env)
    toc.push({ level, id, text })
    return heading_open(tokens, idx, opts, env, self)
  }
}

export function tocToHtml(toc: Toc) {
  const table: string[] = []
  renderBlock(toc, table, 0, 1)
  return table.join('\n')
}

function renderBlock(toc: Toc, table: string[], i: number, level: number) {
  table.push(`<ul>`)
  for (; i < toc.length; i++) {
    const line = toc[i]
    table.push(`<li>`)
    table.push(`<a href="#${line.id}"># ${line.text}</a>`)

    let next = toc[i + 1]
    if (next && next.level > level) {
      i = renderBlock(toc, table, i + 1, next.level)
    }

    table.push(`</li>`)

    next = toc[i + 1]
    if (next && next.level < level) {
      break
    }
  }
  table.push(`</ul>`)
  return i
}
