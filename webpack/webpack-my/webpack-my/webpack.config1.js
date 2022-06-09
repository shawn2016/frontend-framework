 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const webpack = require('webpack')
module.exports = {
  entry: {
    app: './src/index.js', 
    another: './src/another-module.js'
  }, 
  devtool: 'inline-source-map',
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Code Splitting'
    }),
    new webpack.optimization.splitChunks({
        name: 'common' // 指定公共 bundle 的名称。
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons", 
      filename: "commons.js", 
    })
    
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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