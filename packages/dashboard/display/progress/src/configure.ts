/**
 * Progress Configure
 * 进度条组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 进度条独有 */
const componentConfigGroup: FieldConfig = createCollapseGroup(
  '组件配置',
  [
    {
      type: 'group',
      title: '组件配置',
      setter: 'SubTabSetter',
      items: [
        // 数值 Tab
        {
          type: 'group',
          key: 'value',
          title: '数值',
          items: [
            {
              name: 'maxValue',
              title: '最大值',
              setter: 'NumberSetter',
              extraProps: {
                defaultValue: 100,
              },
            },
            {
              name: 'valueFormat',
              title: '值格式',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '百分比', value: 'percent' },
                    { label: '数值', value: 'number' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'percent',
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
              name: 'type',
              title: '进度条类型',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '环形', value: 'ring' },
                    { label: '线性', value: 'bar' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'ring',
              },
            },
            {
              name: 'showValue',
              title: '显示数值',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'showLabel',
              title: '显示标签',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'label',
              title: '标签文本',
              setter: 'StringSetter',
            },
          ],
        },
        // 样式 Tab
        {
          type: 'group',
          key: 'style',
          title: '样式',
          items: [
            {
              name: 'strokeWidthRatio',
              title: '线条粗细',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0.02,
                  max: 0.2,
                  step: 0.01,
                },
              },
              extraProps: {
                defaultValue: 0.07,
              },
            },
            {
              name: 'trackColor',
              title: '轨道颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: 'rgba(255, 255, 255, 0.1)',
              },
            },
            {
              name: 'progressColor',
              title: '进度颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00ffff',
              },
            },
            {
              name: 'gradientEnable',
              title: '启用渐变',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'gradientColors',
              title: '渐变颜色',
              setter: {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: 'ColorSetter',
                },
              },
              extraProps: {
                defaultValue: ['#00d4ff', '#9b59b6'],
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
  { name: 'value', label: 'value', type: 'number', required: true, description: '当前值' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
