for (const a of document.querySelectorAll('a')) {
  a.classList.toggle('current', a.href === location.href)
}
