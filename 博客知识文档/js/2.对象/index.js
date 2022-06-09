/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-06 09:59:11
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-07 10:02:44
 */ 
 var  obj = {
    name:'mfy',
    age:23
 }
 console.log(obj)

var obj1 =Object.create(null)
 console.log(obj1)

var obj2 = Object.create({a:3})
 console.log(obj2)
 console.log(obj2.hasOwnProperty('a'))

 var objPro ={}
 let pro={
  age: {
    value: 24, // 属性默认值
    congigurable: false, // 设置false之后将不能不删除
    enumerable: true,
    writable: false,  // 设置false之后将不能修改
  }
}
 
 


 Object.Mycreate=(pro,propertiesObject)=>{
    if(typeof pro !=='object'){
      throw new Error("pro must a objetc")
    }
    function Fn() {};
    Fn.prototype =  pro;
    let result = new Fn(); //__ptoto__指向问题；
    if(propertiesObject){
      if(propertiesObject !== Object(propertiesObject)){
        new TypeError()
      }
      Object.defineProperties(result,propertiesObject)
    } 
    return result; 
 }
//  Object.defineProperty(obj,{})


 var obj3 = Object.create({name:3},pro)
 console.log("myObject.create:obj3",obj3)
 var obj4 = Object.create({name:4},pro) 
 console.log("myObject.create:obj4",obj4)



 //
 console.log("%c --- new Object ---- ",'color:green;font-size:16px;',)

 console.log(new Object())
 console.log(new Object(null))
 console.log(new Object({}))
 console.log(new Object({a:'mmm'}))

 let a = {
   name:'mfy',
   age:'23'
 }
 let ac  = new Object(a);

 ac.name="myy"
 console.log(ac)
 console.log(a.name) 
 console.log(ac == a) 

console.log("%c -----构造函数创建对象------",'color:red;font-size:16px;');

function Person(){
  this.name = 'mfy';
  this.age='21'
}

let per = new Person();
console.log(per)


console.log("%c -----工厂模式创建对象------",'color:yellow;font-size:16px;');

function factoryObject(){
  var obj = new Object();
  obj.name = 'mfy',
  obj.age= '21'
  return obj
}
var obj = factoryObject()
console.log(obj)

console.log("%c -----原型模式------",'color:yellow;font-size:16px;');

function Parent (){
  
}
Parent.prototype.name ='mff'
Parent.prototype.age ='12'
Parent.prototype.lev = function(){
    console.log(11)
}

var pr = new Parent();
console.log(pr)


console.log("%c -----原型+构造函数模式------",'color:yellow;font-size:16px;');

function ParentPro(){
  this.name = 'myy';
  this.age =223
}
ParentPro.prototype.printName = function(){
  console.log("------")
}
let hunPe = new ParentPro();
console.log(hunPe);
