const path = require('path')

module.exports = {
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    })

    config.resolve.alias = {
      '@components': path.resolve(__dirname, '../src/common/components'),
      '@models': path.resolve(__dirname, '../src/common/models'),
      '@utils': path.resolve(__dirname, '../src/common/utils'),
      '@hooks': path.resolve(__dirname, '../src/common/hooks'),
      '@app': path.resolve(__dirname, '../src/app'),
      '@features': path.resolve(__dirname, '../src/features'),
    }

    return config
  },
}
