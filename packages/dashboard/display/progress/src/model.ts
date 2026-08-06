export type ProgressValueFormat = 'percent' | 'number'

export interface NormalizedProgressValue {
  value: number
  percentage: number
  maxValue: number
}

const DEFAULT_MAX_VALUE = 100

export const normalizeProgressValue = (value: number, maxValue: number): NormalizedProgressValue => {
  const safeMaxValue = Number.isFinite(maxValue) && maxValue > 0 ? maxValue : DEFAULT_MAX_VALUE
  const finiteValue = Number.isFinite(value) ? value : 0
  const normalizedValue = Math.min(Math.max(finiteValue, 0), safeMaxValue)

  return {
    value: normalizedValue,
    percentage: (normalizedValue / safeMaxValue) * 100,
    maxValue: safeMaxValue,
  }
}

export const formatProgressValue = (value: number, percentage: number, valueFormat: ProgressValueFormat): string => {
  if (valueFormat === 'percent') {
    return `${Math.round(percentage)}%`
  }
  return String(value)
}
