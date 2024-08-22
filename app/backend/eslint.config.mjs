import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
    {files: ['**/*.{js,mjs,cjs,ts}']},
    {languageOptions: { globals: globals.node }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {ignores: ['node_modules', 'dist']},
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'curly': ['error', 'all'],
            'keyword-spacing': ['error', { 'before': true, 'after': true }],
            'brace-style': ['error', '1tbs', { 'allowSingleLine': true }]
        }
    }
]