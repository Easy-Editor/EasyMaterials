const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const HTML_CHARACTER_PATTERN = /[&<>"']/g

/** Escape material-controlled values before returning an HTML tooltip string. */
export const escapeTooltipHtml = (value: unknown): string =>
  String(value).replace(HTML_CHARACTER_PATTERN, character => HTML_ENTITY_MAP[character] ?? character)
