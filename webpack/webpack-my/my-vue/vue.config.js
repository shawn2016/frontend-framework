//获取当前运行环境 是生产环境还是开发环境
const isPro = process.env.NODE_ENV === 'production';
//引入模块配置
const path = require('path')
const glob = require('glob')
//argv 获取当前连接上的参数与
const argv = require('yargs').argv
const cwd = path.join(__dirname, '.')
const webpack = require('webpack') 
//压缩文件
const TerserPlugin = require('terser-webpack-plugin')
//加速打包文件
const CompressionPlugin = require("compression-webpack-plugin");

//打包分析结果
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 

//https://www.cnblogs.com/susouth/p/10057778.html 
//CSS 相关使用插件
const PurifyCssPlugin = require('purifycss-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

 
//为静态的html添加文件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');



// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const devServerRewrite = 是require('./proxy/pageConfig.js')//  使用history模式的页面path rewrite

//获取当前dll的版本信息 
let {  version_lib,  openGzip, } = require('./package.json');
version_lib = version_lib.replace(/\./g, '_');

//获取当前打包的dll的插件命名
let library = require("./webpack.dll.config").entry;
 
//提供resolve的路径分析效果
function resolve(dir) {
  return path.join(__dirname, dir)
}

//获取当前多页面的page项目
function getPages() {
  //获取pages
  const pages = {} 
  glob.sync('src/views/*/index.js', {
    cwd
  })
    .forEach(filePath => {
      //当前目录的位置
      const dirname = path.dirname(filePath)
      //进行页面配置操作
      const chunks = ['manifest', 'vendors', 'vue-vendors', 'common'];
      
      //获取当前页面的名字
      const name = /(views\/.*\/index)\.js/.exec(filePath)[1].replace('views/', '') //admin/index
      let shortName = name.replace(/\/index/, '') //admin
      chunks.push(name)

      pages[name] = { 
        entry: filePath, //入口文件来源
        template: `${dirname}/index.html`, // . 模板来源.
        filename: isPro ?
          `../pages/${shortName}/index.html` : `${name}.html`, // 输出文件
        title: `${shortName} title`,//页面标题
        chunks: chunks, //提取出来的通用的chunk和vendor
        chunksSortMode: (chunk1, chunk2) => {
          var order = chunks
          var order1 = order.indexOf(chunk1.names[0])
          var order2 = order.indexOf(chunk2.names[0])
          return order1 - order2
        },
        erudaScripts: argv.console ? erudaScripts : ''
      }
    })
  return pages
}
var pages = getPages();
// console.log(pages)

const BASE_URL = isPro ?
  '../../static' :
  '/'
module.exports = { 
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: process.env.NODE_ENV !== 'production',

  //打包前缀路径 通常为当前index.html引用的路径地址 
  publicPath: BASE_URL,

  //将构建好的文件输出到哪里（或者说将编译的文件） 主要应于静态文件打包，index.html 可自行进行配置打包，
  outputDir: path.resolve(__dirname, './dist/static'),

  // 生成环境sourcemap去掉 开发环境中可有利于定位到出错误的地方
  productionSourceMap: process.env.NODE_ENV !== 'production',

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,

  //配置多页面的应用程序
  pages: pages,
  //css操作哦
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},
    extract: {
      filename: 'css/[id].css?v=[contenthash:8]',
      chunkFilename: 'css/[id].css?v=[contenthash:8]',
      ignoreOrder: true
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    // modules: false
  },
  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},
 //构建流程中使用得到的效果
  configureWebpack: (config) => {
    const plugins = [];
    const optimization = {
      runtimeChunk: {
        name: 'manifest'
      },
      minimizer: [
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
        }), 
        //消除未使用的css
        new PurifyCssPlugin ({
          paths: glob.sync(path.join(__dirname, '/*.html'))
        }), 
        //压缩css
        new MiniCssExtractPlugin({
          filename: 'css/[id].css?v=[contenthash:8]',
          chunkFilename: 'css/[id].css?v=[contenthash:8]',
        }),
      ],
      //拆分包
      splitChunks:{
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 4,
        name: false, 
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\\/]node_modules[\\\/]/,
            priority: -15,
            chunks: 'initial'
          },
          'wrap-css': {
            name: 'wrap',
            test: /(src\/style\/wrap\.less)$/,
            chunks: 'initial',//initial表示提取入口文件的公共css及js部分
            reuseExistingChunk: true,
            priority: 10,
            minChunks: 1,// 表示提取公共部分最少的文件数
            enforce: true,//只对引用的入口进行打包操作
          },
          'iview-css': {
            name: 'iveiw-css',
            test: /[\\\/]node_modules\/iview\/dist\/styles\/iview\.css/,
            chunks: 'initial',//initial表示提取入口文件的公共css及js部分
            reuseExistingChunk: true,
            priority: 10,
            minChunks: 1,// 表示提取公共部分最少的文件数
            enforce: true,//只对引用的入口进行打包操作
          },
        }
       }
    }
    Object.assign(config, {
      optimization,
    })

    if (isPro) {
      // //配置webpack dll 对每个dll文件需要进行逐个引入
      plugins.push(...Object.keys(library).map(name => {
        return new webpack.DllReferencePlugin({
          context: process.cwd(), //当前的作用上下文
          //获取mainfest.json中已经进行打包的文件获取信息
          manifest: require(`./libs/json/${name}.mainfest.json`),
        })
      })) 
      //为html 添加打包后的内容
      //https://blog.csdn.net/qq_29722281/article/details/106626378
      plugins.push(
        new AddAssetHtmlPlugin(Object.keys(library).map(name => {
          return {
            //dll文件的路径
            filepath: require.resolve(path.resolve(`libs/js/${name}.${version_lib}.dll.js`)),
           // 输出的文件路径
            outputPath: 'dll',
            //在.html文件中进行引用的路径
            publicPath: BASE_URL + '/dll',
            includeSourcemap: false
          }
      }))) 
      if (openGzip) {
        //是否开启gzip加速 压缩后删除原文件  openGzip配置在package.json中
        plugins.push(new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false //不删除源文件
        }))
      }

      //css 系列 
      plugins.push( 
        //css 压缩 简单的压缩配置 
        // new OptimizeCSSAssetsPlugin ({
        //   // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
        //   assetNameRegExp: /\.(sa|sc|c)ss$/g, 
        //   // 指定一个优化css的处理器，默认cssnano
        //   cssProcessor: require('cssnano'),
         
        //   cssProcessorPluginOptions: {
        //     preset: [ 'default', {
        //         discardComments: { removeAll: true}, //对注释的处理
        //         normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
        //     }]
        //   },
        //   canPrint: true  // 是否打印编译过程中的日志
        // })
        new OptimizeCSSAssetsPlugin ())

        //清除已经打包的内容 目前vue-cli3已经自动清除，不需要进行自己手动清除
        // plugins.push( new CleanWebpackPlugin()  )
   
    } else {

    }
    //增加打包分析器
    if(argv.a){
      plugins.push(new BundleAnalyzerPlugin())
    }
    config.plugins = [...config.plugins, ...plugins];

  },
  // 调整内部的 webpack 配置。
  chainWebpack: (config) => {
    //设置别名信息
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@accout', resolve('src/views/accout'))
      .set('@user', resolve('src/views/user'))
      .set('@style', resolve('src/style'))


    if (isPro) {
      // 生产环境配置
      config.mode = 'production';
      config.output
        .filename(`js/[name].js?v=[hash:8]`)
        .chunkFilename(`js/[name].js?v=[hash:8]`)

      config.plugin('extract-css').tap(args => {
        args[0].filename = `css/[name].css?v=[contenthash:8]`
        args[0].chunkFilename = `css/[name].css?v=[contenthash:8]`
        return args
      })
    } else {
      config.mode = 'development';
    }
    //OptimizeCssnanoPlugin 压缩css文件是根据MiniCssExtractPlugin文件名.css来匹配成功后压缩的，我们filename改为.css?v就匹配不到了
    config.plugins.delete('optimize-css')
    config
      .plugin('optimize-css-assets')
      .use(require('optimize-css-assets-webpack-plugin'), [{
        assetNameRegExp: /\.css(.*)/i,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            }
          }]
        },
        canPrint: true
      }]) 
    //设置运行环境
    config.optimization.runtimeChunk({
      name: 'manifest'
    })

  }
}