/**
 * 
 */
function directSelectSort(a){
  //二层循环 第一层遍历元素
  for(var i =0;i< a.length-1;i++){
    //定义一个最小的min
    var min = i;
    var flag = false;//标记是否还有元素替换
    //遍历循环数组 >min 的元素  
    for(var j=i+1;j< a.length;j++){  
      //找后面的最小元素
      if(a[j] < a[min]){
         min = j; 
         flag = true;
      }   
    } 
    //判断当前min值是否改变 如果改变了则存在元素小于当前的min
    if(min != i){
       swap(a,i,min)
    }
    if(!flag) return a 
  } 
  return a;
} 
c=[5,1,2,3,4,5,6]
var d=directSelectSort(c)
console.log(d)
/**
 * 自然描述
 * 排序 [5,1,2,3,2,5,6]
 * 外层for循环
 * i=0 
 *  内层for循环 min = i 找列表中最小元素
 *  j=1  a[1] < a[min] min = 1
 *  j=2....6  a[2] > a[j] min =1
 *  内层for结束 min=1 交换a[min]和a[i]的位置 [1,5,2,3,2,5,6]
 * i=1 
 *  内层for循环 min=1 
 *  j=2 a[2]< a[min] min = 2
 *  j=3...6时 a[j]>=a[min]
 *  内层for结束 min=2 交换a[min]和a[1]的位置 [1,2,5,3,2,5,6]
 * i=2
 *  内层for循环 min=2
 *  j=3 a[3] < a[min] min =3 
 *  j=4 a[4] < a[min] min =4
 *  j=5.6 a[j] >a[min] min =4
 *  内层for结束 min=4 交换a[4]和a[2]的位置 [1,2,2,3,5,5,6]
 * i=3 
 *  内层for 循环 min=3
 *  j=4..6 a[min]>=a[3] flag = false
 * 退出循环 return a 
 */