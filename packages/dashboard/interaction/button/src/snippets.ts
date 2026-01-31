/**
 * Button Snippets
 * 按钮组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '主要按钮',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '主要按钮',
      props: {
        $data: generateStaticDataSource({ text: '主要按钮' }),
        variant: 'primary',
        size: 'medium',
        rotation: 0,
        opacity: 100,
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
      title: '发光按钮',
      props: {
        $data: generateStaticDataSource({ text: '发光按钮' }),
        variant: 'outline',
        size: 'large',
        glowEnable: true,
        rotation: 0,
        opacity: 100,
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
