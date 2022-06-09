/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-18 18:27:51
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-04 09:36:18
 */
Function.prototype.myCall=function(context){
  var context = context || window;
  context.fn = this;
  //取出当前的this
  var args =[...arguments].slice(1);
  //调用当前的函数
  var result = context.fn(...args);
  //删除挂在实例上的方法
  delete context.fn;
  //返回调用的结果值
  return result;
}

var data = {a:22}
function list(){
  console.log(this.a)
}
list.myCall(data)


Function.prototype.myCally=function(context){
   //context 传入的上下文 如果存在 则表示this也存在
   var context = context || window;  
   //此时已经绑定this context
   context.fn = this;//当前的this上创建函数 获取调用的函数this 
   //取出参数 argument是伪数组 转化成真数组
   var args = [...arguments].slice(1)
   //调用参数
   var result = context.fn(...args )
   //删除当前的this
   delete context.fn 
   return result;
}

var data = {a:22}
function list(b){
  console.log(this.a) 
  console.log(b)
}
list.myCally(data,222)