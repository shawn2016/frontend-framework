 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const webpack = require('webpack')
const CompressionPlugin = require("compression-webpack-plugin")
var data ='hhhh '
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
  
    // new webpack.optimize.AggressiveSplittingPlugin({
    //   minSize: 30000, // 字节，分割点。默认：30720
    //   maxSize: 50000, // 字节，每个文件最大字节。默认：51200
    //   chunkOverhead: 0, // 默认：0
    //   entryChunkMultiplicator: 1, // 默认：1
    // }),
    //   new webpack.optimization.splitChunks({
    //     name: 'common' // 指定公共 bundle 的名称。
    //  }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object")
    }),
    new webpack.BannerPlugin({
      banner: "hash:[hash]", // 其值为字符串，将作为注释存在
      raw: false, // 如果值为 true，将直出，不会被作为注释
      entryOnly: false, // 如果值为 true，将只在入口 chunks 文件中添加
    }),
    new UglifyJsPlugin({
      //	测试匹配的文件
      test: /\.js($|\?)/i,
      //包含的文件
      include:"",
      //排除的文件。
      exclude:/\/excludes/,
      //	启用文件缓存
      cache:false,
      //使用多进程并行运行和文件缓存来提高构建速度
      parallel:false,
      //使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度）
      sourceMap:false,
      //uglify 选项
      uglifyOptions:{},
      //是否将注释提取到单独的文件，（查看详细
      extractComments:false,
      //t允许过滤 uglify 警告
      warningsFilter:()=>{return true;}
    })
    // new webpack.optimize.splitChunks({
    //   name: "vendor",
    //   // filename: "vendor.js"
    //   // (给 chunk 一个不同的名字)
  
    //   minChunks: Infinity,
    //   // (随着 entry chunk 越来越多，
    //   // 这个配置保证没其它的模块会打包进 vendor chunk)
    // })
  
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