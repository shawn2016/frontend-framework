### 解题思路
数组旋转90度后，需要进行找规律，可以发现 
    第一列 变成 第一排
    第二列 变成 第二排
    第三列 变成 第三排
不开辟新的空间，只能进行数组置换的方法，数组换位置需要两步，第一步，对称变换，完成后，发现对应位置的数据在是以对角线对称的，因此在进行对角线的对称置换；

对角线的置换时候，数组的对称下标位置比较难找；
比如：当数组的位于i、j的时候，
对称位置的坐标 应该就是（j,i）=>(length-1-j,length-1-i)

### 代码

```javascript
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    var length = matrix.length;
    //对线折中
    for(var i=0;i<length;i++){
        for(var j=0;j<length/2;j++){
           var temp = matrix[i][j] ;//临时存储数据
           matrix[i][j] = matrix[i][length-j-1]
           matrix[i][length-j-1] = temp
        }
    }
    //对角线折中
    for(var i=0;i<length;i++){
        for(var j=0;j<length-i;j++){
           var temp = matrix[i][j] ;//临时存储数据
           matrix[i][j] = matrix[length-1-j][length-1-i];
           matrix[length-1-j][length-1-i] = temp;
        }
    }
    return matrix;

};
```