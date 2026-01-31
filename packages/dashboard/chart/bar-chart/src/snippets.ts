/**
 * Bar Chart Snippets
 * 柱状图代码片段 - 使用共享数据源生成函数
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

export const snippets: Snippet[] = [
  {
    title: '柱状图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '柱状图',
      props: {
        $data: generateStaticDataSource(DEFAULT_CHART_DATA),
        xField: 'name',
        yFields: ['value1', 'value2'],
        layout: 'vertical',
        stacked: false,
        gradient: true,
        borderRadius: 4,
        showGrid: true,
        showLegend: true,
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
    title: '堆叠柱状图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '堆叠柱状图',
      props: {
        $data: generateStaticDataSource(DEFAULT_CHART_DATA),
        xField: 'name',
        yFields: ['value1', 'value2'],
        layout: 'vertical',
        stacked: true,
        gradient: true,
        borderRadius: 4,
        showGrid: true,
        showLegend: true,
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
    title: '水平柱状图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '水平柱状图',
      props: {
        $data: generateStaticDataSource(DEFAULT_CHART_DATA),
        xField: 'name',
        yFields: ['value1'],
        layout: 'horizontal',
        stacked: false,
        gradient: true,
        borderRadius: 4,
        showGrid: true,
        showLegend: false,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 400,
          height: 250,
        },
      },
    },
  },
]
