const clamp = (value: number, minimum: number, maximum: number): number => Math.min(maximum, Math.max(minimum, value))

export const normalizeMediaPlaybackRate = (value: number, fallback = 1): number =>
  clamp(Number.isFinite(value) ? value : fallback, 0.25, 4)

export const normalizeMediaVolume = (value: number, fallback = 100): number =>
  clamp(Number.isFinite(value) ? value : fallback, 0, 100)
