import { minify } from 'terser'

import { formatKey, joinCode } from '../helper'
import type { VarValue } from '../typing'

export interface JSGenOption {
  esm?: boolean
  stylesheet?: boolean
  less?: boolean
}

export const jsGen = async (
  varJSON: VarValue[][],
  { esm, stylesheet, less }: JSGenOption,
) => {
  const values: string[] = []

  varJSON.forEach(vars => {
    vars.forEach(item => {
      // less 的数字需要加 px, less 所有值都应该是字符串
      const _value =
        typeof item.value === 'string'
          ? `'${item.value}'`
          : less
            ? !/^opacity\-\d*/.test(item.label)
              ? `'${item.value}px'`
              : `'${item.value}'`
            : `${item.value}`
      const _key = less
        ? `'${item.label}'`
        : `${stylesheet ? '$' : ''}${formatKey(item.label)}`

      values.push(`${_key}: ${_value},`)
    })
  })

  const code = esm
    ? `export default {${joinCode(values)}}`
    : `module.exports = {${joinCode(values)}}`

  const result = await minify(code, { sourceMap: false })

  return result.code || ''
}
