/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 14:09:10
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 18:46:23
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require('path');
module.exports ={
  entry:path.resolve(__dirname, '/src/index.js'),
  devtool:'source-map',
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve:{
     extensions:['.vue','.js']
  },
  resolveLoader:{
    modules:[
      path.resolve(__dirname,'./webpack-loader/'),'./node_modules'
    ]
  }, 
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8050,
    publicPath: '/',
    hot: true
  },
  devtool: 'inline-source-map',
  module:{
    rules:[
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },  
      {
        test:/\.(md)$/,
        use:[
         {
          loader:'loader-md',
          options:{
            name:'mfy'
          }, 
         }
        ]
      },
      {
        test:/\.(css)$/,
        use:['loader-style','loader-css','less-loader'], 
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
   new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './index.html'),
    filename: 'index.html', 
    inject: true
   }),
   new VueLoaderPlugin(),
  ]
}