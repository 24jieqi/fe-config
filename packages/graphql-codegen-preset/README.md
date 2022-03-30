<h1 align="center">GraphQL Codegen Preset</h1>

<div align="center">
洪九果品前端团队 graphql-codegen 通用方案
</div>

[graphql-codegen-preset]: https://www.npmjs.com/package/@fruits-chain/graphql-codegen-preset

<div align="center">

[![](https://img.shields.io/npm/v/@fruits-chain/graphql-codegen-preset)][graphql-codegen-preset]
[![](https://img.shields.io/npm/dm/@fruits-chain/graphql-codegen-preset.svg)][graphql-codegen-preset]
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 使用方式

```bash
## graphql-codegen
yarn add @fruits-chain/graphql-codegen-preset --dev

## graphql 相关
yarn add @apollo/client graphql
```

在 `package.json` 中添加 `scripts`。

```json
{
  "gen:graphql-codegen": "fruits-chain-gc http://192.168.10.233:9406/graphql",
  "gen:graphql-codegen:w": "fruits-chain-gc http://192.168.10.233:9406/graphql -w"
}
```
