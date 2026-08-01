import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { importTypescript } from './import-typescript.mjs'

const chartRoot = new URL('../packages/dashboard/chart/', import.meta.url)

const readChartSource = (chart, file = 'component.tsx') => readFile(new URL(`${chart}/src/${file}`, chartRoot), 'utf8')

const dataCharts = ['bar-chart', 'line-chart', 'pie-chart', 'radar-chart', 'scatter-chart']
const legendCharts = ['bar-chart', 'line-chart', 'pie-chart', 'radar-chart', 'scatter-chart']
const patterns = {
  barHardCodedName: /dataSource\[0\]\?\.name/,
  barHardCodedValue: /dataSource\[0\]\?\.value1/,
  barSelectedField: /item\[xField\]\s*!==\s*undefined/,
  chartAdvancedGroup: /advancedConfigGroup:\s*chartAdvancedConfigGroup/,
  closedGroup: /defaultOpen:\s*false/,
  defaultDemoData: /return\s+DEFAULT_DATA|\?\?\s*DEFAULT_DATA/,
  emptyState: /MaterialEmptyState/,
  gaugeDomain: /normalizeGaugeDomain/,
  gaugeLegacyDivision: /\(range\.to - min\) \/ \(max - min\)/,
  gaugeLegacyMinorTickCalculation: /Math\.round\(safeDivisions \/ 5\)/,
  gaugeMinorTicks: /axisTick:\s*\{[\s\S]{0,220}?splitNumber:\s*MINOR_TICKS_PER_DIVISION/,
  gaugeRanges: /name:\s*'ranges'/,
  gaugeRangeLabelDefault: /label:\s*'(?:正常|关注|告警)'/,
  gaugeRangeLabelSchema: /label:\s*\{\s*type:\s*'string'/,
  gaugeRangeLabelType: /label\?:\s*string/,
  gaugeRangeNormalization: /normalizeGaugeRanges/,
  gaugeSeriesSplitNumber: /type:\s*'gauge'[\s\S]{0,220}?splitNumber:\s*safeDivisions/,
  glowField: /name:\s*'glowEffect'/,
  legendLayout: /getLegendLayout/,
  legendPosition: /legendPosition/,
  pieInnerRadius: /defaultValue:\s*'0%'/,
  pieOuterRadius: /defaultValue:\s*'70%'/,
  escapedPieTooltipName: /escapeTooltipHtml\(params\.name\)/,
  escapedScatterSeries: /escapeTooltipHtml\(params\.seriesName\)/,
  escapedScatterValue: /escapeTooltipHtml\(params\.value\[/,
  radarConfigureValue1: /name:\s*'value1'/,
  radarConfigureValue2: /name:\s*'value2'/,
  radarSeriesColor: /color:\s*\{\s*type:\s*'string'/,
  radarSeriesDataKey: /dataKey:\s*\{\s*type:\s*'string'/,
  radarSeriesFieldId: /fieldId:\s*'radar\.series'/,
  radarSeriesName: /name:\s*\{\s*type:\s*'string'/,
  radarSeriesReadPath: /readPath:\s*\['props',\s*'series'\]/,
  radarSeriesRequired: /required:\s*\['name',\s*'dataKey',\s*'color'\]/,
  radarSeriesWriteTarget: /writeTargets:\s*\[\{\s*path:\s*\['props',\s*'series'\]/,
  radarValue1: /dataKey:\s*'value1'/,
  radarValue2: /dataKey:\s*'value2'/,
}

const glowCharts = ['bar-chart', 'line-chart', 'pie-chart', 'radar-chart', 'scatter-chart', 'gauge-chart']

test('runtime chart components render an explicit empty state instead of demo data', async () => {
  for (const chart of dataCharts) {
    const source = await readChartSource(chart)

    assert.match(source, patterns.emptyState, `${chart} must render the shared empty state`)
    assert.doesNotMatch(source, patterns.defaultDemoData, `${chart} must not inject demo data at runtime`)
  }
})

test('all configurable chart legends consume legendPosition at runtime', async () => {
  for (const chart of legendCharts) {
    const source = await readChartSource(chart)

    assert.match(source, patterns.legendPosition, `${chart} must consume legendPosition`)
    assert.match(source, patterns.legendLayout, `${chart} must map legend position to ECharts layout`)
  }
})

test('bar chart preserves configured field names and zero values', async () => {
  const source = await readChartSource('bar-chart')

  assert.doesNotMatch(source, patterns.barHardCodedName, 'bar chart must not hard-code the category field')
  assert.doesNotMatch(source, patterns.barHardCodedValue, 'bar chart must not use truthiness for numeric values')
  assert.match(source, patterns.barSelectedField, 'bar chart must validate the selected category field')
})

test('pie radius configure values use the same percentage contract as snippets', async () => {
  const source = await readChartSource('pie-chart', 'configure.ts')

  assert.match(source, patterns.pieInnerRadius)
  assert.match(source, patterns.pieOuterRadius)
})

test('gauge exposes ranges and normalizes invalid domains before calculating stops', async () => {
  const [component, configure] = await Promise.all([
    readChartSource('gauge-chart'),
    readChartSource('gauge-chart', 'configure.ts'),
  ])

  assert.match(configure, patterns.gaugeRanges)
  assert.match(component, patterns.gaugeDomain)
  assert.match(component, patterns.gaugeRangeNormalization)
  assert.doesNotMatch(component, patterns.gaugeLegacyDivision)
})

test('gauge divisions control major segments and ranges expose only consumed fields', async () => {
  const [component, constants, configure, snippets] = await Promise.all([
    readChartSource('gauge-chart'),
    readChartSource('gauge-chart', 'constants.ts'),
    readChartSource('gauge-chart', 'configure.ts'),
    readChartSource('gauge-chart', 'snippets.ts'),
  ])

  assert.match(component, patterns.gaugeSeriesSplitNumber)
  assert.match(component, patterns.gaugeMinorTicks)
  assert.doesNotMatch(component, patterns.gaugeLegacyMinorTickCalculation)
  assert.doesNotMatch(constants, patterns.gaugeRangeLabelType)
  assert.doesNotMatch(configure, patterns.gaugeRangeLabelDefault)
  assert.doesNotMatch(configure, patterns.gaugeRangeLabelSchema)
  assert.doesNotMatch(snippets, patterns.gaugeRangeLabelDefault)
})

test('radar default fields match its declared data schema', async () => {
  const [constants, configure] = await Promise.all([
    readChartSource('radar-chart', 'constants.ts'),
    readChartSource('radar-chart', 'configure.ts'),
  ])

  assert.match(constants, patterns.radarValue1)
  assert.match(constants, patterns.radarValue2)
  assert.match(configure, patterns.radarConfigureValue1)
  assert.match(configure, patterns.radarConfigureValue2)
})

test('glow remains available only as a closed compatibility decoration option', async () => {
  for (const chart of glowCharts) {
    const source = await readChartSource(chart, 'configure.ts')
    const advancedStart = source.indexOf('const compatibilityDecorationConfigGroup')

    assert.notEqual(advancedStart, -1, `${chart} must declare a compatibility decoration group`)
    assert.doesNotMatch(
      source.slice(0, advancedStart),
      patterns.glowField,
      `${chart} must keep glow out of main config`,
    )
    assert.match(source.slice(advancedStart), patterns.glowField, `${chart} must retain glow for compatibility`)
    assert.match(source.slice(advancedStart), patterns.closedGroup, `${chart} compatibility group must start closed`)
    assert.match(source, patterns.chartAdvancedGroup)
  }
})

test('radar series has an explicit writable JSON schema for Agent use', async () => {
  const source = await readChartSource('radar-chart', 'configure.ts')

  assert.match(source, patterns.radarSeriesFieldId)
  assert.match(source, patterns.radarSeriesReadPath)
  assert.match(source, patterns.radarSeriesWriteTarget)
  assert.match(source, patterns.radarSeriesRequired)
  assert.match(source, patterns.radarSeriesName)
  assert.match(source, patterns.radarSeriesDataKey)
  assert.match(source, patterns.radarSeriesColor)
})

test('HTML tooltip values escape malicious material data', async () => {
  const attack = `<img src=x onerror="alert('x')">&`
  const expected = '&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;&amp;'
  const tooltipModules = await Promise.all(
    ['pie-chart', 'scatter-chart'].map(chart =>
      importTypescript(new URL(`../packages/dashboard/chart/${chart}/src/tooltip.ts`, import.meta.url)),
    ),
  )

  for (const { escapeTooltipHtml } of tooltipModules) {
    assert.equal(escapeTooltipHtml(attack), expected)
  }

  const [pie, scatter] = await Promise.all([readChartSource('pie-chart'), readChartSource('scatter-chart')])
  assert.match(pie, patterns.escapedPieTooltipName)
  assert.match(scatter, patterns.escapedScatterSeries)
  assert.match(scatter, patterns.escapedScatterValue)
})
