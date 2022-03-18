import { strict as assert } from 'assert'

import DesignTokensBailu from '@fruits-chain/design-tokens-bailu'
import DesignTokensBailuAntdModify from '@fruits-chain/design-tokens-bailu/lib/antd-modify.js'
import DesignTokensBailuVar from '@fruits-chain/design-tokens-bailu/lib/e-stylesheet.js'

import colorJSON from '../json/color/index.json'

// 颜色
console.log('颜色开始校准')
console.log(DesignTokensBailuAntdModify)

Object.keys(colorJSON.color).forEach(key => {
  const underlineKey = key.replace(/\-/g, '_')
  const value = colorJSON.color[key] as {
    hex: string
    rgba: string
  }
  let _value: string | number

  if (/^opacity\-\d*/.test(key)) {
    const rgba = value.rgba.match(/\d+(\.\d+)?/g)
    _value = Math.floor(+rgba[3]) / 100
  } else {
    _value = value.hex.toLocaleUpperCase()
  }

  assert.strictEqual(
    _value,
    DesignTokensBailu[underlineKey],
    `颜色 ${underlineKey} 不对劲`,
  )
  assert.strictEqual(
    _value,
    DesignTokensBailuVar[`$${underlineKey}`],
    `stylesheet 变量 $${underlineKey} 不对劲`,
  )
})
