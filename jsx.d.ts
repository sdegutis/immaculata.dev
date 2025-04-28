declare namespace JSX {
  type IntrinsicElements = {
    [K in keyof HTMLElementTagNameMap]: {
      [A in keyof HTMLElementTagNameMap[K]as A extends string ? Lowercase<Exclude<A, 'children'>> : never]?:
      HTMLElementTagNameMap[K][A] extends (string | boolean | null | number) ? HTMLElementTagNameMap[K][A] | string : string
    } & {
      children?: any
      class?: string
    }
  }
  type ElementChildrenAttribute = { children: any }
  type Element = string
  type ElementType =
    | string
    | ((data: any) => JSX.Element)
}
