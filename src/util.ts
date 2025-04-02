import * as swc from '@swc/core'
import { randomUUID } from "crypto"
import type { JsxTransformer } from "./livetree.js"

export function makeSwcTransformJsx(jsxImportSource: (...args: Parameters<JsxTransformer>) => string): JsxTransformer {
  const uuid = randomUUID()
  return (treeRoot, filename, src, tsx) => {
    const result = swc.transformSync(src, {
      filename,
      isModule: true,
      sourceMaps: 'inline',
      jsc: {
        keepClassNames: true,
        target: 'esnext',
        parser: tsx
          ? { syntax: 'typescript', tsx: true, decorators: true }
          : { syntax: 'ecmascript', jsx: true, decorators: true },
        transform: {
          react: {
            runtime: 'automatic',
            importSource: uuid,
          },
        },
      },
    })
    const oldJsxImport = `${uuid}/jsx-runtime`
    const newJsxImport = jsxImportSource(treeRoot, filename, src, tsx)
    return result.code.replace(oldJsxImport, newJsxImport)
  }
}

export const transformJsxToRootJsx = makeSwcTransformJsx(treeRoot => treeRoot + '/jsx-node.ts')
export const transformJsxToStrings = makeSwcTransformJsx(() => 'immaculata/dist/jsx-strings.js')

export function compileWithSwc(src: string, modifyOpts?: (opts: swc.Options) => void) {
  const opts: swc.Options = {
    isModule: true,
    sourceMaps: 'inline',
    jsc: {
      keepClassNames: true,
      target: 'esnext',
      parser: { syntax: 'typescript', tsx: true, decorators: true },
      transform: {
        react: {
          runtime: 'automatic',
          importSource: '/jsx.js',
        },
      },
    },
  }
  modifyOpts?.(opts)

  let fixJsxImport
  if (opts.jsc?.transform?.react?.importSource) {
    const uuid = randomUUID()
    const fakeImport = `${uuid}/jsx-runtime`
    const realImport = opts.jsc.transform.react.importSource
    opts.jsc.transform.react.importSource = uuid
    fixJsxImport = (code: string) => code.replace(fakeImport, realImport)
  }

  const result = swc.transformSync(src, opts)
  if (fixJsxImport) result.code = fixJsxImport(result.code)
  return result.code
}
