/**
 * Text Meta
 * 文本组件元数据
 */

import type { ComponentMetadata } from '@easy-editor/core'
import { configure } from './configure'
import { snippets } from './snippets'
import { COMPONENT_NAME, PACKAGE_NAME } from './constants'
import { MaterialGroup } from '@easy-editor/materials-shared'
import pkg from '../package.json'

export const meta: ComponentMetadata = {
  componentName: COMPONENT_NAME,
  title: '文本',
  category: 'dashboard',
  group: MaterialGroup.BASIC,
  devMode: 'proCode',
  npm: {
    package: PACKAGE_NAME,
    version: pkg.version,
    globalName: COMPONENT_NAME,
    componentName: COMPONENT_NAME,
  },
  configure,
  snippets,
}
