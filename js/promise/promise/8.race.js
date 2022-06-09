 
const Promise = require("./Promise")
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(6)
  },4)
})
const p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(6)
  },4)
 
})
const p3 = new Promise((resolve,reject)=>{
  reject(3)
})
//三个都是promise
const p = Promise.race([p1,p2,p3]) 
p.then((data)=>{
  console.log(data)
},err=>{
  console.log(err)
})

//其中一个不是promise
const pq =  Promise.race([p1,222,p3]) 
pq.then((res)=>{
  console.log(res)
},err=>{
  console.log(err)
})
