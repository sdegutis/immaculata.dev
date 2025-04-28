export function Html(data: { children: any }) {
  return <>
    {'<!DOCTYPE html>'}
    <html lang="en">
      {data.children}
    </html>
  </>
}

export function Head() {
  return <head>
    <script src="/script/theme.js"></script>
    <link rel="stylesheet" href="/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Immaculata.dev</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin='' />
    <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@200..800&family=Martel:wght@200;300;400;600;700;800;900&family=Oxanium:wght@200..800&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />
    <script type="module" src="/script/nav.js"></script>
    <script type="module" src="/script/toc.js"></script>
  </head>
}

export function Main(data: { content: string }) {
  return <main id='main'>
    <header id='mobileheader'>
      <span>☰</span>
      <a class='sitelogo' href='/'>Immaculata.dev</a>
      <span>☰</span>
    </header>

    {data.content}

    <footer>
      Copyright &copy; {new Date().getFullYear()}
      {' / '}
      <a href='mailto:admin@example.com'>Contact</a>
      {' / '}
      Made with <a href='https://immaculata.dev/'>immaculata.dev</a>
    </footer>
  </main>
}

export function Navbar(data: {
  pages: {
    path: string,
    title: string,
    section: string | undefined,
  }[]
}) {

  const pages = [
    ...data.pages,
    { section: 'links', title: 'Github project', path: 'https://github.com/thesoftwarephilosopher/immaculata' },
    { section: 'links', title: 'Fork site template', path: 'https://github.com/thesoftwarephilosopher/immaculata.dev' },
  ]

  const groups = Map.groupBy(pages, p => p.section)

  const sections = Object.entries({
    links: 'Links',
    api: 'Api',
    guides: 'Guides',
  })

  return <nav id='nav' class='navbar'>
    <p><a href='/' class='sitelogo'>Immaculata.dev</a></p>

    {sections.map(([key, title]) => {
      const pages = groups.get(key)
      if (!pages) return ''

      return <>
        <h3>{title}</h3>
        <ul>
          {pages.map(page => <li>
            <a href={page.path}>{page.title}</a>
          </li>)}
        </ul>
      </>
    })}

  </nav>
}

export function Sidebar(data: { toc: string }) {
  return <div id='side' class='navbar'>

    <h3>Site Theme</h3>
    <div id='toggledarkmode'>
      <a href='#'>Dark</a>
      <a href='#'>Light</a>
      <a href='#'>System</a>
    </div>

    <h3>On this page</h3>
    <nav id='toc' class='table-of-contents'>
      {data.toc}
    </nav>

  </div>
}
