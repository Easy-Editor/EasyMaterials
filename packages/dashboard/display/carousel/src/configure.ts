/**
 * Carousel Configure
 * 轮播组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 轮播独有 */
const componentConfigGroup: FieldConfig = createCollapseGroup(
  '组件配置',
  [
    {
      type: 'group',
      title: '组件配置',
      setter: 'SubTabSetter',
      items: [
        // 行为 Tab
        {
          type: 'group',
          key: 'behavior',
          title: '行为',
          items: [
            {
              name: 'autoPlay',
              title: '自动播放',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'interval',
              title: '播放间隔',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 1000,
                  max: 10000,
                  step: 500,
                  suffix: 'ms',
                },
              },
              extraProps: {
                defaultValue: 3000,
              },
            },
            {
              name: 'loop',
              title: '循环播放',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
          ],
        },
        // 显示 Tab
        {
          type: 'group',
          key: 'display',
          title: '显示',
          items: [
            {
              name: 'showNav',
              title: '显示导航按钮',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'showIndicators',
              title: '显示指示器',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
          ],
        },
      ],
    },
  ],
  {
    padding: '6px 16px 12px',
  },
)

/** 数据配置 */
const dataConfigGroup: FieldConfig = createDataConfigGroup([
  { name: 'src', label: 'src', type: 'string', required: true, description: '图片地址' },
  { name: 'alt', label: 'alt', type: 'string', required: false, description: '图片描述' },
  { name: 'link', label: 'link', type: 'string', required: false, description: '点击链接' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
