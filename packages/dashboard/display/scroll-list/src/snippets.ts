/**
 * Scroll List Snippets
 * 滚动列表组件代码片段 - 使用共享数据源生成函数
 */

import type { Snippet } from '@easy-editor/core'
import { generateStaticDataSource } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

/** 默认排行榜数据 */
const DEFAULT_RANKING_DATA = [
  { rank: 1, name: '北京', value: 9800 },
  { rank: 2, name: '上海', value: 8500 },
  { rank: 3, name: '广州', value: 7200 },
  { rank: 4, name: '深圳', value: 6100 },
  { rank: 5, name: '杭州', value: 4800 },
]

const snippets: Snippet[] = [
  {
    title: '排行榜',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '排行榜',
      props: {
        $data: generateStaticDataSource(DEFAULT_RANKING_DATA),
        maxItems: 5,
        showMedal: true,
        progressBarEnable: true,
        progressBarGradient: true,
        progressBarColors: ['#00d4ff', '#9b59b6'],
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 320,
          height: 280,
        },
      },
    },
  },
  {
    title: '简单列表',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '简单列表',
      props: {
        $data: generateStaticDataSource([
          { rank: 1, name: '产品A', value: 1250 },
          { rank: 2, name: '产品B', value: 980 },
          { rank: 3, name: '产品C', value: 750 },
        ]),
        maxItems: 3,
        showMedal: false,
        progressBarEnable: true,
        progressBarGradient: false,
        progressBarColors: ['#00ff88', '#00ff88'],
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 280,
          height: 180,
        },
      },
    },
  },
]

export { snippets }
