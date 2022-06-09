/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-27 10:35:09
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-05 08:39:56
 */ 
// 插件代码
class MyWebpackPlugin {
  constructor(options) {
  }
  apply(compiler) {
    // console.log(compiler)
    // 在emit阶段插入钩子函数
    compiler.hooks.afterPlugins.tap('MyWebpackPlugin',(compiler)=>{
      console.log("启动一次新的编译")
    })
    compiler.hooks.compile.tap('MyWebpackPlugin', (compilationParams) => { 
      // console.log("创建compilation对象之前",JSON.stringify(compilationParams))
    });
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
      // console.log(compilation)
      // setTimeout(()=>{
      //   console.log('文件列表', Object.keys(compilation.assets).join(','));
        callback();
      // }, 1000);
    });
    compiler.hooks.compilation.tap('MyWebpackPlugin', (compilation) => { 
      console.log("compilation对象创建完成")
    });
    compiler.hooks.emit.tap('MyWebpackPlugin', (compilation) => { 
      console.log("资源生成完成，输出之前")
    });
    compiler.hooks.afterEmit.tap('MyWebpackPlugin', (compilation) => { 
      console.log("资源输出到目录完成")
    });
    compiler.hooks.done.tap('MyWebpackPlugin', (stats) => { 
      console.log("完成编译")
    });
  }
}

exports.MyWebpackPlugin = MyWebpackPlugin;

 class DefineWebpack{
  constructor(options) {
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('DefineWebpack', (compilation, callback) => {
      // compilation.chunks存放了代码块列表
      compilation.chunks.forEach(chunk => {
       // chunk包含多个模块，通过chunk.modulesIterable可以遍历模块列表 
        for(const module of chunk.modulesIterable) {
          // module包含多个依赖，通过module.dependencies进行遍历
          module.dependencies.forEach(dependency => {
            console.log(dependency);
          });
        }
      });
      callback();
    });
    compiler.hooks.emit.tapAsync('DefineWebpack', (compilation,callback) => {
      // 修改或添加资源
      console.log(  compilation.assets)
      compilation.assets['app.bundle.js']  = {
        source() {
          return 'modified content';
        },
        size() {
          return this.source().length;
        }
      };
      // 删除资源
      // delete compilation.assets['app.bundle.js'];
      callback()
    });
  }
};
exports.DefineWebpack = DefineWebpack;