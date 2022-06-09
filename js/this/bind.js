/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-18 18:07:10
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-07 09:17:28
 */ 

 
/**
 * 
 */

Function.prototype.myBind =function(context){
  if(typeof this !='function'){
    throw new TypeError("error")
  }
  var _this = this;
  var args =[...arguments].slice(1) 
  //返回一个函数
  return function F(){
    //因为返回了一个新的函数 所以判断 
    if(this instanceof F){
      return new _this(...args,...arguments)
    }
    return _this.apply(context,args.concat(...arguments))
  }
}
var data = {a:22}
function list(){
  console.log(this.a)
}
list =list.myBind()
list()

//bind 只是把当前的this挂载到函数中，不会立刻执行

// Function.prototype.myBind1 = function(context){
//   var context = context || window ;//要进行绑定的this作用域 
//   var _this = this;//获取当前调用的函数
//   var args =[...arguments].slice(1);//参数
//   return function F(){ 
//     //利用call/apply方式执行此
//     return _this.apply(context,args.concat([...arguments]));  
//   }
// }

// var data1 = {a:333};
// function list2(b){
//   console.log(this.a)
//   console.log(b)
// }
// var data3 = {a:444}

// list2 = list2.myBind1(data1,333)
// list2 = list2.myBind1(data3)
// console.log(list2)
// list2(11)

// // list2 = list2.bind(data1)
// // console.log(list2)


//原有的bind
var obj = {
  a:2,
  b:4
}
function demo(a,b){
  console.log('this',this) //this demo {}
  console.log(a,b)
  return false
}
demo = demo.bind(obj,5)
var demom = new demo(6);
console.log(demom,'demom') //demo {} 'demom'



// var boundResult = demo(3);
// console.log(boundResult); // false
// console.log(demo.bind.name); // 'bind'
// console.log(demo.bind.length); // 1
// console.log(demo.bind().length); // 2 返回demo函数的形参个数
// console.log(demo.name); // 'bound demo'
// console.log((function(){}).bind().name); // 'bound '
// console.log((function(){}).bind().length); // 0

Function.prototype.myBindDemo = function (context) {
 //获取调用的函数 
  let fn = this;
  //bind时候传入的参数
  let args = [].slice.call(arguments, 1);
  //定义一个bound函数
  function bound() {
    //合并调用的参数和当前传入的参数
    let currArgs = args.concat([].slice.call(arguments,0)) ;//合并所有的参数
    //判断是否是new的操作
    if(this instanceof bound){
      //创建一个全新的对象 ->并且执行[[Prototype]]__proto__链接->链接到这个函数的`prototype`对象上。
      if(fn.prototype){
        function Empty() {} //创建一个函数
        Empty.prototype = fn.prototype; //该函数指向原来函数的this
        bound.prototype = new Empty(); //脱离当前的原型链，将该bound指向其他
      }
        //生成的新对象会绑定到函数调用里面的this
        let result = fn.call(this,...currArgs)
        var isObject = typeof result === 'object' && result !== null;
        var isFunction = typeof result === 'function';
        if(isObject || isFunction){
            return result;
        }
        //返回当前call的函数
        return this;
    }else{
        // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
        return fn.apply(context, currArgs); 
    } 
  }  
  return bound; 
}

console.log("------测试-------")
var objDemo ={
  a:2,
  b:6
}
function demoBind (a,b){
  console.log(this,a,b)
}
demoBind =demoBind.myBindDemo(objDemo,6,6)
console.log(demoBind)
demoBind()
demoNewBind = new demoBind();
console.log(demoNewBind)