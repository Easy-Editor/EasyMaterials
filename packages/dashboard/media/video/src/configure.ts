/**
 * Video Configure
 * 视频组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import type { UploadValue } from '@easy-editor/materials-shared'
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
        // 内容 Tab
        {
          type: 'group',
          key: 'content',
          title: '内容',
          items: [
            {
              name: '__upload',
              title: '上传',
              setter: {
                componentName: 'UploadSetter',
                props: {
                  accept: '.mp4,.webm,.ogg',
                },
              },
              extraProps: {
                setValue(target, value: UploadValue) {
                  if (value) {
                    const { base64, raw } = value
                    if (base64) {
                      target.parent.setPropValue('src', base64)
                    }
                    if (raw?.width) {
                      target.parent.setExtraPropValue('$dashboard.rect.width', raw.width)
                    }
                    if (raw?.height) {
                      target.parent.setExtraPropValue('$dashboard.rect.height', raw.height)
                    }
                  } else {
                    target.parent.clearPropValue('src')
                  }
                },
              },
            },
            {
              name: 'src',
              title: '视频地址',
              setter: 'StringSetter',
            },
            {
              name: 'poster',
              title: '封面图片',
              setter: 'StringSetter',
            },
          ],
        },
        // 播放 Tab
        {
          type: 'group',
          key: 'playback',
          title: '播放',
          items: [
            {
              name: 'autoPlay',
              title: '自动播放',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'loop',
              title: '循环播放',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'muted',
              title: '静音',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'controls',
              title: '显示控制条',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: true,
              },
            },
            {
              name: 'playbackRate',
              title: '播放速度',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '0.5x', value: 0.5 },
                    { label: '0.75x', value: 0.75 },
                    { label: '1x (正常)', value: 1 },
                    { label: '1.25x', value: 1.25 },
                    { label: '1.5x', value: 1.5 },
                    { label: '2x', value: 2 },
                  ],
                },
              },
              extraProps: {
                defaultValue: 1,
              },
            },
            {
              name: 'volume',
              title: '音量',
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
        // 样式 Tab
        {
          type: 'group',
          key: 'style',
          title: '样式',
          items: [
            {
              name: 'objectFit',
              title: '填充方式',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '覆盖', value: 'cover' },
                    { label: '包含', value: 'contain' },
                    { label: '拉伸', value: 'fill' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'contain',
              },
            },
            {
              name: 'borderRadius',
              title: '圆角',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 50,
                  step: 1,
                  suffix: 'px',
                },
              },
              extraProps: {
                defaultValue: 8,
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
  { name: 'src', label: 'src', type: 'string', required: true, description: '视频地址' },
])

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup)
