<h1 align="center">ESLint Config Preset</h1>

<div align="center">
洪九果品前端团队 React 项目 ESLint 规则
</div>

[eslint-config-preset]: https://www.npmjs.com/package/@fruits-chain/eslint-config-preset

<div align="center">

[![](https://img.shields.io/npm/v/@fruits-chain/eslint-config-preset)][eslint-config-preset]
[![](https://img.shields.io/npm/dm/@fruits-chain/eslint-config-preset.svg)][eslint-config-preset]
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 使用方式

```bash
yarn add @fruits-chain/eslint-config-preset --dev
```

```js
// .eslintrc.js
module.exports = {
  extends: ['@fruits-chain/eslint-config-preset'],
  rules: {
    // 自定义你的规则
  },
}
```

项目统一使用 prettier 2.x

> package.json

```json
{
  "resolutions": {
    "prettier": "^2.5.1"
  }
}
```
