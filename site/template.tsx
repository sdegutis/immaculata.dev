export function template(content: string) {

  return <>

    {'<!DOCTYPE html>'}
    <html lang="en">

      <head>
        <meta name="color-scheme" content="light dark" />
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Immaculata.dev</title>
      </head>

      <body>

        <nav>
          <a href='/'>Immaculata.dev</a>
          <a href='https://github.com/thesoftwarephilosopher/immaculata.dev' target="_blank">
            <img src="/github-mark-white.svg" />
          </a>

          <h3>API</h3>
          <a href='/api/live-tree.html'>LiveTree</a>
          <a href='/api/dev-server.html'>DevServer</a>
          <a href='/api/generate-files.html'>generateFiles</a>
          <a href='/api/module-hooks.html'>Module hooks</a>
          <a href='/api/pipeline.html'>Pipeline</a>
        </nav>

        <main>
          {content}
        </main>

      </body>

    </html>
  </>

}
