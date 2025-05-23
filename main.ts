import { DevServer, generateFiles, hooks } from 'immaculata'
import { registerHooks } from 'module'
import ts from 'typescript'
import { fileURLToPath } from 'url'
import { isDev, tree } from './static.ts'

registerHooks(hooks.useTree(tree))
registerHooks(hooks.mapImport('react/jsx-runtime', 'immaculata/jsx-strings.js'))
registerHooks(hooks.compileJsx((src, url) => compileTsx(src, fileURLToPath(url)).outputText))

if (isDev) {
  const server = new DevServer(8585, { hmrPath: '/reload' })
  server.notFound = () => '/404.html'
  server.files = await processSite()

  tree.watch().on('moduleInvalidated', mod => console.log('moduleInvalidated', mod))

  tree.watch().on('filesUpdated', async changes => {
    console.log('Paths changed:', [...changes].map(ch => '\n  ' + ch.path).join(''))

    try { server.files = await processSite() }
    catch (e) { console.error(e) }
    server.reload(null)
  })
}
else {
  generateFiles(await processSite(), { parent: import.meta.dirname })
}

async function processSite() {
  const mod = await import("./site/build/process.tsx")
  return mod.processSite()
}

function compileTsx(str: string, filename: string) {
  return ts.transpileModule(str, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      sourceMap: true,
      inlineSourceMap: true,
      inlineSources: true,
    }
  })
}
