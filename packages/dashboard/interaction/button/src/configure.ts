/**
 * Button Configure
 * 按钮组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 */
const componentConfigGroup: FieldConfig = createCollapseGroup(
  '组件配置',
  [
    {
      type: 'group',
      title: '组件配置',
      setter: 'SubTabSetter',
      items: [
        // 样式 Tab
        {
          type: 'group',
          key: 'style',
          title: '样式',
          items: [
            {
              name: 'variant',
              title: '变体',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '主要', value: 'primary' },
                    { label: '次要', value: 'secondary' },
                    { label: '轮廓', value: 'outline' },
                    { label: '幽灵', value: 'ghost' },
                    { label: '危险', value: 'danger' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'primary',
              },
            },
            {
              name: 'size',
              title: '尺寸',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '小', value: 'small' },
                    { label: '中', value: 'medium' },
                    { label: '大', value: 'large' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'medium',
              },
            },
            {
              name: 'glowEnable',
              title: '发光效果',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
          ],
        },
        // 行为 Tab
        {
          type: 'group',
          key: 'behavior',
          title: '行为',
          items: [
            {
              name: 'href',
              title: '链接地址',
              setter: 'StringSetter',
            },
            {
              name: 'target',
              title: '打开方式',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '新窗口', value: '_blank' },
                    { label: '当前窗口', value: '_self' },
                  ],
                },
              },
              extraProps: {
                defaultValue: '_blank',
              },
            },
            {
              name: 'disabled',
              title: '禁用',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'loading',
              title: '加载中',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'loadingText',
              title: '加载文本',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: '加载中...',
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
  { name: 'text', label: 'text', type: 'string', required: true, description: '按钮文本' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
