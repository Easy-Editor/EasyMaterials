import type { ComponentMetadata } from '@easy-editor/core'
import { MaterialGroup } from '@easy-editor/materials-shared'
import { COMPONENT_NAME, PACKAGE_NAME } from './constants'
import configure from './configure'
import snippets from './snippets'

const meta: ComponentMetadata = {
  componentName: COMPONENT_NAME,
  title: 'Text',
  group: MaterialGroup.BASIC,
  devMode: 'proCode',
  npm: {
    package: PACKAGE_NAME,
    version: 'latest',
    globalName: COMPONENT_NAME,
    componentName: COMPONENT_NAME,
  },
  snippets,
  configure,
}

export default meta
