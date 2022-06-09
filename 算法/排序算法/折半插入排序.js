/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-20 16:41:58
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-04 10:56:11
 */
/**
 *折半插入排序
 * 折半插入排序在寻找插入位置时，不是逐个比较而是利用折半查找的原理寻找插入位置 。待排序元素越多，改进效果越明显。
 * 算法思想：二分法的思想，在一个有序的序列中，找到新元素在该序列中的位置，然后插入
 * 假设已排序的有序序列位置为j
 * 1.当插入第i个元素时候,首先查找到带排序序列的最高位置元素high和最低位置low
 * 2.对比当前元素和(low+high)/2时候的元素大小，如果当前元素是大于中间元素，则当前元素排序位置应该在中间元素后面，将low = (low+hign)/2
 * 3.反复进行2操作，直到找到合适位置，使得当前low>high,
 * 
 * */

//折半插入排序 ： 
function halfSort(arr){
  var low,high,mid,temp,i,j;
  for(i =1;i<arr.length;i++){
      temp = arr[i]; 
      low = 0; //从0开始进行查找
      high = i-1; //当前带排序元素之前的已排序列表
      //在有序列表中进行查找
      while(low <= high){
        //存在有数为小数 所以向上取整
        mid =Math.floor((low+high) /2);  //获取到中间元素位置
        if(arr[mid]>temp){ //如果当前的中间元素大于当前待排序的元素，则表示带排序元素在左侧 
          high = mid -1;
        }else{
          low = mid +1 //带排序元素的位置在右侧
        }
      } 
      //查找之后能够获取到当前元素的一个位置 元素将被插入后high的下一个位置中
      //确定好位置后 元素之后的位置向后移动 插入到待排序的数据中
      for(j=i-1;j> high;j--){
        arr[j+1] = arr[j];
      }
      arr[j+1] = temp; 
      console.log(arr)
  }
  return arr;
}

var a = halfSort([12,11,8,9,15]);
console.log(a);
/**
 * 文字描述 排序3，4，5，6，7，8,2,3 过程
 * i=1时进行排序
 *   此时 low =0 high = 0 进入while循环 low = 1  high =0 出while循环后 a[1] = temp 顺序排序 3 4 5 6 7 8 2 3
 * i=2时
 *   此时low = 0 high = 1 进入while循环后 low = 1 high = 1 出循环 a[2] = temp
 * i =3 时 
 *   此时low = 0 high = 2 6不在序列3 4 5中 所以high = 2 出循环 a[3] = temp 
 * i =4 时 
 *   此时low = 0 high = 3 8不在序列3 4 5 6中 所以high = 3 出循环 a[4] = temp 
 * i =5 时 
 *   此时low = 0 high = 4  进入循环  
 *                         循环第一次 a[2]=5 > 2  high = 1
 *                         循环第二次 a[1]=4 > 2  high = 0
 *                         循环第三次 a[0]=3 > 2  low = 1 high = 0
 *   退出while循环 进入移动元素循环 high之后的元素到i-1的元素全部后移 在a[0] = 2 得到排序序列 2,3,4,5,6,8,3
 * i= 6时 
 *    此时low = 0 high = 5  进入while循环
 *                         循环第一次 mid = 3 a[3] > 3 high = 2
 *                         循环第二次 mid = 2 a[2] > 3 high = 1
 *                         循环第三次 mid = 1 a[1] = 3 low = 1
 *                         循环第四次 mid = 1 a[1] = 3 low =2 low>high 跳出循环
 *   跳出while循环 进入for循环 high到i-1的元素全部进行后移 a[2] = 3 此时得到排序后的序列 2 3 3 4 5 6 7 8
 */