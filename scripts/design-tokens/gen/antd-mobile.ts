import prettierConfigPreset from '@fruits-chain/prettier-config-preset'
import * as prettier from 'prettier'

export const antdMobileGen = () => {
  return prettier.format(
    `:root:root {
      --adm-color-primary: var(--brand-6);
      --adm-color-success: var(--green-6);
      --adm-color-warning: var(--yellow-6);
      --adm-color-danger: var(--red-6);
      --adm-color-white: var(--brand-6);
      --adm-border-color: var(--gray-4);
      --adm-font-size-main: var(--font-size-2);
      --adm-color-text: var(--gray-6);
  }`,
    {
      ...prettierConfigPreset,
      parser: 'css',
    },
  )
}
