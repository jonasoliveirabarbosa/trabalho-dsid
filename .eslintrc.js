module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/require-prop-types': 0,
    'import/extensions': ['error', 'never', {
      js: 'never',
      vue: 'never',
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
    'no-restricted-syntax': [0, 'ForInStatement', 'ForOfStatement'],
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    semi: [
      'error',
      'never',
    ],
    'no-return-assign': ['error', 'except-parens'],
  },
}
