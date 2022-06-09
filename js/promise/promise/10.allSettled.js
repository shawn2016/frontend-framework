 
const Promise = require('./Promise')
const p1 = new Promise((resolve,reject)=>{
  resolve(3)
})
const p2 =  new Promise((resolve,reject)=>{
  resolve(1)
})
const p3 =  new Promise((resolve,reject)=>{
  resolve(2)
}) 
const p = Promise.allSettled([p1,p2,p3,88]);
p.then(arr=>{
  console.log(arr)
})

 