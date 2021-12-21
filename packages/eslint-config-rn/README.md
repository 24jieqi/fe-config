<h1 align="center">ESLint Config React Native</h1>

<div align="center">
洪九果品前端团队 React Native 项目 ESLint 规则
</div>

[eslint-config-rn]: https://www.npmjs.com/package/@fruits-chain/eslint-config-rn

<div align="center">

[![](https://img.shields.io/npm/v/@fruits-chain/eslint-config-rn)][eslint-config-rn]
[![](https://img.shields.io/npm/dm/@fruits-chain/eslint-config-rn.svg)][eslint-config-rn]
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 使用方式

```bash
yarn add @fruits-chain/eslint-config-rn --dev
```

```js
// .eslintrc.js
module.exports = {
  extends: ['@fruits-chain/eslint-config-rn'],
  rules: {
    // 自定义你的规则
  },
}
```

项目统一使用 prettier 2.x

```json
// package.json
{
  "resolutions": {
    "prettier": "^2.5.1"
  }
}
```
