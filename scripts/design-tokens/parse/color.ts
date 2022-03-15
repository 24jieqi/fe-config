import type { ColorValue, VarValue } from '../typing'

export const colorParse = (colorJSON: Record<string, ColorValue>) => {
  const values: VarValue[] = []

  Object.entries(colorJSON).forEach(([key, value]) => {
    if (/^opacity\-\d*/.test(key)) {
      const rgba = value.rgba.match(/\d+(\.\d+)?/g)
      if (rgba && rgba.length === 4) {
        const _value = Math.floor(+rgba[3]) / 100
        values.push({
          value: _value,
          label: key,
          desc: '透明度',
        })
      }
    } else {
      values.push({
        value: value.hex.toLocaleUpperCase(),
        label: key,
        desc: '色彩',
      })
    }
  })

  return values
}
