const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const env = process.env.BUILD_MODE.trim();
let ASSET_PATH = '/'; // dev 环境
if (env === 'prod') ASSET_PATH = './'; // build 时设置成实际使用的静态服务地址

module.exports = {
  entry: './src/main.js',
  output: {
    publicPath: ASSET_PATH,
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.jsx$/, // 使用loader的目标文件。这里是.jsx
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/, // 处理es6语法
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // 处理图片
        use: {
          loader: 'file-loader', // 解决打包css文件中图片路径无法解析的问题
          options: {
            limit: 10000,
            // 打包生成图片的名字
            name: '[name].[hash:8].[ext]',
            // 图片的生成路径
            outputPath: config.imgOutputPath
          }
        }
      },
      {
        test: /\.(aac|mp3)$/, // 处理音频
        use: {
          loader: 'file-loader', // 解决打包css文件中图片路径无法解析的问题
          options: {
            // 图片的生成路径
            outputPath: 'audio/'
          }
        }
      },
      {
        test: /\.mp4$/, // 处理音频
        use: {
          loader: 'file-loader', // 解决打包css文件中图片路径无法解析的问题
          options: {
            // 图片的生成路径
            outputPath: 'video/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理字体
        use: {
          loader: 'file-loader',
          options: {
            outputPath: config.fontOutputPath
          }
        }
      }
    ]
  },
  resolve: { // 设置模块如何被解析
    alias: {
      '@': resolve('src')
    },
    extensions: ['*', '.css', '.js', '.jsx']
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ]),
    new HTMLWebpackPlugin({
      filename: './index.html',
      template: path.resolve(__dirname, `../src/index.html`),
    }), // 利用 HTMLWebpackPlugin 插件合成最终页面
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH) // 利用 process.env.ASSET_PATH 保证模板文件中引用正确的静态资源地址
    })
  ]
};
