export type PieDisplayStyle = 'standard' | 'concentric-rings' | 'tilted-donut'

export interface PieOverlayVisibility {
  showLabel: boolean
  showLegend: boolean
  showTooltip: boolean
}

export interface ConcentricRingLayoutInput {
  count: number
  outerRadius: number
  innerRadius: number
  ringWidth: number
  ringGap: number
}

export interface ConcentricRingRadius {
  inner: number
  outer: number
}

export function resolvePieOverlays(displayStyle: PieDisplayStyle, requested: PieOverlayVisibility): PieOverlayVisibility

export function resolvePieLegendInteraction(
  displayStyle: PieDisplayStyle,
): { selectedMode: false } | Record<string, never>

export function resolveConcentricRingLayout(input: ConcentricRingLayoutInput): ConcentricRingRadius[]
