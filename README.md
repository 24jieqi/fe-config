<h1 align="center">24jieqi FE config</h1>

<div align="center">
24jieqi 团队前端编码配置
</div>

<div align="center">

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 使用方式

### 安装依赖

```bash
yarn bootstrap
```

### 清除各个库的 node_modules

```bash
yarn clean
```

### 新增库

```bash
## @fruits-chain/eslint-config-preset 即 NPM 的模块名称
lerna create @fruits-chain/eslint-config-preset

## 接下来一路回车就好，会生成初始化模板文件
```

### 添加依赖

```bash
## 对某个库添加第三方依赖
## 似乎只能安装一个一个添加
## @fruits-chain/eslint-config-preset 即 packages 文件夹内某个 package.json 的 name 值
## --dev devDependencies
## --peer peerDependencies
## 更多阅读 -> https://github.com/lerna/lerna/tree/main/commands/add
lerna add father-build --scope=@fruits-chain/eslint-config-preset --dev
```
