import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const dashboardRoot = new URL('../packages/dashboard/', import.meta.url)
const sourceExtensions = new Set(['.css', '.ts', '.tsx'])
const enabledConfigureDefaultPattern =
  /name:\s*['"](?:glowEffect|glowEnable|gradient|progressBarGradient)['"][\s\S]{0,280}?defaultValue:\s*true/
const enabledPublicDefaultPattern = /\b(?:glowEffect|glowEnable|gradient|progressBarGradient)\s*(?:=|:)\s*true\b/
const legacyPalettePattern = /#(?:00d4ff|00f2fe|00ff88|9b59b6)\b/i
const decorativeEffectPattern =
  /(?:box-shadow|text-shadow):\s*0\s+0|filter:\s*drop-shadow\(0\s+0|animation:\s*shimmer\b|backdrop-filter:\s*blur\(/i

const collectSourceFiles = async directory => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(entry => {
      const target = new URL(entry.name, directory)
      if (entry.isDirectory()) {
        return collectSourceFiles(new URL(`${entry.name}/`, directory))
      }
      return sourceExtensions.has(path.extname(entry.name)) ? [target] : []
    }),
  )
  return nested.flat()
}

const findMatches = async pattern => {
  const failures = []
  for (const file of await collectSourceFiles(dashboardRoot)) {
    const source = await readFile(file, 'utf8')
    if (pattern.test(source)) {
      failures.push(path.relative(new URL('..', import.meta.url).pathname, file.pathname))
    }
  }
  return failures
}

test('promoted material defaults do not enable glow or gradients', async () => {
  const enabledPublicDefaults = await findMatches(enabledPublicDefaultPattern)
  const enabledConfigureDefaults = await findMatches(enabledConfigureDefaultPattern)

  assert.deepEqual(enabledPublicDefaults, [])
  assert.deepEqual(enabledConfigureDefaults, [])
})

test('legacy neon palette is absent from material source defaults', async () => {
  const legacyPalette = await findMatches(legacyPalettePattern)

  assert.deepEqual(legacyPalette, [])
})

test('ambient halo and shimmer CSS is not part of the material skin', async () => {
  const decorativeEffects = await findMatches(decorativeEffectPattern)

  assert.deepEqual(decorativeEffects, [])
})
