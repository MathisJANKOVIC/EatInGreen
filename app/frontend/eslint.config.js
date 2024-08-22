import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { plugins: { '@stylistic/ts': stylisticTs } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'curly': ['error', 'all'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    '@stylistic/ts/type-annotation-spacing': [
      'error',
      {
        'before': false,
        'after': true,
        'overrides': {
          'arrow': {
            'before': true,
            'after': true
          }
        }
      }
    ],
    'object-curly-spacing': ['error', 'always']
  }
  }
]