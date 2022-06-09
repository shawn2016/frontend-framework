/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-13 10:51:59
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-13 11:09:16
 */
function mergeSort(arr) {
  var len = arr.length;
  //只存在一个数组的时候，跳出循环
  if(len < 2) {
    return arr;
  }
  //中间位置进行划分递归
  var middle = Math.floor(len/2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle)
  var result= merge(mergeSort(left), mergeSort(right))
  console.log(result)
  return result
}
function merge(left, right) {
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length)
    result.push(left.shift()); 
  while (right.length)
    result.push(right.shift()); 
  return result; 
}

var res = mergeSort([2,3,1,6,4,3,2])
console.log(res)