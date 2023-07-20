// "off" 或 0 - 关闭规则
// "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
// "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['import'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  // 解决 TypeScript 内置类型 no-undef
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
        'default-case': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        'no-dupe-class-members': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        'no-undef': 'off',
        // 'react/jsx-fragments': ['error', 'syntax'],
      },
    },
  ],
  rules: {
    // 自定义你的规则
    // interface 是一个空，继承其他申明可能不会做扩展
    '@typescript-eslint/no-empty-interface': 0,
    // 数据转换 !!var +var
    'no-implicit-coercion': 0,
    'import/order': [
      1,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/default': 0,
    /**
     * 禁止变量名与上层作用域内的已定义的变量重复
     */
    '@typescript-eslint/no-shadow': 2,
    /**
     * 必须使用 import type 导入类型
     */
    '@typescript-eslint/consistent-type-imports': 1,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      // 使用 TypeScript parser
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/extensions': ['.js', '.jsx', 'ts', 'tsx'],
  },
  parserOptions: {
    project: true,
  },
}
