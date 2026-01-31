/**
 * Scatter Chart Snippets
 * 散点图代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

/** 默认散点图数据 */
const DEFAULT_SCATTER_DATA = [
  { x: 10, y: 20, category: 'A' },
  { x: 25, y: 35, category: 'A' },
  { x: 40, y: 15, category: 'A' },
  { x: 55, y: 45, category: 'B' },
  { x: 70, y: 30, category: 'B' },
  { x: 85, y: 55, category: 'B' },
]

const snippets: Snippet[] = [
  {
    title: '散点图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '散点图',
      props: {
        $data: generateStaticDataSource(DEFAULT_SCATTER_DATA),
        xLabel: 'X',
        yLabel: 'Y',
        pointSize: 8,
        showGrid: true,
        showLegend: true,
        glowEffect: true,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 400,
          height: 300,
        },
      },
    },
  },
  {
    title: '简单散点图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '简单散点图',
      props: {
        $data: generateStaticDataSource([
          { x: 10, y: 20 },
          { x: 25, y: 35 },
          { x: 40, y: 15 },
          { x: 55, y: 45 },
          { x: 70, y: 30 },
        ]),
        xLabel: 'Value X',
        yLabel: 'Value Y',
        pointSize: 10,
        showGrid: true,
        showLegend: false,
        glowEffect: true,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 300,
          height: 200,
        },
      },
    },
  },
]

export { snippets }
