/**
 * Gauge Chart Snippets
 * 仪表盘代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { MATERIAL_STATUS_COLORS, MATERIAL_THEME, generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

const snippets: Snippet[] = [
  {
    title: '仪表盘',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '仪表盘',
      props: {
        $data: generateStaticDataSource({ value: 65 }),
        min: 0,
        max: 100,
        showScale: true,
        divisions: 10,
        showLabels: true,
        pointerType: 'needle',
        pointerColor: MATERIAL_THEME.accent,
        glowEffect: false,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 220,
          height: 140,
        },
      },
    },
  },
  {
    title: '区间仪表盘',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '区间仪表盘',
      props: {
        $data: generateStaticDataSource({ value: 78 }),
        min: 0,
        max: 100,
        unit: '%',
        showScale: true,
        divisions: 10,
        showLabels: true,
        pointerType: 'needle',
        pointerColor: MATERIAL_STATUS_COLORS.warning,
        ranges: [
          { from: 0, to: 60, color: MATERIAL_STATUS_COLORS.success },
          { from: 60, to: 80, color: MATERIAL_STATUS_COLORS.warning },
          { from: 80, to: 100, color: MATERIAL_STATUS_COLORS.danger },
        ],
        glowEffect: false,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 220,
          height: 140,
        },
      },
    },
  },
]

export { snippets }
