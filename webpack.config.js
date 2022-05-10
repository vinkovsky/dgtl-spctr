const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'
const mode = isDevelopment ? 'development' : 'production'

module.exports = {
  mode,
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TSConfigPathsPlugin({
        extensions: ['.ts', '.tsx', '.js'],
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `SpaceX - ${mode}`,
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    compress: true,
    open: true,
    hot: true,
    port: 2000,
  },
}
