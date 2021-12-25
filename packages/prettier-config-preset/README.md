<h1 align="center">Prettier Config Preset</h1>

<div align="center">
洪九果品前端团队 prettier 规则
</div>

[prettier-config-preset]: https://www.npmjs.com/package/@fruits-chain/prettier-config-preset

<div align="center">

[![](https://img.shields.io/npm/v/@fruits-chain/prettier-config-preset)][prettier-config-preset]
[![](https://img.shields.io/npm/dm/@fruits-chain/prettier-config-preset.svg)][prettier-config-preset]
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 使用方式

```bash
yarn add @fruits-chain/prettier-config-preset --dev
```

### package.json

```json
{
  "prettier": "@fruits-chain/prettier-config-preset"
}
```

### .prettierrc.js

```js
module.exports = {
  ...require("@fruits-chain/prettier-config-preset"),
  semi: true,
}
```
