/**
 * Button Snippets
 * 按钮组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '主要按钮',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        text: '主要按钮',
        variant: 'primary',
        size: 'medium',
      },
      $dashboard: {
        rect: {
          width: 120,
          height: 40,
        },
      },
    },
  },
  {
    title: '发光按钮',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        text: '发光按钮',
        variant: 'outline',
        size: 'large',
        glowEnable: true,
      },
      $dashboard: {
        rect: {
          width: 140,
          height: 48,
        },
      },
    },
  },
]

export default snippets
