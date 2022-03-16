import prettierConfigPreset from '@fruits-chain/prettier-config-preset'
import * as prettier from 'prettier'

import { joinCode } from '../helper'
import type { VarValue } from '../typing'

export const cssGen = (varJSON: VarValue[][]) => {
  const values: string[] = []

  varJSON.forEach(vars => {
    vars.forEach(item => {
      const _value =
        typeof item.value === 'string' || /^opacity\-\d*/.test(item.label)
          ? `${item.value}`
          : `${item.value}px`

      values.push(`--${item.label}: ${_value};`)
    })
  })

  return prettier.format(`:root {${joinCode(values)}}`, {
    ...prettierConfigPreset,
    parser: 'css',
  })
}
