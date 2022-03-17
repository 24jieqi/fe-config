import prettierConfigPreset from '@fruits-chain/prettier-config-preset'
import * as prettier from 'prettier'

import { formatKey, joinCode, comments } from '../helper'
import type { VarValue } from '../typing'

export const typesGen = async (varJSON: VarValue[][]) => {
  const values: string[] = []

  varJSON.forEach(vars => {
    vars.forEach(item => {
      const _key = formatKey(item.label)

      values.push(comments(item.desc, `${item.value}`))
      values.push(`${_key}: ${typeof item.value}`)
    })
  })

  const code = joinCode(values)

  return prettier.format(
    `
  interface TOKES {${code}}

  const tokens: TOKES

  export = tokens
  `,
    {
      ...prettierConfigPreset,
      parser: 'typescript',
    },
  )
}
