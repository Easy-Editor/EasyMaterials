/**
 * Fly Line Snippets
 * 飞线组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource, MATERIAL_CHART_COLORS, MATERIAL_STATUS_COLORS } from '@easy-editor/materials-shared'
import { COMPONENT_NAME, DEFAULT_COLORS, DEFAULT_FLY_LINES, DEFAULT_SCATTER_POINTS } from './constants'

const snippets: Snippet[] = [
  {
    title: '飞线图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '飞线图',
      props: {
        $data: generateStaticDataSource(DEFAULT_FLY_LINES),
        scatterPoints: DEFAULT_SCATTER_POINTS,
        mapType: 'china',
        showAnimation: true,
        animationSpeed: 2,
        curveness: 0.3,
        showScatter: true,
        lineColor: DEFAULT_COLORS.lineColor,
        lineGlowColor: DEFAULT_COLORS.lineGlowColor,
        scatterColor: DEFAULT_COLORS.scatterColor,
        areaColor: DEFAULT_COLORS.areaColor,
        borderColor: DEFAULT_COLORS.borderColor,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 600,
          height: 400,
        },
      },
    },
  },
  {
    title: '迁徙图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '迁徙图',
      props: {
        $data: generateStaticDataSource(DEFAULT_FLY_LINES),
        scatterPoints: DEFAULT_SCATTER_POINTS,
        mapType: 'china',
        showAnimation: true,
        animationSpeed: 3,
        curveness: 0.5,
        showScatter: true,
        lineColor: MATERIAL_CHART_COLORS[3],
        lineGlowColor: MATERIAL_CHART_COLORS[3],
        scatterColor: MATERIAL_STATUS_COLORS.success,
        areaColor: DEFAULT_COLORS.areaColor,
        borderColor: DEFAULT_COLORS.borderColor,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 600,
          height: 400,
        },
      },
    },
  },
]

export { snippets }
