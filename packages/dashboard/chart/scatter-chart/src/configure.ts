/**
 * Scatter Chart Configure
 * 散点图组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 散点图独有 */
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
              name: 'xLabel',
              title: 'X轴标签',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: 'X',
              },
            },
            {
              name: 'yLabel',
              title: 'Y轴标签',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: 'Y',
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
              name: 'colors',
              title: '颜色',
              setter: {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: 'ColorSetter',
                },
              },
            },
            {
              name: 'pointSize',
              title: '点大小',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 2,
                  max: 30,
                  step: 1,
                  suffix: 'px',
                },
              },
              extraProps: {
                defaultValue: 8,
              },
            },
            {
              name: 'showGrid',
              title: '显示网格',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
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
  { name: 'x', label: 'x', type: 'number', required: true, description: 'X坐标' },
  { name: 'y', label: 'y', type: 'number', required: true, description: 'Y坐标' },
  { name: 'z', label: 'z', type: 'number', required: false, description: '点大小' },
  { name: 'category', label: 'category', type: 'string', required: false, description: '分类' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
