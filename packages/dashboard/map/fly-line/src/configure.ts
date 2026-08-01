/**
 * Fly Line Configure
 * 飞线组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import {
  createCollapseGroup,
  createDataConfigGroup,
  createStandardConfigure,
  MATERIAL_STATUS_COLORS,
  MATERIAL_THEME,
  withAgentCapability,
} from '@easy-editor/materials-shared'
import { DEFAULT_COLORS, DEFAULT_SCATTER_POINTS } from './constants'

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
        {
          type: 'group',
          key: 'secondaryData',
          title: '散点数据',
          items: [
            {
              name: 'scatterPoints',
              title: '散点数据',
              setter: 'JsonSetter',
              extraProps: withAgentCapability(
                { defaultValue: DEFAULT_SCATTER_POINTS },
                {
                  fieldId: 'props.scatterPoints',
                  access: 'read-write',
                  readPath: ['props', 'scatterPoints'],
                  writeTargets: [{ path: ['props', 'scatterPoints'] }],
                  unsetTargets: [{ path: ['props', 'scatterPoints'] }],
                  valueSchema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['name', 'coord'],
                      properties: {
                        name: { type: 'string', minLength: 1 },
                        coord: {
                          type: 'array',
                          minItems: 2,
                          maxItems: 2,
                          items: { type: 'number' },
                        },
                        value: { type: 'number' },
                      },
                    },
                  },
                  verifyPaths: [['props', 'scatterPoints']],
                },
              ),
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
                defaultValue: DEFAULT_COLORS.lineColor,
              },
            },
            {
              name: 'lineGlowColor',
              title: '动画标记颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: DEFAULT_COLORS.lineGlowColor,
              },
            },
            {
              name: 'scatterColor',
              title: '散点颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: MATERIAL_STATUS_COLORS.warning,
              },
            },
            {
              name: 'areaColor',
              title: '地图区域颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: MATERIAL_THEME.surfaceRaised,
              },
            },
            {
              name: 'borderColor',
              title: '地图边框颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: MATERIAL_THEME.border,
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
  {
    name: 'fromCoord',
    label: 'fromCoord',
    type: 'array',
    required: true,
    description: '起点坐标 [lng, lat]',
    valueSchema: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: { type: 'number' },
    },
  },
  {
    name: 'toCoord',
    label: 'toCoord',
    type: 'array',
    required: true,
    description: '终点坐标 [lng, lat]',
    valueSchema: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: { type: 'number' },
    },
  },
  { name: 'value', label: 'value', type: 'number', required: false, description: '数值' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
