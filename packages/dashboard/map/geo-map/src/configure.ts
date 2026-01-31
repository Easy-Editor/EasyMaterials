/**
 * Geo Map Configure
 * 地理地图组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 地理地图独有 */
const componentConfigGroup: FieldConfig = createCollapseGroup(
  '组件配置',
  [
    {
      type: 'group',
      title: '组件配置',
      setter: 'SubTabSetter',
      items: [
        // 地图 Tab
        {
          type: 'group',
          key: 'map',
          title: '地图',
          items: [
            {
              name: 'mapType',
              title: '地图类型',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '中国', value: 'china' },
                    { label: '世界', value: 'world' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'china',
              },
            },
            {
              name: 'roam',
              title: '允许缩放',
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
              name: 'showVisualMap',
              title: '显示图例',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
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
            {
              name: 'showScatter',
              title: '显示散点',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'scatterSymbolSize',
              title: '散点大小',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 4,
                  max: 30,
                  step: 1,
                  suffix: 'px',
                },
              },
              extraProps: {
                defaultValue: 12,
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
        // 颜色 Tab
        {
          type: 'group',
          key: 'colors',
          title: '颜色',
          items: [
            {
              name: 'colors',
              title: '颜色列表',
              setter: {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: 'ColorSetter',
                },
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
  { name: 'name', label: 'name', type: 'string', required: true, description: '区域名称' },
  { name: 'value', label: 'value', type: 'number', required: true, description: '数值' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
