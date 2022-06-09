/*
 * @Descripttion: 函数相关内容
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-08 14:23:38
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-17 10:31:53
 */

 /**
  * 函数
  */

  //函数表达式
  console.log('--函数表达式开始-',fn)
  var fn = function(){
    console.log(1)
  }
  console.log('--函数表达式结束-',fn)

  /** 函数fun */
console.log('--function开始-',fnf)
  function fnf(){
    console.log(1)
  }
console.log('--function结束-',fnf)

var fnc = new Function('name','age','console.log(name,age)');
// fnc('33',33)


(function(){}())
var fnNameFn = function(){}
function fnNameFn2(){}
console.log(fnNameFn.prototype)

let arrowFun = ()=>{}
console.log(arrowFun.prototype)

let arrfn = ()=> 2;
console.log(arrfn())

let arrfn2 = (name)=> name !='mfy';
console.log(arrfn2())



console.log("%c 传递的参数",'color:red;font-size:20px');

function printName(name,age){
  console.log(name)
  console.log(age)
}
printName('mfy')

let funMfy =function(){
  console.log(arguments)
}
funMfy('mfy','23')

// let fnnn = ()=>{
//   console.log(arguments)
// }
// fnnn('mfy',33)


let fyy = function(...args){
  console.log(args)
}
fyy('mfy',32,[1,2])


/** 函数内部的this */

var  a = '333'

function g_fun(){
  console.log(this)
  console.log("定义在全局的函数",this.a)
}
g_fun()

var obj={
  a:'对象内部的a',
  g_fun:function(){
    console.log(this)
  }
}
obj.g_fun()

let b = 'mfy'
var b1 = 'mfy'
function g_funb(){
  console.log(this.b)
  console.log(b)
  console.log(this.b1)
}
console.log(this)
g_funb()


//箭头函数

let arrowFnn = ()=>{
  console.log(this)
}

var objfn = {
  name:'ee',
  arrowFnn:()=>{
    console.log(this)
  }
}
arrowFnn();
objfn.arrowFnn();


console.log("---面试分析---")
var name = 2;
let funn = {
  name:'mfy',
  printName:()=>{
    var name = 4;
    console.log(name) // 4 
    console.log(this.name) //2
  },
  printName2:function(){
    let name = 'fff'
    console.log(this) // funn
    console.log(this.name) //mfy
  }
}
funn.printName()
funn.printName2()


/**
 * 闭包
 */
function clouser(){
  let a = '666'
  return function(){
    console.log(a)
  }
 }
 let bfn = clouser();
 bfn();//666




//  var a = 2;
//  function b(){
//    console.log(a)
//  }

 function fun(){
   b = 3
 }
 console.log(b)


 function funScope(){
   var a = 22;
   var b = 33;
   console.log(a)
 }
 console.log(b) //undefined


 console.log("%c 块级作用域-----",'color:red')
 if(true){
   let vB = '33'
   console.log(vB)
 }
 console.log(vB) //index.js:175 Uncaught ReferenceError: vB is not defined
 

 var a ='mf'
 function printFn(){
   var b = 3;
   console.log(a)
   console.log(b)
 }
