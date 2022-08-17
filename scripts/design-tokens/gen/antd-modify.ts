import { minify } from 'terser'

import { joinCode } from '../helper'

export interface AntdModifyGenOption {
  esm?: boolean
}

export const antdModifyGen = async ({ esm }: AntdModifyGenOption) => {
  const values: string[][] = [
    ['@primary-color', 'TOKENS.brand_6'],
    ['@success-color', 'TOKENS.green_6'],
    ['@warning-color', 'TOKENS.yellow_6'],
    ['@error-color', 'TOKENS.red_6'],
    // ['@border-color-base', 'TOKENS.gray_2'],
    // ['@border-color-split', 'TOKENS.gray_4'],
    // eslint-disable-next-line no-template-curly-in-string
    ['@card-radius', '`${TOKENS.border_radius_s}px`'],
  ]

  const code = joinCode(
    values.map(config => {
      return `"${config[0]}": ${config[1]},`
    }),
  )

  const output = esm
    ? `
  import TOKENS from './index.mjs';
  
  export default {${code}}
  `
    : `
    const TOKENS = require('./index.js');
  
    module.exports = {${code}}
    
    `

  const result = await minify(output, { sourceMap: false })

  return result.code || ''
}
