for (const a of document.querySelectorAll<HTMLAnchorElement>('body nav a')) {
  a.classList.toggle('current', a.href === location.href)
}

for (const a of document.querySelectorAll<HTMLAnchorElement>('a')) {
  if (!a.href.startsWith(location.origin)) {
    a.target = '_blank'
  }
}
