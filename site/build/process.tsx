import fm from 'front-matter'
import ts from 'typescript'
import { license, tree } from '../../static.ts'
import { Head, Html, Main, Navbar, Sidebar } from "../template/core.tsx"
import { md, type Env } from "./markdown.ts"
import { tocToHtml } from './toc.ts'

let reloader = ''
if (true && process.argv[2] === 'dev') reloader = `
<script type="module">
const es = new EventSource('/reload')
es.onmessage = () => location.reload()
window.onbeforeunload = () => es.close()
</script>`

export async function processSite() {
  return tree.processFiles(files => {

    files.without('^/public').remove()
    files.with('/public').do(f => f.path = f.path.replace(/^\/public/, ''))

    const pages = files.with('\.md$').all().map(p => {
      const path = p.path.replace('.md', '.html')
      const title = md.renderInline(p.text.match(/[^#]*# *(.+)/)![1])
      const section = p.path.match('/(.+?)/')?.[1]
      const frontmatter = fm<{ order?: number }>(p.text)
      p.text = frontmatter.body
      const meta = frontmatter.attributes
      return { path, title, section, meta }
    })

    pages.sort((a, b) => {
      const ao = a.meta.order ?? Infinity
      const bo = b.meta.order ?? Infinity
      if (ao < bo) return -1
      if (ao > bo) return +1
      return 0
    })

    files.with('\.md$').do(f => {
      f.path = f.path.replace('.md', '.html')
      const env: Env = { license }
      const result = md.render(f.text, env)
      f.text = <Html>
        <Head />
        <body>
          <Navbar pages={pages} />
          <Main content={result} />
          <Sidebar toc={tocToHtml(env.toc!)} />
        </body>
      </Html>
    })

    files.with(/\.tsx?$/).do(f => {
      const out = compileTsx(f.text, f.path)
      const jsPath = f.path.replace(/\.tsx?$/, '.js')
      files.add(f.path, f.text)
      files.add(jsPath + '.map', out.sourceMapText!)
      f.text = out.outputText
      f.path = jsPath
    })

    if (reloader) files.with(/\.html$/).do(f => { f.text = f.text.replace('<head>', '$&' + reloader) })

    files.add('/404.html', <Html>
      <Head />
      <body>
        <Navbar pages={pages} />
        <Main content={
          <>
            <h1>Page not found</h1>
            <p>This page doesn't exist.</p>
            <p>Redirecting to one that does in 3, 2, 1...</p>
            <script>{`setTimeout(() => {location.href = '/'}, 3000)`}</script>
          </>
        } />
        <Sidebar toc={''} />
      </body>
    </Html>)

  })
}

function compileTsx(str: string, filename: string) {
  return ts.transpileModule(str, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      sourceMap: true,
    }
  })
}
