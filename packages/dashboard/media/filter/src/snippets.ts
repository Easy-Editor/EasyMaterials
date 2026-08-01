/**
 * Filter Snippets
 * 滤镜组件代码片段
 */

import type { Snippet } from '@easy-editor/core'
import { MATERIAL_THEME } from '@easy-editor/materials-shared'
import { COMPONENT_NAME } from './constants'

export const snippets: Snippet[] = [
  {
    title: '模糊滤镜',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '模糊滤镜',
      props: {
        blur: 5,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 200,
        },
      },
    },
  },
  {
    title: '灰度滤镜',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '灰度滤镜',
      props: {
        grayscale: 100,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 200,
        },
      },
    },
  },
  {
    title: '复古效果',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '复古效果',
      props: {
        sepia: 50,
        contrast: 110,
        brightness: 90,
        rotation: 0,
        opacity: 100,
        background: 'transparent',
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 200,
        },
      },
    },
  },
  {
    title: '柔和遮罩',
    screenshot: '',
    schema: {
      componentName: COMPONENT_NAME,
      title: '柔和遮罩',
      props: {
        blendMode: 'normal',
        rotation: 0,
        opacity: 100,
        background: MATERIAL_THEME.surfaceRaised,
      },
      $dashboard: {
        rect: {
          width: 200,
          height: 200,
        },
      },
    },
  },
]
