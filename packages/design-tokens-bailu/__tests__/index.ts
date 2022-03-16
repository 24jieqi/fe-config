import { strict as assert } from 'assert'

import DesignTokensBailu from '@fruits-chain/design-tokens-bailu'
import DesignTokensBailuVar from '@fruits-chain/design-tokens-bailu/lib/e-stylesheet.js'

// import colorJSON from '../json/color/index.json'

console.log(DesignTokensBailu.brand_6)
console.log(DesignTokensBailuVar.$brand_6)
// console.log(colorJSON)

assert.equal(DesignTokensBailu.brand_6, DesignTokensBailuVar.$brand_6)
