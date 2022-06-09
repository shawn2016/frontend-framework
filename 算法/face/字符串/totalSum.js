/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 20:02:54
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 16:14:27
 */
/**
 * 统计字符串中出现的最多的次数
 */

const Promise = require("../../../js/promise/Promise");

function totalSum(str) {
  let map = {};
  let maxStr = '',
    num = 0;
  for (var i = 0; i < str.length; i++) {
    if (!map[str[i]]) {
      map[str[i]] = 1;
    } else {
      map[str[i]]++;
    }
  }
  num = 0;
  for (var key in map) {
    if (map[key] > num) {
      maxStr = key
      num = map[key];
    }
  }
  return maxStr;
}
totalSum("abggttgdgysdsdsdhg")




function colorRGBtoHex(color) {
  // 切割color
  var rgb = color.split(',');
  var r = parseInt(rgb[0].split('(')[1]); //获取第一个
  var g = parseInt(rgb[1]); // 获取第二个
  var b = parseInt(rgb[2].split(')')[0]); //获取第三个 
  // a << 2 将a的二进制位左移2位，右补0
  let er = (r << 16) + (g << 8) + b;
  var hex = "#" + (er).toString(16);
  return hex;
}
colorRGBtoHex('rgb(32,32,12)')

var a = 20;
var test = {
  a: 40,
  init: () => {
    console.log(this.a);

    function go() {
      console.log(this.a);
    }
    go.prototype.a = 50;
    return go;
  }
};
var p = test.init();// undefined
p();//undefined
new p() //50