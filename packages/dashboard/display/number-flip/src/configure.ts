/**
 * Number Flip Configure
 * 数字翻牌组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 数字翻牌独有 */
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
              name: 'decimals',
              title: '小数位数',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0,
                  max: 10,
                },
              },
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'separator',
              title: '千分位分隔',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'prefix',
              title: '前缀',
              setter: 'StringSetter',
            },
            {
              name: 'suffix',
              title: '后缀',
              setter: 'StringSetter',
            },
          ],
        },
        // 趋势 Tab
        {
          type: 'group',
          key: 'trend',
          title: '趋势',
          items: [
            {
              name: 'trendEnable',
              title: '显示趋势',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'trendValue',
              title: '趋势值',
              setter: 'NumberSetter',
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'trendType',
              title: '趋势类型',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '上升', value: 'up' },
                    { label: '下降', value: 'down' },
                    { label: '持平', value: 'flat' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'up',
              },
            },
            {
              name: 'trendSuffix',
              title: '趋势后缀',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: '%',
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
              name: 'fontSize',
              title: '字体大小',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 12,
                  max: 120,
                  step: 2,
                  suffix: 'px',
                },
              },
              extraProps: {
                defaultValue: 48,
              },
            },
            {
              name: 'fontFamily',
              title: '字体类型',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '数码字体', value: 'digital' },
                    { label: '默认字体', value: 'default' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'digital',
              },
            },
            {
              name: 'color',
              title: '颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00d4ff',
              },
            },
            {
              name: 'glowIntensity',
              title: '发光强度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 2,
                  step: 0.1,
                },
              },
              extraProps: {
                defaultValue: 0.5,
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
  { name: 'value', label: 'value', type: 'number', required: true, description: '数值' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
