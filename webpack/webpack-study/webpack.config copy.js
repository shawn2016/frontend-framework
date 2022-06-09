/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-08 08:42:43
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 09:00:56
 */
const path = require('path');
const webpack = require('webpack')
//错误提示工具
const FriendLsyErrottWepackPlugin = require('friendly-errors-webpack-plugin');
const notify = require("node-notifier");
//打包速度衡量工具
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpackPlugin();
//打包体积监控
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const HtmlWebpackPlugin = require('html-webpack-plugin');

//编译时间优化
//bootstrap的引入
const bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css');

//压缩 

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
 
//因为CSS和JS的加载可以并行，所以我们可以通过此插件提取CSS成单独的文件,然后去掉无用的 css并进行压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');

//glob.sync(`${PATHS.src}/**/*`,{nodir:true})
const glob = require('glob');//文件匹配模式
const PATHS = {
    src:path.resolve(__dirname,'src')
}

const icon = path.join(__dirname, 'icon.png');

//项目初始化
module.exports = smw.wrap({
  //配置模式
  mode: 'production',
  //调试工具选择
  devtool: 'source-map',
  context: process.cwd(),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  //解析
  resolve: {
    extensions: ['.js', '.jsx', '.json'],//指定文件的扩展名,找不到会报错
    alias: { bootstrap },//指定查找别名
    modules: ["c:/node_modules", 'node_modules'],// 指定查找目录
    mainFields: ['browser', 'module', 'main'],//从package.json中的哪个字段查找入口文件
    mainFiles: ['index']//如果找不到mainFields的话，会找索引文件，index.js
  },
  //可以增加自定义的loader
  resolveLoader: {
    modules: [path.resolve(__dirname, "loaders"), 'node_modules'],
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: { //压缩HTML
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename:'[name].css'
     }),
    //匹配任意字段，包括路径分隔符，*匹配任意字符，不包含路径分隔符
    new PurgecssWebpackPlugin({
        paths:glob.sync(`${PATHS.src}/**/*`,{nodir:true})
    }),
    new FriendLsyErrottWepackPlugin({
      onErrors: (serity, errors) => {
        let error = errors[0]
        notify.notify({
          title: "webpack编译失败",
          message: serity + ":" + errors.name,
          subtitle: error.file || '',
          icon
        })
      }
    }),
    // 直接打开网站
    // new BundleAnalyzerPlugin() ,
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', //不直接启动打包报告的http服务器
      generateStatsFile: true, //生成打包文件效果描述
    }),
    //   new webpack.IgnorePlugin({
    //     resourceRegExp:/^\.\/locale$/, //资源正则
    //     contextRegExp:/moment$/  //上下文，目录正则
    //  }),
    
    //压缩css
    new OptimizeCssAssetsWebpackPlugin() 



  ],
  optimization:{
    minimize:true,//开启最小化
    minimizer:[
      //压缩js
      new TerserPlugin({}),
    ] 
  },
  //直接引用，不会在进行打包文件
  // external:{
  //   jquery:'jQuery',
  // }, 
  module: {
    //如果模块的路径匹配到正则的化，就不需要查找依赖项目了
    noParse: /title.js/,
    rules: [
      {
        test: /\.js/,
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/,
        use: [
          // { loader: 'thread-loader',
          //  options: { workers: 3 } 
          // },
          {
            loader:'babel-loader',
            options:{
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
        use: [
          {loader:MiniCssExtractPlugin.loader},
          //增加loading
          // 'cache-loader',
          // 'style-loader',
          'css-loader',
        ]
      }, 
      // {
      //   test:/\.(jpg|png|gif|bmp)$/,
      //   use:[
      //      {
      //          loader:'image-webpack-loader',
      //          options: {
      //           mozjpeg: {
      //             progressive: true,
      //           },
      //           optipng: {
      //             enabled: false,
      //           },
      //           pngquant: {
      //             quality: [0.65, 0.90],
      //             speed: 4
      //           },
      //           gifsicle: {
      //             interlaced: false,
      //           },
      //           webp: {
      //             quality: 75
      //           }
      //         }
      //      }
      //   ]
      // }
    ]
  }
})