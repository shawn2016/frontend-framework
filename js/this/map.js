/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-06 18:06:44
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 18:30:01
 */
/**
 * map的功能 处理操作函数 然后返回元素
 */
Array.prototype.myMap =function (fn) {
  
  //获取当前调用的数组
  var arr = this;  
  if(!Array.isArray(arr)) {
    throw new Error("type error")
  }
  let newArr = [];
  for(var i=0;i<arr.length;i++){ 
    newArr.push(fn(arr[i],i))
  }
  return newArr   
} 
var arr = [1,2,3,4,5,6];
arr = arr.myMap((item,index)=>{
  return item+33
})
console.log(arr)


Array.prototype.myReduce  = function (fn,target) {
  //可接受两个参数，如果target存在，则第一次进行遍历的时候直接传递过去
  var arr =this;
  if(!Array.isArray(arr)) {
    throw new Error("type error")
  }
  let pre = target,newArray=[];
  // total, currentValue, currentIndex, arr
  for(var i=0;i<arr.length;i++){
   let result =  fn(pre,arr[i],i,arr)
    pre = result;  
    newArray.push(pre)
  }
  return newArray[newArray.length-1];  
}

var data =[1,2,3,4,5];
let result = data.myReduce((pre,curr)=>{
  return pre+curr
},0)
console.log(result)
var score = [
  { subject: 'math', score: 88 },
  { subject: 'chinese', score: 95 },
  { subject: 'english', score: 80 }
];
// const sum = result.reduce((accumulator, cur) => accumulator + cur.score, 0); 
const sum = score.myReduce((accumulator, cur) => accumulator + cur.score, -10);  // 总分扣除10分

const a = [23,123,342,12];
const max = a.myReduce(function(pre,cur,inde,arr){return pre>cur?pre:cur;}); // 342
console.log(max)

