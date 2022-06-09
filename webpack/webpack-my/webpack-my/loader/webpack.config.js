const webpack = 'webpack';
const path = require('path');
module.exports = {
  //多入口文件
  // entry:{
  //   pageone:'./pages/index.js',
  //   pageTwo:'./pages/index1.html'
  // },
  entry: "./src/index.js",
  //单入口文件打包配置
  // output:{
  //   filename:'index.js',
  //   path:'/dist/'
  // }
  //多入口文件打包输出配置
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  //加载css
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      //加载数据 
      {
          test: /\.(csv|tsv)$/,
          use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
    
  }


}