import assert from 'node:assert/strict'
import test from 'node:test'

import { importTypescript } from './import-typescript.mjs'

const { normalizeEmptyBehavior, shouldHideEmptyMaterial } = await importTypescript(
  new URL('../packages/shared/src/empty-state/model.ts', import.meta.url),
)

test('empty-state behavior is finite and defaults to an explicit message', () => {
  assert.equal(normalizeEmptyBehavior(undefined), 'message')
  assert.equal(normalizeEmptyBehavior('blank'), 'blank')
  assert.equal(normalizeEmptyBehavior('hide'), 'hide')
  assert.equal(normalizeEmptyBehavior('unsupported'), 'message')
})

test('hide behavior preserves a selectable design-time surface', () => {
  assert.equal(shouldHideEmptyMaterial(true, 'hide', 'live'), true)
  assert.equal(shouldHideEmptyMaterial(true, 'hide', 'design'), false)
  assert.equal(shouldHideEmptyMaterial(false, 'hide', 'live'), false)
})
