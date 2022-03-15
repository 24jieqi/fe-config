import type { UtilsValue, VarValue } from '../typing'

export const utilsParse = (utilsJSON: Record<string, UtilsValue>) => {
  const values: VarValue[] = []

  Object.entries(utilsJSON).forEach(([key, value]) => {
    if (/^space\-\d*/.test(key)) {
      const { spacer } = value as { spacer: number }
      const _spacer = Math.floor(spacer)

      values.push({
        value: _spacer,
        label: key,
        desc: '间距',
      })
    }

    if (/^radius\-/.test(key)) {
      const { radius } = value as { radius: number[] }
      const _value = /\max/.test(key) ? 9999 : radius[0]

      values.push({
        value: _value,
        label: key,
        desc: '圆角',
      })
    }
  })

  return values
}
