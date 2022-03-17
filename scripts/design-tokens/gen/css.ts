import CleanCSS from 'clean-css'

import { joinCode } from '../helper'
import type { VarValue } from '../typing'

export const cssGen = async (varJSON: VarValue[][]) => {
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

  return new CleanCSS().minify(`:root {${joinCode(values)}}`).styles
}
