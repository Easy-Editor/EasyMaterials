import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { importTypescript } from './import-typescript.mjs'

const readSource = path => readFile(new URL(path, import.meta.url), 'utf8')
const normalizeProgressPattern = /normalizeProgressValue\(value \?\? 0, maxValue\)/
const formatProgressPattern = /formatProgressValue/
const positiveMaxPattern = /maxValue\s*>\s*0/
const percentFormatPattern = /valueFormat\s*===\s*'percent'/
const rawValuePattern = /return\s+String\(value\)/
const emptyStatePattern = /MaterialEmptyState/
const demoFallbackPattern = /const DEFAULT_(?:DATA|ITEMS)/
const carouselChangePattern = /value:\s*'onChange'/
const listItemClickPattern = /value:\s*'onItemClick'/
const fontFamilyPattern = /name:\s*'fontFamily'/
const letterSpacingPattern = /name:\s*'letterSpacing'/
const advancedConfigPattern = /createAdvancedConfigGroup/
const twoColorMinimumPattern = /minItems:\s*2/
const twoColorMaximumPattern = /maxItems:\s*2/
const safeHrefBindingPattern = /href=\{safeHref\}/
const rawHrefBindingPattern = /href=\{href\}/
const normalizeCarouselLinkPattern = /normalizeSafeHref\(item\.link\)/
const carouselLinkFallbackPattern = /link:\s*normalizeSafeHref\(item\.link\)\s*\?\?\s*undefined/

test('progress math uses a safe positive maximum and number format preserves the material value', async () => {
  const [component, model] = await Promise.all([
    readSource('../packages/dashboard/display/progress/src/component.tsx'),
    readSource('../packages/dashboard/display/progress/src/model.ts'),
  ])

  assert.match(component, normalizeProgressPattern)
  assert.match(component, formatProgressPattern)
  assert.match(model, positiveMaxPattern)
  assert.match(model, percentFormatPattern)
  assert.match(model, rawValuePattern)
})

test('display materials render real empty states instead of demo or synthetic zero data', async () => {
  const sources = await Promise.all(
    ['carousel', 'number-flip', 'progress', 'scroll-list'].map(name =>
      readSource(`../packages/dashboard/display/${name}/src/component.tsx`),
    ),
  )

  for (const source of sources) {
    assert.match(source, emptyStatePattern)
    assert.doesNotMatch(source, demoFallbackPattern)
  }
})

test('carousel and scroll list expose their business events to EventSetter', async () => {
  const [carousel, scrollList] = await Promise.all([
    readSource('../packages/dashboard/display/carousel/src/configure.ts'),
    readSource('../packages/dashboard/display/scroll-list/src/configure.ts'),
  ])

  assert.match(carousel, carouselChangePattern)
  assert.match(scrollList, listItemClickPattern)
})

test('text typography is configurable and glow remains an advanced option', async () => {
  const source = await readSource('../packages/dashboard/basic/text/src/configure.ts')

  assert.match(source, fontFamilyPattern)
  assert.match(source, letterSpacingPattern)
  assert.match(source, advancedConfigPattern)
})

test('fixed two-color controls declare their item limits', async () => {
  const sources = await Promise.all(
    ['progress', 'scroll-list'].map(name => readSource(`../packages/dashboard/display/${name}/src/configure.ts`)),
  )

  for (const source of sources) {
    assert.match(source, twoColorMinimumPattern)
    assert.match(source, twoColorMaximumPattern)
  }
})

test('shared material links allow web and relative URLs while rejecting executable protocols', async () => {
  const { normalizeSafeHref } = await importTypescript(new URL('../packages/shared/src/url/index.ts', import.meta.url))
  const component = await readSource('../packages/dashboard/basic/text/src/component.tsx')

  assert.equal(normalizeSafeHref('https://easy-editor.example/docs'), 'https://easy-editor.example/docs')
  assert.equal(normalizeSafeHref('http://localhost:3000/preview'), 'http://localhost:3000/preview')
  assert.equal(normalizeSafeHref('/dashboard/overview'), '/dashboard/overview')
  assert.equal(normalizeSafeHref('../details?id=1'), '../details?id=1')
  assert.equal(normalizeSafeHref('#section'), '#section')
  assert.equal(normalizeSafeHref('?tab=details'), '?tab=details')
  assert.equal(normalizeSafeHref(null), null)
  assert.equal(normalizeSafeHref(42), null)

  for (const value of [
    'javascript:alert(1)',
    ' JavaScript:alert(1) ',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'mailto:admin@example.com',
    'file:///etc/passwd',
    '//untrusted.example/path',
    '\\\\untrusted.example\\path',
    'java\nscript:alert(1)',
  ]) {
    assert.equal(normalizeSafeHref(value), null)
  }

  assert.match(component, safeHrefBindingPattern)
  assert.doesNotMatch(component, rawHrefBindingPattern)
})

test('carousel degrades rejected data links to non-link slides', async () => {
  const component = await readSource('../packages/dashboard/display/carousel/src/component.tsx')

  assert.match(component, normalizeCarouselLinkPattern)
  assert.match(component, carouselLinkFallbackPattern)
})
