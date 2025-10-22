/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = function override(config, env) {
    // Exclude TypeScript files from libs/refero (only use compiled .js files)
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
    if (oneOfRule) {
        const tsRule = oneOfRule.oneOf.find((rule) => rule.test && rule.test.toString().includes('tsx'));
        if (tsRule) {
            // Exclude libs/refero .ts files
            tsRule.exclude = [/node_modules/, /libs\/refero\/.*\.ts$/];
        }
    }

    // Remove ModuleScopePlugin to allow libs folder
    const scopePluginIndex = config.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
    );
    if (scopePluginIndex !== -1) {
        config.resolve.plugins.splice(scopePluginIndex, 1);
    }

    // Prefer .js over .ts when both exist
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];

    return config;
};
