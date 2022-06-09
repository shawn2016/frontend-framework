 
 const path = require('path')
 const webpack = require('webpack')
 //压缩js的插件你
 const TerserPlugin = require('terser-webpack-plugin')
 //清除打包文件下的内容
 const {  CleanWebpackPlugin  } = require('clean-webpack-plugin') 
 //https://blog.csdn.net/u014440483/article/details/87267160

 // 用于标志生成dll 文件的版本信息
 let {  version_lib } = require('./package.json');
 version_lib = version_lib.replace(/\./g, '_');

 //打包文件路径
 const dllPath = 'libs'
 //拆分包 包含当前想要进行打包的第三方不用的插件
 var entry = {
   'common': [
     'vue-router/dist/vue-router.esm.js',
     'vuex/dist/vuex.esm.js',
     'axios',
     'iview'
   ],
 }
 //将此变量导出，用于在vue.config.js中使用
 exports.library = entry;

 //清除文件 自己写的
 const clearFile = require('./webpack-plugin/clear-file')
//  clearFile('libs'),

 module.exports = {
   //入口文件配置
   entry: entry,
   //输出文件配置
   output: {
     //要输出的文件目录
     path: path.resolve(__dirname, './libs/js'),
     //输出的文件名字，加上version_lib为了识别当前dll文件的类型
     filename: `[name].${version_lib}.dll.js`,
     //输出的library的内容
     library: '[name]_library'
   },
   //模块包，用于加载一些loader
   module: {
     rules: [
       {
         test: /\.vue$/,
         loader: 'vue-loader'
       },
       {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/
       },
       //使用less-loader加载项目
       {
         test: /\.(less?|css)(\?.*)?$/i,
         use: [
           'style-loader',
           'css-loader',
           'less-loader'
         ]
       },
       {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
        use: [
          'url-loader', 
        ]
      }, 
       {
         loader: 'iview-loader',
         options: {
           prefix: false
         }
       }
     ]
   },
   optimization: {
    //最小化一些项目
     minimizer: [ 
      //
      new TerserPlugin({
        cache: true,
        parallel: true, //多进程加快压缩速度
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            // drop_console: true,
            // drop_debugger: true
          }
        }
      })
     ]
   },
   plugins: [
     // 清除之前的dll文件配置文件需要查看
     new CleanWebpackPlugin({dry:'libs'}),
    
     new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
     //重头项目 配置文件 的DllPlugin
     new webpack.DllPlugin({
       //文件的入口 存放了打包的内容文件
       path: path.resolve(__dirname, './libs/json', '[name].mainfest.json'),
       //这个名字和output的名字一样，用于输出
       name: '[name]_library',
       //当前的上下文存储环境
       context: process.cwd()
     }), 

   ]
 }