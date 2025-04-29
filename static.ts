import { readFileSync } from 'fs'
import * as immaculata from 'immaculata'

export const isDev = process.argv[2] === 'dev'
export const tree = new immaculata.LiveTree('site', import.meta.url)

export const martel = new immaculata.LiveTree('node_modules/@fontsource/martel', import.meta.url)
export const exo2 = new immaculata.LiveTree('node_modules/@fontsource-variable/exo-2', import.meta.url)
export const monda = new immaculata.LiveTree('node_modules/@fontsource-variable/monda', import.meta.url)

export const license = readFileSync('node_modules/immaculata/LICENSE', 'utf8')
