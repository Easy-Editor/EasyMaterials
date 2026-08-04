/**
 * Pie Chart Snippets
 * 饼图代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

/** 默认饼图数据 */
const DEFAULT_PIE_DATA = [
  { name: '类目A', value: 335 },
  { name: '类目B', value: 310 },
  { name: '类目C', value: 234 },
  { name: '类目D', value: 135 },
  { name: '类目E', value: 148 },
]

const snippets: Snippet[] = [
  {
    title: '饼图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '饼图',
      props: {
        $data: generateStaticDataSource(DEFAULT_PIE_DATA),
        displayStyle: 'standard',
        innerRadius: '0%',
        outerRadius: '70%',
        showLabel: true,
        labelType: 'percent',
        glowEffect: false,
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
    title: '环形图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '环形图',
      props: {
        $data: generateStaticDataSource(DEFAULT_PIE_DATA),
        displayStyle: 'standard',
        innerRadius: '50%',
        outerRadius: '70%',
        showLabel: true,
        labelType: 'percent',
        glowEffect: false,
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
    title: '玫瑰图',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '玫瑰图',
      props: {
        $data: generateStaticDataSource(DEFAULT_PIE_DATA),
        displayStyle: 'standard',
        innerRadius: '20%',
        outerRadius: '70%',
        showLabel: true,
        labelType: 'name',
        roseType: true,
        glowEffect: false,
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
    title: '同心进度环',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '同心进度环',
      props: {
        $data: generateStaticDataSource(DEFAULT_PIE_DATA),
        displayStyle: 'concentric-rings',
        outerRadius: '76%',
        showLabel: true,
        showLegend: true,
        legendPosition: 'right',
        trackColor: 'rgba(120, 153, 177, 0.16)',
        ringWidth: 5,
        ringGap: 3,
        glowEffect: false,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: { rect: { width: 420, height: 300 } },
    },
  },
  {
    title: '倾斜层叠环',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '倾斜层叠环',
      props: {
        $data: generateStaticDataSource(DEFAULT_PIE_DATA.slice(0, 3)),
        displayStyle: 'tilted-donut',
        innerRadius: '48%',
        outerRadius: '72%',
        showLabel: false,
        showLegend: false,
        tiltRatio: 0.56,
        tiltedDepth: 12,
        glowEffect: false,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: { rect: { width: 360, height: 240 } },
    },
  },
]

export { snippets }
