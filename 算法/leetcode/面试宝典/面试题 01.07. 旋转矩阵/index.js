/**
 * 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。
 * 请你设计一种算法，将图像旋转 90 度。
 * 不占用额外内存空间能否做到？
 * 给定 matrix = 
        [
         [1,2,3],
         [4,5,6],
         [7,8,9]
        ],

        原地旋转输入矩阵，使其变为:
        [
         [7,4,1],
         [8,5,2],
         [9,6,3]
        ] 。
        [2,2]=>[2,1]
        [2,0]=>[0,0]
        [1,2]=>[2,1]
 */

/**
 * 解题思路：
 * 旋转90度后每个项目和新的一个关系 
 * 第一列变成 第一排
 * 第二列变成第二排
 */
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
console.log(rotate([
    [1,2,3],
    [4,5,6],
    [7,8,9]
   ]))