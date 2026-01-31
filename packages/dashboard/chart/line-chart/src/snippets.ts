/**
 * Line Chart Snippets
 * 折线图代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

/** 默认图表数据 */
const DEFAULT_CHART_DATA = [
  { name: 'A', value1: 120, value2: 80 },
  { name: 'B', value1: 200, value2: 120 },
  { name: 'C', value1: 150, value2: 100 },
  { name: 'D', value1: 280, value2: 180 },
  { name: 'E', value1: 220, value2: 140 },
]

const snippets: Snippet[] = [
  {
    title: '折线图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '折线图',
      props: {
        $data: generateStaticDataSource(DEFAULT_CHART_DATA),
        xField: 'name',
        yFields: ['value1', 'value2'],
        showGrid: true,
        showLegend: true,
        glowEffect: true,
        strokeWidth: 2,
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
    title: '面积图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '面积图',
      props: {
        $data: generateStaticDataSource(DEFAULT_CHART_DATA),
        xField: 'name',
        yFields: ['value1', 'value2'],
        showGrid: true,
        showLegend: true,
        glowEffect: true,
        strokeWidth: 2,
        areaFill: true,
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
    title: '简单折线图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '简单折线图',
      props: {
        $data: generateStaticDataSource(DEFAULT_CHART_DATA),
        xField: 'name',
        yFields: ['value1'],
        showGrid: true,
        showLegend: false,
        glowEffect: true,
        strokeWidth: 3,
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
