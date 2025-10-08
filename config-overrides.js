const path = require('path');
const fs = require('fs');

module.exports = function override(config, env) {
    // Add alias for @libs
    config.resolve.alias = {
        ...config.resolve.alias,
        '@libs/refero': path.resolve(__dirname, 'libs/refero'),
    };

    // Allow imports from outside src/ directory
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
    if (oneOfRule) {
        const tsRule = oneOfRule.oneOf.find((rule) => rule.test && rule.test.toString().includes('tsx'));
        if (tsRule) {
            tsRule.include = [tsRule.include, path.resolve(__dirname, 'libs')];
        }

        const jsRule = oneOfRule.oneOf.find(
            (rule) => rule.test && rule.test.toString().includes('jsx') && !rule.test.toString().includes('tsx'),
        );
        if (jsRule) {
            jsRule.include = [jsRule.include, path.resolve(__dirname, 'libs')];
        }
    }

    // Modify ModuleScopePlugin to allow libs folder
    const scopePluginIndex = config.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
    );
    if (scopePluginIndex !== -1) {
        config.resolve.plugins.splice(scopePluginIndex, 1);
    }

    return config;
};
