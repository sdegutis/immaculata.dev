import * as immaculata from 'immaculata'
import { registerHooks } from 'module'
import { compileJsx } from './site/transpile.ts'

const tree = new immaculata.LiveTree('site', import.meta.url)
registerHooks(tree.enableImportsModuleHook())
registerHooks(immaculata.jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))
registerHooks(immaculata.compileJsxTsxModuleHook(compileJsx))

if (process.argv[2] === 'dev') {
  const server = new immaculata.DevServer(8085, { hmrPath: '/reload' })
  server.files = await processSite()

  tree.watch({}, async (paths) => {
    try { server.files = await processSite() }
    catch (e) { console.error(e) }
    server.reload()
  })
}
else {
  immaculata.generateFiles(await processSite())
}

async function processSite() {
  const mod = await import("./site/build.ts")
  return await mod.processSite(tree)
}
