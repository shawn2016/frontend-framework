/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-09-20 09:17:36
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-07 17:34:17
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const webpack = require('webpack')
module.exports = {
  entry: {
    app: './src/index.js', 
    // print: './src/index.js'
  },
  sourceMap:'eval',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
        use: ['style-loader', 'css-loader']
       }
     ]
   },
  devServer: {
       contentBase: './dist',
       hot: true
   },
 

}