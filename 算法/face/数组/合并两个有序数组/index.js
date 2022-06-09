/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-02 14:30:48
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-16 15:30:09
 */
/**
 * 
 * @param A int整型一维数组 
 * @param B int整型一维数组 
 * @return void
 */
function merge( A, m, B, n ) {
  // write cod e here 
  let i=0;
  let j = 0;
  while(j<n){
      //判断
      if(A[i]<B[j]){
          i++;
      }else{
          //将b元素插入进去 A的相关元素也要进行后移
          insertEl(A,i,B[j]);
          i++;
          j++;
      }
  }
  console.log(A)
  return A
}
function insertEl(arr,i,el){
  let currentLength =arr.length; 
  for(var j=i;j<currentLength;j++){
      arr[j+1] = arr[j]
  }
  arr[i] = el
}
merge([1,2,3],3,[],0)


function uniquePaths( m ,  n ) {
  // write code here
  //最后一个的终点其实等于他前面的上面的进行记录
  let dp=[];
  for(let i=0;i<=m;i++){
      let arr = new Array(n+1).fill(0);
      dp[i]=arr;
  }
  dp[0][1] = 1;
  for(let i=9;i<m;i++){
    for(let j=0;j<n;j++){
      dp[i][j] = dp[i-1][j]+dp[i][j-1]
    }
  }
  console.log()
  return dp[m][n]
}
// uniquePaths(2,2)
function upper_bound_( n ,  v ,  a ) {
  // write code here
  let low = 0;
  let high = n-1; 
  while(low<=high){
      let mid=Math.floor((low+high)/2);
      if(a[mid]>v){
          high = mid-1;     
      }else if(a[mid]<v){
          low = mid+1
      }else{
          while(a[mid]==v){
              mid++;
          }
          return mid-1
      }    
  }
  return n+1;
}
 
let res = upper_bound_(5,4,[1,2,4,4,5])
console.log(res)


function quickSort(arr,left=0,right=arr.length-1){
  if(left >=right){
    return
  } 
  let i = left,j=right;
  //设置当前数组的最后一个个值为基准值
  const baseVal = arr[j];
  while(i<j){ 
    //进行遍历左侧 找到第一个比baseVal大的元素
    while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
         i++;
    }
    //将当前大于baseVal的值放在最后一项, 
    arr[j]= arr[i]  
    //此时i的位置就是a[i]>baseVal
    while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
       j--;
    }
    //此时j对应的元素j大于i
    arr[i]=arr[j]; 
  }
  arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ） 
  quickSort(arr, left, j - 1) // 将左边的无序数组重复上面的操作
  quickSort(arr, j + 1, right) // 将右边的无序数组重复上面的操作
}
let d =[3,4,5,2,1,3]
 quickSort(d);
console.log(d)
function findKth( a ,  n ,  K ) {
  // write code here 
  quickSort(a,0,n-1);
  return a[K]
}
let result = findKth([1,3,5,2,2],5,3)
console.log(result)