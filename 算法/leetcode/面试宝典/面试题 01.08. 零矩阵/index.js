/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-10-31 19:37:19
 * @LastEditors: Mfy
 * @LastEditTime: 2020-10-31 19:55:04
 */
/**
 * 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    let length = matrix.length
    //先找为0 的进行记录
    var cols = [],rows=[];
    for(var i=0;i<length;i++){
      for(var j=0;j<matrix[i].length;j++){
        if(matrix[i][j]==0){
          cols.indexOf(i)==-1 && cols.push(i)
          rows.indexOf(j)==-1 && rows.push(j)
        }
      } 
    };
 
    // 进行置0
  for(var i=0;i<length;i++){
    for(var j= 0;j<matrix[i].length;j++){
      if(cols.indexOf(i)!=-1  || rows.indexOf(j)!=-1){
        matrix[i][j]=0
      }
    }
  }
  return matrix;
};
console.log(setZeroes([
  [1,1,1],
  [1,0,1],
  [1,1,1]
]))

console.log(setZeroes([
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]))