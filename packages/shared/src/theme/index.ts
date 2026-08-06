/**
 * EasyMaterials visual defaults.
 *
 * Materials should inherit the surrounding dashboard instead of shipping a
 * complete visual skin. These values are deliberately restrained fallbacks;
 * consumers can override the matching CSS custom properties at canvas level.
 */
export const MATERIAL_THEME = {
  accent: '#5b8def',
  border: 'rgba(148, 163, 184, 0.18)',
  foreground: '#e5e7eb',
  grid: 'rgba(148, 163, 184, 0.16)',
  mutedForeground: '#94a3b8',
  surface: 'transparent',
  surfaceRaised: 'rgba(24, 24, 27, 0.82)',
  tooltipBackground: 'rgba(17, 24, 39, 0.96)',
  tooltipBorder: 'rgba(148, 163, 184, 0.24)',
  tooltipForeground: '#f8fafc',
  track: 'rgba(148, 163, 184, 0.16)',
} as const

export type MaterialTheme = {
  -readonly [Key in keyof typeof MATERIAL_THEME]: string
}

const MATERIAL_THEME_PROPERTIES: Record<keyof MaterialTheme, string> = {
  accent: '--ee-material-accent',
  border: '--ee-material-border',
  foreground: '--ee-material-foreground',
  grid: '--ee-material-grid',
  mutedForeground: '--ee-material-muted-foreground',
  surface: '--ee-material-surface',
  surfaceRaised: '--ee-material-surface-raised',
  tooltipBackground: '--ee-material-tooltip-background',
  tooltipBorder: '--ee-material-tooltip-border',
  tooltipForeground: '--ee-material-tooltip-foreground',
  track: '--ee-material-track',
}

const readCustomProperty = (styles: CSSStyleDeclaration, property: string, fallback: string) =>
  styles.getPropertyValue(property).trim() || fallback

/**
 * Resolves canvas-safe colors from the material host.
 *
 * CSS variables cannot be passed directly to ECharts because it renders into a
 * canvas. Resolve them at the component boundary and keep the restrained
 * fallback values for SSR, tests and hosts that do not define a theme.
 */
export const resolveMaterialTheme = (element?: Element | null): MaterialTheme => {
  if (!element || typeof getComputedStyle !== 'function') {
    return { ...MATERIAL_THEME }
  }

  const styles = getComputedStyle(element)
  return Object.fromEntries(
    Object.entries(MATERIAL_THEME_PROPERTIES).map(([key, property]) => [
      key,
      readCustomProperty(styles, property, MATERIAL_THEME[key as keyof MaterialTheme]),
    ]),
  ) as MaterialTheme
}

/** A balanced categorical palette with no neon or ambient-glow dependency. */
export const MATERIAL_CHART_COLORS = ['#5b8def', '#61a995', '#d49a5b', '#c66b6b', '#7e84b2', '#8a96a8'] as const

export const resolveMaterialChartColors = (element?: Element | null): string[] => {
  if (!element || typeof getComputedStyle !== 'function') {
    return [...MATERIAL_CHART_COLORS]
  }

  const styles = getComputedStyle(element)
  return MATERIAL_CHART_COLORS.map((fallback, index) =>
    readCustomProperty(styles, `--ee-material-chart-${index + 1}`, fallback),
  )
}

/** Semantic status colors used only when the data carries that meaning. */
export const MATERIAL_STATUS_COLORS = {
  danger: '#c66b6b',
  success: '#61a995',
  warning: '#d49a5b',
} as const
