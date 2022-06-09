/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-16 09:11:09
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-18 10:11:44
 */
/**
 * 找数组中组合最大的值，间隔
 * 递归
 */
function recOpt(arr,i){
  if(i==0){
    return arr[0]
  }else if(i==1){
    return Math.max(arr[0],arr[1]);
  }else{
    //选择当前 
    let A = recOpt(arr,i-2)+arr[i];
    //不选择当前
    let B = recOpt(arr,i-1)
    return Math.max(A,B)
  }
}
let arr =[1,3,1,5,3,7,2]
console.log(recOpt(arr,arr.length-1),)
//非递归
function recOptR(arr){
  let opt = arr.map(item=>0);
  opt[0]= arr[0];
  opt[1] = Math.max(arr[0],arr[1]);
  for(var i=2;i<arr.length;i++){
    let A = opt[i-2]+arr[i];
    let B = opt[i-1];
    opt[i] = Math.max(A,B)
  }
  return opt[i-1]
}
console.log("非递归",recOptR(arr))
//找数组中相加等于某个值

function recSubset(arr,i,s){
  if(s ==0){
    return true;
  }else if(i==0){
    return arr[0] ==s;
  }else if(arr[i]>s){
    return recSubset(arr,i-1,s)
  }else{
    let A = recSubset(arr,i-1,s-arr[i])
    let B = recSubset(arr,i-1,s)
    return A || B
  }
}

console.log(recSubset(arr,arr.length-1,10))
 
//非递归
/**
 * subset   [
 * 0: [0....s], 
 * 1: [0....s],
 * 
 * ]
 */
function recSubsetB(arr,S){
  var subset = [],i=0;//定义构造二维函数
  for(var i=0;i<arr.length;i++){
    subset[i] = []
    for(var j=0;j<=S;j++){ 
      if(j==0){
        subset[i][j] = true
      }else{
        if(i==0){
          subset[i][j] = false
        } else{
          subset[i][j] = null
        }
      } 
    }   
  } 
  subset[0][arr[0]]=true 
  for(var i=1;i<arr.length;i++){
    for(var s=1;s<=S;s++){
       if(arr[i]>s){
         subset[i][s] = subset[i-1][s]
       }else{
         let A = subset[i-1][s-arr[i]]
         let B = subset[i-1][s];
         subset[i][s] = A || B;
       }
    }
  }
  let r = arr.length;
  let c = subset[0].length; 
  console.log(subset)
  return subset[r-1][c-1]
  
}
let result = recSubsetB([1,3,4,5,6],10)
console.log(result)


