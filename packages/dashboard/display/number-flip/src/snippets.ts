/**
 * Number Flip Snippets
 * 数字翻牌组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '数字翻牌',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        value: 1_234_567,
        decimals: 0,
        separator: true,
        fontSize: 48,
        fontFamily: 'digital',
        color: '#00d4ff',
        glowIntensity: 0.5,
      },
      $dashboard: {
        rect: {
          width: 280,
          height: 80,
        },
      },
    },
  },
  {
    title: '货币数字',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        value: 99_999.99,
        decimals: 2,
        separator: true,
        prefix: '$',
        fontSize: 42,
        fontFamily: 'digital',
        color: '#00ff88',
        glowIntensity: 0.6,
      },
      $dashboard: {
        rect: {
          width: 260,
          height: 70,
        },
      },
    },
  },
  {
    title: '百分比',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        value: 87.5,
        decimals: 1,
        separator: false,
        suffix: '%',
        fontSize: 56,
        fontFamily: 'digital',
        color: '#ff6b6b',
        glowIntensity: 0.8,
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 90,
        },
      },
    },
  },
]

export default snippets
