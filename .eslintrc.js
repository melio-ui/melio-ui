module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
    // 'plugin:storybook/recommended', // 스토리북 설정하면서 자동생성됨. 일단 주석처리하고 자세한 것은 추후에 확인해보자
  ],
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
    // tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // || 를 ?? 로 바꾸라고 해서 일단 off 설정함. 좀 더 세세한 설정 알아보자

    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
