import fs from 'fs/promises'
import path from 'path'

import { antdMobileGen } from './gen/antd-mobile'
import { antdModifyGen } from './gen/antd-modify'
import { cssGen } from './gen/css'
import type { JSGenOption } from './gen/js'
import { jsGen } from './gen/js'
import { typesGen } from './gen/types'
import { log } from './helper'
import { colorParse } from './parse/color'
import { typographyParse } from './parse/typography'
import { utilsParse } from './parse/utils'
import type { ColorValue, TypographyValue, UtilsValue } from './typing'

const [TARGET_NAME] = process.argv.splice(2)
const BASE_DIR = path.join(
  __dirname,
  `../../packages/design-tokens-${TARGET_NAME}`,
)
const BASE_JSON_DIR = path.join(BASE_DIR, 'json')
const OUT_DIR = path.join(BASE_DIR, 'lib')

log(
  'FgMagenta',
  `当前将要生成 @fruits-chain/design-tokens-${TARGET_NAME} 的代码`,
)
log('FgWhite', `生成代码文件夹：${BASE_DIR}`)
log('FgWhite', `变量 JSON 文件夹：${BASE_JSON_DIR}`)

const startGenerate = async () => {
  log('FgYellow', '准备读取 JSON 文件内容')

  const [colorJSON, typographyJSON, utilsJSON] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(path.join(BASE_JSON_DIR, 'color/index.json')) as {
      color: Record<string, ColorValue>
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(path.join(BASE_JSON_DIR, 'typography/index.json')) as {
      typography: Record<string, TypographyValue>
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(path.join(BASE_JSON_DIR, 'utils/index.json')) as {
      utils: Record<string, UtilsValue>
    },
  ])

  const [colorVars, typographyVars, utilsVars] = await Promise.all([
    colorParse(colorJSON.color),
    typographyParse(typographyJSON.typography),
    utilsParse(utilsJSON.utils),
  ])

  // 生成 JavaScript 相关代码
  const genJavaScriptFile = async (filename: string, option: JSGenOption) => {
    log('FgBlue', `准备生成 ${filename}`)

    const code = await jsGen([colorVars, typographyVars, utilsVars], option)

    await fs.writeFile(path.join(OUT_DIR, filename), code)

    log('FgGreen', `完成 ${filename}`)
  }

  const genCustomFile = async (
    filename: string,
    getCode: () => Promise<string>,
  ) => {
    log('FgBlue', `准备生成 ${filename}`)

    const code = await getCode()

    await fs.writeFile(path.join(OUT_DIR, filename), code)

    log('FgGreen', `完成 ${filename}`)
  }

  // esm 暂时不生产，没有招到合适的方式动态加载

  await Promise.all([
    genJavaScriptFile('index.js', {}),
    // genJavaScriptFile('index.mjs', { esm: true }),
    genJavaScriptFile('e-stylesheet.js', { stylesheet: true }),
    // genJavaScriptFile('e-stylesheet.mjs', { stylesheet: true, esm: true }),
    genJavaScriptFile('less-global.js', { less: true }),
    // genJavaScriptFile('less-global.mjs', { less: true, esm: true }),
    genCustomFile('index.css', () =>
      cssGen([colorVars, typographyVars, utilsVars]),
    ),
    genCustomFile('antd-mobile.css', () => antdMobileGen()),
    genCustomFile('antd-modify.js', () => antdModifyGen({})),
    // genCustomFile('antd-modify.mjs', () => antdModifyGen({ esm: true })),
    genCustomFile('index.d.ts', () =>
      typesGen([colorVars, typographyVars, utilsVars]),
    ),
  ])
}

startGenerate()
