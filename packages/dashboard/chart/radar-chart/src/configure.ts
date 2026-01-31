/**
 * Radar Chart Configure
 * 雷达图组件配置
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
        // 数据 Tab
        {
          type: 'group',
          key: 'chartData',
          title: '数据',
          items: [
            {
              name: 'dimensionKey',
              title: '维度字段',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: 'dimension',
              },
            },
            {
              name: 'series',
              title: '系列配置',
              setter: 'JsonSetter',
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
              name: 'showGrid',
              title: '显示网格',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'fillOpacity',
              title: '填充透明度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 1,
                  step: 0.1,
                },
              },
              extraProps: {
                defaultValue: 0.3,
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
        // 图例 Tab
        {
          type: 'group',
          key: 'legend',
          title: '图例',
          items: [
            {
              name: 'showLegend',
              title: '显示图例',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'legendPosition',
              title: '图例位置',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '顶部', value: 'top' },
                    { label: '底部', value: 'bottom' },
                    { label: '左侧', value: 'left' },
                    { label: '右侧', value: 'right' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'bottom',
              },
            },
            {
              name: 'showTooltip',
              title: '显示提示',
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
  { name: 'dimension', label: 'dimension', type: 'string', required: true, description: '维度名称' },
  { name: 'value1', label: 'value1', type: 'number', required: true, description: '数值1' },
  { name: 'value2', label: 'value2', type: 'number', required: false, description: '数值2' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
