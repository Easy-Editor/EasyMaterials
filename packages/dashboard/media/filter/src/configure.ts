/**
 * Filter Configure
 * 滤镜组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import { createCollapseGroup, createSimpleConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 滤镜独有 */
const componentConfigGroup: FieldConfig = createCollapseGroup(
  '组件配置',
  [
    {
      type: 'group',
      title: '组件配置',
      setter: 'SubTabSetter',
      items: [
        // 预设 Tab
        {
          type: 'group',
          key: 'preset',
          title: '预设',
          items: [
            {
              name: 'preset',
              title: '预设滤镜',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '无', value: 'none' },
                    { label: '复古', value: 'vintage' },
                    { label: '黑白', value: 'grayscale' },
                    { label: '暖色调', value: 'warm' },
                    { label: '冷色调', value: 'cool' },
                    { label: '高对比', value: 'highContrast' },
                    { label: '柔和', value: 'soft' },
                    { label: '鲜艳', value: 'vivid' },
                    { label: '电影感', value: 'cinematic' },
                    { label: '梦幻', value: 'dreamy' },
                    { label: '赛博朋克', value: 'cyberpunk' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'none',
              },
            },
          ],
        },
        // 滤镜 Tab
        {
          type: 'group',
          key: 'filter',
          title: '滤镜',
          items: [
            {
              name: 'blur',
              title: '模糊',
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
                defaultValue: 0,
              },
            },
            {
              name: 'brightness',
              title: '亮度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 200,
                  step: 1,
                  suffix: '%',
                },
              },
              extraProps: {
                defaultValue: 100,
              },
            },
            {
              name: 'contrast',
              title: '对比度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 200,
                  step: 1,
                  suffix: '%',
                },
              },
              extraProps: {
                defaultValue: 100,
              },
            },
            {
              name: 'saturate',
              title: '饱和度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 200,
                  step: 1,
                  suffix: '%',
                },
              },
              extraProps: {
                defaultValue: 100,
              },
            },
            {
              name: 'grayscale',
              title: '灰度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 100,
                  step: 1,
                  suffix: '%',
                },
              },
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'hueRotate',
              title: '色相旋转',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 360,
                  step: 1,
                  suffix: '°',
                },
              },
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'sepia',
              title: '棕褐色',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 100,
                  step: 1,
                  suffix: '%',
                },
              },
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'invert',
              title: '反相',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 100,
                  step: 1,
                  suffix: '%',
                },
              },
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'opacity',
              title: '不透明度',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 100,
                  step: 1,
                  suffix: '%',
                },
              },
              extraProps: {
                defaultValue: 100,
              },
            },
          ],
        },
        // 混合 Tab
        {
          type: 'group',
          key: 'blend',
          title: '混合',
          items: [
            {
              name: 'blendMode',
              title: '混合模式',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '正常', value: 'normal' },
                    { label: '正片叠底', value: 'multiply' },
                    { label: '滤色', value: 'screen' },
                    { label: '叠加', value: 'overlay' },
                    { label: '变暗', value: 'darken' },
                    { label: '变亮', value: 'lighten' },
                    { label: '颜色减淡', value: 'color-dodge' },
                    { label: '颜色加深', value: 'color-burn' },
                    { label: '强光', value: 'hard-light' },
                    { label: '柔光', value: 'soft-light' },
                    { label: '差值', value: 'difference' },
                    { label: '排除', value: 'exclusion' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'normal',
              },
            },
            {
              name: 'backgroundColor',
              title: '叠加颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: 'transparent',
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

export const configure = createSimpleConfigure(componentConfigGroup)
