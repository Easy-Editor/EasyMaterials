import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { resolveConcentricRingLayout, resolvePieLegendInteraction, resolvePieOverlays } from '../src/display-style.js'

const readSource = file => readFile(new URL(`../src/${file}`, import.meta.url), 'utf8')

test('PieChart exposes all display styles in its runtime and configuration contract', async () => {
  const [component, configure] = await Promise.all([readSource('component.tsx'), readSource('configure.ts')])

  for (const style of ['standard', 'concentric-rings', 'tilted-donut']) {
    assert.ok(component.includes(`'${style}'`))
    assert.ok(configure.includes(`value: '${style}'`))
  }
})

test('only concentric rings disable legend selection', () => {
  assert.deepEqual(resolvePieLegendInteraction('standard'), {})
  assert.deepEqual(resolvePieLegendInteraction('tilted-donut'), {})
  assert.deepEqual(resolvePieLegendInteraction('concentric-rings'), { selectedMode: false })
})

test('tilted donut removes canvas overlays before the graphic layer is compressed', () => {
  const requested = { showLabel: true, showLegend: true, showTooltip: true }

  assert.deepEqual(resolvePieOverlays('standard', requested), requested)
  assert.deepEqual(resolvePieOverlays('concentric-rings', requested), requested)
  assert.deepEqual(resolvePieOverlays('tilted-donut', requested), {
    showLabel: false,
    showLegend: false,
    showTooltip: false,
  })
})

test('concentric rings dynamically fit every item without radial overlap', () => {
  const rings = resolveConcentricRingLayout({
    count: 24,
    outerRadius: 76,
    innerRadius: 12,
    ringWidth: 8,
    ringGap: 4,
  })

  assert.equal(rings.length, 24)
  assert.equal(rings[0].outer, 76)
  assert.ok(rings.at(-1).inner >= 12)

  for (let index = 1; index < rings.length; index += 1) {
    assert.ok(rings[index].outer <= rings[index - 1].inner)
    assert.ok(rings[index].inner <= rings[index].outer)
  }
})

test('snippets include focused examples for both dashboard display styles', async () => {
  const snippets = await readSource('snippets.ts')

  assert.ok(snippets.includes("title: '同心进度环'"))
  assert.ok(snippets.includes("displayStyle: 'concentric-rings'"))
  assert.ok(snippets.includes("title: '倾斜层叠环'"))
  assert.ok(snippets.includes("displayStyle: 'tilted-donut'"))
})
