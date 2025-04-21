import MarkdownIt from "markdown-it"
import { shiki } from "./highlight.ts"

export const md = new MarkdownIt()
md.use(shiki)
