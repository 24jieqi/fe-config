<h1 align="center">GraphQL Codegen Preset</h1>

<div align="center">
24jieqi 团队 graphql-codegen 通用方案
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

## 参数

### --watch

> fruits-chain-gc http://xx/graphql -w 或 fruits-chain-gc http://xx/graphql --watch

监听代码变更自动生成代码

### --ignore-eslint

> fruits-chain-gc http://xx/graphql -ie 或 fruits-chain-gc http://xx/graphql --ignore-eslint

生成代码后自动 eslint，默认不做 eslint，如果需要命令为 `fruits-chain-gc http://xx/graphql --no-ignore-eslint`

### --folder

> fruits-chain-gc http://xx/graphql -f gg 或 fruits-chain-gc http://xx/graphql --folder gg

自定义 graphql 文件夹，默认值 `src/graphql`

### --schema

> fruits-chain-gc http://xx/graphql -s gg 或 fruits-chain-gc http://xx/graphql --schema gg

自定义 schema.graphql 文件夹，默认值 `generated`，文件保存路径：`${F}/${S}/schema.graphql`

### --types

> fruits-chain-gc http://xx/graphql -t tt 或 fruits-chain-gc http://xx/graphql --types tt

自定义 types.ts 文件夹，默认值 `generated`，文件保存路径：`${F}/${T}/types.ts`

### --documents

> fruits-chain-gc http://xx/graphql -d gqls 或 fruits-chain-gc http://xx/graphql --documents gqls

自定义 .gql 文件夹，默认值 `operations`，文件保存路径：`${F}/${D}/**/**.gql`

### --scalars

> fruits-chain-gc http://xx/graphql --scalars BigDecimal:number ID:string

自定义 GraphQL 类型转换

### --schema-ast-f

> fruits-chain-gc http://xx/graphql -saf 或 fruits-chain-gc http://xx/graphql --schema-ast-f

使用 `@fruits-chain/schema-ast` 插件，GraphQL 接口必须有一个 `_service` 的接口返回全量 schema 字符串。