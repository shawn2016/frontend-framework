 
// Aop 面向切片编程
// https://www.zhihu.com/question/24863332
function say(){
  console.log("说话")
}

Function.prototype.before=function(beforeFn){
  //箭头函数没有this,将调用this方法
  return (...args)=>{
    beforeFn();
    this(...args);
  }
}
Function.prototype.after=function(afterFn){
  //箭头函数没有this,将调用this方法
  return (...args)=>{ 
   let result =  this(...args);
    afterFn();
    return result;
  }
}

let newFn = say.before(function(){
  console.log("说话前操作")
}).after(function(){
  console.log("说话后操作")
}) 
//调用函数之前的上下文
newFn();

//vue 2.0函数劫持方法 数组的方法 push splice split 进行触发内部的函数
let oldPush = Array.prototype.push;
// call 改变this指向 让this执行
function push(...args){
  //this的数组  
  oldPush.call(this,...args);
  //在加上自己的逻辑

}
let arr = [1,2,3]
push.call(arr,3,2,1,32)
console.log(arr)

//react 也是一样 setState 事务 执行前做一些事情，执行之后在进行操作一些事情