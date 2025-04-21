for (const a of document.querySelectorAll<HTMLAnchorElement>('body nav a')) {
  a.classList.toggle('current', a.href === location.href)
}
