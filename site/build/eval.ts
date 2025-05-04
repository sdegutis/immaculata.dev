import * as jsx from 'immaculata/jsx-strings.js'
import type MarkdownIt from 'markdown-it'
import ts from 'typescript'
import { defaultRender } from './markdown.ts'

declare module "./markdown.ts" {
  interface Env {
    [key: string]: any
  }
}

export function evalCode(md: MarkdownIt) {
  const oldfence = md.renderer.rules.fence ?? defaultRender
  md.renderer.rules.fence = (toks, idx, opts, env, self) => {
    if (toks[idx].info.includes('eval')) {
      const code = toks[idx].content
      const compiled = compileTsx(code, '').outputText
      const fn = new Function('exports', 'require', 'env', compiled)
      const result = fn({}, () => jsx, env)
      return result
    }

    return oldfence(toks, idx, opts, env, self)
  }
}

function compileTsx(str: string, filename: string) {
  return ts.transpileModule(str, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.NodeNext,
      jsx: ts.JsxEmit.ReactJSX,
      sourceMap: true,
      inlineSourceMap: true,
      inlineSources: true,
    }
  })
}
