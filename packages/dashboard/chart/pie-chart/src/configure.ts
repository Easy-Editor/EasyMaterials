/**
 * Pie Chart Configure
 * 饼图组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import {
  advancedConfigGroup as visibilityConfigGroup,
  createCollapseGroup,
  createDataConfigGroup,
  createStandardConfigure,
} from '@easy-editor/materials-shared'

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
              name: 'displayStyle',
              title: '展示样式',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '标准饼图', value: 'standard' },
                    { label: '同心进度环', value: 'concentric-rings' },
                    { label: '倾斜层叠环', value: 'tilted-donut' },
                  ],
                },
              },
              extraProps: { defaultValue: 'standard' },
            },
            {
              name: 'innerRadius',
              title: '内半径',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: '0%',
              },
            },
            {
              name: 'outerRadius',
              title: '外半径',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: '70%',
              },
            },
            {
              name: 'colors',
              title: '颜色',
              setter: {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: 'ColorSetter',
                  minItems: 1,
                },
              },
            },
            {
              name: 'roseType',
              title: '玫瑰图',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'trackColor',
              title: '同心环轨道色',
              setter: 'ColorSetter',
              extraProps: { defaultValue: 'rgba(120, 153, 177, 0.16)' },
            },
            {
              name: 'ringWidth',
              title: '同心环宽度',
              setter: 'NumberSetter',
              extraProps: { defaultValue: 5 },
            },
            {
              name: 'ringGap',
              title: '同心环间距',
              setter: 'NumberSetter',
              extraProps: { defaultValue: 3 },
            },
            {
              name: 'tiltRatio',
              title: '倾斜压缩比例',
              setter: 'NumberSetter',
              extraProps: { defaultValue: 0.56 },
            },
            {
              name: 'tiltedDepth',
              title: '倾斜层叠深度',
              setter: 'NumberSetter',
              extraProps: { defaultValue: 12 },
            },
          ],
        },
        // 标签 Tab
        {
          type: 'group',
          key: 'label',
          title: '标签',
          items: [
            {
              name: 'showLabel',
              title: '显示标签',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'labelType',
              title: '标签类型',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '百分比', value: 'percent' },
                    { label: '数值', value: 'value' },
                    { label: '名称', value: 'name' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'percent',
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
                defaultValue: 'right',
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
  { name: 'name', label: 'name', type: 'string', required: true, description: '类目名称' },
  { name: 'value', label: 'value', type: 'number', required: true, description: '数值' },
])

const compatibilityDecorationConfigGroup: FieldConfig = createCollapseGroup(
  '兼容装饰效果',
  [
    {
      name: 'glowEffect',
      title: '发光效果',
      setter: 'SwitchSetter',
      extraProps: { defaultValue: false },
    },
  ],
  { defaultOpen: false },
)

const chartAdvancedConfigGroup: FieldConfig = createCollapseGroup(
  '高级设置',
  [visibilityConfigGroup, compatibilityDecorationConfigGroup],
  { defaultOpen: false },
)

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup, {
  advancedConfigGroup: chartAdvancedConfigGroup,
})
