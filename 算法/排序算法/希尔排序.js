/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-20 16:59:50
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-04 11:37:08
 */
/**
 * 希尔排序：如果初始排序是有序的，时间复杂度低，如果是逆序的，时间消耗较高
 * 基本思想
 */
function shellSort(arr){
   var gap =Math.ceil(arr.length/2); 
   //进行步长的遍历
   for(gap;gap>0;gap = parseInt(gap/2) ){ 
     //遍历数组中的每一个项目
      for(let i=gap;i<arr.length;i++){ 
        //划分组
        for(let j=i-gap;j>=0;j-=gap){
          if(arr[j+gap] < arr[j]){
            let tem = arr[j+gap];
            arr[j+gap] = arr[j];
            arr[j] = tem;
          }
        } 
           console.log(arr)
      }
      console.log(arr)
   } 
}
shellSort([4,32,3,2,2,12,33,22])