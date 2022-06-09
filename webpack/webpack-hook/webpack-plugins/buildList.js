/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-27 12:43:59
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-27 12:53:24
 */
class BuildList{
  apply(compiler){
    compiler.hooks.emit.tapAsync('BuildList',(compilation,callback)=>{
     const manifest ={};
     //将文件写入到mainfese
     for (const name of Object.keys(compilation.assets)) { 
      manifest[name] = compilation.assets[name].size();
      // 将生成文件的文件名和大小写入manifest对象
      }
      //将写入的文件打包出来
      compilation.assets['manifest.json'] = {
        source() {
            return JSON.stringify(manifest);
        },
        size() {
            return this.source().length;
        }
    };
    callback();
    })
  }
}

module.exports= BuildList