/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-08 08:42:43
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-18 08:44:17
 */
const path = require('path');
const webpack = require('webpack')
//错误提示工具
const FriendLsyErrottWepackPlugin = require('friendly-errors-webpack-plugin');
const notify = require("node-notifier");
//打包速度衡量工具
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpackPlugin();

const HtmlWebpackPlugin = require('html-webpack-plugin');

//编译时间优化

//因为CSS和JS的加载可以并行，所以我们可以通过此插件提取CSS成单独的文件,然后去掉无用的 css并进行压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//项目初始化
module.exports = smw.wrap({
  //配置模式
  mode: 'production',
  //调试工具选择
  devtool: 'source-map',
  context: process.cwd(),

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  entry: {
    page1: "./src/page1.js",
    page2: "./src/page2.js",
    page3: "./src/page3.js",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',//默认只分割出去的异步代码块
      minSize: 0,//分割出去的代码块的最小体积 0表示不限制
      minRemainingSize: 0, // 分割后剩下的体积 0表示不限制 webpack5 新增加的参数
      maxSize: 0,//分割出去的代码块的最大体积 0表示不限制
      minChunks: 1,//如果此模块被多个模块饮用，会被分割
      maxAsyncRequests: 5,//异步分割出去的几个代码块
      maxInitialRequests: 10,//同步分割出去的几个代码块
      automaticNameDelimiter: '~',//分割出去的分割符
      enforceSizeThreshold: 50000,//强制阙值，新增加灿水
      cacheGroups: {//缓存组配置 配置如何怼模块分组相同分组会被分到一个代码块中去
        default:false,
      }
    } 
},
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'page1.html',
    chunks: ['page1'],
    minify: { //压缩HTML
      collapseWhitespace: true,
      removeComments: true
    }
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'page2.html',
    chunks: ['page2'],
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'page3.html',
    chunks: ['page3']
  }),

],

module: {
  rules: [{
      test: /\.js/,
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      use: [
        // { loader: 'thread-loader',
        //  options: { workers: 3 } 
        // },
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        },
      ]
    },
    //只匹配数组中的某一个，如果找到了就不再查找了
    {
      test: /\.css/,
      include: path.resolve(__dirname, "src"),
      exclude: /node_modules/,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        //增加loading
        // 'cache-loader',
        // 'style-loader',
        'css-loader',
      ]
    },
  ]
}
})