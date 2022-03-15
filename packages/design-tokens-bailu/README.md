<h1 align="center">Design Tokens Bailu</h1>

<div align="center">
洪九果品前端团队白露设计规范变量
</div>

[design-tokens-bailu]: https://www.npmjs.com/package/@fruits-chain/design-tokens-bailu

<div align="center">

[![](https://img.shields.io/npm/v/@fruits-chain/design-tokens-bailu)][design-tokens-bailu]
[![](https://img.shields.io/npm/dm/@fruits-chain/design-tokens-bailu.svg)][design-tokens-bailu]
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 使用方式

```bash
yarn add @fruits-chain/design-tokens-bailu --dev
```

### 小暑

```tsx
import React from 'react'

import DesignTokensBailu from '@fruits-chain/design-tokens-bailu'
import DesignTokensBailuVar from '@fruits-chain/design-tokens-bailu/e-stylesheet'
import { Provider } from '@fruits-chain/react-native-xiaoshu'

import EStyleSheet from '@/lib/react-native-extended-stylesheet'

EStyleSheet.build({
  // $开头，_符号链接
  ...DesignTokensBailuVar,
})

import Routes from './routes'

const App = () => {
  return (
    <Provider theme={DesignTokensBailu}>
      <Routes />
    </Provider>
  )
}

export default App
```

### Antd

> craco.config.js

```js
import DesignTokensBailuAntdModify from '@fruits-chain/design-tokens-bailu/antd-modify'
import DesignTokensBailuLessGlobal from '@fruits-chain/design-tokens-bailu/less-global'
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            globalVars: {
              // -符号链接
              ...DesignTokensBailuLessGlobal,
            },
            modifyVars: {
              ...DesignTokensBailuAntdModify,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
```

### AntdMobile

```tsx
import React from 'react'

// 注入基础变量
import '@fruits-chain/design-tokens-bailu/index.css'

// 覆盖 mobile
import '@fruits-chain/design-tokens-bailu/antd-mobile.css'

import Routes from './routes'

const App = () => {
  return <Routes />
}

export default App
```
