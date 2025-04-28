import { readFileSync } from 'fs'
import * as immaculata from 'immaculata'

export const isDev = process.argv[2] === 'dev'
export const tree = new immaculata.LiveTree('site', import.meta.url)

export const license = readFileSync('node_modules/immaculata/LICENSE', 'utf8')
