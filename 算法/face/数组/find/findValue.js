/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-06 11:25:57
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 11:36:22
 */

function findValue(arr,value){
  let row = arr.length;
  for(var i=0;i<row;i++){
     let currentArr = arr[i];
     let begin = currentArr[0]
     let end = currentArr[currentArr.length-1]
     if(value >=begin && value<=end){
       break;
     }
  }
  //此时i就是当前的列
  let rowArr = arr[i];
  //进行二分查找方法
  let low = 0,high = rowArr.length-1,
    mid = 0;
  while(low<=high){
    mid = Math.floor((low+high)/2)
    if(value<rowArr[mid]){ //此时说明在mid左侧
       high = mid -1;
    }else{
      low = mid +1;
    }
  }
  console.log(i,high)  
}
var arr =[
  [1,2,3,4,5,6,7,8],
  [9,10,11,12,13,14,15,16], 
  [17,18,19,20,21,22,23,24], 
  [25,26,27,28,29,30,31,32], 
]
findValue(arr,20)