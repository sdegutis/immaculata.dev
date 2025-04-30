declare namespace JSX {

  type jsxify<T extends HTMLElement> = {
    [A in keyof T as A extends string ? Lowercase<Exclude<A, 'children'>> : never]?:
    T[A] extends (string | boolean | null | number) ? T[A] | string | boolean : string | boolean
  } & { children?: any, class?: string }

  type IntrinsicElements =
    & { [K in keyof HTMLElementTagNameMap]: jsxify<HTMLElementTagNameMap[K]> }
    & { meta: jsxify<HTMLMetaElement> & { charset?: 'utf-8' } }

  type ElementChildrenAttribute = { children: any }

  type Element = string

  type ElementType =
    | string
    | ((data: any) => JSX.Element)

}

// otherwise it has errors
declare module '@shikijs/core/types' { }
