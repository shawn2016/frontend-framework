/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-13 09:02:03
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-13 09:20:41
 */
/**
 * 二分查找方法 递归查找
 */

function binarySearch(arr,item){ 
  let len  = arr.length;
  let mid = Math.floor(len/2);
  if(len==0) return false;
  if(arr[mid] ==item){
    return true;
  }else if(item<arr[mid]){
   return binarySearch(arr.splice(0,mid),item)
  }else{
    var ar = arr.splice(mid+1)
   return binarySearch(ar,item)
  }   
}

// var result = binarySearch([2,3,6,7,21,22,23,34,45],34)
// console.log(result)

function halfSearch(arr,item){
  let len  = arr.length;
  let first = 0,last = len;
  let mid =Math.floor((first+last)/2);
  while(first <=last){
    mid =Math.floor( (first+last)/2)
    if(arr[mid] ==item){
      return true
    }else if(arr[mid]<item){
         first = mid+1;
    }else{
         last = mid-1
    }
  }  
  return false
}
let res = halfSearch([2,3,6,7,21,22,23,34,45],34)
console.log(res)