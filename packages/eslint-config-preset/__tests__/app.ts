import { ESLint } from 'eslint'

const main = async () => {
  const eslint = new ESLint()

  const results = await eslint.lintFiles([`${__dirname}/code/**/*.tsx`])

  const formatter = await eslint.loadFormatter('stylish')
  const resultText = formatter.format(results)

  console.log('resultText  ====>  start')
  console.log(resultText)
  console.log('resultText  ====>  end')
}

main().catch(error => {
  process.exitCode = 1
  console.error(error)
})
