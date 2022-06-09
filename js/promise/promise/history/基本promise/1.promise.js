 
/**
 * promise 承诺
 */
const Promise = require('./Promise')
 //1.里面有三个状态 等待（默认） 成功态 失败态 一旦成功就不能失败

 //2.每个promise都有一个then方法

 //3.如果new Promise的时候报错，只能失败
 
 let promise = new Promise((resolve,reject)=>{
  // throw new Error("失败")
  console.log(1) //executor 执行器
  resolve("hello")
 })
  

 promise.then(data=>{
  console.log("成功")
  setTimeout(()=>{
    console.log("then里面的一个promise")
  },200)
 },(err)=>{
   console.log("失败1")
 })
 promise.then(data=>{
  console.log("成功")
  setTimeout(()=>{
    console.log("then里面的一个promise1")
  },200)
 },(err)=>{
   console.log("失败2")
 })