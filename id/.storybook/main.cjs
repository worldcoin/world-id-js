const path = require('path')
const webpack = require('webpack')
const packageJson = require('../package.json')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules.push(path.resolve(__dirname, '../src'))

    config.plugins = [
      ...(config.plugins ?? []),
      new webpack.DefinePlugin({ worldIdJSVersion: JSON.stringify(packageJson.version) }),
    ]

    // Return the altered config
    return config
  },
}
