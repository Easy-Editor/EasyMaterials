import type { ComponentMetadata } from '@easy-editor/core'
import { MaterialGroup } from '@easy-editor/materials-shared'
import configure from './configure'
import snippets from './snippets'

const meta: ComponentMetadata = {
  componentName: 'EasyEditorMaterialsText',
  title: 'Text',
  group: MaterialGroup.BASIC,
  snippets,
  configure,
}

export default meta
