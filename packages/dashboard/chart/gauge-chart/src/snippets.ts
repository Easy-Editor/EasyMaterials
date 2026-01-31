/**
 * Gauge Chart Snippets
 * 仪表盘代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
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
        pointerColor: '#ffffff',
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
    title: '发光仪表盘',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '发光仪表盘',
      props: {
        $data: generateStaticDataSource({ value: 78 }),
        min: 0,
        max: 100,
        unit: '%',
        showScale: true,
        divisions: 10,
        showLabels: true,
        pointerType: 'needle',
        pointerColor: '#00ffff',
        glowEffect: true,
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
