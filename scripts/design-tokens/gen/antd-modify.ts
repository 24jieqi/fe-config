import prettierConfigPreset from '@fruits-chain/prettier-config-preset'
import * as prettier from 'prettier'

import { joinCode } from '../helper'

export interface AntdModifyGenOption {
  esm?: boolean
}

export const antdModifyGen = ({ esm }: AntdModifyGenOption) => {
  const values: string[][] = [
    ['@primary-color', 'TOKENS.brand_6'],
    ['@success-color', 'TOKENS.green_6'],
    ['@warning-color', 'TOKENS.yellow_6'],
    ['@error-color', 'TOKENS.red_6'],
    ['@border-color-base', 'TOKENS.gray_2'],
    ['@border-color-split', 'TOKENS.gray_4'],
    // eslint-disable-next-line no-template-curly-in-string
    ['@border-radius-base', '`${TOKENS.radius_s}px`'],
  ]

  const code = joinCode(
    values.map(config => {
      return `"${config[0]}": ${config[1]},`
    }),
  )

  if (esm) {
    return prettier.format(
      `
    import TOKENS from './index.mjs';
    
    export default {${code}}
    `,
      {
        ...prettierConfigPreset,
        parser: 'babel',
      },
    )
  }

  return prettier.format(
    `
  const TOKENS = require('./index.js');

  module.exports = {${code}}
  
  `,
    {
      ...prettierConfigPreset,
      parser: 'babel',
    },
  )
}
