 
//generator 函数 特点可以暂停

// * yield  产出
//iterator 迭代器
function* read(){
  yield 1;
  yield 2;
  yield 3;
  return 100
}
let it = read();
console.log(it.next()); //{ value: 1, done: false }
console.log(it.next()); //{ value: 2, done: false }
console.log(it.next()); //{ value: 3, done: false }
console.log(it.next()); //{ value: 100, done: true }


// for of 循环 必须要有iterator

// let obj = {
//   0:1,
//   1:2, 
//   [Symbol.iterator](){ //可迭代的放噶
//     //迭代器默认就是一个对象，具备next方法和调用后返回value和done属性
//     return {
//       next(){
//         return {
//           value:this[index],
//           done:this.length ==index++,
//         }
//       }
//     }
//   }, //元编程 可以更改js的行为
//   length:3
// }

//生成器的应用 生成迭代器
let obj = {
  0:1,
  1:2, 
  *[Symbol.iterator](){ //可迭代的放噶
    for(let i = 0;i<this.length;i++){
      yield this[i]
    } 
  },  
  length:3
}
// console.log(obj)

function* read(){
  let a = yield "hello";
  console.log(a)
  let b = yield "yyy";
  console.log(b)
}
let it2 = read(); 

//1.遇到yield就停止
console.log(it2.next())//第一次next的传递的参数是没有任何意义的
console.log(it2.next(1))//会传递给上一次的返回值
console.log(it2.next(2))
//直接将fs中的版本变成promises
const fs = require('fs');
const util = require('util');
fs.readFile = util.promisify(fs.readFile)
// fs.readFile('./promise/name.txt',(err,data)=>{
//   console.log(data)
// })
function* readFile(){
  let content = yield fs.readFile('name.txt','utf-8');
  let r = yield fs.readFile('age.txt','utf-8');
  return r ;
}
//递归 不断回调
// let iy = readFile();
// let {value,done}=it.next();
// Promise.resolve(value).then(data=>{
//   console.log(data)
//   let {value,done} = it.next(data);
// })


//采用co库表
const co = require("co");
co(readFile()).then(data=>{
  console.log(data)
})

// async await 基于generator +co 模式

//1.回调 高阶函数
//2.



/** generator */

function generator(cb){
  return (function(){
    var object={
      next:0,
      stop:()=>{  }
    }
    return {
      next:function(){
        var ret = cb(object);
        if(ret ==undefined) return {
          value:undefined,done:true
        }
        return {
          value:ret,
          done:false
        }
      }
    }
  })()
}
var a =9
var fun = function (params) {
  console.log(33) 
}
var data = generator(fun);
console.log(data)
 data = data.next(); 

 function* gen(){
  let a =  yield 333;
  let b = yield 333
 }
var it99 = gen()
it99 = it99.next();
console.log(it99)