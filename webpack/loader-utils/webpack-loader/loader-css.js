/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 18:07:44
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 18:42:54
 */
const loaderUtils=require("loader-utils"); 
const fs = require('fs')
function loader(source) { 
   //获取当前文件的内容  
    //匹配content中import的内容
    // var urlLists = content.match(/(?<=(@import url\(('|"))).*?(?=(\'|\")\))/g)
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ['let list = [];'];
    while (current = reg.exec(source)) {
        let [matchUrl, g] = current; 
        let last = reg.lastIndex-matchUrl.length;
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
        pos = reg.lastIndex;
        // 把g替换成require的写法 =》 url（require('***')）
        arr.push(`list.push('url('+require(${g})+')')`); 
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
    arr.push(`module.exports = list.join('')`);;
    console.log(arr.join('\r\n'))
    return arr.join('\r\n');
}
module.exports = loader;