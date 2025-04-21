export function template(content: string) {
  return <>
    {'<!DOCTYPE html>'}
    <html lang="en">

      <head>
        <meta name="color-scheme" content="light dark" />
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Martel:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet"></link>
        <title>Immaculata.dev</title>
      </head>

      <body>

        <nav>
          <h3>About</h3>
          <a href='/'>Immaculata.dev</a>
          <a href='https://github.com/thesoftwarephilosopher/immaculata.dev' target="_blank">GitHub</a>

          <h3>Guides</h3>
          <a href='/guides/enabling-jsx.html'>JSX for Node.js</a>
          <a href='/guides/enabling-hmr.html'>HMR for Node.js</a>
          <a href='/guides/enabling-ts.html'>TS/TSX for Node.js</a>
          <a href='/guides/simple-build-tool.html'>Simple build tool</a>
          <a href='/guides/simple-md-ssg.html'>Simple MD SSG</a>

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
