/**
 * Text Configure
 * 文本组件配置
 */

import type { FieldConfig } from '@easy-editor/core'
import {
  advancedConfigGroup,
  createCollapseGroup,
  createDataConfigGroup,
  createStandardConfigure,
  MATERIAL_THEME,
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
        // 内容 Tab
        {
          type: 'group',
          key: 'content',
          title: '内容',
          items: [
            {
              name: 'isLink',
              title: '作为链接',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
            {
              name: 'href',
              title: '链接地址',
              setter: 'StringSetter',
            },
            {
              name: 'target',
              title: '打开方式',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '新窗口', value: '_blank' },
                    { label: '当前窗口', value: '_self' },
                  ],
                },
              },
              extraProps: {
                defaultValue: '_blank',
              },
            },
            {
              name: 'underline',
              title: '下划线',
              setter: 'SwitchSetter',
              extraProps: {
                defaultValue: false,
              },
            },
          ],
        },
        // 字体 Tab
        {
          type: 'group',
          key: 'font',
          title: '字体',
          items: [
            {
              name: 'fontSize',
              title: '字体大小',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 8,
                  max: 240,
                  step: 1,
                },
              },
              extraProps: {
                defaultValue: 16,
              },
            },
            {
              name: 'fontWeight',
              title: '字体粗细',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '常规 400', value: 400 },
                    { label: '中等 500', value: 500 },
                    { label: '半粗 600', value: 600 },
                    { label: '粗体 700', value: 700 },
                  ],
                },
              },
              extraProps: {
                defaultValue: 400,
              },
            },
            {
              name: 'fontFamily',
              title: '字体家族',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    { label: '继承主题', value: 'inherit' },
                    { label: '系统无衬线', value: 'system-ui, sans-serif' },
                    { label: '衬线字体', value: 'serif' },
                    { label: '等宽字体', value: 'monospace' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'inherit',
              },
            },
            {
              name: 'color',
              title: '颜色',
              setter: 'ColorSetter',
              extraProps: {
                defaultValue: MATERIAL_THEME.foreground,
              },
            },
            {
              name: 'lineHeight',
              title: '行高',
              setter: {
                componentName: 'NumberSetter',
                props: {
                  min: 0.5,
                  max: 4,
                  step: 0.1,
                },
              },
              extraProps: {
                defaultValue: 1.5,
              },
            },
            {
              name: 'letterSpacing',
              title: '字间距',
              setter: {
                componentName: 'SliderSetter',
                props: {
                  min: -2,
                  max: 10,
                  step: 0.1,
                  suffix: 'px',
                },
              },
              extraProps: {
                defaultValue: 0,
              },
            },
          ],
        },
        // 对齐 Tab
        {
          type: 'group',
          key: 'align',
          title: '对齐',
          items: [
            {
              name: 'textAlign',
              title: '水平对齐',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '左', value: 'left' },
                    { label: '中', value: 'center' },
                    { label: '右', value: 'right' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'left',
              },
            },
            {
              name: 'verticalAlign',
              title: '垂直对齐',
              setter: {
                componentName: 'SegmentedSetter',
                props: {
                  options: [
                    { label: '上', value: 'top' },
                    { label: '中', value: 'middle' },
                    { label: '下', value: 'bottom' },
                  ],
                },
              },
              extraProps: {
                defaultValue: 'middle',
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
  { name: 'text', label: 'text', type: 'string', required: true, description: '文本内容' },
])

const createAdvancedConfigGroup = (): FieldConfig =>
  createCollapseGroup(
    '高级设置',
    [
      advancedConfigGroup,
      createCollapseGroup(
        '兼容装饰效果',
        [
          {
            name: 'glowEnable',
            title: '启用文字辉光',
            setter: 'SwitchSetter',
            extraProps: {
              defaultValue: false,
            },
          },
          {
            name: 'glowColor',
            title: '辉光颜色',
            setter: 'ColorSetter',
            extraProps: {
              defaultValue: MATERIAL_THEME.accent,
            },
          },
          {
            name: 'glowIntensity',
            title: '辉光强度',
            setter: {
              componentName: 'SliderSetter',
              props: {
                min: 0,
                max: 2,
                step: 0.1,
              },
            },
            extraProps: {
              defaultValue: 0,
            },
          },
        ],
        { defaultOpen: false },
      ),
    ],
    { defaultOpen: false },
  )

export const configure = createStandardConfigure(componentConfigGroup, dataConfigGroup, {
  advancedConfigGroup: createAdvancedConfigGroup(),
})
