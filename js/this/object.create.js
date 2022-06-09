/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-07 09:33:28
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-08 08:53:49
 */
/**
 * 探究原生的作用
 */

var obj = Object.create({a:3})
console.log(obj)
var obj1 = Object.create(null)
console.log(obj1)
var obj2 = Object.create({a:3},{ 
  foo: {
    writable: true,
    configurable: true,
    value: 'hello'
  },
})
console.log(obj2)

Object.myCreate=function (proto,propertiesObject) {
  //
  if(typeof proto !== 'object'){
    throw TypeError();
  }
  //定义一个函数
  function F() {}
  //将函数的__proto__属性指向obj
  F.prototype = proto; 
  //返回该函数的实例话参数
  let result = new F();//__proto__的指向 
   //判断第二个参数
   if(propertiesObject){
    if(propertiesObject !== Object(propertiesObject)){
        throw TypeError();
    }
    Object.defineProperties(result,propertiesObject) 
   }
  //查看是否存在第二个参数，如果存在则进行绑定
  return result;   
}

var ki = Object.myCreate({a:4})
console.log(ki)

Object.myCreate=function(obj,protoies){
  //obj可能为空
  if(typeof proto !== 'object'){
    throw TypeError();
  }
  //定义一个函数
  function  F() {}
  //将函数的prototype指向obj
  F.prototype = obj;
  //实例化该函数
  let result = new F();
  //判断当前是否有属性传入，校验属性的合法性
  if(protoies){
    if(propertiesObject !== Object(propertiesObject)){
      throw TypeError();
    }
    //将传入的属性挂载到传入的原型中
    Object.defineProperties(result,propertiesObject)
  }
  return result;

}