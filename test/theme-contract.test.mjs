import assert from 'node:assert/strict'
import test from 'node:test'

import { importTypescript } from './import-typescript.mjs'

const { MATERIAL_CHART_COLORS, MATERIAL_THEME, resolveMaterialChartColors, resolveMaterialTheme } =
  await importTypescript(new URL('../packages/shared/src/theme/index.ts', import.meta.url))

test('material theme uses restrained fallbacks outside a browser', () => {
  assert.deepEqual(resolveMaterialTheme(), MATERIAL_THEME)
  assert.deepEqual(resolveMaterialChartColors(), MATERIAL_CHART_COLORS)
})

test('canvas materials resolve host CSS variables to concrete colors', () => {
  const originalGetComputedStyle = globalThis.getComputedStyle
  const customProperties = new Map([
    ['--ee-material-accent', '#335577'],
    ['--ee-material-grid', 'rgba(51, 85, 119, 0.2)'],
    ['--ee-material-chart-1', '#774433'],
  ])
  globalThis.getComputedStyle = () => ({
    getPropertyValue: property => customProperties.get(property) ?? '',
  })

  try {
    assert.equal(resolveMaterialTheme({}).accent, '#335577')
    assert.equal(resolveMaterialTheme({}).grid, 'rgba(51, 85, 119, 0.2)')
    assert.equal(resolveMaterialTheme({}).foreground, MATERIAL_THEME.foreground)
    assert.equal(resolveMaterialChartColors({})[0], '#774433')
    assert.equal(resolveMaterialChartColors({})[1], MATERIAL_CHART_COLORS[1])
  } finally {
    globalThis.getComputedStyle = originalGetComputedStyle
  }
})
