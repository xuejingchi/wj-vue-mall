module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // 禁用分号
    semi: [1, 'never'],
    // 禁止使用console(发布前排查)
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
    // 禁止未使用未定义的变量
    'no-unused-vars': ['warn', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false,
      'argsIgnorePattern': '^_'
    }],
    // 未使用过的表达式不允许使用
    'no-unused-expressions': 0,
    // 模块只有一个导出时，请使用默认导出而不是命名的导出
    'import/prefer-default-export': 0,
    // 禁止使用拖尾逗号
    'comma-dangle': ['error', 'only-multiline'],
    // 函数规范(http://eslint.cn/docs/rules/space-before-function-paren)
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'ignore',
      'asyncArrow': 'always'
    }],
    // 禁止循环中创建函数
    'no-loop-func': 0,
    // 禁止对函数参数再赋值
    'no-param-reassign': 0,
    // 禁止使用continue
    'no-continue': 0,
    // 单引号命名
    'quotes': ['error', 'single'],
    // 字符串拼接方式
    'prefer-template': 2,
    // switch中case不能重复
    'no-duplicate-case': 2,
    // parseInt必须指定第二个参数
    'radix': 2,
    // 驼峰命名
    'camelcase': 2
  }
};
