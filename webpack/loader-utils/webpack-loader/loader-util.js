/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 14:17:01
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 16:32:47
 */

"use strict";
 
// const loaderUtils=require("./loader-equal-utils/"); 

function loader(content) { 
    var publicPath="mfy-hahhahahahaah";  
    console.log('进入了loader内部'); 
    return `${publicPath};`;
}
module.exports = loader;
 
