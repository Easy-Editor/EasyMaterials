/**
 * Geo Map Snippets
 * 地理地图组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME, DEFAULT_REGION_DATA } from './constants'

const snippets: Snippet[] = [
  {
    title: '地理地图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '地理地图',
      props: {
        $data: generateStaticDataSource(DEFAULT_REGION_DATA),
        mapType: 'china',
        showVisualMap: true,
        showTooltip: true,
        showScatter: true,
        glowEffect: true,
        roam: true,
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
    title: '地图（无散点）',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '地图（无散点）',
      props: {
        $data: generateStaticDataSource(DEFAULT_REGION_DATA),
        mapType: 'china',
        showVisualMap: true,
        showTooltip: true,
        showScatter: false,
        glowEffect: true,
        roam: true,
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
