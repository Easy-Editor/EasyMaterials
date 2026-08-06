import type { CompositeValue, JSONObject } from '@easy-editor/core'
import { generateStaticDataSource } from '../src/datasource'

interface TypedRow extends JSONObject {
  name: string
  value: number
}

const typedRows: TypedRow[] = [{ name: 'A', value: 1 }]

export const literalDataSource: CompositeValue = generateStaticDataSource({ text: 'hello' })
export const arrayDataSource: CompositeValue = generateStaticDataSource(typedRows)
