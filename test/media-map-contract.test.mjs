// biome-ignore-all lint/performance/useTopLevelRegex: contract assertions stay readable inline
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { importTypescript } from './import-typescript.mjs'

const source = path => readFile(new URL(path, import.meta.url), 'utf8')

test('configured media data preserves blank results for the empty-state contract', async () => {
  const [audioComponent, videoComponent, audioConfigure, videoConfigure, imageConfigure] = await Promise.all([
    source('../packages/dashboard/media/audio/src/component.tsx'),
    source('../packages/dashboard/media/video/src/component.tsx'),
    source('../packages/dashboard/media/audio/src/configure.ts'),
    source('../packages/dashboard/media/video/src/configure.ts'),
    source('../packages/dashboard/media/image/src/configure.ts'),
  ])

  for (const component of [audioComponent, videoComponent]) {
    assert.match(component, /if \(\$data\)/)
    assert.match(component, /typeof boundSrc === 'string' \? boundSrc : ''/)
    assert.doesNotMatch(component, /dataSource\[0\]\.src\.trim\(\)\.length > 0/)
  }
  assert.match(audioConfigure, /mediaKind:\s*'audio'/)
  assert.match(videoConfigure, /mediaKind:\s*'video'/)
  assert.match(imageConfigure, /mediaKind:\s*'image'/)
  assert.match(audioConfigure, /fieldId:\s*'audio\.source'/)
  assert.match(videoConfigure, /fieldId:\s*'video\.source'/)
  assert.match(imageConfigure, /fieldId:\s*'image\.source'/)
})

test('media configuration has no ghost or ambiguous fields', async () => {
  const [imageConfigure, filterConfigure, filterComponent, audioConfigure, audioComponent] = await Promise.all([
    source('../packages/dashboard/media/image/src/configure.ts'),
    source('../packages/dashboard/media/filter/src/configure.ts'),
    source('../packages/dashboard/media/filter/src/component.tsx'),
    source('../packages/dashboard/media/audio/src/configure.ts'),
    source('../packages/dashboard/media/audio/src/component.tsx'),
  ])

  assert.doesNotMatch(imageConfigure, /name:\s*'(?:lazyLoad|lazyLoadThreshold|placeholder)'/)
  assert.doesNotMatch(filterConfigure, /name:\s*'preset'/)
  assert.match(filterConfigure, /name:\s*'filterOpacity'/)
  assert.match(filterComponent, /filterOpacity = 100/)
  assert.match(audioConfigure, /name:\s*'mediaTitle'/)
  assert.match(audioComponent, /mediaTitle,/)
  assert.match(audioComponent, /mediaTitle \?\? legacyTitle \?\? '音频文件'/)
})

test('media components consistently consume shared transform and surface props', async () => {
  for (const material of ['image', 'video', 'audio', 'filter']) {
    const component = await source(`../packages/dashboard/media/${material}/src/component.tsx`)
    assert.match(component, /rotation = 0/)
    assert.match(component, /opacity = 100/)
    assert.match(component, /background = 'transparent'/)
  }
})

test('map secondary channels are statically configurable and zero-safe', async () => {
  const [geoConfigure, geoComponent, flyConfigure, flyComponent] = await Promise.all([
    source('../packages/dashboard/map/geo-map/src/configure.ts'),
    source('../packages/dashboard/map/geo-map/src/component.tsx'),
    source('../packages/dashboard/map/fly-line/src/configure.ts'),
    source('../packages/dashboard/map/fly-line/src/component.tsx'),
  ])

  assert.match(geoConfigure, /name:\s*'scatterData'[\s\S]*?setter:\s*'JsonSetter'/)
  assert.match(flyConfigure, /name:\s*'scatterPoints'[\s\S]*?setter:\s*'JsonSetter'/)
  assert.match(geoComponent, /maxValue > 0 \? maxValue : 1/)
  assert.match(flyComponent, /animationSpeed > 0 \? 6 \/ animationSpeed : 6/)
})

test('data-aware media and maps consume the shared empty-state contract', async () => {
  for (const path of [
    '../packages/dashboard/media/audio/src/component.tsx',
    '../packages/dashboard/media/video/src/component.tsx',
    '../packages/dashboard/map/geo-map/src/component.tsx',
    '../packages/dashboard/map/fly-line/src/component.tsx',
  ]) {
    const component = await source(path)
    assert.match(component, /MaterialEmptyState/)
    assert.match(component, /shouldHideEmptyMaterial/)
  }
})

test('image has no runtime demo fallback and exposes empty-content controls', async () => {
  const [component, configure] = await Promise.all([
    source('../packages/dashboard/media/image/src/component.tsx'),
    source('../packages/dashboard/media/image/src/configure.ts'),
  ])

  assert.doesNotMatch(component, /src = DEFAULT_IMAGE/)
  assert.match(component, /MaterialEmptyState/)
  assert.match(configure, /showEmptyState:\s*true/)
})

test('maps preserve explicit empty data and do not inject default scatter points at runtime', async () => {
  const [geoComponent, flyComponent] = await Promise.all([
    source('../packages/dashboard/map/geo-map/src/component.tsx'),
    source('../packages/dashboard/map/fly-line/src/component.tsx'),
  ])

  assert.match(geoComponent, /if \(\$data\)/)
  assert.match(flyComponent, /if \(\$data\)/)
  assert.doesNotMatch(geoComponent, /staticScatterData \?\? DEFAULT_SCATTER_DATA/)
  assert.doesNotMatch(flyComponent, /scatterPoints = DEFAULT_SCATTER_POINTS/)
  assert.match(geoComponent, /DEFAULT_COLORS\.map/)
})

test('map configure publishes precise serializable coordinate schemas', async () => {
  const [sharedConfigure, geoConfigure, flyConfigure] = await Promise.all([
    source('../packages/shared/src/configure/index.ts'),
    source('../packages/dashboard/map/geo-map/src/configure.ts'),
    source('../packages/dashboard/map/fly-line/src/configure.ts'),
  ])

  assert.match(sharedConfigure, /valueSchema\?: Record<string, unknown>/)
  assert.match(sharedConfigure, /field\.valueSchema \?\? \{/)
  assert.match(geoConfigure, /fieldId:\s*'props\.scatterData'[\s\S]*?items:\s*\{\s*type:\s*'number'/)
  assert.match(flyConfigure, /fieldId:\s*'props\.scatterPoints'[\s\S]*?items:\s*\{\s*type:\s*'number'/)
  assert.match(flyConfigure, /name:\s*'fromCoord'[\s\S]*?valueSchema:/)
  assert.doesNotMatch(geoConfigure, /prefixItems/)
  assert.doesNotMatch(flyConfigure, /prefixItems/)
})

test('upload dimensions are optional and video Agent writes only its source', async () => {
  const [uploadType, videoConfigure] = await Promise.all([
    source('../packages/shared/src/types/upload.ts'),
    source('../packages/dashboard/media/video/src/configure.ts'),
  ])

  assert.match(uploadType, /width\?: number/)
  assert.match(uploadType, /height\?: number/)
  const videoAgent = videoConfigure.slice(videoConfigure.indexOf("fieldId: 'video.source'"))
  assert.doesNotMatch(videoAgent, /valuePath:\s*\['raw',\s*'(?:width|height)'\]/)
})

test('playback inputs normalize to finite browser-safe values', async () => {
  const { normalizeMediaPlaybackRate, normalizeMediaVolume } = await importTypescript(
    new URL('../packages/shared/src/media/playback.ts', import.meta.url),
  )

  assert.equal(normalizeMediaPlaybackRate(Number.NaN), 1)
  assert.equal(normalizeMediaPlaybackRate(0), 0.25)
  assert.equal(normalizeMediaPlaybackRate(99), 4)
  assert.equal(normalizeMediaVolume(Number.POSITIVE_INFINITY), 100)
  assert.equal(normalizeMediaVolume(-1), 0)
  assert.equal(normalizeMediaVolume(120), 100)
})

test('media upload controls stay human-only and source paths have one canonical string capability', async () => {
  for (const material of ['image', 'video', 'audio']) {
    const configure = await source(`../packages/dashboard/media/${material}/src/configure.ts`)
    const upload = configure.slice(configure.indexOf("name: '__upload'"), configure.indexOf("name: 'src'"))
    const sourceField = configure.slice(configure.indexOf("name: 'src'"))

    assert.match(upload, /expose:\s*false/)
    assert.doesNotMatch(upload, /readPath:\s*\['props',\s*'src'\]/)
    assert.match(sourceField, /valueSchema:\s*\{\s*type:\s*'string'/)
    assert.equal(configure.match(/readPath:\s*\['props',\s*'src'\]/g)?.length, 1)
  }
})

test('map tooltip values are escaped before interpolation', async () => {
  const { escapeHtml } = await importTypescript(new URL('../packages/shared/src/media/html.ts', import.meta.url))
  const malicious = `<img src=x onerror="alert('x')"> & data`

  assert.equal(escapeHtml(malicious), '&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt; &amp; data')
  for (const material of ['geo-map', 'fly-line']) {
    const component = await source(`../packages/dashboard/map/${material}/src/component.tsx`)
    assert.match(component, /escapeHtml\(params\.name\)/)
  }
})

test('filter uses the common background field and map glow stays in closed compatibility settings', async () => {
  const [filterConfigure, filterSnippets, geoConfigure, flyConfigure] = await Promise.all([
    source('../packages/dashboard/media/filter/src/configure.ts'),
    source('../packages/dashboard/media/filter/src/snippets.ts'),
    source('../packages/dashboard/map/geo-map/src/configure.ts'),
    source('../packages/dashboard/map/fly-line/src/configure.ts'),
  ])

  assert.doesNotMatch(filterConfigure, /name:\s*'backgroundColor'/)
  assert.doesNotMatch(filterSnippets, /backgroundColor:/)
  assert.match(filterSnippets, /background:\s*MATERIAL_THEME\.surfaceRaised/)
  assert.match(geoConfigure, /兼容装饰效果/)
  assert.match(geoConfigure, /defaultOpen:\s*false/)
  assert.doesNotMatch(flyConfigure, /name:\s*'glowEffect'/)
})
