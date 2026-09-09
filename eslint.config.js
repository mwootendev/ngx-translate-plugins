const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const jest = require('eslint-plugin-jest');
const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      importPlugin.flatConfigs.recommended,
      eslintPluginPrettierRecommended,
      { languageOptions: { parserOptions: { project: true, tsconfigDirName: __dirname } } },
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: '', style: 'kebab-case' }],
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: '', style: 'camelCase' }],
      '@angular-eslint/use-component-view-encapsulation': 'off',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/dot-notation': 'warn',
      '@typescript-eslint/prefer-for-of': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/prefer-standalone': 'off',
      '@typescript-eslint/naming-convention': ['off', { selector: 'variable', format: ['camelCase', 'snake_case', 'PascalCase'] }],
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off', // fix
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@/quotes': ['error', 'single', { avoidEscape: true }],
      '@/semi': 'error',
      'arrow-parens': ['error', 'always'],
      'comma-dangle': [
        'error',
        {
          objects: 'always-multiline',
          arrays: 'always-multiline',
          imports: 'only-multiline',
          exports: 'only-multiline',
          functions: 'never',
        },
      ],
      complexity: ['error', { max: 40 }],
      'consistent-return': 'error',
      'eol-last': 'error',
      'id-blacklist': 'error',
      'linebreak-style': 'error',
      'max-classes-per-file': ['error', 8],
      'new-parens': 'error',
      'no-duplicate-imports': 'error',
      'no-empty-pattern': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-nested-ternary': 'off',
      'no-restricted-globals': 'error',
      'no-restricted-syntax': 'error',
      'no-return-assign': 'error',
      'no-self-assign': 'error',
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'prefer-object-spread': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
          memberSyntaxSortOrder: ['single', 'all', 'multiple', 'none'],
          allowSeparatedGroups: true,
        },
      ],
      'space-in-parens': ['error', 'never'],
      'spaced-comment': 'error',
      'prettier/prettier': 'error',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      '@/lines-between-class-members': 'off',
    },
  },
  {
    files: ['**/*spec.ts'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      '@typescript-eslint/dot-notation': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/no-done-callback': 'off',
      'jest/no-commented-out-tests': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off', // fix
      '@angular-eslint/template/label-has-associated-control': 'off', // fix
    },
  }
);
