const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const webpack = require('../webpack-my/配置生产环境/node_modules/webpack')
module.exports = {
  entry: {
    app: './src/index.js', 
    // print: './src/index.js'
  },
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