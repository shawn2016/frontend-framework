/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-02 10:53:44
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-05 09:07:35
 */

const M = require("minimatch");

/**
 * 冒泡排序
 */
function bundleSort(arr){ 
  for(var i=0;i<arr.length;i++){ 
    let flag = false
    for(var j=0;j<arr.length-1;j++){
       //交换位置 当前元素大于后面的 交换位置
       if(arr[j]>arr[j+1]){ 
         let temp = arr[j+1];
         arr[j+1] = arr[j]
         arr[j] = temp;
         flag = true
       }
    }
    if(!flag) return arr;
  }
  return arr;
 }
//  let result = bundleSort([3,2,1,7,3,5,6,7,2])
//  console.log(result)


/**
 * 选择排序
 * 首先未排序的序列中找到最小（大）的元素，存放到排序序列的起始位置;
 * 再从剩余未排序的元素中继续寻找最小（大）的元素，然后放到已排序序列的末尾，以此类推，直到所有元素均排序完毕；
 * */

function selectSort(arr){
  for(var i=0;i<arr.length-1;i++){
    var min = i;//记录当前最小的位置 
    for(var j=i+1;j<arr.length;j++){
      //存在元素比当前元素小 
        if(arr[min] > arr[j]){
          min = j; 
        }
    }
    //当前后面元素存在比i小的，进行替换
    if(min!=i){
      let temp = arr[i];
      arr[i] = arr[min]
      arr[min] = temp;
    } 
   }
   return arr;
}
// let re1 =selectSort([3,2,1,7,3,5,6,7,2]);
// console.log(re1)


/**
 * 直接插入排序
 */
function insertSort(arr){
  var temp = null,j;
  for(var i=1;i<arr.length;i++){
    temp = arr[i];//存储当前要进行插入的元素
    //如果当前的temp是小于前面已经排好序的最大元素，则进行插入
    for( j=i-1;temp<arr[j];j--){
        arr[j+1] = arr[j]
    }
    //此时
    arr[j+1] = temp;
    console.log(arr)
  }
  return arr;
}

// let re2 = insertSort([7,6,3,2,1,3,5])
// console.log(re/2)


/**折半插入 */

function halfInsertSort(arr){
  let temp = null;
  for(var i=1;i<arr.length;i++){
    let low = 0;
    let high = i-1;
    temp = arr[i]
    while(low<=high){
      //获取中间元素 
      let mid = Math.floor((low+high)/2);
      if(arr[mid]>temp){
        high = mid-1; 
      }else{
        low = mid+1;
      }   
    }
   //查找之后能够获取到当前元素的一个位置 元素将被插入后high的下一个位置中
   //确定好位置后 元素之后的位置向后移动 插入到待排序的数据中
   for(var j=i-1;j>high;j--){
     arr[j+1]=arr[j]
    }
    arr[j+1] = temp;
  }
  return arr;
}
// let re3 = halfInsertSort([3,4,2,3,4,56,74,])
// console.log(re3)



/**
 * 希尔排序
 */
 function shellSort(arr){
   //选取步长
   let gap  =Math.ceil(arr.length /2);

   //步长逐渐缩短 
   for(gap;gap>0;gap=parseInt(gap/2)){
     //根据步长划分组
     for(var i=gap;i<arr.length;i++){
        //进行单个组内的排序
        for(var j=i-gap;j>=0;j-=gap){
          if(arr[j+gap]<arr[j]){
            //换元素
            var temp = arr[j+gap];
            arr[j+gap]=arr[j];
            arr[j] = temp
          } 
        }
     }
     console.log(arr)  
   }
   return arr
 }
let res4 = shellSort([3,4,5,2,3,4,56,2])


//快速排序
function quickSortArr(arr){
  const newArr = arr.concat() // 为了保证这个函数是纯函数拷贝一次数组
  sort(newArr)
  return newArr
}
function sort(arr,left =0,right=arr.length-1){
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
    sort(arr, left, j - 1) // 将左边的无序数组重复上面的操作
    sort(arr, j + 1, right) // 将右边的无序数组重复上面的操作
}


//快排

function quickSort(arr,left=0,right=arr.length-1){
  if(left>=right) return ;

  let i = left,j=right;
  //设置基准值
  let baseVal = arr[i];
  while(i<j){
    //从左遍历  找到第一个比基准值大的元素
    while(i<j && arr[i]<=baseVal){
      i++;
    }
    //找到了a[i]比a[j]大，然后进行位置替换
    arr[j] = arr[i];
    //从右往钱遍历

    while(j>i && arr[j]>=baseVal){
      j--;
    }
    /** 元素找到 */
    arr[i] = arr[j];
    console.log(i,j)
  }
  arr[j] = baseVal;
  sort(arr,left,j-1)
  sort(arr,j+1,right) 
}
let arr= [3,5,6,7,2,1,3,4,5]
let result = quickSort(arr)
console.log(arr)