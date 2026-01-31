/**
 * Scroll List Configure
 * 滚动列表组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 滚动列表独有 */
const componentConfigGroup: FieldConfig = createCollapseGroup(
  '组件配置',
  [
    {
      type: 'group',
      title: '组件配置',
      setter: 'SubTabSetter',
      items: [
        // 显示 Tab
        {
          type: 'group',
          key: 'display',
          title: '显示',
          items: [
            {
              name: 'maxItems',
              title: '最大显示数',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 1,
                  max: 20,
                },
              },
              extraProps: {
                defaultValue: 5,
              },
            },
            {
              name: 'showRank',
              title: '显示排名',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'showMedal',
              title: '显示奖牌',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'progressBarEnable',
              title: '显示进度条',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'progressBarGradient',
              title: '渐变效果',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
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
        // 数值格式 Tab
        {
          type: 'group',
          key: 'format',
          title: '格式',
          items: [
            {
              name: 'valueFormat',
              title: '格式类型',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '数字', value: 'number' },
                    { label: '货币', value: 'currency' },
                    { label: '百分比', value: 'percent' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'number',
              },
            },
            {
              name: 'valuePrefix',
              title: '数值前缀',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: '',
              },
            },
            {
              name: 'valueSuffix',
              title: '数值后缀',
              setter: 'StringSetter',
              extraProps: {
                defaultValue: '',
              },
            },
          ],
        },
        // 颜色 Tab
        {
          type: 'group',
          key: 'colors',
          title: '颜色',
          items: [
            {
              name: 'progressBarColors',
              title: '进度条颜色',
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
            {
              name: 'nameColor',
              title: '名称颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#e6e6e6',
              },
            },
            {
              name: 'valueColor',
              title: '数值颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00d4ff',
              },
            },
            {
              name: 'backgroundColor',
              title: '背景颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: 'rgba(10, 10, 26, 0.95)',
              },
            },
            {
              name: 'itemBackgroundColor',
              title: '行背景颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: 'rgba(15, 15, 42, 0.9)',
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
  { name: 'rank', label: 'rank', type: 'number', required: true, description: '排名' },
  { name: 'name', label: 'name', type: 'string', required: true, description: '名称' },
  { name: 'value', label: 'value', type: 'number', required: true, description: '数值' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
