import type { TypographyValue, VarValue } from '../typing'

export const typographyParse = (
  typographyJSON: Record<string, TypographyValue>,
) => {
  const values: VarValue[] = []

  Object.entries(typographyJSON).forEach(([key, value]) => {
    if (/^size\-\d*/.test(key)) {
      const _value = value['font-size'].value

      values.push({
        value: _value,
        label: `font-${key}`,
        desc: '字体大小',
      })
    }

    if (/^line\-height\-\d*/.test(key)) {
      const _value = value['line-height'].value

      values.push({
        value: _value,
        label: key,
        desc: '行高',
      })
    }
  })

  return values
}
