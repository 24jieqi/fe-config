<h1 align="center">StyleLint Config Preset</h1>

<div align="center">
24jieqi 团队 StyleLint 规则
</div>

[stylelint-config-preset]: https://www.npmjs.com/package/@fruits-chain/stylelint-config-preset

<div align="center">

[![](https://img.shields.io/npm/v/@fruits-chain/stylelint-config-preset)][stylelint-config-preset]
[![](https://img.shields.io/npm/dm/@fruits-chain/stylelint-config-preset.svg)][stylelint-config-preset]
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 使用方式

```bash
yarn add @fruits-chain/stylelint-config-preset --dev
```

### stylelint.json

```json
{
  "stylelint": {
    "extends": "@fruits-chain/stylelint-config-preset"
  }
}
```

### stylelint.config.js

```js
module.exports = {
  extends: ['@fruits-chain/stylelint-config-preset'],
}
```
