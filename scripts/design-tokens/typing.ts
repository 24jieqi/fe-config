export interface VarValue {
  value: string | number
  label: string
  desc: string
}

export interface ColorValue {
  hex: string
  rgba: string
}

export interface TypographyValue {
  'font-size': {
    value: number
  }
  'line-height': {
    value: number
  }
}

export interface UtilsValue {
  spacer: number
  radius: [number, number, number, number]
}
