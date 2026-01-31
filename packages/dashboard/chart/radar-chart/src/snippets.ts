/**
 * Radar Chart Snippets
 * 雷达图代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

/** 默认雷达图数据 */
const DEFAULT_RADAR_DATA = [
  { dimension: '销售', series1: 80, series2: 65 },
  { dimension: '管理', series1: 70, series2: 85 },
  { dimension: '技术', series1: 90, series2: 75 },
  { dimension: '客服', series1: 75, series2: 80 },
  { dimension: '研发', series1: 85, series2: 70 },
]

/** 默认系列配置 */
const DEFAULT_RADAR_SERIES = [
  { name: '系列1', dataKey: 'series1', color: '#00d4ff' },
  { name: '系列2', dataKey: 'series2', color: '#00ff88' },
]

const snippets: Snippet[] = [
  {
    title: '雷达图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '雷达图',
      props: {
        $data: generateStaticDataSource(DEFAULT_RADAR_DATA),
        dimensionKey: 'dimension',
        series: DEFAULT_RADAR_SERIES,
        showGrid: true,
        fillOpacity: 0.3,
        glowEffect: true,
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
    title: '单系列雷达图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '单系列雷达图',
      props: {
        $data: generateStaticDataSource([
          { dimension: 'Attack', value: 85 },
          { dimension: 'Defense', value: 70 },
          { dimension: 'Speed', value: 95 },
          { dimension: 'Magic', value: 60 },
          { dimension: 'HP', value: 75 },
        ]),
        dimensionKey: 'dimension',
        series: [{ name: 'Stats', dataKey: 'value', color: '#00d4ff' }],
        showGrid: true,
        fillOpacity: 0.4,
        glowEffect: true,
        showLegend: false,
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
]

export { snippets }
