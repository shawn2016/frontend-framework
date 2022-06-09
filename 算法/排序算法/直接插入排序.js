// 插入排序
// 1 直接插入排序 将一个待排序的序列插入到一个前面已经排序的子序列中 
/**
 * 直接插入插排的基本思想是：
 * 当插入第i(i >= 1)时，前面的V[0]，V[1]，……，V[i-1]已经排好序。
 * 用V[I]的排序码与V[i-1]，V[i-2]，…的排序码顺序进行比较，
 * 找到插入位置即将V[i]插入，
 * 原来位置上的元素向后顺移。
 */
var arr = [2,5,3,3];
function insertSort(arr){
  var temp ;
  var i,j;
  for( i = 1;i<arr.length;i++){
    temp = arr[i]; //存储当前要记录的元素
    j=i-1;  //当前元素之前的元素位置
    //比较j-1前面已经排序好的序列，如果当前的temp<arr[j]的某一个元素，则将j后面的元素进行后移
    for(j=i-1;temp < arr[j];j--){
       arr[j+1] = arr[j]
    } 
    arr[j+1] = temp; 
    console.log(arr) //可查看每次排序的顺序
  } 
  return arr
}
var haveSort = insertSort(arr)
console.log(haveSort)
/**
 * 2 5 3 3 
 */