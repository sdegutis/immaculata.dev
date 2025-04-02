import * as immaculata from 'immaculata'

const tree = new immaculata.LiveTree('site', import.meta.url)

if (process.argv[2] === 'dev') {
  const server = new immaculata.DevServer(8080)
  server.files = await processSite()

  tree.watch({
    ignored: (str) => str.endsWith('/site/api.d.ts')
  }, async (paths) => {
    console.log('paths changed')
    server.files = await processSite()
    server.reload()
  })
}
else {
  immaculata.generateFiles(await processSite())
}

function processSite() {
  return tree.processFiles(files => {

  })
}
// import { readFileSync } from "fs"
// import { processFile, SiteProcessor } from "immaculata"

// const file = readFileSync('node_modules/@shikijs/twoslash/style-rich.css')

// export default (({ inFiles, outFiles }) => {

//   for (const file of inFiles) {
//     for (const { path, content } of processFile(file)) {
//       outFiles.set(path, content)
//     }
//   }

//   outFiles.set('/twoslash.css', file)

// }) as SiteProcessor







// import * as ShikiMarkdownIt from '@shikijs/markdown-it'
// import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
// import MarkdownIt from "markdown-it"
// import { createHighlighterCoreSync } from 'shiki/core'
// import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

// const page = pages[0]!

// const md = new MarkdownIt()

// const javascript = require('@shikijs/langs/javascript').default
// const bash = require('@shikijs/langs/bash').default
// const json = require('@shikijs/langs/json').default
// const jsonc = require('@shikijs/langs/jsonc').default
// const yaml = require('@shikijs/langs/yaml').default
// const typescript = require('@shikijs/langs/typescript').default

// const darkplus = require('@shikijs/themes/dark-plus').default

// const shiki = createHighlighterCoreSync({
//   themes: [darkplus],
//   langs: [typescript, javascript, bash, json, jsonc, yaml],
//   engine: createJavaScriptRegexEngine(),
// })

// ShikiMarkdownIt.setupMarkdownIt(md, shiki as any, {
//   theme: 'dark-plus',
//   transformers: [
//     transformerTwoslash({
//       renderer: rendererRich(),
//       twoslashOptions: {
//         compilerOptions: {
//           "types": [
//             "immaculata/runtime.d.ts"
//           ]
//         }
//       }
//     }),
//   ]
// })


// const dec = new TextDecoder()
// const tostring = (str: string | Uint8Array) => typeof str === 'string' ? str : dec.decode(str)

// export default <>
//   {`<!DOCTYPE html>`}
//   <html lang="en">
//     <head>
//     </head>
//     <body>


//     </body>
//   </html>
// </>

// shiki.dispose()
