 
/**
 * 排序序列的值进行两两 如果当前排序的值小于前面的相邻值，则进行位置的替换，如果是大于前面的值，则进行下一个元素比较
 */
console.log("冒泡排序")

var arr = [1,2,3,2,1,2];
function poolSort(arr){ 
  //外层循环为标志元素
  for(var i=0;i<arr.length;i++){
    var flag = false; //用来标记下一循环中是否还存在交换的元素 不存在的话就直接返回已经排好序列
    for(var j = arr.length-1;j>i;j--){
      //如果前面的元素大于后面的元素 则进行交换位置
      if(arr[j-1] >arr[j]){
        //交换当前位置和前一个位置的元素
        var temp = arr[j-1];
        arr[j-1] = arr[j];
        arr[j] = temp 
        flag = true;
      }
    }
    if(!flag){
      return arr
    } 
  }
  return arr;
}
console.log(poolSort(arr))
 
/**
 * 文字描述排序过程 排序数组：[1,2,3,2,1,2]
 * i=0 时 flag =false进入内层循环
 *     j=5  从后向前进行 j=5 a[4]<a[5] j--
 *     j=4  a[3] > a[4] 换位置 [1,2,3,1,2,2] j-- flag = true 
 *     j=3  a[2] > a[3] 换位置 [1,2,1,3,2,2] j-- 
 *     j=2  a[1] > a[2] 换位置[1,1,2,3,2,2] j-- 
 *     j=1  a[0] = a[1] j--  出循环
 * i=0后 得到数组的排序 [1,1,2,3,2,2] i++
 * i=1 flag = false  进入循环
 *     j=5 a[4] = a[5] j--
 *     j=4 a[3] > a[4] 换位置 [1,1,2,2,3,2] j-- flag =true
 *     j=3 a[2] < a[3] j--
 *     j=2 a[1] < a[2] j-- 
 * i=1后得到的数组 [1,1,2,2,3,2] i++
 * i=2 flag =false 进入循环
 *     j=5 a[4] > a[5] 换位置 [1,1,2,2,2,3] flag = true j--
 *     j=5..3是 a[j-1] < a[j] j--
 * i=2后得到的数组 [1,1,2,2,2,3]
 * i=3时 flag = false 进入循环
 *     j=5...4 不需要进行变换
 * !flag = true return  [1,1,2,2,2,3] 
 * 
 */