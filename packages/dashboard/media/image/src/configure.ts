/**
 * Image Configure
 * 图片组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import type { UploadValue } from '@easy-editor/materials-shared'
import { createCollapseGroup, createSimpleConfigure } from '@easy-editor/materials-shared'

/** 组件配置 - 图片独有 */
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
                  accept: '.jpg,.jpeg,.png,.gif,.svg',
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
              title: '图片地址',
              setter: 'StringSetter',
            },
            {
              name: 'alt',
              title: '替代文本',
              setter: 'StringSetter',
            },
          ],
        },
        // 加载 Tab
        {
          type: 'group',
          key: 'loading',
          title: '加载',
          items: [
            {
              name: 'lazyLoad',
              title: '懒加载',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'lazyLoadThreshold',
              title: '懒加载阈值',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: 0,
                  max: 500,
                  step: 50,
                  suffix: 'px',
                },
              },
              extraProps: {
                defaultValue: 100,
              },
            },
            {
              name: 'placeholder',
              title: '占位图',
              setter: 'StringSetter',
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
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '覆盖', value: 'cover' },
                    { label: '包含', value: 'contain' },
                    { label: '填充', value: 'fill' },
                    { label: '无', value: 'none' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'cover',
              },
            },
            {
              name: 'borderRadius',
              title: '圆角',
              setter: 'NumberSetter',
              extraProps: {
                defaultValue: 0,
              },
            },
            {
              name: 'borderStyle',
              title: '边框样式',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '无', value: 'none' },
                    { label: '霓虹', value: 'neon' },
                    { label: '渐变', value: 'gradient' },
                    { label: '科技感', value: 'tech' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'none',
              },
            },
            {
              name: 'borderColor',
              title: '边框颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: '#00d4ff',
              },
            },
            {
              name: 'shadow',
              title: '启用阴影',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'shadowColor',
              title: '阴影颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: 'rgba(0, 212, 255, 0.3)',
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
