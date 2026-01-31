/**
 * Bar Chart Configure
 * 柱状图组件配置
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
              name: 'xField',
              title: 'X轴字段',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: 'name',
              },
            },
            {
              name: 'yFields',
              title: 'Y轴字段',
              setter: {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: 'StringSetter',
                },
              },
              extraProps: {
                defaultValue: ['value1', 'value2'],
              },
            },
          ],
        },
        // 坐标轴 Tab
        {
          type: 'group',
          key: 'axis',
          title: '坐标轴',
          items: [
            {
              name: 'xAxisLabel',
              title: 'X轴标签',
              setter: 'StringSetter',
            },
            {
              name: 'yAxisLabel',
              title: 'Y轴标签',
              setter: 'StringSetter',
            },
            {
              name: 'xAxisVisible',
              title: '显示X轴',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'yAxisVisible',
              title: '显示Y轴',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'axisLabelRotate',
              title: '标签旋转',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: -90,
                  max: 90,
                  step: 15,
                  suffix: '°',
                },
              },
              extraProps: {
                defaultValue: 0,
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
              name: 'layout',
              title: '布局方向',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '垂直', value: 'vertical' },
                    { label: '水平', value: 'horizontal' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'vertical',
              },
            },
            {
              name: 'stacked',
              title: '堆叠模式',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'gradient',
              title: '渐变填充',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'borderRadius',
              title: '圆角',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 20,
                  step: 1,
                  suffix: 'px',
                },
              },
              extraProps: {
                defaultValue: 4,
              },
            },
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
          ],
        },
        // 图例 Tab
        {
          type: 'group',
          key: 'legend',
          title: '图例',
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
  { name: 'name', label: 'name', type: 'string', required: true, description: '类目名称' },
  { name: 'value1', label: 'value1', type: 'number', required: true, description: '数值1' },
  { name: 'value2', label: 'value2', type: 'number', required: false, description: '数值2' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
