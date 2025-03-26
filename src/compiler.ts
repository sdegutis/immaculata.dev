import * as babel from '@babel/core'
import { readFileSync } from 'fs'
import { convertTsExts } from './file.js'

export class Compiler {

  packageJson = JSON.parse(readFileSync('package.json').toString('utf8'))
  jsxPathNode: string
  jsxPathBrowser: string

  constructor() {
    this.jsxPathBrowser = '/@imlib/jsx-browser.ts'
    this.jsxPathNode = '/@imlib/jsx-node.ts'
  }

  compile(code: string, realFilePath?: string, browserFilePath?: string) {
    const imports = new Set<string>()
    return {
      code: babel.transformSync(code, {
        filename: realFilePath ?? browserFilePath,
        plugins: [
          ...(realFilePath ? [require('@babel/plugin-transform-modules-commonjs')] : []),
          [require('@babel/plugin-transform-typescript'), { isTSX: true }],
          [require('@babel/plugin-syntax-import-attributes')],
          [require('@babel/plugin-transform-react-jsx'), { runtime: 'automatic', importSource: '/@imlib', throwIfNamespace: false }],
          this.#collectImports(!!browserFilePath, imports),
        ],
      })!.code!,
      imports,
    }
  }

  #collectImports(inBrowser: boolean, imports: Set<string>): babel.PluginItem {
    return {
      visitor: {
        ImportDeclaration: {
          enter: (path) => {
            const dep = path.node.source?.value
            if (!dep) return

            if (dep === '/@imlib/jsx-runtime') {
              path.node.source.value = (inBrowser
                ? convertTsExts(this.jsxPathBrowser)
                : convertTsExts(this.jsxPathNode))
            }
            else {
              imports.add(dep)
            }
          },
        }
      }
    }
  }

}
