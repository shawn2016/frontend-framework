/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 15:50:25
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-07 09:46:59
 */

const { create } = require("domain");
const { Obj } = require("prelude-ls");

function myNew(Fn,...args){
  //新生成了一个对象,并将obj的__proto__指向fn的prototype
  let obj = Object.create({});
  obj.__proto__ = Fn.prototype;
  //构造函数中的this指向obj，执行构造函数代码,获取返回值 
  let result = Fn.call(obj,...args);
  //返回当前创建好的this
  return result instanceof Object ? result: obj ;
}

function Student(name){
  this.name = name;
}
let data  = myNew(Student,'3')
console.log(data)

Object.myCreate = function (proto, propertyObject = undefined) {
  if (propertyObject === null) {
    // 这里没有判断propertyObject是否是原始包装对象
    throw 'TypeError'
  } else {
    function Fn () {}
    Fn.prototype = proto
    const obj = new Fn() 
    if (propertyObject !== undefined) {
      for(var key in propertyObject){
        obj[key] = propertyObject[key]
      }
    }
    if (proto === null) {
      // 创建一个没有原型对象的对象，Object.create(null)
      obj.__proto__ = null
    }
    return obj
  }
}
let d2 =Object.myCreate({a: 'aa'},{a:4})
console.log(d2)

function myNew(Fn,...args){
   //新生成了一个对象,并将obj的__proto__指向fn的prototype 
   let obj = Object.create({})
   //构造函数中的this指向obj，执行构造函数代码,获取返回值 
   obj.__proto__ = Fn.prototype;
   //返回当前创建好的this
   let result = Fn.call(obj,...args)
   return result instanceof Object ? result : {}
}

Object.myCreateObject=function(proto,propertiesObject){
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + proto);
} else if (proto === null) {
    throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
} 
    function F(){};
    F.prototype = obj
    var result = new F();
    for(var key in propertiesObject){
      result[key] = propertiesObject[key]
    }
    return result; 
}
let r4 = Object.myCreateObject({a:1212},{b:43434,c:6556})
console.log(r4)

function  Mynew(Fn,...args) {
  //创建一个空的对象
  let obj =  Object.create({});
  //空对象的__proto__指向函数的fn.prototype
  obj.__proto__ = Fn.prototype
  //当前的返回结果
  let result = Fn.call(obj,...args)
  var isObject = typeof result === 'object' && result !== null;
  var isFunction = typeof result === 'function';
  if(isObject || isFunction){
      return result;
  }
  // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObj;
}