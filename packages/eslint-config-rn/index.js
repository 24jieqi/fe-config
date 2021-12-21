// "off" 或 0 - 关闭规则
// "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
// "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

module.exports = {
  root: true,

  extends: '@fruits-chain/eslint-config-preset',

  plugins: ['react', 'react-native'],

  env: {
    'react-native/react-native': true,
  },

  rules: {
    // eslint-plugin-react-native  ---  start
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 0,
    'react-native/no-single-element-style-arrays': 2,
    // eslint-plugin-react-native  ---  end
    complexity: ['error', 100],
    'no-param-reassign': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
  },

  settings: {
    'react-native/style-sheet-object-names': [
      'EStyleSheet',
      'OtherStyleSheet',
      'PStyleSheet',
    ],
  },

  // Map from global var to bool specifying if it can be redefined
  globals: {
    __DEV__: true,
    __dirname: false,
    __fbBatchedBridgeConfig: false,
    AbortController: false,
    alert: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: true,
    clearInterval: false,
    clearTimeout: false,
    console: false,
    document: false,
    ErrorUtils: false,
    escape: false,
    Event: false,
    EventTarget: false,
    exports: false,
    fetch: false,
    FileReader: false,
    FormData: false,
    global: false,
    Headers: false,
    Intl: false,
    Map: true,
    module: false,
    navigator: false,
    process: false,
    Promise: true,
    requestAnimationFrame: true,
    requestIdleCallback: true,
    require: false,
    Set: true,
    setImmediate: true,
    setInterval: false,
    setTimeout: false,
    queueMicrotask: true,
    URL: false,
    URLSearchParams: false,
    WebSocket: true,
    window: false,
    XMLHttpRequest: false,
  },
}
