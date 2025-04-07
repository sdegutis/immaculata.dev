export function mainPage(content: string) {

  return <>

    {'<!DOCTYPE html>'}
    <html lang="en">

      <head>
        <meta name="color-scheme" content="light dark" />
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet" href="/twoslash.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Immaculata.dev</title>
      </head>

      <body>

        <main>

          <header>
            <h1>Immaculata.dev</h1>
            <nav>
              <a href='https://github.com/thesoftwarephilosopher/immaculata.dev' target="_blank">
                <img src="./github-mark-white.svg" />
              </a>
            </nav>
          </header>

          <section>
            {content}
          </section>

        </main>

      </body>

    </html>
  </>

}
