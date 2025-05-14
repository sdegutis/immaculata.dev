declare namespace JSX {

  type jsxify<T extends HTMLElement> = {
    [A in keyof T as A extends string ? Lowercase<Exclude<A, 'children'>> : never]?: (
      | string
      | boolean
      | (T[A] extends (string | boolean | null | number)
        ? T[A]
        : never))
  } & { children?: any, class?: string }

  type IntrinsicElements =
    & { [K in keyof HTMLElementTagNameMap]: jsxify<HTMLElementTagNameMap[K]> }
    // add special cases here as necessary like this:
    & { meta: jsxify<HTMLMetaElement> & { charset?: 'utf-8' } }

  type jsxChildren =
    | string
    | false
    | null
    | undefined
    | jsxChildren[]

  type ElementChildrenAttribute = { children: jsxChildren }

  type Element = string

  type ElementType =
    | string
    | ((data: any) => jsxChildren)

}

// otherwise it has errors
declare module '@shikijs/core/types' { }
