/**
 * Number Flip Snippets
 * 数字翻牌组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '数字翻牌',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '数字翻牌',
      props: {
        $data: generateStaticDataSource({ value: 1_234_567 }),
        decimals: 0,
        separator: true,
        fontSize: 48,
        fontFamily: 'digital',
        color: '#00d4ff',
        glowIntensity: 0.5,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
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
      title: '货币数字',
      props: {
        $data: generateStaticDataSource({ value: 99_999.99 }),
        decimals: 2,
        separator: true,
        prefix: '$',
        fontSize: 42,
        fontFamily: 'digital',
        color: '#00ff88',
        glowIntensity: 0.6,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
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
      title: '百分比',
      props: {
        $data: generateStaticDataSource({ value: 87.5 }),
        decimals: 1,
        separator: false,
        suffix: '%',
        fontSize: 56,
        fontFamily: 'digital',
        color: '#ff6b6b',
        glowIntensity: 0.8,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
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

export { snippets }
