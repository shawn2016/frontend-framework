
// 基本数据类型

const { fdatasync } = require("fs");

// 数字
var isNumber = function (val){
  return typeof val === 'number' && !isNaN(val);
}
// 字符串
var isString = function (val){
   return typeof val == 'string'
}
// 布尔
var isBoolean = function (val){
  return typeof val == 'boolean'
}

// = true
var isTrue = function (val){
  return val ===true
}
// = false
var isFalse = function (val){
 return val ===false
}

// null
var isNull = function (val){
  return val === null;
}

// undefind
var isUndef = function (val){
  return  val ===undefined || val ===null
}

//已经定义
var isDef =function(val){
  return val!==null && val!==undefined
}
// ==isNaN
var isNaN = function(val){
  return 
}

// 复杂数据类型（引用类型）

// 对象 
var isObject= function (obj){
  return obj !== null && typeof obj === 'object'
} 

// 数组
var isArray = function (arr){
  return Array.isArray(arr) 
}

// 函数
var isFun = function (fn){
  return typeof fn == 'function' && !val.then  
} 

// 正则表达式
var isReg = function(reg){ 
  return Object.prototype.toString(reg) =='[object RegExp]'
} 

//Promise 类型 
var isPromise = function(val) {
  return val && typeof val.then === 'function' && val.catch ==='function'
}

// 判断是否是Object
function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
} 

var _toString = Object.prototype.toString;
//类型转换 
//转换成字符串
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

//转化成数字
function toNumber (val) {
  var n;
  if(isArray(val)){
    val = val.join("")
  }
  n = parseFloat(val); 
  return isNaN(n) ? val : n
}

//转化成数组
function toArray (list, start) {
  if(isObject(list)) return ; 
  if(isNumber(list)) list = toString(list)
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}
function extend (to, _from) { 
  for (var key in _from) {
    to[key] = _from[key];
  } 
  return to
}

//转换成对象 适用于key-value的形式数组
function toObject(arr){
  var res = {};
  for(var i = 0;i<arr.length;i++){
    if(arr[i]){
       extend(res,arr[i])
    }
  }
  return res
}
console.log(typeof 1) //number
console.log(typeof 'sss')//string
console.log(typeof [2323])//object
console.log(typeof (Symbol(3))) //symbol
console.log(typeof true) //boolean
console.log(typeof undefined) //undefined
console.log(typeof null) //object
console.log(typeof NaN) //number

 
console.log('a' instanceof String) //false
console.log({} instanceof Object) //true
console.log([] instanceof Array) //true
console.log(true instanceof Boolean) //false
console.log(Symbol(2) instanceof Symbol) //false

function instanceofD(left,right){
   if(typeof left !='object' || left==null) return false;
     //获得类型的原型
     var prototype =  right.prototype;
     //获取对象的原型
     left = left.__proto__;
     while(true){
       if(left ==null){
         return false;
       }
       if(left ==prototype){
         return true;
       }
       left = left.__proto__
     }
}
console.log("执行---额定义")
console.log(instanceofD({},Object))
console.log(instanceofD(null,Object))

let a1 =Object.prototype.toString.call({})
let a2 =Object.prototype.toString.call('333')
let a5 =Object.prototype.toString.call(true)
let a4 =Object.prototype.toString.call(1)
let a3 =Object.prototype.toString.call([])
let a6 =Object.prototype.toString.call(()=>{})
console.log(a1,a2,a3,a4,a5,a6)

var foo =1;
(function foo(){
  foo=10
  console.log(foo)
})()



function create(Constructor){
  //获得一个新的对象
  let newObj = new Object();
  //创建构造函数绑定this 执行构造函数  
  let result = Constructor.call(arguments); 
  //链接到原型
  newObj.__proto__ = Constructor.prototype; 
  //返回新创建的this
  return typeof result =='object' ? result : newObj
}
function P(name,age){
  this.name =name;
  this.age = age;
}
var obk = create(P,333,2323) 
console.log(obk instanceof P)
