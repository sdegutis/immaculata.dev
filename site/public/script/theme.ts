(() => {

  const set = (mode: string) => {
    document.documentElement.classList.remove('dark', 'light')
    if (mode) document.documentElement.classList.add(mode)
    localStorage.setItem('dark', mode)
  }

  const lastmode = localStorage.getItem('dark')
  set(lastmode ?? '')

  document.addEventListener('DOMContentLoaded', () => {
    const toggledarkmode = document.querySelector('#toggledarkmode') as HTMLDivElement
    const [dark, light, system] = toggledarkmode.querySelectorAll('a')

    const buttons = { dark, light, '': system }
    const modes = new Map(Object.entries(buttons).map(([k, v]) => [v, k]))

    const clicked = (mode: string) => {
      set(mode)
      for (const [m, button] of Object.entries(buttons)) {
        button.classList.toggle('current', mode === m)
      }
    }

    dark.onclick = light.onclick = system.onclick = (e) => {
      e.preventDefault()
      clicked(modes.get(e.target as HTMLAnchorElement)!)
    }

    clicked(lastmode ?? '')
  })

})()
