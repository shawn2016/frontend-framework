/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 14:43:12
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-20 10:11:12
 */
const compose = require('./koa-compose')
function one(ctx,next){
  console.log('第一个');
  next(); // 控制权交到下一个中间件（实际上是可以执行下一个函数） 
  console.log('第一个--结束');
}
function two(ctx,next){
  console.log('第二个');
  next();
  console.log('第二个--结束');
}
function three(ctx,next){
  console.log('第三个');
  next();
  console.log('第三个--结束');
}
// let result = compose([one,two,three])
// console.log(result)
// result(0)
function one(ctx,next){
  console.log('第一个');
  two(); // 控制权交到下一个中间件（实际上是可以执行下一个函数） 
  console.log('第一个--结束');
}
function two(ctx,next){
  console.log('第二个');
  three();
  console.log('第二个--结束');
}
function three(ctx,next){
  console.log('第三个'); 
  console.log('第三个--结束');
}
console.log(one())


// const Koa = require('koa');
// const app = new Koa()

// app.use((ctx,next)=>{
//   console.log(ctx);
//   console.log(next)
// })
// app.listen(400)
if(true){
  let a = require('./compose')
  console.log(a)
}
