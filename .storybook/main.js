const path = require('path')

module.exports = {
  stories: ['../src/common/stories/*.stories.@(ts|tsx)'],
  presets: [path.resolve(__dirname, './preset.js')],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
}
