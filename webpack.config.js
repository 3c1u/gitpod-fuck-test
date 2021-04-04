const path = require('path')

const outputPath = path.resolve(__dirname, './dist')
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  target: 'node',
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    path: outputPath,
    filename: './index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
    asset: true,
  },
}
