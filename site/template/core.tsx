export function Html(data: { children: any }) {
  return <>
    {'<!DOCTYPE html>'}
    <link rel='stylesheet' href={import.meta.resolve('./html.css')} />
    <html lang="en">
      {data.children}
    </html>
  </>
}

export function Head(data: { title: string, files: string[] }) {
  return <head>
    <script src="/script/theme.js"></script>
    <link rel="stylesheet" href="/style.css" />
    <meta charset="utf-8" />
    {...data.files}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Immaculata.dev - {data.title}</title>
    <script type="module" src="/script/nav.js"></script>
    <script type="module" src="/script/toc.js"></script>
  </head>
}

export function Main(data: { children: JSX.jsxChildren }) {
  return <main id='main'>
    <header id='mobileheader'>
      <span>☰</span>
      <a class='sitelogo' href='/'>Immaculata.dev</a>
      <span>☰</span>
    </header>

    {data.children}

    <footer>
      Copyright &copy; {new Date().getFullYear()}
      {' / '}
      {/* <a href='mailto:admin@example.com'>Contact</a>
      {' / '} */}
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
    { section: 'links', title: 'GitHub project', path: 'https://github.com/thesoftwarephilosopher/immaculata' },
  ]

  const groups = Map.groupBy(pages, p => p.section)

  const sections = Object.entries({
    links: 'Links',
    api: 'API Reference',
    guides: 'Guides',
    blog: 'Blog',
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

    {data.toc &&
      <>
        <h3>On this page</h3>
        <nav id='toc' class='table-of-contents'>
          {data.toc}
        </nav>
      </>
    }


  </div>
}
