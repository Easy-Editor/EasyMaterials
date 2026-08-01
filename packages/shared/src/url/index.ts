const URL_SCHEME_PATTERN = /^[a-z][a-z\d+.-]*:/i
const NETWORK_PATH_PATTERN = /^[\\/]{2}/

const containsControlCharacter = (value: string): boolean =>
  Array.from(value).some(character => {
    const codePoint = character.codePointAt(0)
    return codePoint !== undefined && (codePoint <= 31 || codePoint === 127)
  })

/**
 * Keeps link configuration serializable while enforcing a narrow browser-safe URL contract.
 * Absolute URLs must use HTTP(S); local navigation may use ordinary relative paths, queries, or hashes.
 */
export const normalizeSafeHref = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null
  }

  const href = value.trim()
  if (!href || containsControlCharacter(href) || NETWORK_PATH_PATTERN.test(href)) {
    return null
  }

  if (!URL_SCHEME_PATTERN.test(href)) {
    return href
  }

  try {
    const url = new URL(href)
    return url.protocol === 'http:' || url.protocol === 'https:' ? href : null
  } catch {
    return null
  }
}
