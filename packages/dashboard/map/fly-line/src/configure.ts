/**
 * Fly Line Configure
 * 飞线组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createDataConfigGroup, createStandardConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 飞线独有 */
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
              title: '允许缩放拖拽',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
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
              name: 'lineColor',
              title: '飞线颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00d4ff',
              },
            },
            {
              name: 'lineGlowColor',
              title: '飞线发光颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00d4ff',
              },
            },
            {
              name: 'scatterColor',
              title: '散点颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#ffd700',
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
              name: 'showTooltip',
              title: '显示提示框',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
          ],
        },
        // 动画 Tab
        {
          type: 'group',
          key: 'animation',
          title: '动画',
          items: [
            {
              name: 'showAnimation',
              title: '显示飞线动画',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'animationSpeed',
              title: '动画速度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0.5,
                  max: 5,
                  step: 0.5,
                },
              },
              extraProps: {
                defaultValue: 2,
              },
            },
            {
              name: 'curveness',
              title: '飞线曲率',
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
  { name: 'fromName', label: 'fromName', type: 'string', required: true, description: '起点名称' },
  { name: 'toName', label: 'toName', type: 'string', required: true, description: '终点名称' },
  { name: 'fromCoord', label: 'fromCoord', type: 'array', required: true, description: '起点坐标 [lng, lat]' },
  { name: 'toCoord', label: 'toCoord', type: 'array', required: true, description: '终点坐标 [lng, lat]' },
  { name: 'value', label: 'value', type: 'number', required: false, description: '数值' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
