import MarkdownIt from "markdown-it"
import pages from './pages/'

const page = pages[0]!

const md = new MarkdownIt()

const dec = new TextDecoder()
const tostring = (str: string | Uint8Array) => typeof str === 'string' ? str : dec.decode(str)

export default <>
  {`<!DOCTYPE html>`}
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Immaculata.dev</title>
      <link rel="stylesheet" href="style.css" />
    </head>
    <body>

      <main>
        <h1>Immaculata.dev</h1>
        <nav>
          <a class='selected' href='/'>Docs</a>
          <a href='https://github.com/sdegutis/immaculata.dev'>GitHub</a>
        </nav>
        {md.render(tostring(page.content))}
      </main>

    </body>
  </html>
</>
