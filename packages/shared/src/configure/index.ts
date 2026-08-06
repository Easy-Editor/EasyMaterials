/**
 * 配置项工厂函数
 * 提供通用的配置组和工厂函数，简化物料配置编写
 */

import type { Configure, FieldConfig } from '@easy-editor/core'

type ProjectionPath = string[]

interface AgentWriteTarget {
  path: ProjectionPath
  valuePath?: string[]
}

/**
 * 可由 Agent manifest 静态读取的字段能力描述。
 * 这里只允许纯数据，不能放 callback、实例或运行时对象。
 */
export type AgentFieldCapability =
  | {
      /** 仅供人工 Inspector 使用，不进入 Agent manifest。 */
      expose: false
    }
  | {
      expose?: true
      fieldId: string
      access: 'read-only' | 'read-write' | 'unsupported'
      readPath?: ProjectionPath
      writeTargets?: AgentWriteTarget[]
      unsetTargets?: AgentWriteTarget[]
      verifyPaths?: ProjectionPath[]
      valueSchema?: Record<string, unknown>
    }

type FieldExtraProps = NonNullable<FieldConfig['extraProps']>

/** 将安全的 Agent 能力与 Inspector 的字段行为放在同一个 configure 源中。 */
export const withAgentCapability = (extraProps: FieldExtraProps, agent: AgentFieldCapability): FieldExtraProps =>
  ({ ...extraProps, agent }) as FieldExtraProps

/** 期望字段配置 */
export interface ExpectedField {
  /** 字段名 */
  name: string
  /** 显示标签 */
  label: string
  /** 字段类型 */
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  /** 是否必填 */
  required?: boolean
  /** 字段描述 */
  description?: string
  /** 供 Agent 校验复杂值（如坐标元组）的精确 schema */
  valueSchema?: Record<string, unknown>
}

/** 事件配置项 */
export interface EventItem {
  /** 事件显示名称 */
  label: string
  /** 事件值（如 onClick） */
  value: string
  /** 事件描述 */
  description: string
}

/** 事件分组 */
export interface EventGroup {
  /** 分组标题 */
  title: string
  /** 分组下的事件列表 */
  children: EventItem[]
}

/**
 * 创建折叠组配置
 * @param title 折叠组标题
 * @param items 折叠组内的配置项
 * @param props 额外的 CollapseSetter props
 */
export const createCollapseGroup = (
  title: string,
  items: FieldConfig[],
  props?: Record<string, unknown>,
): FieldConfig => ({
  type: 'group',
  title,
  setter: {
    componentName: 'CollapseSetter',
    props: {
      defaultOpen: true,
      icon: true,
      ...props,
    },
  },
  items,
})

/** 节点信息配置（所有组件通用） */
export const globalConfigGroup: FieldConfig = {
  name: 'nodeInfo',
  title: '节点信息',
  setter: 'NodeInfoSetter',
  extraProps: withAgentCapability(
    {
      // @ts-expect-error label is not a valid extra prop
      label: false,
    },
    {
      fieldId: 'shared.id',
      access: 'read-only',
      readPath: ['node', 'id'],
      verifyPaths: [['node', 'id']],
    },
  ),
}

/** 布局与外观配置（所有组件通用） */
export const basicConfigGroup: FieldConfig = createCollapseGroup('布局与外观', [
  {
    name: 'title',
    title: '组件名称',
    setter: 'StringSetter',
    extraProps: withAgentCapability(
      {
        getValue(target) {
          return target.getExtraPropValue('title')
        },
        setValue(target, value) {
          target.setExtraPropValue('title', value)
        },
      },
      {
        fieldId: 'shared.title',
        access: 'read-write',
        readPath: ['extra', 'title'],
        writeTargets: [{ path: ['extra', 'title'] }],
        unsetTargets: [{ path: ['extra', 'title'] }],
        valueSchema: { type: 'string' },
        verifyPaths: [['extra', 'title']],
      },
    ),
  },
  {
    name: 'rect',
    title: '位置与尺寸',
    setter: 'RectSetter',
    extraProps: withAgentCapability(
      {
        getValue(target) {
          return target.getExtraPropValue('$dashboard.rect')
        },
        setValue(target, value) {
          target.setExtraPropValue('$dashboard.rect', value)
        },
      },
      {
        fieldId: 'shared.rect',
        access: 'read-write',
        readPath: ['extra', '$dashboard', 'rect'],
        writeTargets: [{ path: ['extra', '$dashboard', 'rect'] }],
        unsetTargets: [{ path: ['extra', '$dashboard', 'rect'] }],
        valueSchema: {
          type: 'object',
          required: ['x', 'y', 'width', 'height'],
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
            width: { type: 'number', minimum: 0 },
            height: { type: 'number', minimum: 0 },
          },
        },
        verifyPaths: [['extra', '$dashboard', 'rect']],
      },
    ),
  },
  {
    name: 'rotation',
    title: '旋转角度',
    setter: {
      componentName: 'SliderSetter',
      props: {
        min: 0,
        max: 360,
        suffix: '°',
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
        suffix: '%',
      },
    },
    extraProps: {
      defaultValue: 100,
    },
  },
  {
    name: 'background',
    title: '背景颜色',
    setter: 'ColorSetter',
    extraProps: {
      defaultValue: 'transparent',
    },
  },
])

/** 默认事件配置 */
export const defaultEvents: EventGroup[] = [
  {
    title: '点击事件',
    children: [
      { label: '点击', value: 'onClick', description: '鼠标点击时触发' },
      { label: '双击', value: 'onDoubleClick', description: '鼠标双击时触发' },
    ],
  },
  {
    title: '鼠标事件',
    children: [
      { label: '鼠标进入', value: 'onMouseEnter', description: '鼠标进入时触发' },
      { label: '鼠标离开', value: 'onMouseLeave', description: '鼠标离开时触发' },
    ],
  },
]

/**
 * 创建事件绑定配置组
 * @param events 事件配置，默认使用 defaultEvents
 */
export const createEventConfigGroup = (events: EventGroup[] = defaultEvents): FieldConfig =>
  createCollapseGroup(
    '事件绑定',
    [
      {
        name: 'events',
        title: '事件',
        setter: {
          componentName: 'EventSetter',
          props: {
            events,
          },
        },
        extraProps: withAgentCapability(
          {
            // @ts-expect-error label is not a valid extra prop
            label: false,
          },
          {
            fieldId: 'events.binding',
            access: 'read-only',
            readPath: ['props', 'events'],
            verifyPaths: [['props', 'events']],
          },
        ),
      },
    ],
    { defaultOpen: false },
  )

/** 事件绑定配置组（使用默认事件） */
export const eventConfigGroup: FieldConfig = createEventConfigGroup()

/** 高级配置组（条件渲染等） */
export const advancedConfigGroup: FieldConfig = createCollapseGroup(
  '可见性',
  [
    {
      name: 'condition',
      title: '条件渲染',
      setter: 'SwitchSetter',
      extraProps: withAgentCapability(
        {
          supportVariable: true,
          getValue(target) {
            return target.getNode().getExtraPropValue('condition')
          },
          setValue(target, value: boolean) {
            target.getNode().setExtraProp('condition', value)
          },
        },
        {
          fieldId: 'shared.visibility',
          access: 'read-write',
          readPath: ['extra', 'condition'],
          writeTargets: [{ path: ['extra', 'condition'] }],
          unsetTargets: [{ path: ['extra', 'condition'] }],
          valueSchema: { type: 'boolean' },
          verifyPaths: [['extra', 'condition']],
        },
      ),
    },
  ],
  { defaultOpen: false },
)

const createEmptyStateFields = (): FieldConfig[] => [
  {
    name: 'emptyBehavior',
    title: '空数据展示',
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [
          { label: '显示提示', value: 'message' },
          { label: '保持空白', value: 'blank' },
          { label: '运行时隐藏', value: 'hide' },
        ],
      },
    },
    extraProps: {
      defaultValue: 'message',
    },
  },
  {
    name: 'emptyText',
    title: '空数据文案',
    setter: {
      componentName: 'StringSetter',
      props: {
        maxLength: 80,
      },
    },
    extraProps: {
      defaultValue: '暂无数据',
    },
  },
]

export const emptyStateConfigGroup: FieldConfig = createCollapseGroup('空内容', createEmptyStateFields(), {
  defaultOpen: false,
})

/**
 * 创建数据配置组
 * @param expectedFields 期望的字段配置
 * @param options 额外选项
 */
export const createDataConfigGroup = (
  expectedFields: ExpectedField[],
  options?: {
    showPreview?: boolean
    previewLimit?: number
    showEmptyState?: boolean
  },
): FieldConfig =>
  createCollapseGroup('数据与空状态', [
    {
      name: '$data',
      title: '数据配置',
      setter: {
        componentName: 'DataSetter',
        props: {
          expectedFields,
          showPreview: options?.showPreview ?? true,
          previewLimit: options?.previewLimit ?? 10,
        },
      },
      extraProps: withAgentCapability(
        {
          // @ts-expect-error label is not a valid extra prop
          label: false,
        },
        {
          fieldId: 'data.config',
          access: 'read-write',
          readPath: ['props', '$data'],
          writeTargets: [{ path: ['props', '$data'] }],
          unsetTargets: [{ path: ['props', '$data'] }],
          valueSchema: {
            type: 'object',
            required: ['sourceType'],
            properties: {
              sourceType: { type: 'string', enum: ['static', 'datasource', 'global'] },
              staticData: {
                type: 'array',
                items: {
                  type: 'object',
                  required: expectedFields.filter(field => field.required).map(field => field.name),
                  properties: Object.fromEntries(
                    expectedFields.map(field => [
                      field.name,
                      field.valueSchema ?? {
                        type: field.type,
                        ...(field.description ? { description: field.description } : {}),
                      },
                    ]),
                  ),
                },
              },
              datasourceId: { type: 'string', minLength: 1 },
              fieldMappings: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['componentField', 'sourceField'],
                  properties: {
                    componentField: {
                      type: 'string',
                      enum: expectedFields.map(field => field.name),
                    },
                    sourceField: { type: 'string', minLength: 1 },
                  },
                },
              },
            },
          },
          verifyPaths: [['props', '$data']],
        },
      ),
    },
    ...(options?.showEmptyState === false ? [] : createEmptyStateFields()),
  ])

/**
 * 创建标准三 Tab 配置结构
 * @param componentConfigGroup 组件特有的配置组
 * @param dataConfigGroup 数据配置组
 * @param options 额外选项
 */
export const createStandardConfigure = (
  componentConfigGroup: FieldConfig,
  dataConfigGroup: FieldConfig,
  options?: {
    eventConfigGroup?: FieldConfig
    advancedConfigGroup?: FieldConfig
  },
): Configure => {
  const eventGroup = options?.eventConfigGroup ?? eventConfigGroup
  const advancedGroup = options?.advancedConfigGroup ?? advancedConfigGroup

  return {
    props: [
      globalConfigGroup,
      {
        type: 'group',
        title: '属性',
        setter: 'TabSetter',
        items: [
          // 配置 Tab
          {
            type: 'group',
            key: 'config',
            title: '属性',
            items: [basicConfigGroup, componentConfigGroup],
          },
          // 数据 Tab
          {
            type: 'group',
            key: 'data',
            title: '数据',
            items: [dataConfigGroup],
          },
          // 高级 Tab
          {
            type: 'group',
            key: 'advanced',
            title: '高级',
            items: [eventGroup, advancedGroup],
          },
        ],
      },
    ],
    component: {},
    supports: {},
    advanced: {},
  }
}

/**
 * 创建无数据源的两 Tab 配置结构（适用于 filter、image 等不需要数据源的组件）
 * @param componentConfigGroup 组件特有的配置组
 * @param options 额外选项
 */
export const createSimpleConfigure = (
  componentConfigGroup: FieldConfig,
  options?: {
    eventConfigGroup?: FieldConfig
    advancedConfigGroup?: FieldConfig
    showEmptyState?: boolean
  },
): Configure => {
  const eventGroup = options?.eventConfigGroup ?? eventConfigGroup
  const advancedGroup = options?.advancedConfigGroup ?? advancedConfigGroup

  return {
    props: [
      globalConfigGroup,
      {
        type: 'group',
        title: '属性',
        setter: 'TabSetter',
        items: [
          // 配置 Tab
          {
            type: 'group',
            key: 'config',
            title: '属性',
            items: [
              basicConfigGroup,
              componentConfigGroup,
              ...(options?.showEmptyState ? [emptyStateConfigGroup] : []),
            ],
          },
          // 高级 Tab
          {
            type: 'group',
            key: 'advanced',
            title: '高级',
            items: [eventGroup, advancedGroup],
          },
        ],
      },
    ],
    component: {},
    supports: {},
    advanced: {},
  }
}
