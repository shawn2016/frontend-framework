/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-14 09:09:50
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-17 14:27:10
 */ 
//corejs
const p = new Promise(() => {});
console.log(p);
//helpers
class A {}
class B extends A {}
console.log(new B()); //regenerator
 function* gen() {
}
console.log(gen());