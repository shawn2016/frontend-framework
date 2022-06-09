/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 16:35:58
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 16:51:01
 */
const loaderUtils=require("loader-utils"); 
function loader(content) { 
  console.log(content+'')
  //获取当前的md文档内容
  this.cacheable && this.cacheable();
  this.value = content;
  return "module.exports = " + JSON.stringify(content); 
}
module.exports = loader;