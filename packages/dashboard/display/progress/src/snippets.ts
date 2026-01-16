/**
 * Progress Snippets
 * 进度条组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '进度环',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        value: 75,
        maxValue: 100,
        type: 'ring',
        showValue: true,
        showLabel: false,
        valueFormat: 'percent',
        strokeWidthRatio: 0.07,
        progressColor: '#00ffff',
      },
      $dashboard: {
        rect: {
          width: 140,
          height: 140,
        },
      },
    },
  },
  {
    title: '线性进度条',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      props: {
        value: 85,
        maxValue: 100,
        type: 'bar',
        showValue: true,
        showLabel: true,
        label: '完成率',
        valueFormat: 'percent',
        progressColor: '#00ff88',
        gradientEnable: true,
        gradientColors: ['#00ff88', '#00d4ff'],
      },
      $dashboard: {
        rect: {
          width: 300,
          height: 50,
        },
      },
    },
  },
]

export default snippets
