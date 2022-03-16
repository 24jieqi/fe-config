import prettierConfigPreset from '@fruits-chain/prettier-config-preset'
import * as prettier from 'prettier'

import { formatKey, joinCode, comments } from '../helper'
import type { VarValue } from '../typing'

export interface JSGenOption {
  esm?: boolean
  stylesheet?: boolean
  less?: boolean
}

export const jsGen = (
  varJSON: VarValue[][],
  { esm, stylesheet, less }: JSGenOption,
) => {
  const values: string[] = []

  varJSON.forEach(vars => {
    vars.forEach(item => {
      // less 的数字需要加 px
      const _value =
        typeof item.value === 'string'
          ? `'${item.value}'`
          : less && !/^opacity\-\d*/.test(item.label)
          ? `'${item.value}px'`
          : `${item.value}`
      const _key = less
        ? `'${item.label}'`
        : `${stylesheet ? '$' : ''}${formatKey(item.label)}`

      values.push(comments(item.desc, _value))
      values.push(`${_key}: ${_value},`)
    })
  })

  const code = joinCode(values)

  if (esm) {
    return prettier.format(`export default {${code}}`, {
      ...prettierConfigPreset,
      parser: 'babel',
    })
  }

  return prettier.format(`module.exports = {${code}}`, {
    ...prettierConfigPreset,
    parser: 'babel',
  })
}
