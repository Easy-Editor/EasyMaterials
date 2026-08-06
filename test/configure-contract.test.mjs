import assert from 'node:assert/strict'
import test from 'node:test'

import { importTypescript } from './import-typescript.mjs'

const { createCollapseGroup, createDataConfigGroup, createSimpleConfigure, createStandardConfigure } =
  await importTypescript(new URL('../packages/shared/src/configure/index.ts', import.meta.url))

const countFieldsByName = (fields, name) =>
  fields.reduce(
    (count, field) =>
      count + (field.name === name ? 1 : 0) + (Array.isArray(field.items) ? countFieldsByName(field.items, name) : 0),
    0,
  )

const findFieldByName = (fields, name) => {
  for (const field of fields) {
    if (field.name === name) {
      return field
    }
    if (Array.isArray(field.items)) {
      const nestedField = findFieldByName(field.items, name)
      if (nestedField) {
        return nestedField
      }
    }
  }
}

test('collapse groups are real, open-by-default sections', () => {
  const group = createCollapseGroup('内容', [])

  assert.equal(group.setter.componentName, 'CollapseSetter')
  assert.equal(group.setter.props.icon, true)
  assert.equal(group.setter.props.defaultOpen, true)
})

test('standard configure exposes node information once and keeps stable tabs', () => {
  const componentGroup = createCollapseGroup('内容', [{ name: 'text', title: '文本', setter: 'StringSetter' }])
  const dataGroup = createDataConfigGroup([{ name: 'value', label: '数值', type: 'number', required: true }])
  const configure = createStandardConfigure(componentGroup, dataGroup)

  assert.equal(countFieldsByName(configure.props, 'nodeInfo'), 1)
  assert.equal(countFieldsByName(configure.props, 'condition'), 1)
  assert.deepEqual(
    configure.props[1].items.map(item => [item.key, item.title]),
    [
      ['config', '属性'],
      ['data', '数据'],
      ['advanced', '高级'],
    ],
  )
  assert.equal(countFieldsByName(configure.props, 'emptyBehavior'), 1)
  assert.equal(countFieldsByName(configure.props, 'emptyText'), 1)

  assert.deepEqual(findFieldByName(configure.props, 'title').extraProps.agent, {
    access: 'read-write',
    fieldId: 'shared.title',
    readPath: ['extra', 'title'],
    unsetTargets: [{ path: ['extra', 'title'] }],
    valueSchema: { type: 'string' },
    verifyPaths: [['extra', 'title']],
    writeTargets: [{ path: ['extra', 'title'] }],
  })

  const dataCapability = findFieldByName(configure.props, '$data').extraProps.agent
  assert.equal(dataCapability.fieldId, 'data.config')
  assert.equal(dataCapability.valueSchema.type, 'object')
  assert.equal(dataCapability.valueSchema.properties.staticData.items.required[0], 'value')

  assert.deepEqual(findFieldByName(configure.props, 'events').extraProps.agent, {
    access: 'read-only',
    fieldId: 'events.binding',
    readPath: ['props', 'events'],
    verifyPaths: [['props', 'events']],
  })
})

test('simple configure also avoids repeated global fields', () => {
  const componentGroup = createCollapseGroup('内容', [{ name: 'text', title: '文本', setter: 'StringSetter' }])
  const configure = createSimpleConfigure(componentGroup)

  assert.equal(countFieldsByName(configure.props, 'nodeInfo'), 1)
  assert.deepEqual(
    configure.props[1].items.map(item => item.key),
    ['config', 'advanced'],
  )
})
