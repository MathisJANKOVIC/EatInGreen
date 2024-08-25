import stylisticTs from '@stylistic/eslint-plugin-ts'
import tseslint from 'typescript-eslint'
import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
    { files: ['**/*'] },
    { ignores: ['dist'] },
    { languageOptions: { globals: globals.node } },
    { plugins: { '@stylistic/ts': stylisticTs } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
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
                            'before': true, // space before `=>`
                            'after': true // space after `=>`
                        }
                    }
                }
            ],
            'object-curly-spacing': ['error', 'always'],
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'camelcase': ['error', { properties: 'always' }],
            'comma-dangle': ['error', 'never']
        }
    }
]