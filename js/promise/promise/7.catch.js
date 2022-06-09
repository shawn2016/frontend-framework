 
const Promise = require('./Promise');
const p = new Promise((resolve,reject)=>{
  console.log(22)
  throw new Error('test');
  resolve(333)

})
p.then((res)=>{
   console.log(res)
},err=>{
  console.log(err)
}).catch((err)=>{
  console.log(err)
})
