import { readFileSync } from 'fs'
import { FileTree } from 'immaculata'

export const isDev = process.argv[2] === 'dev'
export const tree = new FileTree('site', import.meta.url)

export const exo2 = new FileTree('node_modules/@fontsource-variable/exo-2', import.meta.url)
export const monda = new FileTree('node_modules/@fontsource-variable/monda', import.meta.url)

export const license = readFileSync('node_modules/immaculata/LICENSE', 'utf8')
