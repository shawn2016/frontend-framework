/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 18:20:43
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-04 18:49:25
 */
/**
 * 匹配字符串
 */
// 12345678.01 =>123,456,78.01
function addHao(str){
  var strArr = str.split(".");
  str1 = strArr[0].replace(/(\d{3})/g,'$1,');
  return str1+'.'+strArr[0]
}
addHao('12345678.01')

function addHaoN(str){
  var str1 = str.split(".")[0].split("").reverse().join(""); 
  str1 = str1.replace(/(\d{3})/g,'$1,') 
 let res = str1.split("").reverse().join("") 
 return res+'.'+str.split(".")[1];
}
addHaoN('12345678.01')

function addHaoM(str){
  var str1 = str.split(".")[0];
  //先匹配(?:\d{3}) 不获取结果 
  str1 = str1.replace(/(\d)(?=(?:\d{3})+\b)/g,'$1,')
  console.log(str1)
}
addHaoM('12345678.01');

