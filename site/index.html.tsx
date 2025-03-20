import * as ShikiMarkdownIt from '@shikijs/markdown-it'
import MarkdownIt from "markdown-it"
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import pages from './pages/'

const page = pages[0]!

const md = new MarkdownIt()

const javascript = require('@shikijs/langs/javascript').default
const bash = require('@shikijs/langs/bash').default
const json = require('@shikijs/langs/json').default
const jsonc = require('@shikijs/langs/jsonc').default
const yaml = require('@shikijs/langs/yaml').default

const darkplus = require('@shikijs/themes/dark-plus').default

const shiki = createHighlighterCoreSync({
  themes: [darkplus],
  langs: [javascript, bash, json, jsonc, yaml],
  engine: createJavaScriptRegexEngine()
})

ShikiMarkdownIt.setupMarkdownIt(md, shiki as any, { theme: 'dark-plus' })


const dec = new TextDecoder()
const tostring = (str: string | Uint8Array) => typeof str === 'string' ? str : dec.decode(str)

export default <>
  {`<!DOCTYPE html>`}
  <html lang="en">
    <head>
      <meta name="color-scheme" content="light dark" />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Immaculata.dev</title>
      <link rel="stylesheet" href="style.css" />
    </head>
    <body>

      <main>
        <h1>Immaculata.dev</h1>
        <nav>
          <a class='selected' href='/'>Docs</a>
          <a href='https://github.com/sdegutis/immaculata.dev'>GitHub</a>
        </nav>
        {md.render(tostring(page.content))}
      </main>

    </body>
  </html>
</>

shiki.dispose()
