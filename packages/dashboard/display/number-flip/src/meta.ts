/**
 * Number Flip Meta
 * 数字翻牌组件元数据
 */

import type { ComponentMetadata } from '@easy-editor/core'
import { MaterialGroup } from '@easy-editor/materials-shared'
import { COMPONENT_NAME, PACKAGE_NAME } from './constants'
import { configure } from './configure'
import { snippets } from './snippets'
import pkg from '../package.json'

export const meta: ComponentMetadata = {
  componentName: COMPONENT_NAME,
  title: '数字翻牌',
  group: MaterialGroup.DISPLAY,
  devMode: 'proCode',
  npm: {
    package: PACKAGE_NAME,
    version: pkg.version,
    globalName: COMPONENT_NAME,
    componentName: COMPONENT_NAME,
  },
  snippets,
  configure,
}
