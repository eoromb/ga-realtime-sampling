module.exports = {
    'extends': ['google', 'plugin:node/recommended'],
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true
        }
    },
    'rules': {
        'node/exports-style': ['error', 'module.exports'],
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/console': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-global/url-search-params': ['error', 'always'],
        'node/prefer-global/url': ['error', 'always'],
        'node/no-extraneous-require': ['off', {
            'allowModules': []
        }],
        "node/no-unsupported-features/es-syntax": ["error", {
            "version": ">=8.10.0",
            "ignores": []
        }],
        'node/no-unpublished-require': ['off'],
        'block-scoped-var': 2,
        'operator-linebreak': [2, 'after'],
        'no-extra-semi': 2,
        'dot-location': [2, 'property'],
        'comma-dangle': [2, 'never'],
        'no-else-return': 2,
        'yoda': [2, 'never', { 'exceptRange': true }],
        'brace-style': [2, '1tbs', { 'allowSingleLine': false }],
        'indent': [2, 4, {'SwitchCase': 1}],
        'semi-spacing': [2, {'before': false, 'after': true}],
        'space-infix-ops': [2, {'int32Hint': false}],
        'comma-spacing': [2, {'before': false, 'after': true}],
        'key-spacing': [2, {'beforeColon': false, 'afterColon': true}],
        'space-before-function-paren': [2, {
            asyncArrow: 'always',
            anonymous: 'always',
            named: 'always'
        }],
        'arrow-parens': ['error', 'as-needed'],
        'eqeqeq': [2, 'smart'],
        'no-var': 1,
        'one-var': 1,
        'spaced-comment': 1,
        'prefer-spread': 0,
        'prefer-rest-params': 0,
        'linebreak-style': 0,
        'no-delete-var': 2,
        'no-console': 2,
        'no-unreachable': 2,
        'no-redeclare': 2,
        'no-return-assign': [1, 'except-parens'],
        'no-undef': 2,
        'no-use-before-define': [2, 'nofunc'],
        'consistent-this': [2, 'self'],
        'consistent-return': [0, {'treatUndefinedAsUnspecified': true}],
        'max-params': [1, 6],
        'max-statements': [1, 50, { 'ignoreTopLevelFunctions': true }],
        'max-len': [1, {
            code: 140,
            ignoreComments: true
        }],
        'guard-for-in': 0,
        'require-jsdoc': [1, {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }],
        'valid-jsdoc': [1, {
            requireParamDescription: true,
            requireReturnDescription: false,
            requireReturn: false,
            prefer: { 'return': 'returns', inheritDoc: 'inheritdoc'}
        }],
        'new-cap': 1,
        'no-loop-func': 2
    },
    'env': {
        'node': true,
        'mocha': true
    }
};