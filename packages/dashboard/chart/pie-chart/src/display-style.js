const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value))

export const resolvePieOverlays = (displayStyle, requested) =>
  displayStyle === 'tilted-donut' ? { showLabel: false, showLegend: false, showTooltip: false } : { ...requested }

export const resolvePieLegendInteraction = displayStyle =>
  displayStyle === 'concentric-rings' ? { selectedMode: false } : {}

export const resolveConcentricRingLayout = ({ count, outerRadius, innerRadius, ringWidth, ringGap }) => {
  const safeCount = Math.max(0, Math.floor(count))
  if (safeCount === 0) {
    return []
  }

  const safeOuterRadius = clamp(outerRadius, 0, 100)
  const safeInnerRadius = clamp(innerRadius, 0, safeOuterRadius)
  const requestedWidth = clamp(ringWidth, 1, 18)
  const requestedGap = clamp(ringGap, 0, 12)
  const availableRadius = safeOuterRadius - safeInnerRadius
  const requestedSpan = safeCount * requestedWidth + Math.max(0, safeCount - 1) * requestedGap
  const scale = requestedSpan > 0 ? Math.min(1, availableRadius / requestedSpan) : 0
  const resolvedWidth = requestedWidth * scale
  const resolvedGap = requestedGap * scale

  return Array.from({ length: safeCount }, (_, index) => {
    const outer = safeOuterRadius - index * (resolvedWidth + resolvedGap)
    return {
      inner: Math.max(safeInnerRadius, outer - resolvedWidth),
      outer,
    }
  })
}
