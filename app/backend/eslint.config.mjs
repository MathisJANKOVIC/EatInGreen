import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.node } },
    { plugins: { '@stylistic/ts': stylisticTs } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    { ignores: ['node_modules', 'dist'] },
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
                    'before': false,     // Pas d'espace avant `:`
                    'after': true,       // Un espace après `:`
                    'overrides': {
                        'arrow': {
                            'before': true,  // Un espace avant `=>`
                            'after': true    // Un espace après `=>`
                        }
                    }
                }
            ],
            'object-curly-spacing': ['error', 'always'], // Imposer un espace à l'intérieur des accolades des objets
            'comma-spacing': ['error', { 'before': false, 'after': true }] // Imposer un espace après les virgules
        }
    }
]