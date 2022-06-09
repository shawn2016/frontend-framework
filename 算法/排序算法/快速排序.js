/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-21 09:20:01
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-13 10:51:46
 */
/**
 * 基本思想：初始化标记low为划分部分的第一个元素位置，high为最后一个元素的位置，然后不断的移动两标记并交换元素
 * 1.high 向前移动找到第一个比pivot小的元素
 * 2.low  向后移动，找到第一个比pivot大的元素
 * 3.交换两个元素的位置，继续移动标记，直到low>high为止
 */ 
const quickSort = (array) => {
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
      return
    }
    let i = left
    let j = right
    const baseVal = arr[j] // 取无序数组最后一个数为基准值
    while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
      while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
        i++
      }
   
      arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
 
      while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
        j--
      }
      arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    console.log(arr)
    sort(arr, left, j - 1) // 将左边的无序数组重复上面的操作
    sort(arr, j + 1, right) // 将右边的无序数组重复上面的操作
  }
  const newArr = array.concat() // 为了保证这个函数是纯函数拷贝一次数组
  sort(newArr)
  return newArr
}

// console.log(quickSort([10,12,4,6,9,11,13]))

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
      console.log(arr)
      //此时i的位置就是a[i]>baseVal
      while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
         j--;
      }
      //此时j对应的元素j大于i
      arr[i]=arr[j];
   
    }
    arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    console.log("arr",arr)
    sort(arr, left, j - 1) // 将左边的无序数组重复上面的操作
    sort(arr, j + 1, right) // 将右边的无序数组重复上面的操作
} 
