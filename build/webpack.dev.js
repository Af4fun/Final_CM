const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const LessFunc = require('less-plugin-functions');
const config = require('./config');
module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              plugins: [new LessFunc()]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre', // 强制先进行 ESLint 检查
        exclude: /node_modules|lib/,
        loader: 'eslint-loader',
        options: {
          // 启用自动修复
          formatter: require('eslint-friendly-formatter'),
          // 启用警告信息
          emitWarning: false
        }
      }
    ]
  },
  devServer: {
    contentBase: config.devServerOutputPath,
    overlay: {
      errors: true,
      warnings: true
    },
    host: '192.168.1.100',
    port: 8998,
    open: true // 服务启动后 打开浏览器
  }
});
