/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 16:28:17
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 16:29:30
 */
const loaderUtils=require("loader-utils"); 
function loader(content) {  
    return `${content};`;
}
module.exports = loader;
 