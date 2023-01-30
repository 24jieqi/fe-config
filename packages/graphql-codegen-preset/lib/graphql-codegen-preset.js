#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')

const { Command } = require('commander')
const spawn = require('cross-spawn')

const packageJSON = require('../package.json')
const program = new Command()

const COLOR_MAP = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
}

const buildMsg = s => `[${packageJSON.name}]: ${s}`

/**
 * 打印日志
 * @param {keyof typeof COLOR_MAP} type
 * @param {string} m
 */
const log = (type, m) => {
  console.log(COLOR_MAP[type], buildMsg(m), COLOR_MAP.Reset)
}

program
  .name(packageJSON.name)
  .description(packageJSON.description)
  .version(packageJSON.version)

program
  .description('graphql-codegen 快捷命令')
  .argument('<string>', '业务系统 graphql url')
  .option('--watch, -w', '监听代码变更自动生成代码', false)
  .option('--ignore-eslint, -ie', '生成代码后不做 eslint', true)
  .option('--no-ignore-eslint, -nie', '生成代码后做 eslint')
  .option(
    '--folder, -f <folder>',
    '自定义 graphql 文件夹，默认值 `src/graphql`',
    'src/graphql',
  )
  .option(
    '--schema, -s <schema>',
    // eslint-disable-next-line no-template-curly-in-string
    '自定义 schema.graphql 文件夹，默认值 `generated`，文件保存路径：${F}/${S}/schema.graphql',
    'generated',
  )
  .option(
    '--types, -t <types>',
    // eslint-disable-next-line no-template-curly-in-string
    '自定义 types.ts 文件夹，默认值 `generated`，文件保存路径：${F}/${T}/types.ts',
    'generated',
  )
  .option(
    '--documents, -d <types>',
    // eslint-disable-next-line no-template-curly-in-string
    '自定义 .gql 文件夹，默认值 `operations`，文件保存路径：${F}/${D}/**/**.gql',
    'operations',
  )

program.parse()

log('FgCyan', 'codegen.yml 准备中...')

const cwdUrl = process.cwd()
const cacheDir = path.join(cwdUrl, 'node_modules/.fruits-chain')
const realCodegenPath = path.join(cacheDir, 'codegen.yml')

fsPromises
  .readFile(path.join(__dirname, 'codegen.yml'))
  .then(async s => {
    let fileStr = s.toString()

    const { W, F, S, T, D, Ie, Nie } = program.opts()

    const VAR_MAP = {
      SCHEMA_PATH: program.args[0],
      FOLDER_PATH: F,
      SCHEMA_GRAPHQL_PATH: `${F}/${S}/schema.graphql`,
      TYPES_PATH: `${F}/${T}/types.ts`,
      DOCUMENTS_PATH: `${F}/${D}/**/**.gql`,
      BASE_TYPES_PATH: `${T}/types.ts`,
      WATCH: W ? 'true' : 'false',
      ESLINT: Nie || !Ie ? '- npx --no-install eslint --fix' : '',
    }

    Object.entries(VAR_MAP).forEach(([key, value]) => {
      const r = new RegExp('#{' + key + '}')
      fileStr = fileStr.replace(r, value)
    })

    log('FgCyan', 'codegen.yml 配置构建完成')

    // 是否存在缓存文件夹
    const cacheStat = fs.existsSync(cacheDir)
    if (!cacheStat) {
      fs.mkdirSync(cacheDir)
    }

    return fsPromises.writeFile(realCodegenPath, fileStr)
  })
  .then(() => {
    log('FgCyan', '启动 graphql-codegen')

    spawn.sync('graphql-codegen', ['-c', realCodegenPath], {
      stdio: 'inherit',
    })
  })
