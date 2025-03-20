import { readFileSync } from "fs"
import { processFile, SiteProcessor } from "immaculata"

const file = readFileSync('node_modules/@shikijs/twoslash/style-rich.css')

export default (({ inFiles, outFiles }) => {

  for (const file of inFiles) {
    for (const { path, content } of processFile(file)) {
      outFiles.set(path, content)
    }
  }

  outFiles.set('/twoslash.css', file)

}) as SiteProcessor

