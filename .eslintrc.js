module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
        'max-len': [
            'error',
            {
                code: 100,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'prettier/prettier': ['warn'],
    },
    ignorePatterns: ['build/**'],
};
