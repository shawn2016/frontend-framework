/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-13 08:41:14
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-13 08:59:44
 */
// 递归乘法。 写一个递归函数，不使用 * 运算符， 实现两个正整数的相乘。可以使用加号、减号、位移，但要吝啬一些。
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
/**
 * 分析 4*6 其实就是4个6相加
 */
var multiply = function(A, B) {
  //非递归
 /** let min = Math.min(A,B)
  let max = Math.max(A,B)
  let sum=0;
  for(var i=0;i<min;i++){
      sum+=max
  }
  return sum;
   */
  //递归
let max = Math.max(A, B);
let min = Math.min(A, B);
//其实每次递归都是加max
const compaute = (value) => {
  if (value < 1) {
    return 0;
  }
  return max + compaute(value - 1);
};
return compaute(min); 
};