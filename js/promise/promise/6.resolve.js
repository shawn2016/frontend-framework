 
const Promise = require('./Promise')

/**
 * promise.resolve
 */
// Promise.resolve 将现有对象转化成promise对象 具有then方法
const fs = require("fs")

//test 1 
let  p = new Promise((resolve,reject)=>{
  resolve(22)
})
let q = Promise.resolve(p); 

//test 2
let q1 = new Promise.resolve({
  then:()=>{
    console.log("hahhaha")
  }
})
console.log(q1)

//test 3
let q2 = new Promise.resolve({
  then:333
})
q2.then((data)=>{
  console.log(data)
}) 

let q3 = new Promise.resolve(444)
q3.then((data)=>{
  console.log(data)
}) 
