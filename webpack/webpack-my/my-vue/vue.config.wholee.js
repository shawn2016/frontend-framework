const isPro = process.env.NODE_ENV === 'production';
const path = require('path')
const glob = require('glob')
const argv = require('yargs').argv
const cwd = path.join(__dirname, '.')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const devServerRewrite = require('./proxy/pageConfig.js')//使用history模式的页面path rewrite

const PATHS = {
  src: path.join(__dirname, 'src')
}

function resolve(dir) {
  return path.join(__dirname, dir)
}


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
          `../pages/${shortName}/index.html` :
          `${name}.html`,
        title: `${shortName} title`,
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
console.log(pages)

const BASE_URL = isPro ?
  '../../static' :
  '/'
module.exports = {
  // 去掉eslint
  lintOnSave: process.env.NODE_ENV !== 'production',

  //打包前缀路径
  publicPath: BASE_URL,
  outputDir: path.resolve(__dirname, './dist/static'),
  // 生成环境sourcemap去掉
  productionSourceMap: process.env.NODE_ENV !== 'production',
  //配置多页面的应用程序
  pages: pages,

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
        })
      ], 
    }
    Object.assign(config, {
      optimization,
    })
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: (config) => {
    //设置别名信息
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@accout', resolve('src/views/accout'))
      .set('@user', resolve('src/views/user'))


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
    }else{
      config.mode = 'development';
    }
    //OptimizeCssnanoPlugin 压缩css文件是根据MiniCssExtractPlugin文件名.css来匹配成功后压缩的，我们filename改为.css?v就匹配不到了
    config.plugins.delete('optimize-css')
    config
      .plugin('optimize-css-assets')
      .use(require('optimize-css-assets-webpack-plugin'), [
        {
          assetNameRegExp: /\.css(.*)/i,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          },
          canPrint: true
        }
      ])
    //设置运行环境
    config.optimization.runtimeChunk({
      name: 'manifest'
    })


    config.optimization.splitChunks({
      // 类库的单独抽取
      cacheGroups: {
        // vendors: {
        //   name: 'vendors',
        //   test: /[\\\/]node_modules[\\\/]/,
        //   priority: -15,
        //   chunks: 'all'
        // },  
      }
    })
  }
}