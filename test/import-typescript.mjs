import { readFile } from 'node:fs/promises'

import typescript from 'typescript'

export const importTypescript = async url => {
  const source = await readFile(url, 'utf8')
  const { outputText } = typescript.transpileModule(source, {
    compilerOptions: {
      module: typescript.ModuleKind.ESNext,
      target: typescript.ScriptTarget.ES2022,
    },
    fileName: url.pathname,
  })

  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
