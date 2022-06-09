<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-10-31 19:58:19
 * @LastEditors: Mfy
 * @LastEditTime: 2020-10-31 19:58:22
-->
### 解题思路
  标记：第一遍遍历进行标记哪一行或者哪一列进行置0，
      第二次遍历进行置0操作

### 代码

```javascript
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
```