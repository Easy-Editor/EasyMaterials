export type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, unknown>

/**
 * 合并 className，过滤 falsy 值
 * @example
 * cn('foo', 'bar') // 'foo bar'
 * cn('foo', false && 'bar', 'baz') // 'foo baz'
 * cn({ foo: true, bar: false }) // 'foo'
 * cn(['foo', 'bar']) // 'foo bar'
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) {
      continue
    }

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input))
    } else if (Array.isArray(input)) {
      const nested = cn(...input)
      if (nested) {
        classes.push(nested)
      }
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}
