/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-17 13:56:40
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-07 17:55:10
 */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool:'source-map',
  // devtool:'eval-source-map',
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'cheap-eval-source-map',
  // devtool: 'eval',
  // devtool: 'cheap-source-map',
  // devtool: 'cheap-module-source-map',
  output: {  
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[hash].js',
    // filename: '[name].[hash].js',
    filename: '[name].[contenthash:3].js',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env", {
              targets: "> 0.25%, not dead",
            }, '@babel/preset-react'],
          ],
          // plugins: [
          //   ["@babel/plugin-transform-runtime", {
          //     corejs: 2, //当我们使用 ES6 的静态事件或内置对象时自动引入 babel- runtime/core-js
          //     helpers: true, //移除内联babel helpers并替换使用babel- runtime/helpers 来替换
          //     regenerator: true, //是否开启generator函数转换成使用regenerator runtime来避免污染全局域
          //   }, ],
          //   ['@babel/plugin-proposal-decorators', {
          //     legacy: true
          //   }],
          //   ['@babel/plugin-proposal-class-properties', {
          //     loose: true
          //   }],
          // ]
        },
      },
    }, ]
  },
}
 