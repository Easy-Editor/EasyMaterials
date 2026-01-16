/**
 * CSS Modules Type Declarations
 */

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.png' {
  const classes: string
  export default classes
}
