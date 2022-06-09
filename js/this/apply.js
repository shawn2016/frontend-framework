/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-18 18:35:20
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-04 09:40:09
 */
Function.prototype.myApply=function(context){
  var context = context || window;
  context.fn = this;
  var result = null;
  //判断是否有参数传入
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }else{
    result = context.fn()
  }
  delete context.fn;
  return result;
}

var data ={
  a:223
}
function list(){
  console.log(this.a)
}
list.myApply(data)

Function.prototype.myApply1 = function(context){
  var context = context || window ;//如果无context 
  context.fn = this;//获取当前调用的函数
  //获取是否存在参数
  var args = arguments[1]||[];
  //执行当前的函数
  var result = context.fn(...args);
  //删除挂载的fn
  delete context.fn;
  return result; 
}


var data ={
  a:22
}
function list1(b){
  console.log(this.a)
  console.log(b)
}
list1.myApply1(data,[3333])
