import { readFileSync } from 'fs'
import { FileTree, type ShouldExcludeFile } from 'immaculata'

export const isDev = process.argv[2] === 'dev'
export const tree = new FileTree('site', import.meta.dirname)

const fontExclude: ShouldExcludeFile = (path) => !(path.endsWith('/') || path.match(/\.(css|woff2)$/))
export const exo2 = new FileTree('node_modules/@fontsource-variable/exo-2', import.meta.dirname, { exclude: fontExclude })
export const monda = new FileTree('node_modules/@fontsource-variable/monda', import.meta.dirname, { exclude: fontExclude })
export const firacode = new FileTree('node_modules/@fontsource-variable/fira-code', import.meta.dirname, { exclude: fontExclude })

export const license = readFileSync('node_modules/immaculata/LICENSE', 'utf8')
