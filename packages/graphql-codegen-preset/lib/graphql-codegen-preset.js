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
  .option('--watch, -w', '监听代码变更自动生成代码')

program.parse()

log('FgCyan', 'codegen.yml 准备中...')

// console.log('string: ', program.args[0])
// console.log('Options: ', program.opts())

const cwdUrl = process.cwd()
const cacheDir = path.join(cwdUrl, 'node_modules/.fruits-chain')
const realCodegenPath = path.join(cacheDir, 'codegen.yml')

fsPromises
  .readFile(path.join(__dirname, 'codegen.yml'))
  .then(async s => {
    let fileStr = s.toString()

    // 替换 SCHEMA_PATH
    fileStr = fileStr.replace(/\$\{SCHEMA_PATH\}/, program.args[0])

    // 是否监听
    fileStr = fileStr.replace(/watch\: true/, `watch: ${!!program.opts().W}`)

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
