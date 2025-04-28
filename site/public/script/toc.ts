const tops = [...document.querySelectorAll<HTMLElement>('main>*, main>section>*')].slice(1, -1)
const navlinks = document.querySelectorAll<HTMLAnchorElement>('#toc a')
const headers = new Map<HTMLElement, HTMLElement>()
const visible = new Set<HTMLElement>()

const observer = new IntersectionObserver(records => {
  for (const r of records) {
    if (r.isIntersecting)
      visible.add(r.target as HTMLElement)
    else
      visible.delete(r.target as HTMLElement)
  }

  const seen = [...visible].sort(sortTops)
  const header =
    seen.find(el => el.tagName.match(/^H\d$/))
    ?? headers.get(seen[0])!

  for (const a of navlinks) {
    a.classList.toggle('current', a.hash.slice(1) === header.id)
  }
}, { threshold: .5 })

let last = tops[0]
for (const node of tops) {
  if (node.tagName.match(/^H\d$/)) {
    last = node
  }
  headers.set(node, last)
  observer.observe(node)
}

function sortTops(a: HTMLElement, b: HTMLElement) {
  const ai = tops.indexOf(a)
  const bi = tops.indexOf(b)
  if (ai < bi) return -1
  if (ai > bi) return +1
  return 0
}
