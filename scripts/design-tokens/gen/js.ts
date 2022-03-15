import prettierConfigPreset from '@fruits-chain/prettier-config-preset'
import * as prettier from 'prettier'

import { formatKey, joinCode, comments } from '../helper'
import type { VarValue } from '../typing'

export interface JSGenOption {
  esm?: boolean
  stylesheet?: boolean
}

export const jsGen = (
  varJSON: VarValue[][],
  { esm, stylesheet }: JSGenOption,
) => {
  const values: string[] = []

  varJSON.forEach(vars => {
    vars.forEach(item => {
      const _value =
        typeof item.value === 'string' ? `'${item.value}'` : `${item.value}`

      values.push(comments(item.desc, _value))
      values.push(
        `${stylesheet ? '$' : ''}${formatKey(item.label)}: ${_value},`,
      )
    })
  })

  if (esm) {
    return prettier.format(
      `export default {${joinCode(values)}}`,
      prettierConfigPreset,
    )
  }

  return prettier.format(
    `module.exports = {${joinCode(values)}}`,
    prettierConfigPreset,
  )
}
