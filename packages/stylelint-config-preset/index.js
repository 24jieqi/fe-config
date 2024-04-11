module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  customSyntax: 'postcss-less',
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-prettier',
  ],
  rules: {
    'prettier/prettier': true,
    'function-name-case': ['lower', { ignoreFunctions: ['/colorPalette/'] }],
    'no-descending-specificity': null,
    'no-invalid-position-at-import-rule': null,
    'declaration-empty-line-before': null,
    'keyframes-name-pattern': null,
    'custom-property-pattern': null,
    'number-max-precision': 8,
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [/~`\w*/, 'fade', 'lightness'],
      },
    ],
    // 兼容 prettier
    // // 颜色指定大写
    // 'color-hex-case': 'upper',
    // 禁止空块
    'block-no-empty': true,
    // 颜色6位长度
    'color-hex-length': 'long',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    // 不验证@未知的名字，为了兼容scss的函数
    'at-rule-no-unknown': null,
    // 禁止空注释
    'comment-no-empty': true,
    // 禁止简写属性的冗余值
    'shorthand-property-no-redundant-values': true,
    // 禁止值的浏览器引擎前缀
    'value-no-vendor-prefix': true,
    // property-no-vendor-prefix
    'property-no-vendor-prefix': true,
    // 兼容 prettier
    // // 禁止小于 1 的小数有一个前导零
    // 'number-leading-zero': 'never',
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
  },
}
