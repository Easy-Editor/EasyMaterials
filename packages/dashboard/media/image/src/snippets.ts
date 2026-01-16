/**
 * Image Snippets
 * 图片组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '普通图片',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        alt: '图片',
        objectFit: 'contain',
        borderRadius: 0,
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 180,
        },
      },
    },
  },
  {
    title: '圆角图片',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        alt: '圆角图片',
        objectFit: 'contain',
        borderRadius: 100,
        borderStyle: 'tech',
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 200,
        },
      },
    },
  },
]

export default snippets
