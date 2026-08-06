/**
 * Progress Snippets
 * 进度条组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource, MATERIAL_THEME } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '进度环',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '进度环',
      props: {
        $data: generateStaticDataSource({ value: 75 }),
        maxValue: 100,
        type: 'ring',
        showValue: true,
        showLabel: false,
        valueFormat: 'percent',
        strokeWidthRatio: 0.07,
        trackColor: MATERIAL_THEME.track,
        progressColor: MATERIAL_THEME.accent,
        gradientEnable: false,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
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
      title: '线性进度条',
      props: {
        $data: generateStaticDataSource({ value: 85 }),
        maxValue: 100,
        type: 'bar',
        showValue: true,
        showLabel: true,
        label: '完成率',
        valueFormat: 'percent',
        trackColor: MATERIAL_THEME.track,
        progressColor: MATERIAL_THEME.accent,
        gradientEnable: false,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
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

export { snippets }
