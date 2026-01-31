/**
 * Gauge Chart Configure
 * 仪表盘组件配置
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
        // 数值 Tab
        {
          type: 'group',
          key: 'value',
          title: '数值',
          items: [
            {
              name: 'min',
              title: '最小值',
              setter: 'NumberSetter',
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'max',
              title: '最大值',
              setter: 'NumberSetter',
              extraProps: {
                defaultValue: 100,
              },
            },
            {
              name: 'unit',
              title: '单位',
              setter: 'StringSetter',
            },
          ],
        },
        // 刻度 Tab
        {
          type: 'group',
          key: 'scale',
          title: '刻度',
          items: [
            {
              name: 'showScale',
              title: '显示刻度',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'divisions',
              title: '刻度数量',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 2,
                  max: 20,
                  step: 1,
                },
              },
              extraProps: {
                defaultValue: 10,
              },
            },
            {
              name: 'showLabels',
              title: '显示刻度值',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
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
              name: 'pointerType',
              title: '指针类型',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '针形', value: 'needle' },
                    { label: '三角形', value: 'triangle' },
                    { label: '矩形', value: 'rect' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'needle',
              },
            },
            {
              name: 'pointerColor',
              title: '指针颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00d4ff',
              },
            },
            {
              name: 'glowEffect',
              title: '发光效果',
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
  { name: 'value', label: 'value', type: 'number', required: true, description: '当前值' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
