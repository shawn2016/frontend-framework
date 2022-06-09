/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-24 09:12:09
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-26 14:59:56
 */
const path = require('path')
import {
  terser
} from 'rollup-plugin-terser';
const alias = require('@rollup/plugin-alias')
const json = require('@rollup/plugin-json');
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const autoprefixer = require('autoprefixer')
const babel = require('rollup-plugin-babel');
const rollScss = require('rollup-plugin-scss')
import image from 'rollup-plugin-img';
const {eslint} = require('rollup-plugin-eslint')
import serve from 'rollup-plugin-serve';

// 新增 rollup-plugin-postcss 插件
import postcss from 'rollup-plugin-postcss';

// 新增 postcss plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
  external: ['vue'],
  //入口文件
  input: path.resolve(__dirname, './src/index.js'),
  //打包文件出口
  output: [  {
    // dir:path.resolve(__dirname, 'dist/'),
    file: path.resolve(__dirname, 'dist/index.min.js'),
    format: 'iife',
    name: 'version',
    plugins: [terser()]
  }],
  plugins: [
    resolve({
      jsnext: true,  // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true,  // Default: true 
      browser: true // Default: false
    }),
    rollScss({
      output: true,
      output: path.join(__dirname,'dist/bundle.css'),//输出的样式名字，
      //可以在编译的时候自定义插入样式
      // output: function (styles, styleNodes) {
      //   writeFileSync('bundle.css', styles)
      // },
      //选择要包含在处理中的文件 (default: ['/**/*.css', '/**/*.scss', '/**/*.sass'])
      include: ['/**/*.css', '/**/*.scss', '/**/*.sass'], 
      // Choose files to exclude from processing, (default: undefined) 
      exclude: ['/**/*.css','/**/*.scss' ],
       // 全球scss前缀。对于变量和mixins很有用。
      prefix: `@import "./fonts.scss";`,
      sass: require('node-sass'),
      //在监视模式下添加要监控的文件/文件夹，以便对这些文件的更改将触发重新构建。
      watch: 'src/styles/components', 
      watch: ['src/styles/components', 'src/multiple/folders'],
    }),
    //
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    image({
      output: path.join(__dirname,'/dist/images'), //输出路径
      limit: 10000,//大小限制
      extensions: /\.(png|jpg|jpeg|gif|svg)$/, //匹配的选项
      exclude: 'node_modules/**',//去掉未打包
    }),
    eslint(),
    postcss({
      extract: true,
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano()
      ]
    }),
    json(),
    // terser(),
    commonjs(),
    alias({
      resolve: ['.css', '.js', '.jsx'], //匹配项目
      entries: {
        '@style': path.resolve(__dirname, './style'),
        '@util': path.resolve(__dirname, './util'),
      }
    }),
    serve({
      open: true, // 是否打开浏览器
      contentBase: './', // 入口html的文件位置
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10001
    })
  ],
 
};