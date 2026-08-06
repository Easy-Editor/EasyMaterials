import { copyFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'

const packageRoot = process.cwd()
const distDir = join(packageRoot, 'dist')
const componentTypesPath = join(distDir, 'component.d.ts')
const contractSourcePath = join(packageRoot, '../../../../scripts/templates/material-component-contract.d.ts')
const contractTargetPath = join(distDir, 'material-component-contract.d.ts')
const trailingSlashPattern = /\/$/
const cssImportPattern = /^import\s+['"][^'"]+\.css['"];?\s*\n?/gm
const moduleSpecifierPattern = /(from\s+|import\s*\(\s*)(['"])([^'"]+)\2/g

if (!existsSync(componentTypesPath)) {
  throw new Error(`Missing component declarations: ${componentTypesPath}`)
}

if (!existsSync(contractSourcePath)) {
  throw new Error(`Missing material contract template: ${contractSourcePath}`)
}

const componentTypes = readFileSync(componentTypesPath, 'utf8')
const rewrittenTypes = componentTypes.replace(
  /from ['"]@easy-editor\/materials-shared['"]/g,
  "from './material-component-contract'",
)

if (rewrittenTypes === componentTypes) {
  throw new Error(`Expected a materials-shared type import in ${componentTypesPath}`)
}

writeFileSync(componentTypesPath, rewrittenTypes)
copyFileSync(contractSourcePath, contractTargetPath)

const collectDeclarationFiles = directory =>
  readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(directory, entry.name)
    if (entry.isDirectory()) {
      return collectDeclarationFiles(entryPath)
    }
    return entry.isFile() && entry.name.endsWith('.d.ts') ? [entryPath] : []
  })

const normalizeSpecifier = (specifier, declarationPath) => {
  if (specifier !== '.' && !specifier.startsWith('./') && !specifier.startsWith('../')) {
    return specifier
  }
  if (extname(specifier)) {
    return specifier
  }

  const target = resolve(dirname(declarationPath), specifier)
  if (existsSync(`${target}.d.ts`)) {
    return `${specifier}.js`
  }
  if (existsSync(join(target, 'index.d.ts'))) {
    const prefix = specifier === '.' ? './' : `${specifier.replace(trailingSlashPattern, '')}/`
    return `${prefix}index.js`
  }
  throw new Error(`Cannot resolve declaration import ${specifier} from ${declarationPath}`)
}

const declarationFiles = collectDeclarationFiles(distDir)
for (const declarationPath of declarationFiles) {
  const source = readFileSync(declarationPath, 'utf8')
  const normalized = source
    .replace(cssImportPattern, '')
    .replace(
      moduleSpecifierPattern,
      (_match, prefix, quote, specifier) =>
        `${prefix}${quote}${normalizeSpecifier(specifier, declarationPath)}${quote}`,
    )
  writeFileSync(declarationPath, normalized)
}

const remainingInternalImports = declarationFiles.filter(file =>
  readFileSync(file, 'utf8').includes('@easy-editor/materials-shared'),
)

if (remainingInternalImports.length > 0) {
  throw new Error(`Internal type imports remain: ${remainingInternalImports.join(', ')}`)
}
